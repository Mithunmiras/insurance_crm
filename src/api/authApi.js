// Import mock authentication for demo
import { mockLoginUser } from './mockAuthApi';

// Toggle between mock and real API
const USE_MOCK_API = true; // Set to false when connecting to real backend
const API_BASE_URL = 'http://localhost:8000/user';

export const loginUser = async (credentials) => {
  // Use mock API for demo/development
  if (USE_MOCK_API) {
    console.log('Using mock authentication');
    return await mockLoginUser(credentials);
  }
  
  // Real API implementation (for production)
  try {
    console.log('Sending login request:', credentials);
    const response = await fetch(`${API_BASE_URL}/accountLogin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const data = await response.json();
    console.log('Login response:', data);
    console.log('Response data structure:', JSON.stringify(data, null, 2));
    console.log('Permissions from API:', data.data.user.permissions);
    console.log('Permissions count:', data.data.user.permissions?.length);
    
    if (!response.ok || data.code !== 100) {
      throw new Error(data.message || 'Login failed');
    }

    const userRole = data.data.user.userName.userType || 'doctor';
    console.log('Extracted user role:', userRole);

    return {
      token: data.data.accessToken,
      user: {
        id: data.data.user.userName._id,
        name: data.data.user.userName.fullName || data.data.user.userName.userName,
        email: data.data.user.userName.userName,
        role: userRole,
        permissions: data.data.user.userName.roleId?.permission || []
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};
