import { PUBLIC_API_URL } from '$env/static/public';
import { goto } from '$app/navigation';
import { browser } from '$app/environment';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ApiError {
  statusCode: number;
  message:    string;
  error:      string;
  requestId:  string;
}

export class ApiException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message:    string,
    public readonly error:      string,
    public readonly requestId:  string,
  ) {
    super(message);
    this.name = 'ApiException';
  }
}

type SvelteKitFetch = typeof fetch;

interface RequestOptions<TBody = unknown> {
  method?:  'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?:    TBody;
  headers?: Record<string, string>;
  fetch?:   SvelteKitFetch;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isApiError(data: unknown): data is ApiError {
  return (
    typeof data === 'object' &&
    data !== null &&
    'statusCode' in data &&
    'message'    in data &&
    'error'      in data &&
    'requestId'  in data
  );
}

// ─── Refresh state ───────────────────────────────────────────────────────────

let isRefreshing = false;

async function attemptRefresh(fetchFn: SvelteKitFetch): Promise<boolean> {
  if (isRefreshing) return false;
  isRefreshing = true;

  try {
    const response = await fetchFn(`${PUBLIC_API_URL}/api/v1/auth/refresh`, {
      method:      'POST',
      credentials: 'include',
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    isRefreshing = false;
  }
}

// ─── Core request function ───────────────────────────────────────────────────

async function request<TResponse, TBody = unknown>(
  path:    string,
  options: RequestOptions<TBody> = {},
  isRetry  = false,
): Promise<TResponse> {
  const {
    method  = 'GET',
    body,
    headers = {},
    fetch:  fetchFn = fetch,
  } = options;

  const response = await fetchFn(`${PUBLIC_API_URL}${path}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  // ── 401 handling with one refresh attempt ──
  if (response.status === 401 && !isRetry) {
    const refreshed = await attemptRefresh(fetchFn);

    if (refreshed) {
      return request<TResponse, TBody>(path, options, true);
    }

    if (browser) {
      await goto('/login');
    }

    throw new ApiException(401, 'Sesión expirada', 'Unauthorized', '');
  }

  // ── Parse response ──
  let data: unknown;

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  // ── Error responses ──
  if (!response.ok) {
    if (isApiError(data)) {
      throw new ApiException(
        data.statusCode,
        data.message,
        data.error,
        data.requestId,
      );
    }

    throw new ApiException(
      response.status,
      'Error inesperado',
      response.statusText,
      '',
    );
  }

  return data as TResponse;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export const apiClient = {
  get<TResponse>(
    path:    string,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<TResponse> {
    return request<TResponse>(path, { ...options, method: 'GET' });
  },

  post<TResponse, TBody = unknown>(
    path:    string,
    body?:   TBody,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<TResponse> {
    return request<TResponse, TBody>(path, { ...options, method: 'POST', body });
  },

  put<TResponse, TBody = unknown>(
    path:    string,
    body?:   TBody,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<TResponse> {
    return request<TResponse, TBody>(path, { ...options, method: 'PUT', body });
  },

  patch<TResponse, TBody = unknown>(
    path:    string,
    body?:   TBody,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<TResponse> {
    return request<TResponse, TBody>(path, { ...options, method: 'PATCH', body });
  },

  delete<TResponse>(
    path:    string,
    options: Omit<RequestOptions, 'method' | 'body'> = {},
  ): Promise<TResponse> {
    return request<TResponse>(path, { ...options, method: 'DELETE' });
  },
} as const;