import React from 'react';
import { Layout, Avatar } from 'antd';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import {
  DashboardOutlined,
  BankOutlined,
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  CustomerServiceOutlined,
  InboxOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserSwitchOutlined
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, onCollapse }) => {
  const location = useLocation();
  const { user, permissions } = useAuthStore();

  const iconMap = {
    'Dashboard': <DashboardOutlined />,
    'Branch Management': <BankOutlined />,
    'User Management': <UserOutlined />,
    'Patient Records': <TeamOutlined />,
    'Appointment': <CalendarOutlined />,
    'Subscriptions': <CustomerServiceOutlined />,
    'Payments': <DollarOutlined />,
    'Inventory': <InboxOutlined />,
    'Report & Analytics': <BarChartOutlined />,
    'Settings': <SettingOutlined />,
    'Role': <UserSwitchOutlined />
  };

  const routeMap = {
    'Dashboard': '/dashboard',
    'Branch Management': '/branch-management',
    'User Management': '/user-management',
    'Patient Records': '/patient-records',
    'Appointment': '/appointments',
    'Subscriptions': '/subscriptions',
    'Payments': '/payments',
    'Inventory': '/inventory',
    'Report & Analytics': '/reports',
    'Settings': '/settings',
    'Role': '/roles'
  };

  const getNavItems = () => {
    const actualPermissions = permissions || user?.permissions;
    if (!actualPermissions || !Array.isArray(actualPermissions)) return [];

    return actualPermissions
      .filter(permission => permission.enable)
      .map(permission => ({
        path: routeMap[permission.label] || `/${permission.label.toLowerCase().replace(/\s+/g, '-')}`,
        icon: iconMap[permission.label] || <DashboardOutlined />,
        label: permission.label,
      }));
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={340}
      className="royal-sidebar relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        boxShadow: "4px 0 32px rgba(0, 0, 0, 0.25)"
      }}
    >
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, #3b82f6 1px, transparent 1px), radial-gradient(circle at 80% 70%, #8b5cf6 0.5px, transparent 0.5px), radial-gradient(circle at 40% 80%, #ec4899 0.8px, transparent 0.8px)",
          backgroundSize: "60px 60px, 40px 40px, 80px 80px"
        }}
      />
      
      {/* Ambient Light Effects */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-500/5 to-transparent"
        animate={{ 
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-purple-500/5 to-transparent"
        animate={{ 
          opacity: [0.6, 0.3, 0.6]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Logo Section */}
      <motion.div 
        className="relative flex items-center justify-center py-8 px-6 border-b border-gradient-to-r from-purple-500/20 to-blue-500/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex items-center space-x-4 relative z-10">
          <motion.div 
            className="relative w-16 h-16 rounded-3xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.15, rotate: 10, y: -2 }}
            whileTap={{ scale: 0.85, rotate: -5 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <motion.div 
              className="absolute -inset-1 rounded-3xl"
              style={{
                background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)"
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div 
              className="relative w-full h-full rounded-3xl flex items-center justify-center overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1e293b, #334155)"
              }}
            >
              <motion.div 
                className="absolute inset-0 opacity-90"
                animate={{ 
                  background: [
                    "linear-gradient(135deg, #ec4899, #8b5cf6, #3b82f6)",
                    "linear-gradient(135deg, #3b82f6, #f59e0b, #ec4899)",
                    "linear-gradient(135deg, #8b5cf6, #ec4899, #3b82f6)",
                    "linear-gradient(135deg, #f59e0b, #3b82f6, #8b5cf6)"
                  ]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.span 
                className="text-white font-bold text-3xl relative z-10"
                animate={{ 
                  textShadow: [
                    "0 0 15px rgba(255,255,255,0.6)",
                    "0 0 30px rgba(255,255,255,0.9)",
                    "0 0 15px rgba(255,255,255,0.6)"
                  ],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                D
              </motion.span>
            </motion.div>
          </motion.div>
          
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 250, damping: 25 }}
              className="relative"
            >
              <motion.h3 
                className="text-white font-bold text-2xl leading-none relative"
                style={{
                  background: "linear-gradient(135deg, #ffffff, #e0e7ff, #c7d2fe, #a5b4fc)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Dental CRM
              </motion.h3>
              
              <motion.div className="mt-2 relative">
                <motion.p 
                  className="text-gray-300 text-sm font-semibold tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0.8, 1] }}
                  transition={{ duration: 2, delay: 0.8 }}
                >
                  Royal Premium
                </motion.p>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Navigation Menu */}
      <div className="px-4 py-8">
        {!collapsed && (
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-widest px-3">
              Navigation
            </p>
            <motion.div 
              className="mt-2 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            />
          </motion.div>
        )}
        
        <nav className="space-y-2">
          {getNavItems().map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -40, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.08 + 1.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 25
                }}
                whileHover={{ 
                  scale: 1.03, 
                  x: 4,
                  transition: { duration: 0.2 }
                }}
              >
                <NavLink
                  to={item.path}
                  className={`royal-nav-item ${isActive ? 'active' : ''} relative overflow-hidden group block`}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-pink-500/15 opacity-0 group-hover:opacity-100 rounded-2xl"
                    initial={false}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 35
                      }}
                    >
                      <motion.div 
                        className="absolute inset-0"
                        style={{
                          background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)",
                          backgroundSize: "400% 400%"
                        }}
                        animate={{ 
                          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl" />
                    </motion.div>
                  )}
                  
                  <div className="relative z-10 flex items-center px-4 py-3">
                    <motion.span 
                      className="text-xl mr-4 relative"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                      animate={isActive ? {
                        textShadow: [
                          "0 0 10px rgba(255,255,255,0.5)",
                          "0 0 20px rgba(255,255,255,0.8)",
                          "0 0 10px rgba(255,255,255,0.5)"
                        ]
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {item.icon}
                    </motion.span>
                    
                    {!collapsed && (
                      <motion.span 
                        className="font-semibold text-base relative"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.label}
                        
                        {isActive && (
                          <motion.div 
                            className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"
                            animate={{ 
                              scale: [1, 1.3, 1],
                              opacity: [0.7, 1, 0.7]
                            }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </motion.span>
                    )}
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </NavLink>
              </motion.div>
            );
          })}
        </nav>
      </div>
      
      {/* Enhanced Bottom Section */}
      {!collapsed && (
        <motion.div 
          className="absolute bottom-6 left-4 right-4"
          initial={{ opacity: 0, y: 30, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 2, type: "spring", stiffness: 200 }}
        >
          <motion.div 
            className="relative bg-gradient-to-br from-gray-800/80 via-gray-700/60 to-gray-900/80 rounded-3xl p-5 backdrop-blur-xl border border-gray-600/30 overflow-hidden group cursor-pointer"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4 relative z-10">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <motion.div 
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #3b82f6)"
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                />
                
                <Avatar 
                  size={48} 
                  className="relative z-10"
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                    border: "2px solid rgba(255,255,255,0.4)",
                    boxShadow: "0 8px 32px rgba(59, 130, 246, 0.4)"
                  }}
                >
                  <motion.span
                    className="font-bold text-xl"
                    animate={{ 
                      textShadow: [
                        "0 0 8px rgba(255,255,255,0.6)",
                        "0 0 20px rgba(255,255,255,0.9)",
                        "0 0 8px rgba(255,255,255,0.6)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    H
                  </motion.span>
                </Avatar>
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <motion.p 
                  className="text-white text-base font-bold truncate"
                  animate={{ 
                    color: ["#ffffff", "#e0e7ff", "#c7d2fe", "#ffffff"]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  Help Center
                </motion.p>
                <motion.p 
                  className="text-gray-300 text-sm font-medium mt-1"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: [0.7, 1, 0.8, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Premium Support 24/7
                </motion.p>
              </div>
              
              <div className="flex flex-col space-y-2">
                <motion.div 
                  className="w-2.5 h-2.5 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.4, 1],
                    opacity: [0.8, 1, 0.8],
                    boxShadow: [
                      "0 0 8px rgba(34, 197, 94, 0.6)",
                      "0 0 16px rgba(34, 197, 94, 0.9)",
                      "0 0 8px rgba(34, 197, 94, 0.6)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.6, 1, 0.6]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Enhanced Floating Orbs */}
      <motion.div 
        className="absolute top-24 right-6 w-4 h-4 bg-blue-400/25 rounded-full blur-sm"
        animate={{ 
          y: [0, -25, 0],
          x: [0, 5, 0],
          opacity: [0.25, 0.6, 0.25],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 0 }}
      />
      <motion.div 
        className="absolute top-48 left-8 w-3 h-3 bg-purple-400/35 rounded-full blur-sm"
        animate={{ 
          y: [0, -18, 0],
          x: [0, -3, 0],
          opacity: [0.35, 0.7, 0.35],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 1.2 }}
      />
      <motion.div 
        className="absolute bottom-40 right-10 w-2.5 h-2.5 bg-pink-400/30 rounded-full blur-sm"
        animate={{ 
          y: [0, -15, 0],
          x: [0, 4, 0],
          opacity: [0.3, 0.65, 0.3],
          scale: [1, 1.4, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 2.5 }}
      />
    </Sider>
  );
};

export default Sidebar;