"""
Enterprise Performance Monitoring and Optimization Service
Advanced monitoring, caching, and performance optimization for CounselFlow
"""
import asyncio
import time
import psutil
import logging
from typing import Dict, List, Any, Optional
from datetime import datetime, timedelta
from dataclasses import dataclass
from enum import Enum
import redis
import json

logger = logging.getLogger(__name__)

class MetricType(str, Enum):
    """Performance metric types"""
    RESPONSE_TIME = "response_time"
    THROUGHPUT = "throughput" 
    ERROR_RATE = "error_rate"
    MEMORY_USAGE = "memory_usage"
    CPU_USAGE = "cpu_usage"
    DATABASE_CONNECTIONS = "database_connections"
    CACHE_HIT_RATE = "cache_hit_rate"

@dataclass
class PerformanceMetric:
    """Performance metric data point"""
    metric_type: MetricType
    value: float
    timestamp: datetime
    labels: Dict[str, str]

@dataclass
class AlertThreshold:
    """Performance alert threshold"""
    metric_type: MetricType
    warning_threshold: float
    critical_threshold: float
    duration_minutes: int

class PerformanceMonitor:
    """Real-time performance monitoring system"""
    
    def __init__(self):
        self.metrics_buffer = []
        self.alert_thresholds = self._setup_default_thresholds()
        self.redis_client = None
        self._setup_redis()
    
    def _setup_redis(self):
        """Setup Redis connection for caching"""
        try:
            self.redis_client = redis.Redis(
                host='localhost',
                port=6379,
                db=1,
                decode_responses=True
            )
            self.redis_client.ping()
            logger.info("Redis connection established for performance monitoring")
        except Exception as e:
            logger.warning(f"Redis connection failed: {e}")
            self.redis_client = None
    
    def _setup_default_thresholds(self) -> Dict[MetricType, AlertThreshold]:
        """Setup default performance alert thresholds"""
        return {
            MetricType.RESPONSE_TIME: AlertThreshold(
                MetricType.RESPONSE_TIME, 500.0, 1000.0, 5
            ),
            MetricType.MEMORY_USAGE: AlertThreshold(
                MetricType.MEMORY_USAGE, 80.0, 90.0, 10
            ),
            MetricType.CPU_USAGE: AlertThreshold(
                MetricType.CPU_USAGE, 75.0, 90.0, 5
            ),
            MetricType.ERROR_RATE: AlertThreshold(
                MetricType.ERROR_RATE, 5.0, 10.0, 5
            )
        }
    
    async def collect_system_metrics(self) -> Dict[str, Any]:
        """Collect comprehensive system performance metrics"""
        metrics = {}
        
        # CPU metrics
        cpu_percent = psutil.cpu_percent(interval=1)
        metrics['cpu_usage'] = cpu_percent
        
        # Memory metrics
        memory = psutil.virtual_memory()
        metrics['memory_usage'] = memory.percent
        metrics['memory_available'] = memory.available / (1024**3)  # GB
        
        # Disk metrics
        disk = psutil.disk_usage('/')
        metrics['disk_usage'] = disk.percent
        metrics['disk_free'] = disk.free / (1024**3)  # GB
        
        # Network metrics
        network = psutil.net_io_counters()
        metrics['network_bytes_sent'] = network.bytes_sent
        metrics['network_bytes_recv'] = network.bytes_recv
        
        # Process metrics
        process = psutil.Process()
        metrics['process_memory'] = process.memory_info().rss / (1024**2)  # MB
        metrics['process_cpu'] = process.cpu_percent()
        
        return metrics
    
    async def collect_application_metrics(self) -> Dict[str, Any]:
        """Collect application-specific performance metrics"""
        metrics = {}
        
        # Database connection pool metrics (mock)
        metrics['db_active_connections'] = 12
        metrics['db_idle_connections'] = 8
        metrics['db_total_connections'] = 20
        
        # Cache metrics
        if self.redis_client:
            try:
                cache_info = self.redis_client.info()
                metrics['cache_connected_clients'] = cache_info.get('connected_clients', 0)
                metrics['cache_used_memory'] = cache_info.get('used_memory', 0) / (1024**2)  # MB
                metrics['cache_hit_rate'] = 95.2  # Mock value
            except:
                metrics['cache_hit_rate'] = 0
        
        # API metrics (mock)
        metrics['active_requests'] = 45
        metrics['requests_per_second'] = 23.7
        metrics['average_response_time'] = 245  # ms
        
        return metrics
    
    async def get_performance_dashboard(self) -> Dict[str, Any]:
        """Get comprehensive performance dashboard data"""
        system_metrics = await self.collect_system_metrics()
        app_metrics = await self.collect_application_metrics()
        
        return {
            "timestamp": datetime.utcnow().isoformat(),
            "system": system_metrics,
            "application": app_metrics,
            "status": self._calculate_overall_status(system_metrics, app_metrics),
            "alerts": self._check_alert_conditions(system_metrics, app_metrics)
        }
    
    def _calculate_overall_status(self, system_metrics: Dict, app_metrics: Dict) -> str:
        """Calculate overall system health status"""
        if (system_metrics['cpu_usage'] > 90 or 
            system_metrics['memory_usage'] > 90 or
            app_metrics['average_response_time'] > 1000):
            return "critical"
        elif (system_metrics['cpu_usage'] > 75 or 
              system_metrics['memory_usage'] > 80 or
              app_metrics['average_response_time'] > 500):
            return "warning"
        else:
            return "healthy"
    
    def _check_alert_conditions(self, system_metrics: Dict, app_metrics: Dict) -> List[Dict[str, Any]]:
        """Check for alert conditions"""
        alerts = []
        
        if system_metrics['cpu_usage'] > 75:
            alerts.append({
                "type": "cpu_high",
                "severity": "warning" if system_metrics['cpu_usage'] < 90 else "critical",
                "message": f"High CPU usage: {system_metrics['cpu_usage']:.1f}%",
                "timestamp": datetime.utcnow().isoformat()
            })
        
        if system_metrics['memory_usage'] > 80:
            alerts.append({
                "type": "memory_high",
                "severity": "warning" if system_metrics['memory_usage'] < 90 else "critical", 
                "message": f"High memory usage: {system_metrics['memory_usage']:.1f}%",
                "timestamp": datetime.utcnow().isoformat()
            })
        
        if app_metrics['average_response_time'] > 500:
            alerts.append({
                "type": "response_time_high",
                "severity": "warning" if app_metrics['average_response_time'] < 1000 else "critical",
                "message": f"High response time: {app_metrics['average_response_time']}ms",
                "timestamp": datetime.utcnow().isoformat()
            })
        
        return alerts

class CacheOptimizer:
    """Advanced caching optimization system"""
    
    def __init__(self):
        self.redis_client = None
        self._setup_redis()
    
    def _setup_redis(self):
        """Setup Redis connection"""
        try:
            self.redis_client = redis.Redis(
                host='localhost',
                port=6379,
                db=0,
                decode_responses=True
            )
            self.redis_client.ping()
        except Exception as e:
            logger.warning(f"Cache optimizer Redis connection failed: {e}")
    
    async def optimize_cache_performance(self) -> Dict[str, Any]:
        """Optimize cache performance and return metrics"""
        if not self.redis_client:
            return {"status": "redis_unavailable"}
        
        try:
            # Get cache statistics
            info = self.redis_client.info()
            
            # Calculate optimization recommendations
            used_memory_mb = info.get('used_memory', 0) / (1024**2)
            keyspace_hits = info.get('keyspace_hits', 0)
            keyspace_misses = info.get('keyspace_misses', 0)
            
            hit_rate = 0
            if keyspace_hits + keyspace_misses > 0:
                hit_rate = (keyspace_hits / (keyspace_hits + keyspace_misses)) * 100
            
            recommendations = []
            if hit_rate < 80:
                recommendations.append("Consider increasing cache TTL for frequently accessed data")
            if used_memory_mb > 100:
                recommendations.append("Review cache eviction policies")
            
            return {
                "status": "optimized",
                "metrics": {
                    "hit_rate": round(hit_rate, 2),
                    "used_memory_mb": round(used_memory_mb, 2),
                    "connected_clients": info.get('connected_clients', 0),
                    "total_commands_processed": info.get('total_commands_processed', 0)
                },
                "recommendations": recommendations
            }
            
        except Exception as e:
            logger.error(f"Cache optimization failed: {e}")
            return {"status": "error", "message": str(e)}

class DatabaseOptimizer:
    """Database performance optimization system"""
    
    async def analyze_query_performance(self) -> Dict[str, Any]:
        """Analyze database query performance"""
        # Mock query performance analysis
        return {
            "slow_queries": [
                {
                    "query": "SELECT * FROM contracts WHERE ...",
                    "avg_execution_time": 1.2,
                    "frequency": 156,
                    "recommendation": "Add index on contract_status column"
                },
                {
                    "query": "SELECT * FROM matters WHERE ...",
                    "avg_execution_time": 0.8,
                    "frequency": 89,
                    "recommendation": "Consider query optimization"
                }
            ],
            "connection_pool": {
                "active": 12,
                "idle": 8,
                "total": 20,
                "max": 50,
                "utilization": 40.0
            },
            "recommendations": [
                "Add composite index on (user_id, created_at)",
                "Consider partitioning large tables",
                "Review connection pool size"
            ]
        }

class EnterpriseOptimizationService:
    """Comprehensive enterprise optimization service"""
    
    def __init__(self):
        self.performance_monitor = PerformanceMonitor()
        self.cache_optimizer = CacheOptimizer()
        self.database_optimizer = DatabaseOptimizer()
    
    async def get_optimization_report(self) -> Dict[str, Any]:
        """Get comprehensive optimization report"""
        performance_data = await self.performance_monitor.get_performance_dashboard()
        cache_data = await self.cache_optimizer.optimize_cache_performance()
        db_data = await self.database_optimizer.analyze_query_performance()
        
        return {
            "generated_at": datetime.utcnow().isoformat(),
            "overall_status": performance_data["status"],
            "performance": performance_data,
            "cache_optimization": cache_data,
            "database_optimization": db_data,
            "recommendations": self._generate_optimization_recommendations(
                performance_data, cache_data, db_data
            )
        }
    
    def _generate_optimization_recommendations(
        self, 
        performance_data: Dict, 
        cache_data: Dict, 
        db_data: Dict
    ) -> List[str]:
        """Generate optimization recommendations"""
        recommendations = []
        
        # Performance recommendations
        if performance_data["system"]["cpu_usage"] > 75:
            recommendations.append("Consider scaling horizontally or optimizing CPU-intensive operations")
        
        if performance_data["system"]["memory_usage"] > 80:
            recommendations.append("Optimize memory usage or increase available memory")
        
        # Cache recommendations
        if cache_data.get("metrics", {}).get("hit_rate", 0) < 80:
            recommendations.append("Improve cache hit rate by optimizing caching strategy")
        
        # Database recommendations
        recommendations.extend(db_data.get("recommendations", []))
        
        return recommendations
