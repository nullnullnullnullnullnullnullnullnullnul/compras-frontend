import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ApiException } from '$lib/services/api/client';

// Mock $app/navigation and $app/environment
vi.mock('$app/navigation', () => ({ goto: vi.fn() }));
vi.mock('$app/environment', () => ({ browser: false }));
vi.mock('$env/static/public', () => ({ PUBLIC_API_URL: 'http://localhost:3000' }));

// Helper to create a mock fetch response
function mockResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('ApiException', () => {
  it('should store all error fields', () => {
    const err = new ApiException(404, 'Not found', 'NotFound', 'req-123');
    expect(err.statusCode).toBe(404);
    expect(err.message).toBe('Not found');
    expect(err.error).toBe('NotFound');
    expect(err.requestId).toBe('req-123');
    expect(err.name).toBe('ApiException');
  });
});

describe('apiClient', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns parsed JSON on success', async () => {
    const { apiClient } = await import('$lib/services/api/client');
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ id: 1, name: 'Disco' }));

    const result = await apiClient.get<{ id: number; name: string }>(
      '/api/v1/supermercados',
      { fetch: fetchMock },
    );

    expect(result).toEqual({ id: 1, name: 'Disco' });
  });

  it('throws ApiException on error response', async () => {
    const { apiClient } = await import('$lib/services/api/client');
    const fetchMock = vi.fn().mockResolvedValue(
      mockResponse(
        { statusCode: 404, message: 'No encontrado', error: 'NotFound', requestId: 'abc' },
        404,
      ),
    );

    await expect(
      apiClient.get('/api/v1/productos/999', { fetch: fetchMock }),
    ).rejects.toThrow(ApiException);
  });

  it('sends credentials: include on every request', async () => {
    const { apiClient } = await import('$lib/services/api/client');
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({}));

    await apiClient.get('/api/v1/test', { fetch: fetchMock });

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ credentials: 'include' }),
    );
  });
});