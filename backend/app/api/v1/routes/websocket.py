"""
WebSocket API Routes for Real-time Communication
Handles WebSocket connections, real-time updates, and live collaboration
"""
import json
import logging
from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, HTTPException, status
from fastapi.security import HTTPBearer
from typing import Dict, Any, Optional
import jwt
from datetime import datetime

from app.core.websocket import connection_manager, NotificationService, MessageType
from app.core.config import settings
from app.core.auth import verify_token
from app.models.user import User

logger = logging.getLogger(__name__)
router = APIRouter()
security = HTTPBearer()

async def get_current_user_websocket(websocket: WebSocket, token: str) -> Optional[User]:
    """Authenticate user for WebSocket connection"""
    try:
        # Decode JWT token
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("sub")
        
        if user_id is None:
            return None
            
        # In a real implementation, you would fetch the user from database
        # For now, we'll create a mock user object
        user = User(id=user_id, email=payload.get("email", ""))
        return user
        
    except jwt.PyJWTError:
        return None

@router.websocket("/ws/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    """Main WebSocket endpoint for real-time communication"""
    
    # Authenticate user
    user = await get_current_user_websocket(websocket, token)
    if not user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    
    # Get client info from headers
    client_info = {
        "user_agent": websocket.headers.get("user-agent", ""),
        "origin": websocket.headers.get("origin", ""),
        "ip_address": websocket.client.host if websocket.client else "unknown"
    }
    
    # Connect user
    await connection_manager.connect(websocket, user.id, client_info)
    
    try:
        while True:
            # Receive message from client
            data = await websocket.receive_text()
            message = json.loads(data)
            
            message_type = message.get("type")
            message_data = message.get("data", {})
            
            logger.info(f"Received WebSocket message: {message_type} from user {user.id}")
            
            # Handle different message types
            if message_type == MessageType.HEARTBEAT:
                await connection_manager.handle_heartbeat(websocket)
                
            elif message_type == "subscribe_room":
                room_id = message_data.get("room_id")
                if room_id:
                    connection_manager.subscribe_to_room(websocket, room_id)
                    await connection_manager.send_personal_message({
                        "type": "room_subscribed",
                        "data": {"room_id": room_id}
                    }, websocket)
                    
            elif message_type == "unsubscribe_room":
                room_id = message_data.get("room_id")
                if room_id:
                    connection_manager.unsubscribe_from_room(websocket, room_id)
                    await connection_manager.send_personal_message({
                        "type": "room_unsubscribed",
                        "data": {"room_id": room_id}
                    }, websocket)
                    
            elif message_type == "typing":
                # Handle typing indicators for collaboration
                room_id = message_data.get("room_id")
                if room_id:
                    await NotificationService.send_collaboration_update(
                        room_id, 
                        {"id": user.id, "name": user.email}, 
                        "typing"
                    )
                    
            elif message_type == "stop_typing":
                # Handle stop typing indicators
                room_id = message_data.get("room_id")
                if room_id:
                    await NotificationService.send_collaboration_update(
                        room_id, 
                        {"id": user.id, "name": user.email}, 
                        "stopped_typing"
                    )
                    
            elif message_type == "cursor_update":
                # Handle cursor position updates for collaborative editing
                room_id = message_data.get("room_id")
                cursor_position = message_data.get("cursor_position")
                selection = message_data.get("selection")
                
                if room_id:
                    await NotificationService.send_collaboration_update(
                        room_id,
                        {
                            "id": user.id,
                            "name": user.email,
                            "cursor_position": cursor_position,
                            "selection": selection
                        },
                        "cursor_moved"
                    )
                    
            elif message_type == "request_status":
                # Send current connection status
                await connection_manager.send_personal_message({
                    "type": MessageType.SYSTEM_STATUS,
                    "data": {
                        "active_users": len(connection_manager.get_active_users()),
                        "total_connections": connection_manager.get_total_connections(),
                        "user_connections": connection_manager.get_user_connection_count(user.id),
                        "server_time": datetime.utcnow().isoformat()
                    }
                }, websocket)
                
            else:
                # Unknown message type
                await connection_manager.send_personal_message({
                    "type": "error",
                    "data": {"message": f"Unknown message type: {message_type}"}
                }, websocket)
                
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        logger.info(f"WebSocket disconnected for user {user.id}")
    except Exception as e:
        logger.error(f"WebSocket error for user {user.id}: {e}")
        connection_manager.disconnect(websocket)

@router.websocket("/ws/document/{document_id}/{token}")
async def document_collaboration_endpoint(websocket: WebSocket, document_id: str, token: str):
    """WebSocket endpoint for document collaboration"""
    
    # Authenticate user
    user = await get_current_user_websocket(websocket, token)
    if not user:
        await websocket.close(code=status.WS_1008_POLICY_VIOLATION)
        return
    
    room_id = f"document_{document_id}"
    
    # Connect user to document room
    await connection_manager.connect(websocket, user.id)
    connection_manager.subscribe_to_room(websocket, room_id)
    
    # Notify others that user joined
    await NotificationService.send_collaboration_update(
        room_id,
        {"id": user.id, "name": user.email},
        "joined"
    )
    
    try:
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            message_type = message.get("type")
            message_data = message.get("data", {})
            
            if message_type == "document_change":
                # Handle document content changes
                changes = message_data.get("changes", [])
                version = message_data.get("version")
                
                # Broadcast changes to other collaborators
                await NotificationService.send_document_update(room_id, {
                    "id": document_id,
                    "version": version,
                    "changes": changes,
                    "last_modified_by": user.email
                })
                
            elif message_type == "cursor_update":
                # Handle cursor position updates
                await NotificationService.send_collaboration_update(
                    room_id,
                    {
                        "id": user.id,
                        "name": user.email,
                        "cursor_position": message_data.get("cursor_position"),
                        "selection": message_data.get("selection")
                    },
                    "cursor_moved"
                )
                
    except WebSocketDisconnect:
        connection_manager.disconnect(websocket)
        # Notify others that user left
        await NotificationService.send_collaboration_update(
            room_id,
            {"id": user.id, "name": user.email},
            "left"
        )
        logger.info(f"Document collaboration WebSocket disconnected for user {user.id}")

# API endpoint to send notifications (for testing and internal use)
@router.post("/notifications/send")
async def send_notification(
    notification_data: Dict[str, Any],
    current_user: User = Depends(verify_token)
):
    """Send a notification to users (for testing)"""
    
    message_type = notification_data.get("type")
    recipients = notification_data.get("recipients", [])
    data = notification_data.get("data", {})
    
    if message_type == MessageType.TASK_UPDATE:
        for user_id in recipients:
            await NotificationService.send_task_update(user_id, data)
            
    elif message_type == MessageType.RISK_ALERT:
        for user_id in recipients:
            await NotificationService.send_risk_alert(user_id, data)
            
    elif message_type == MessageType.COMPLIANCE_ALERT:
        await NotificationService.send_compliance_alert(recipients, data)
        
    else:
        # Generic notification
        message = {
            "type": message_type,
            "data": data,
            "timestamp": datetime.utcnow().isoformat()
        }
        for user_id in recipients:
            await connection_manager.send_to_user(message, user_id)
    
    return {"status": "notifications_sent", "recipients": len(recipients)}

@router.get("/notifications/status")
async def get_notification_status(current_user: User = Depends(verify_token)):
    """Get WebSocket connection status"""
    
    return {
        "active_users": len(connection_manager.get_active_users()),
        "total_connections": connection_manager.get_total_connections(),
        "user_connections": connection_manager.get_user_connection_count(current_user.id),
        "rooms": len(connection_manager.room_subscriptions),
        "server_time": datetime.utcnow().isoformat()
    }
