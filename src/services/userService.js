const API_BASE_URL = 'http://localhost:8000/api';

export const userService = {
  async getUsers(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/users?${queryString}`);
    return response.json();
  },

  async getRoles() {
    const response = await fetch(`${API_BASE_URL}/roles`);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to fetch roles');
    }
    
    return result;
  },

  async createUser(userData) {
    console.log('userService.createUser called with:', userData);
    const response = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const result = await response.json();
    console.log('userService.createUser response:', result);
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to create user');
    }
    
    return result;
  },

  async updateUser(id, userData) {
    console.log('userService.updateUser called with ID:', id, 'Data:', userData);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    
    const result = await response.json();
    console.log('userService.updateUser response:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to update user');
    }
    
    return result;
  },

  async deleteUsers(ids) {
    console.log('userService.deleteUsers called with:', ids);
    console.log('Making DELETE request to:', `${API_BASE_URL}/users/bulk-delete`);
    const response = await fetch(`${API_BASE_URL}/users/bulk-delete`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    });
    
    const result = await response.json();
    console.log('Delete response:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to delete users');
    }
    
    return result;
  },

  async getDepartments() {
    const response = await fetch(`${API_BASE_URL}/departments`);
    return response.json();
  },

  async getManagers() {
    const response = await fetch(`${API_BASE_URL}/managers`);
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    return response.json();
  },

  async toggleUserStatus(id) {
    console.log('Toggling status for user ID:', id);
    const response = await fetch(`${API_BASE_URL}/users/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    console.log('Toggle status response:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to toggle user status');
    }
    
    return result;
  },

  async resetPasswordAttempts(userId) {
    console.log('Resetting password attempts for user:', userId);
    const response = await fetch(`${API_BASE_URL}/users/${userId}/reset-attempts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    console.log('Reset password attempts response:', result);
    
    if (!response.ok) {
      throw new Error(result.error || 'Failed to reset password attempts');
    }
    
    return result;
  }
};