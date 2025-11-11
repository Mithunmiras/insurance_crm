// Mock users for testing - Insurance CRM Pro
const mockUsers = [
  {
    id: '1',
    name: 'Admin Manager',
    email: 'admin@insurancecrm.com',
    password: 'InsureCRM@2025',
    role: 'superAdmin',
    permissions: [
      { label: 'Dashboard', enable: true },
      { label: 'Life Insurance', enable: true },
      { label: 'Clients', enable: true },
      { label: 'Leads', enable: true },
      { label: 'Quotes', enable: true },
      { label: 'All Policies', enable: true },
      { label: 'Claims', enable: true },
      { label: 'Payments', enable: true },
      { label: 'Agents', enable: true },
      { label: 'Tasks', enable: true },
      { label: 'Documents', enable: true },
      { label: 'Reports', enable: true },
      { label: 'User Management', enable: true },
      { label: 'Branch Management', enable: true },
      { label: 'Settings', enable: true }
    ]
  },
  {
    id: '2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@insurancecrm.com',
    password: 'BranchHead@123',
    role: 'branchHead',
    permissions: [
      { label: 'Dashboard', enable: true },
      { label: 'Life Insurance', enable: true },
      { label: 'Clients', enable: true },
      { label: 'Leads', enable: true },
      { label: 'Quotes', enable: true },
      { label: 'All Policies', enable: true },
      { label: 'Claims', enable: true },
      { label: 'Payments', enable: true },
      { label: 'Agents', enable: true },
      { label: 'Tasks', enable: true },
      { label: 'Documents', enable: true },
      { label: 'Reports', enable: true }
    ]
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert.johnson@insurancecrm.com',
    password: 'Agent@2025',
    role: 'staff',
    permissions: [
      { label: 'Dashboard', enable: true },
      { label: 'Life Insurance', enable: true },
      { label: 'Clients', enable: true },
      { label: 'Leads', enable: true },
      { label: 'Quotes', enable: true },
      { label: 'Tasks', enable: true },
      { label: 'Documents', enable: true }
    ]
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@insurancecrm.com',
    password: 'Customer@123',
    role: 'customer',
    permissions: [
      { label: 'Dashboard', enable: true },
      { label: 'All Policies', enable: true },
      { label: 'Documents', enable: true }
    ]
  },
  {
    id: '5',
    name: 'Michael Chen',
    email: 'michael.chen@insurancecrm.com',
    password: 'Agent@456',
    role: 'doctor',
    permissions: [
      { label: 'Dashboard', enable: true },
      { label: 'Life Insurance', enable: true },
      { label: 'Clients', enable: true },
      { label: 'Documents', enable: true },
      { label: 'Reports', enable: true }
    ]
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
      role: user.role,
      permissions: user.permissions
    }
  };
};