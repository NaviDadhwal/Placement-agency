const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchApi<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add auth header if accessToken is in localStorage
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: options.credentials || 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data?.error?.message || data?.message || 'An unexpected error occurred.';
    const error = new Error(errorMessage) as any;
    error.status = response.status;
    error.code = data?.error?.code;
    error.details = data?.error?.details;
    throw error;
  }

  return data;
}

export const apiClient = {
  // Public Lead Submissions
  submitCandidateLead: (payload: any) =>
    fetchApi('/leads/candidate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  submitEmployerLead: (payload: any) =>
    fetchApi('/leads/employer', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  checkCandidateStatus: (phone: string) =>
    fetchApi('/leads/status', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    }),

  // Resume Upload Token
  getUploadToken: (fileName: string, fileType: string) =>
    fetchApi('/uploads/token', {
      method: 'POST',
      body: JSON.stringify({ fileName, fileType }),
    }),

  // Admin Auth
  loginAdmin: (credentials: { email: string; password: string }) =>
    fetchApi('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getAdminProfile: () =>
    fetchApi('/auth/me', {
      method: 'GET',
    }),

  logoutAdmin: () =>
    fetchApi('/auth/logout', {
      method: 'POST',
    }),

  // Protected Admin Lead Management
  getCandidates: (query: string = '') =>
    fetchApi(`/admin/candidates${query ? `?${query}` : ''}`, {
      method: 'GET',
    }),

  updateCandidateStatus: (id: string, payload: any) =>
    fetchApi(`/admin/candidates/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  getEmployers: (query: string = '') =>
    fetchApi(`/admin/employers${query ? `?${query}` : ''}`, {
      method: 'GET',
    }),

  updateEmployerStatus: (id: string, payload: any) =>
    fetchApi(`/admin/employers/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};
