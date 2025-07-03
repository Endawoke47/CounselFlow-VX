"""
Compliance and Security Services
"""
from typing import List, Dict, Optional, Any
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import json
import logging

from ..models.compliance import (
    ComplianceFramework, ComplianceAssessment, ComplianceViolation,
    DataProcessingActivity, SecurityIncident
)
from ..core.security import SecurityManager

logger = logging.getLogger(__name__)

class ComplianceService:
    """Advanced compliance management service"""
    
    def __init__(self, db: Session, security_manager: SecurityManager):
        self.db = db
        self.security_manager = security_manager
    
    async def create_framework(self, framework_data: Dict[str, Any]) -> ComplianceFramework:
        """Create a new compliance framework"""
        framework = ComplianceFramework(**framework_data)
        self.db.add(framework)
        self.db.commit()
        self.db.refresh(framework)
        
        logger.info(f"Created compliance framework: {framework.name}")
        return framework
    
    async def assess_compliance(self, framework_id: str, entity: str, assessor_id: str) -> ComplianceAssessment:
        """Perform automated compliance assessment"""
        framework = self.db.query(ComplianceFramework).filter(
            ComplianceFramework.id == framework_id
        ).first()
        
        if not framework:
            raise ValueError(f"Framework {framework_id} not found")
        
        # Run automated assessment based on framework requirements
        assessment_results = await self._run_assessment(framework, entity)
        
        assessment = ComplianceAssessment(
            framework_id=framework_id,
            assessed_entity=entity,
            assessor_id=assessor_id,
            status="completed",
            score=assessment_results["score"],
            findings=assessment_results["findings"],
            recommendations=assessment_results["recommendations"],
            next_assessment_date=datetime.utcnow() + timedelta(days=365)
        )
        
        self.db.add(assessment)
        self.db.commit()
        self.db.refresh(assessment)
        
        # Create violations for failed checks
        await self._create_violations(assessment, assessment_results["violations"])
        
        logger.info(f"Completed compliance assessment for {entity}, score: {assessment.score}")
        return assessment
    
    async def _run_assessment(self, framework: ComplianceFramework, entity: str) -> Dict[str, Any]:
        """Run automated compliance assessment"""
        requirements = framework.requirements or {}
        findings = []
        violations = []
        score = 100
        
        # Sample assessment logic - in production, this would be much more sophisticated
        for req_id, requirement in requirements.items():
            check_result = await self._check_requirement(requirement, entity)
            findings.append({
                "requirement_id": req_id,
                "requirement": requirement,
                "status": check_result["status"],
                "evidence": check_result["evidence"],
                "gaps": check_result["gaps"]
            })
            
            if check_result["status"] != "compliant":
                score -= requirement.get("weight", 10)
                violations.append({
                    "requirement_id": req_id,
                    "violation_type": requirement.get("type", "unknown"),
                    "severity": requirement.get("severity", "medium"),
                    "description": check_result["gaps"]
                })
        
        recommendations = await self._generate_recommendations(violations)
        
        return {
            "score": max(0, score),
            "findings": findings,
            "violations": violations,
            "recommendations": recommendations
        }
    
    async def _check_requirement(self, requirement: Dict[str, Any], entity: str) -> Dict[str, Any]:
        """Check a specific compliance requirement"""
        # This is a simplified check - real implementation would integrate with systems
        return {
            "status": "compliant",  # or "non_compliant", "partial"
            "evidence": ["System documentation", "Policy review"],
            "gaps": []
        }
    
    async def _generate_recommendations(self, violations: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate remediation recommendations"""
        recommendations = []
        for violation in violations:
            recommendations.append({
                "violation_id": violation["requirement_id"],
                "priority": "high" if violation["severity"] == "critical" else "medium",
                "action": f"Address {violation['violation_type']} compliance gap",
                "timeline": "30 days" if violation["severity"] == "critical" else "90 days",
                "resources": ["Legal team", "IT security"]
            })
        return recommendations
    
    async def _create_violations(self, assessment: ComplianceAssessment, violations: List[Dict[str, Any]]):
        """Create violation records"""
        for violation_data in violations:
            violation = ComplianceViolation(
                assessment_id=assessment.id,
                violation_type=violation_data["violation_type"],
                severity=violation_data["severity"],
                description=violation_data["description"],
                status="open",
                due_date=datetime.utcnow() + timedelta(
                    days=30 if violation_data["severity"] == "critical" else 90
                )
            )
            self.db.add(violation)
        self.db.commit()
    
    async def create_data_processing_activity(self, activity_data: Dict[str, Any]) -> DataProcessingActivity:
        """Register a new data processing activity (GDPR Article 30)"""
        activity = DataProcessingActivity(**activity_data)
        self.db.add(activity)
        self.db.commit()
        self.db.refresh(activity)
        
        # Check if this activity requires DPIA
        if await self._requires_dpia(activity):
            logger.warning(f"Data processing activity {activity.activity_name} may require DPIA")
        
        return activity
    
    async def _requires_dpia(self, activity: DataProcessingActivity) -> bool:
        """Determine if Data Protection Impact Assessment is required"""
        high_risk_indicators = [
            "systematic monitoring",
            "large scale processing",
            "special categories",
            "criminal convictions",
            "biometric data",
            "genetic data"
        ]
        
        description = (activity.purpose or "").lower()
        data_categories = [cat.lower() for cat in (activity.data_categories or [])]
        
        for indicator in high_risk_indicators:
            if indicator in description or any(indicator in cat for cat in data_categories):
                return True
        
        return False
    
    async def report_security_incident(self, incident_data: Dict[str, Any]) -> SecurityIncident:
        """Report a security incident"""
        incident = SecurityIncident(**incident_data)
        self.db.add(incident)
        self.db.commit()
        self.db.refresh(incident)
        
        # Auto-assess if breach notification is required
        await self._assess_breach_notification(incident)
        
        logger.critical(f"Security incident reported: {incident.title}")
        return incident
    
    async def _assess_breach_notification(self, incident: SecurityIncident):
        """Assess if breach notification is required"""
        # GDPR Article 33 - 72 hour notification rule
        if incident.incident_type == "data_breach" and incident.affected_data:
            risk_level = await self._assess_breach_risk(incident)
            if risk_level in ["high", "medium"]:
                incident.notification_required = True
                self.db.commit()
                logger.warning(f"Breach notification required for incident {incident.id}")
    
    async def _assess_breach_risk(self, incident: SecurityIncident) -> str:
        """Assess the risk level of a data breach"""
        affected_data = incident.affected_data or {}
        data_volume = affected_data.get("volume", 0)
        data_sensitivity = affected_data.get("sensitivity", "low")
        
        if data_sensitivity == "high" or data_volume > 1000:
            return "high"
        elif data_sensitivity == "medium" or data_volume > 100:
            return "medium"
        else:
            return "low"
    
    async def get_compliance_dashboard(self, user_id: str) -> Dict[str, Any]:
        """Get compliance overview dashboard"""
        # Recent assessments
        recent_assessments = self.db.query(ComplianceAssessment).order_by(
            ComplianceAssessment.assessment_date.desc()
        ).limit(10).all()
        
        # Open violations
        open_violations = self.db.query(ComplianceViolation).filter(
            ComplianceViolation.status.in_(["open", "in_progress"])
        ).all()
        
        # Recent incidents
        recent_incidents = self.db.query(SecurityIncident).filter(
            SecurityIncident.reported_at > datetime.utcnow() - timedelta(days=30)
        ).all()
        
        # Calculate metrics
        avg_compliance_score = sum(a.score for a in recent_assessments) / len(recent_assessments) if recent_assessments else 0
        critical_violations = len([v for v in open_violations if v.severity == "critical"])
        
        return {
            "compliance_score": round(avg_compliance_score, 1),
            "open_violations": len(open_violations),
            "critical_violations": critical_violations,
            "recent_incidents": len(recent_incidents),
            "assessments": [
                {
                    "id": a.id,
                    "framework": a.framework.name if a.framework else "Unknown",
                    "entity": a.assessed_entity,
                    "score": a.score,
                    "date": a.assessment_date.isoformat()
                } for a in recent_assessments
            ],
            "violations": [
                {
                    "id": v.id,
                    "type": v.violation_type,
                    "severity": v.severity,
                    "description": v.description,
                    "due_date": v.due_date.isoformat() if v.due_date else None
                } for v in open_violations
            ]
        }
