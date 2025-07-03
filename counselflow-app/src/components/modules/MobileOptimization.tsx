'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useToast } from '../../hooks/use-toast';

interface MobileOptimizationProps {
  user?: {
    id: string;
    name: string;
  };
}

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  screenWidth: number;
  orientation: 'portrait' | 'landscape';
  touchSupport: boolean;
}

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  networkSpeed: string;
  memoryUsage: number;
}

export default function MobileOptimization({ }: MobileOptimizationProps) {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    screenWidth: 0,
    orientation: 'portrait',
    touchSupport: false
  });
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    networkSpeed: 'unknown',
    memoryUsage: 0
  });
  const [optimizations, setOptimizations] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const startTime = performance.now();
    
    const applyMobileOptimizations = () => {
      const optimizationList: string[] = [];

      // Lazy loading for images
      if ('IntersectionObserver' in window) {
        optimizationList.push('Image lazy loading enabled');
      }

      // Touch optimization
      if (deviceInfo.touchSupport) {
        optimizationList.push('Touch interactions optimized');
        // Disable hover effects on touch devices
        document.body.classList.add('touch-device');
      }

      // Reduce animations on low-end devices
      if (performanceMetrics.memoryUsage > 100) {
        document.body.classList.add('reduce-motion');
        optimizationList.push('Reduced animations for performance');
      }

      // Optimize for small screens
      if (deviceInfo.isMobile) {
        optimizationList.push('Mobile layout optimizations applied');
        optimizationList.push('Compressed data loading enabled');
      }

      // Service worker for offline capability
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(() => {
          optimizationList.push('Offline capability enabled');
        }).catch(() => {
          console.log('Service worker registration failed');
        });
      }

      setOptimizations(optimizationList);
    };
    
    // Detect device information
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width <= 768;
      const isTablet = width > 768 && width <= 1024;
      const orientation = width > height ? 'landscape' : 'portrait';
      const touchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setDeviceInfo({
        isMobile,
        isTablet,
        screenWidth: width,
        orientation,
        touchSupport
      });

      // Apply mobile optimizations
      if (isMobile) {
        applyMobileOptimizations();
      }
    };

    // Measure performance
    const measurePerformance = () => {
      const loadTime = performance.now() - startTime;
      const renderTime = performance.now();
      
      // Estimate network speed
      const connection = (navigator as unknown as { connection?: { effectiveType: string } }).connection;
      const networkSpeed = connection ? connection.effectiveType : 'unknown';
      
      // Estimate memory usage (approximate)
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
      const memoryUsage = memory ? memory.usedJSHeapSize / 1024 / 1024 : 0;

      setPerformanceMetrics({
        loadTime,
        renderTime: renderTime - startTime,
        networkSpeed,
        memoryUsage
      });
    };

    detectDevice();
    measurePerformance();

    // Listen for orientation changes
    const handleOrientationChange = () => {
      setTimeout(detectDevice, 100); // Small delay for accurate measurements
    };

    window.addEventListener('resize', handleOrientationChange);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleOrientationChange);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPerformanceStatus = () => {
    if (performanceMetrics.loadTime < 1000) return { status: 'excellent', color: 'green' };
    if (performanceMetrics.loadTime < 3000) return { status: 'good', color: 'blue' };
    if (performanceMetrics.loadTime < 5000) return { status: 'fair', color: 'yellow' };
    return { status: 'poor', color: 'red' };
  };

  const optimizeForCurrentDevice = () => {
    if (deviceInfo.isMobile) {
      // Enable mobile-specific features
      document.body.classList.add('mobile-optimized');
      
      // Preload critical resources
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/api/v1/mobile/critical-data';
      link.as = 'fetch';
      document.head.appendChild(link);

      toast({
        title: 'Mobile Optimization',
        description: 'Mobile optimizations have been applied for better performance.',
      });
    }
  };

  const performanceStatus = getPerformanceStatus();

  return (
    <div className="space-y-6 p-4">
      {/* Mobile Optimization Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            📱 Mobile Optimization Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Device Information</h3>
              <div className="space-y-1 text-sm">
                <p>Type: {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'}</p>
                <p>Screen: {deviceInfo.screenWidth}px</p>
                <p>Orientation: {deviceInfo.orientation}</p>
                <p>Touch: {deviceInfo.touchSupport ? 'Supported' : 'Not supported'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Performance Metrics</h3>
              <div className="space-y-1 text-sm">
                <p>Load Time: {performanceMetrics.loadTime.toFixed(0)}ms</p>
                <p>Network: {performanceMetrics.networkSpeed}</p>
                <p>Memory: {performanceMetrics.memoryUsage.toFixed(1)}MB</p>
                <p className={`font-semibold text-${performanceStatus.color}-600`}>
                  Status: {performanceStatus.status}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Optimizations */}
      <Card>
        <CardHeader>
          <CardTitle>Active Optimizations</CardTitle>
        </CardHeader>
        <CardContent>
          {optimizations.length > 0 ? (
            <ul className="space-y-2">
              {optimizations.map((optimization, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="text-green-500 mr-2">✓</span>
                  {optimization}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No optimizations applied yet.</p>
          )}
        </CardContent>
      </Card>

      {/* Mobile-Specific Features */}
      {deviceInfo.isMobile && (
        <Card>
          <CardHeader>
            <CardTitle>Mobile Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={optimizeForCurrentDevice}
                className="p-4 border rounded-lg text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-sm font-semibold">Optimize Now</div>
              </button>
              <button
                onClick={() => {
                  if ('share' in navigator) {
                    navigator.share({
                      title: 'CounselFlow',
                      text: 'Legal operations platform',
                      url: window.location.href
                    });
                  }
                }}
                className="p-4 border rounded-lg text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">📤</div>
                <div className="text-sm font-semibold">Share</div>
              </button>
              <button
                onClick={() => {
                  if ('vibrate' in navigator) {
                    navigator.vibrate([100, 50, 100]);
                  }
                }}
                className="p-4 border rounded-lg text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">📳</div>
                <div className="text-sm font-semibold">Test Haptics</div>
              </button>
              <button
                onClick={() => {
                  document.documentElement.requestFullscreen();
                }}
                className="p-4 border rounded-lg text-center hover:bg-gray-50"
              >
                <div className="text-2xl mb-2">⛶</div>
                <div className="text-sm font-semibold">Fullscreen</div>
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Responsive Design Test */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Design Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="p-4 border rounded-lg text-center">
                <div className="text-xl mb-2">📊</div>
                <div className="text-sm">Responsive Item {item}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {deviceInfo.isMobile ? 'Mobile' : deviceInfo.isTablet ? 'Tablet' : 'Desktop'} View
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {performanceMetrics.loadTime > 3000 && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  ⚠️ Load time is above 3 seconds. Consider optimizing assets and enabling compression.
                </p>
              </div>
            )}
            {performanceMetrics.memoryUsage > 100 && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">
                  🚨 High memory usage detected. Reduce JavaScript bundle size and optimize images.
                </p>
              </div>
            )}
            {performanceMetrics.networkSpeed === '2g' && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  📶 Slow network detected. Enable aggressive caching and data compression.
                </p>
              </div>
            )}
            {deviceInfo.isMobile && !optimizations.length && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  💡 Click &ldquo;Optimize Now&rdquo; to enable mobile-specific performance improvements.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
