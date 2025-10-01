import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Button, Badge, Input } from 'antd';
import { motion } from 'framer-motion';
import { 
  UserOutlined, 
  LogoutOutlined, 
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Search } = Input;

const Header = ({ collapsed, onToggle }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleDisplayName = (role) => {
    const roleMap = {
      'super_admin': 'Super Administrator',
      'admin': 'Administrator',
      'branch_head': 'Branch Head',
      'doctor': 'Doctor',
      'patient': 'Patient',
      'user': 'User'
    };
    return roleMap[role] || role;
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <AntHeader className="royal-header">
      <motion.div 
        className="flex items-center justify-between w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center space-x-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={onToggle}
              className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden group"
              style={{ 
                color: '#4A5568', 
                fontSize: '18px',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </Button>
          </motion.div>
          
          {/* Search Bar */}
          <motion.div 
            className="hidden md:block relative"
            initial={{ opacity: 0, x: -30, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Search
                placeholder="Search anything..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                style={{ width: 400 }}
                size="large"
                className="royal-search"
              />
            </motion.div>
            {/* Floating Search Particles */}
            <motion.div 
              className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400/40 rounded-full"
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div 
              className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-purple-400/30 rounded-full"
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Badge 
              count={3} 
              size="small" 
              offset={[-2, 2]}
              className="relative"
            >
              <Button
                type="text"
                icon={<BellOutlined />}
                className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden group"
                style={{ 
                  color: '#4A5568', 
                  fontSize: '18px',
                  background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
                  border: '1px solid rgba(236, 72, 153, 0.2)'
                }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                {/* Notification Pulse */}
                <motion.div 
                  className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </Button>
            </Badge>
          </motion.div>

          {/* User Profile */}
          <Dropdown
            menu={{ items: userMenuItems }}
            placement="bottomRight"
            trigger={['click']}
            overlayClassName="royal-dropdown"
          >
            <motion.div 
              className="relative flex items-center cursor-pointer px-3 py-2 rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
                border: '1px solid rgba(59, 130, 246, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                height: '56px'
              }}
            >
              {/* Animated Background */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              
              {/* Floating Particles */}
              <motion.div 
                className="absolute top-1 right-2 w-1 h-1 bg-blue-400/40 rounded-full"
                animate={{ 
                  y: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-purple-400/50 rounded-full"
                animate={{ 
                  y: [0, -6, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
              
              <div className="flex items-center space-x-3 relative z-10">
                <div className="text-right hidden sm:block">
                  <motion.div 
                    className="text-sm font-semibold leading-tight"
                    style={{ color: '#2D3748' }}
                    animate={{ 
                      color: ['#2D3748', '#4299E1', '#2D3748']
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    Hi, {user?.name?.split(' ')[0] || 'User'}
                  </motion.div>
                  <motion.div 
                    className="text-xs leading-tight"
                    style={{ color: '#718096' }}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {getRoleDisplayName(user?.role)}
                  </motion.div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Avatar 
                    size={48}
                    className="relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
                      border: '2px solid rgba(255, 255, 255, 0.5)',
                      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
                    }}
                  >
                    {/* Rotating Border */}
                    <motion.div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent)'
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.span
                      className="font-bold text-lg relative z-10"
                      animate={{ 
                        textShadow: [
                          '0 0 5px rgba(255,255,255,0.5)',
                          '0 0 15px rgba(255,255,255,0.8)',
                          '0 0 5px rgba(255,255,255,0.5)'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {getInitials(user?.name || user?.email)}
                    </motion.span>
                  </Avatar>
                </motion.div>
              </div>
            </motion.div>
          </Dropdown>
        </div>
      </motion.div>
    </AntHeader>
  );
};

export default Header;