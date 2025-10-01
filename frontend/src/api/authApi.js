const API_BASE_URL = 'http://localhost:8000/user';

export const loginUser = async (credentials) => {
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
    
    if (!response.ok || (data.data && data.data.responseCode !== 200)) {
      throw new Error(data.data?.message || data.message || 'Login failed');
    }

    const userRole = data.data.user.username.userType || 'doctor';
    console.log('Extracted user role:', userRole);

    return {
      token: data.data.accessToken.accessToken,
      user: {
        id: data.data.user.username._id,
        name: data.data.user.username.fullName,
        email: data.data.user.username.email,
        role: userRole,
        permissions: data.data.user.permissions || []
      }
    };
  } catch (error) {
    throw new Error(error.message || 'Network error');
  }
};