"""
WebSocket Manager for Real-time Communication
Handles real-time notifications, live updates, and collaboration features
"""
import json
import asyncio
import logging
from typing import Dict, List, Set, Optional, Any
from datetime import datetime
from fastapi import WebSocket, WebSocketDisconnect
from enum import Enum
import uuid

logger = logging.getLogger(__name__)

class MessageType(str, Enum):
    """WebSocket message types"""
    NOTIFICATION = "notification"
    TASK_UPDATE = "task_update"
    DOCUMENT_UPDATE = "document_update"
    CONTRACT_UPDATE = "contract_update"
    MATTER_UPDATE = "matter_update"
    RISK_ALERT = "risk_alert"
    COMPLIANCE_ALERT = "compliance_alert"
    USER_ACTIVITY = "user_activity"
    SYSTEM_STATUS = "system_status"
    AI_PROGRESS = "ai_progress"
    COLLABORATION = "collaboration"
    HEARTBEAT = "heartbeat"

class ConnectionManager:
    """Manages WebSocket connections and message broadcasting"""
    
    def __init__(self):
        # Active connections by user ID
        self.active_connections: Dict[str, Set[WebSocket]] = {}
        # Connection metadata
        self.connection_metadata: Dict[WebSocket, Dict[str, Any]] = {}
        # Room subscriptions (for specific modules/documents)
        self.room_subscriptions: Dict[str, Set[WebSocket]] = {}
        
    async def connect(self, websocket: WebSocket, user_id: str, client_info: Dict[str, Any] = None):
        """Accept and register a new WebSocket connection"""
        await websocket.accept()
        
        # Add to user connections
        if user_id not in self.active_connections:
            self.active_connections[user_id] = set()
        self.active_connections[user_id].add(websocket)
        
        # Store metadata
        self.connection_metadata[websocket] = {
            "user_id": user_id,
            "connected_at": datetime.utcnow(),
            "client_info": client_info or {},
            "last_heartbeat": datetime.utcnow()
        }
        
        logger.info(f"WebSocket connected for user {user_id}")
        
        # Send welcome message
        await self.send_personal_message({
            "type": MessageType.SYSTEM_STATUS,
            "data": {
                "status": "connected",
                "server_time": datetime.utcnow().isoformat(),
                "connection_id": str(uuid.uuid4())
            }
        }, websocket)
    
    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket connection"""
        if websocket in self.connection_metadata:
            user_id = self.connection_metadata[websocket]["user_id"]
            
            # Remove from user connections
            if user_id in self.active_connections:
                self.active_connections[user_id].discard(websocket)
                if not self.active_connections[user_id]:
                    del self.active_connections[user_id]
            
            # Remove from room subscriptions
            for room_connections in self.room_subscriptions.values():
                room_connections.discard(websocket)
            
            # Remove metadata
            del self.connection_metadata[websocket]
            
            logger.info(f"WebSocket disconnected for user {user_id}")
    
    async def send_personal_message(self, message: Dict[str, Any], websocket: WebSocket):
        """Send message to a specific WebSocket connection"""
        try:
            await websocket.send_text(json.dumps(message, default=str))
        except Exception as e:
            logger.error(f"Failed to send personal message: {e}")
    
    async def send_to_user(self, message: Dict[str, Any], user_id: str):
        """Send message to all connections for a specific user"""
        if user_id in self.active_connections:
            disconnected_connections = []
            for websocket in self.active_connections[user_id].copy():
                try:
                    await websocket.send_text(json.dumps(message, default=str))
                except Exception as e:
                    logger.error(f"Failed to send message to user {user_id}: {e}")
                    disconnected_connections.append(websocket)
            
            # Clean up disconnected connections
            for websocket in disconnected_connections:
                self.disconnect(websocket)
    
    async def broadcast_to_room(self, message: Dict[str, Any], room_id: str):
        """Send message to all connections in a specific room"""
        if room_id in self.room_subscriptions:
            disconnected_connections = []
            for websocket in self.room_subscriptions[room_id].copy():
                try:
                    await websocket.send_text(json.dumps(message, default=str))
                except Exception as e:
                    logger.error(f"Failed to broadcast to room {room_id}: {e}")
                    disconnected_connections.append(websocket)
            
            # Clean up disconnected connections
            for websocket in disconnected_connections:
                self.disconnect(websocket)
    
    async def broadcast_to_all(self, message: Dict[str, Any]):
        """Send message to all active connections"""
        for user_id in list(self.active_connections.keys()):
            await self.send_to_user(message, user_id)
    
    def subscribe_to_room(self, websocket: WebSocket, room_id: str):
        """Subscribe a connection to a specific room"""
        if room_id not in self.room_subscriptions:
            self.room_subscriptions[room_id] = set()
        self.room_subscriptions[room_id].add(websocket)
        
        logger.info(f"WebSocket subscribed to room {room_id}")
    
    def unsubscribe_from_room(self, websocket: WebSocket, room_id: str):
        """Unsubscribe a connection from a specific room"""
        if room_id in self.room_subscriptions:
            self.room_subscriptions[room_id].discard(websocket)
            if not self.room_subscriptions[room_id]:
                del self.room_subscriptions[room_id]
    
    async def handle_heartbeat(self, websocket: WebSocket):
        """Handle heartbeat messages to keep connections alive"""
        if websocket in self.connection_metadata:
            self.connection_metadata[websocket]["last_heartbeat"] = datetime.utcnow()
            await self.send_personal_message({
                "type": MessageType.HEARTBEAT,
                "data": {"timestamp": datetime.utcnow().isoformat()}
            }, websocket)
    
    def get_active_users(self) -> List[str]:
        """Get list of active user IDs"""
        return list(self.active_connections.keys())
    
    def get_user_connection_count(self, user_id: str) -> int:
        """Get number of active connections for a user"""
        return len(self.active_connections.get(user_id, set()))
    
    def get_total_connections(self) -> int:
        """Get total number of active connections"""
        return sum(len(connections) for connections in self.active_connections.values())

# Global connection manager instance
connection_manager = ConnectionManager()

class NotificationService:
    """Service for sending real-time notifications"""
    
    @staticmethod
    async def send_task_update(user_id: str, task_data: Dict[str, Any]):
        """Send task update notification"""
        message = {
            "type": MessageType.TASK_UPDATE,
            "data": {
                "task_id": task_data.get("id"),
                "title": task_data.get("title"),
                "status": task_data.get("status"),
                "priority": task_data.get("priority"),
                "updated_at": datetime.utcnow().isoformat(),
                "updated_by": task_data.get("updated_by")
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await connection_manager.send_to_user(message, user_id)
    
    @staticmethod
    async def send_document_update(room_id: str, document_data: Dict[str, Any]):
        """Send document update to all collaborators"""
        message = {
            "type": MessageType.DOCUMENT_UPDATE,
            "data": {
                "document_id": document_data.get("id"),
                "title": document_data.get("title"),
                "version": document_data.get("version"),
                "last_modified_by": document_data.get("last_modified_by"),
                "changes": document_data.get("changes", [])
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await connection_manager.broadcast_to_room(message, room_id)
    
    @staticmethod
    async def send_risk_alert(user_id: str, risk_data: Dict[str, Any]):
        """Send risk alert notification"""
        message = {
            "type": MessageType.RISK_ALERT,
            "data": {
                "risk_id": risk_data.get("id"),
                "title": risk_data.get("title"),
                "severity": risk_data.get("severity"),
                "category": risk_data.get("category"),
                "description": risk_data.get("description"),
                "mitigation_required": risk_data.get("mitigation_required", False)
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await connection_manager.send_to_user(message, user_id)
    
    @staticmethod
    async def send_compliance_alert(user_ids: List[str], compliance_data: Dict[str, Any]):
        """Send compliance alert to multiple users"""
        message = {
            "type": MessageType.COMPLIANCE_ALERT,
            "data": {
                "regulation": compliance_data.get("regulation"),
                "jurisdiction": compliance_data.get("jurisdiction"),
                "severity": compliance_data.get("severity"),
                "deadline": compliance_data.get("deadline"),
                "action_required": compliance_data.get("action_required"),
                "description": compliance_data.get("description")
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        for user_id in user_ids:
            await connection_manager.send_to_user(message, user_id)
    
    @staticmethod
    async def send_ai_progress(user_id: str, ai_task_id: str, progress: int, status: str):
        """Send AI task progress update"""
        message = {
            "type": MessageType.AI_PROGRESS,
            "data": {
                "task_id": ai_task_id,
                "progress": progress,
                "status": status,
                "estimated_completion": None  # TODO: Calculate based on progress
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await connection_manager.send_to_user(message, user_id)
    
    @staticmethod
    async def send_collaboration_update(room_id: str, user_data: Dict[str, Any], action: str):
        """Send collaboration activity update"""
        message = {
            "type": MessageType.COLLABORATION,
            "data": {
                "user_name": user_data.get("name"),
                "user_id": user_data.get("id"),
                "action": action,  # "joined", "left", "typing", "stopped_typing"
                "cursor_position": user_data.get("cursor_position"),
                "selection": user_data.get("selection")
            },
            "timestamp": datetime.utcnow().isoformat()
        }
        await connection_manager.broadcast_to_room(message, room_id)

# Export the services
__all__ = [
    "ConnectionManager", 
    "connection_manager", 
    "NotificationService", 
    "MessageType"
]
