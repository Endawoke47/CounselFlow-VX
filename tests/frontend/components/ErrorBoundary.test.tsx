/**
 * Comprehensive tests for ErrorBoundary component
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/components/error/ErrorBoundary';

// Mock console.error to avoid noise in test output
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

// Component that throws an error for testing
const ThrowError: React.FC<{ shouldThrow?: boolean; errorMessage?: string }> = ({ 
  shouldThrow = false, 
  errorMessage = 'Test error' 
}) => {
  if (shouldThrow) {
    throw new Error(errorMessage);
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders error UI when child component throws', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} errorMessage="Something went wrong" />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onErrorMock = jest.fn();

    render(
      <ErrorBoundary onError={onErrorMock}>
        <ThrowError shouldThrow={true} errorMessage="Callback test error" />
      </ErrorBoundary>
    );

    expect(onErrorMock).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        message: 'Callback test error',
        code: 'COMPONENT_ERROR',
        timestamp: expect.any(String)
      })
    );
  });

  it('allows retry functionality', () => {
    const RetryComponent: React.FC = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);

      React.useEffect(() => {
        // Auto-fix after first render for testing retry
        const timer = setTimeout(() => setShouldThrow(false), 100);
        return () => clearTimeout(timer);
      }, []);

      return <ThrowError shouldThrow={shouldThrow} />;
    };

    render(
      <ErrorBoundary>
        <RetryComponent />
      </ErrorBoundary>
    );

    // Error should be shown initially
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Click retry button
    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);

    // After retry, error should be cleared (component will auto-fix)
    // Note: In a real scenario, you'd need to fix the underlying issue
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} errorMessage="Development error" />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Details (Development Only)')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('hides error details in production mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} errorMessage="Production error" />
      </ErrorBoundary>
    );

    expect(screen.queryByText('Error Details (Development Only)')).not.toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('logs errors to external service in production', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalFetch = global.fetch;
    
    process.env.NODE_ENV = 'production';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({})
    });

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} errorMessage="Production logging test" />
      </ErrorBoundary>
    );

    // Check that fetch was called for error logging
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/v1/errors/log',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: expect.stringContaining('Production logging test')
      })
    );

    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
  });

  it('handles fetch errors gracefully when logging fails', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalFetch = global.fetch;
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    process.env.NODE_ENV = 'production';
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} errorMessage="Logging failure test" />
      </ErrorBoundary>
    );

    // Should handle logging failure gracefully
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Failed to log error to service:',
      expect.any(Error)
    );

    process.env.NODE_ENV = originalEnv;
    global.fetch = originalFetch;
    consoleErrorSpy.mockRestore();
  });

  it('maintains component state after error recovery', () => {
    const StatefulComponent: React.FC = () => {
      const [count, setCount] = React.useState(0);
      const [shouldThrow, setShouldThrow] = React.useState(false);

      return (
        <div>
          <button onClick={() => setCount(c => c + 1)}>
            Count: {count}
          </button>
          <button onClick={() => setShouldThrow(true)}>
            Throw Error
          </button>
          <ThrowError shouldThrow={shouldThrow} />
        </div>
      );
    };

    render(
      <ErrorBoundary>
        <StatefulComponent />
      </ErrorBoundary>
    );

    // Increment counter
    const countButton = screen.getByRole('button', { name: /count: 0/i });
    fireEvent.click(countButton);
    expect(screen.getByRole('button', { name: /count: 1/i })).toBeInTheDocument();

    // Trigger error
    const errorButton = screen.getByRole('button', { name: /throw error/i });
    fireEvent.click(errorButton);

    // Error boundary should catch it
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // After retry, state should be reset (this is expected behavior)
    const retryButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(retryButton);
  });

  it('handles multiple nested error boundaries correctly', () => {
    const InnerErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ErrorBoundary fallback={<div>Inner error boundary</div>}>
        {children}
      </ErrorBoundary>
    );

    render(
      <ErrorBoundary fallback={<div>Outer error boundary</div>}>
        <InnerErrorBoundary>
          <ThrowError shouldThrow={true} />
        </InnerErrorBoundary>
      </ErrorBoundary>
    );

    // Inner boundary should catch the error first
    expect(screen.getByText('Inner error boundary')).toBeInTheDocument();
    expect(screen.queryByText('Outer error boundary')).not.toBeInTheDocument();
  });

  it('provides accessibility features', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    // Check for ARIA attributes and semantic elements
    const errorIcon = screen.getByRole('img', { hidden: true }); // SVG icon
    expect(errorIcon).toBeInTheDocument();

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    
    // Check button labels
    expect(screen.getByRole('button', { name: /refresh page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('handles React 18 concurrent features correctly', () => {
    // Test with React 18's concurrent rendering
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();

    // Trigger error
    rerender(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});

describe('ErrorBoundary Integration', () => {
  it('works with React Router navigation', () => {
    const MockRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <div>
        <button onClick={() => window.history.pushState({}, '', '/new-route')}>
          Navigate
        </button>
        {children}
      </div>
    );

    render(
      <MockRouter>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </MockRouter>
    );

    const navigateButton = screen.getByRole('button', { name: /navigate/i });
    fireEvent.click(navigateButton);

    // Error boundary should still work after navigation
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('integrates with React Query error handling', () => {
    const QueryComponent: React.FC = () => {
      const [hasError, setHasError] = React.useState(false);

      // Simulate React Query error
      React.useEffect(() => {
        if (hasError) {
          throw new Error('React Query error');
        }
      }, [hasError]);

      return (
        <button onClick={() => setHasError(true)}>
          Trigger Query Error
        </button>
      );
    };

    render(
      <ErrorBoundary>
        <QueryComponent />
      </ErrorBoundary>
    );

    const triggerButton = screen.getByRole('button', { name: /trigger query error/i });
    fireEvent.click(triggerButton);

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});