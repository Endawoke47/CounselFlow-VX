/**
 * Test setup configuration for CounselFlow frontend tests
 */

import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import 'whatwg-fetch';

// Configure testing library
configure({
  testIdAttribute: 'data-testid',
  asyncUtilTimeout: 5000,
});

// Mock API server for testing
export const server = setupServer(
  // Auth endpoints
  rest.post('/api/v1/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          access_token: 'mock-access-token',
          refresh_token: 'mock-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'attorney'
          }
        }
      })
    );
  }),

  rest.post('/api/v1/auth/register', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: 'User registered successfully'
      })
    );
  }),

  rest.get('/api/v1/auth/me', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(
        ctx.status(401),
        ctx.json({
          success: false,
          message: 'Unauthorized'
        })
      );
    }

    return res(
      ctx.json({
        success: true,
        data: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'attorney'
        }
      })
    );
  }),

  // Contracts endpoints
  rest.get('/api/v1/contracts', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const limit = req.url.searchParams.get('limit') || '10';
    
    return res(
      ctx.json({
        success: true,
        data: [
          {
            id: '1',
            title: 'Software License Agreement',
            description: 'Enterprise software licensing agreement',
            contractType: 'service_agreement',
            status: 'active',
            clientEntity: 'Acme Corp Ltd',
            counterparty: 'Microsoft Corporation',
            startDate: '2024-01-01',
            endDate: '2024-12-31',
            value: 50000,
            currency: 'USD',
            owner: 'Sarah Johnson',
            assignedLawyer: 'John Doe',
            tags: ['software', 'licensing'],
            priority: 'medium',
            riskLevel: 'low',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            createdBy: '1',
            updatedBy: '1'
          }
        ],
        meta: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 1,
          totalPages: 1
        }
      })
    );
  }),

  rest.post('/api/v1/contracts', (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        success: true,
        data: {
          id: '2',
          ...req.body,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: '1',
          updatedBy: '1'
        }
      })
    );
  }),

  rest.get('/api/v1/contracts/:id', (req, res, ctx) => {
    const { id } = req.params;
    
    return res(
      ctx.json({
        success: true,
        data: {
          id,
          title: 'Software License Agreement',
          description: 'Enterprise software licensing agreement',
          contractType: 'service_agreement',
          status: 'active',
          clientEntity: 'Acme Corp Ltd',
          counterparty: 'Microsoft Corporation',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          value: 50000,
          currency: 'USD',
          owner: 'Sarah Johnson',
          assignedLawyer: 'John Doe',
          tags: ['software', 'licensing'],
          priority: 'medium',
          riskLevel: 'low',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-01T00:00:00Z',
          createdBy: '1',
          updatedBy: '1'
        }
      })
    );
  }),

  // Health check
  rest.get('/health', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
      })
    );
  }),

  // Error logging endpoint
  rest.post('/api/v1/errors/log', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        message: 'Error logged successfully'
      })
    );
  }),

  // Analytics endpoints
  rest.get('/api/v1/analytics/dashboard', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          totalMatters: 125,
          activeContracts: 89,
          pendingTasks: 23,
          overdueItems: 5,
          revenueThisMonth: 125000,
          billableHours: 2340,
          clientSatisfaction: 4.7,
          averageResponseTime: 2.3
        }
      })
    );
  })
);

// Establish API mocking before all tests
beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'warn'
  });
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests
afterEach(() => {
  server.resetHandlers();
});

// Clean up after the tests are finished
afterAll(() => {
  server.close();
});

// Mock window.location for tests
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
    assign: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn()
  },
  writable: true
});

// Mock window.history for navigation tests
Object.defineProperty(window, 'history', {
  value: {
    pushState: jest.fn(),
    replaceState: jest.fn(),
    go: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    length: 1,
    state: {}
  },
  writable: true
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
});

// Mock navigator for online/offline tests
Object.defineProperty(navigator, 'onLine', {
  writable: true,
  value: true
});

// Mock IntersectionObserver for lazy loading tests
global.IntersectionObserver = class IntersectionObserver {
  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    this.callback = callback;
    this.options = options;
  }

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// Mock ResizeObserver for responsive tests
global.ResizeObserver = class ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  callback: ResizeObserverCallback;
  
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
};

// Mock matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock HTMLCanvasElement.getContext for chart tests
HTMLCanvasElement.prototype.getContext = jest.fn().mockReturnValue({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => []),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
});

// Global test utilities
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'attorney' as const,
  department: 'Legal',
  isActive: true,
  securityClearanceLevel: 'confidential' as const,
  mfaEnabled: false,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  createdBy: '1',
  updatedBy: '1'
};

export const mockContract = {
  id: '1',
  title: 'Software License Agreement',
  description: 'Enterprise software licensing agreement',
  contractType: 'service_agreement' as const,
  status: 'active' as const,
  clientEntity: 'Acme Corp Ltd',
  counterparty: 'Microsoft Corporation',
  startDate: '2024-01-01',
  endDate: '2024-12-31',
  value: 50000,
  currency: 'USD',
  owner: 'Sarah Johnson',
  assignedLawyer: 'John Doe',
  tags: ['software', 'licensing'],
  priority: 'medium' as const,
  riskLevel: 'low' as const,
  documentUrls: [],
  notes: '',
  customFields: {},
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  createdBy: '1',
  updatedBy: '1'
};

// Test wrapper for providers
export const createTestWrapper = (initialProps = {}) => {
  return ({ children }: { children: React.ReactNode }) => (
    <div>
      {children}
    </div>
  );
};

// Custom render function with providers
export const renderWithProviders = (
  ui: React.ReactElement,
  options = {}
) => {
  const Wrapper = createTestWrapper();
  return render(ui, { wrapper: Wrapper, ...options });
};

// Re-export everything from testing library
export * from '@testing-library/react';
export { render as originalRender } from '@testing-library/react';