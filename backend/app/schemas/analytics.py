"""
Analytics Schemas for CounselFlow Legal Support
Pydantic models for legal analytics and business intelligence
"""
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class LegalAnalyticsRequest(BaseModel):
    """Request model for legal analytics"""
    time_period: str = Field("30d", description="Time period for analytics (30d, 90d, 1y)")
    metric_types: List[str] = Field(["all"], description="Types of metrics to include")
    firm_id: Optional[str] = Field(None, description="Firm ID for analytics")

class PerformanceMetrics(BaseModel):
    """Performance metrics model"""
    financial_metrics: Dict[str, Any]
    efficiency_metrics: Dict[str, Any]
    risk_metrics: Dict[str, Any]
    ai_performance: Dict[str, Any]

class PredictiveInsight(BaseModel):
    """Predictive insight model"""
    insight_type: str
    prediction: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    impact: str = Field(..., description="Impact level: low, medium, high, critical")
    recommended_actions: List[str]

class PredictiveInsights(BaseModel):
    """Collection of predictive insights"""
    insights: List[PredictiveInsight]
    generated_at: datetime
    confidence_threshold: float = 0.7

class CostAnalysis(BaseModel):
    """Cost analysis model"""
    total_legal_spend: float
    cost_per_matter: float
    technology_roi: float
    cost_optimization_percentage: float
    period_comparison: Dict[str, float]

class ROIMetrics(BaseModel):
    """Return on Investment metrics"""
    technology_investment: float
    cost_savings: float
    time_savings_hours: float
    productivity_improvement: float
    net_roi_percentage: float

class Recommendation(BaseModel):
    """Actionable recommendation model"""
    category: str
    title: str
    description: str
    priority: str = Field(..., description="Priority: low, medium, high, critical")
    estimated_impact: str
    implementation_effort: str = Field(..., description="Effort: low, medium, high")

class LegalAnalyticsResponse(BaseModel):
    """Complete legal analytics response"""
    time_period: str
    generated_at: datetime
    financial_metrics: Dict[str, Any]
    efficiency_metrics: Dict[str, Any]
    risk_metrics: Dict[str, Any]
    ai_performance: Dict[str, Any]
    predictive_insights: List[PredictiveInsight]
    recommendations: List[Recommendation]
    
class AIPerformanceMetrics(BaseModel):
    """AI performance tracking model"""
    accuracy_scores: Dict[str, float]
    adoption_rates: Dict[str, float]
    time_savings_hours: float
    user_satisfaction_score: float
    total_interactions: int
    growth_rate: float

class ComplianceMetrics(BaseModel):
    """Compliance performance metrics"""
    overall_score: float = Field(..., ge=0.0, le=100.0)
    framework_scores: Dict[str, float]
    violations_count: int
    remediation_time_avg: float
    trend: str = Field(..., description="Trend: improving, stable, declining")

class RiskAnalytics(BaseModel):
    """Risk analytics model"""
    risk_distribution: Dict[str, int]
    mitigation_effectiveness: float
    high_priority_risks: int
    trend_analysis: Dict[str, Any]
    predictive_risk_score: float

class MatterAnalytics(BaseModel):
    """Matter management analytics"""
    total_matters: int
    resolution_time_avg: float
    success_rate: float
    cost_per_matter: float
    trending_categories: List[str]

class ContractAnalytics(BaseModel):
    """Contract management analytics"""
    contracts_processed: int
    average_cycle_time: float
    automation_rate: float
    risk_score_distribution: Dict[str, int]
    template_usage: Dict[str, int]

class FinancialAnalytics(BaseModel):
    """Financial performance analytics"""
    legal_spend_total: float
    budget_variance: float
    cost_per_hour: float
    external_counsel_spend: float
    efficiency_savings: float

class BenchmarkComparison(BaseModel):
    """Industry benchmark comparison"""
    metric_name: str
    firm_value: float
    industry_average: float
    percentile_rank: int
    comparison_trend: str

class ExecutiveSummary(BaseModel):
    """Executive summary model"""
    key_insights: List[str]
    performance_highlights: List[str]
    areas_for_improvement: List[str]
    strategic_recommendations: List[str]
    roi_summary: ROIMetrics

class LegalTrendAnalysis(BaseModel):
    """Legal trend analysis model"""
    trend_type: str
    trend_description: str
    impact_assessment: str
    timeline: str
    preparation_recommendations: List[str]
