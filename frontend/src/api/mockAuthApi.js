// Mock users for testing - Insurance CRM Pro
const mockUsers = [
  {
    id: '1',
    name: 'Admin Manager',
    email: 'admin@insurancecrm.com',
    password: 'InsureCRM@2025',
    role: 'superAdmin'
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@insurancecrm.com',
    password: 'BranchHead@123',
    role: 'branchHead'
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@insurancecrm.com',
    password: 'Agent@2025',
    role: 'staff'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@insurancecrm.com',
    password: 'Customer@123',
    role: 'customer'
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael.chen@insurancecrm.com',
    password: 'Agent@456',
    role: 'doctor'
  }
];

// Generate a simple JWT-like token (for demo purposes)
const generateToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({
    userId: user.id,
    role: user.role,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
  }));
  const signature = btoa('mock-signature');
  return `${header}.${payload}.${signature}`;
};

export const mockLoginUser = async (credentials) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = mockUsers.find(u => 
    u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  };
};