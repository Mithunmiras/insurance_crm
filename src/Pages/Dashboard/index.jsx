import React from 'react';
import { Typography, Row, Col, Progress, Avatar, Button } from 'antd';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import DashboardLayout from '../../layouts/DashboardLayout';
import {
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  RiseOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuthStore();

  const getRoleDisplayName = (userType) => {
    const roleMap = {
      'superAdmin': 'Super Administrator',
      'branchHead': 'Branch Head',
      'customer': 'Customer',
      'doctor': 'Doctor',
      'staff': 'Staff'
    };
    return roleMap[userType] || userType;
  };

  const getStatsForRole = () => {
    switch (user?.userType) {
      case 'superAdmin':
        return [
          { 
            title: 'Total Policies', 
            value: 200, 
            icon: <TeamOutlined />,
            gradient: 'from-blue-500 to-blue-600',
            change: '+12%',
            changeType: 'up'
          },
          { 
            title: 'Life Insurance', 
            value: 150, 
            icon: <UserOutlined />,
            gradient: 'from-green-500 to-green-600',
            change: '+8%',
            changeType: 'up'
          },
          { 
            title: 'Total Coverage', 
            value: 45000000, 
            prefix: '$', 
            icon: <DollarOutlined />,
            gradient: 'from-purple-500 to-purple-600',
            change: '+15%',
            changeType: 'up'
          },
          { 
            title: 'Active Clients', 
            value: 200, 
            icon: <CalendarOutlined />,
            gradient: 'from-pink-500 to-pink-600',
            change: '+5%',
            changeType: 'up'
          }
        ];
      case 'branchHead':
        return [
          { 
            title: 'Total Agents', 
            value: 100, 
            icon: <TeamOutlined />,
            gradient: 'from-blue-500 to-blue-600',
            change: '+3%',
            changeType: 'up'
          },
          { 
            title: 'Pending Claims', 
            value: 25, 
            icon: <CalendarOutlined />,
            gradient: 'from-green-500 to-green-600',
            change: '+12%',
            changeType: 'up'
          },
          { 
            title: 'Monthly Premiums', 
            value: 250000, 
            prefix: '$', 
            icon: <DollarOutlined />,
            gradient: 'from-purple-500 to-purple-600',
            change: '+8%',
            changeType: 'up'
          },
          { 
            title: 'New Leads', 
            value: 85, 
            icon: <UserOutlined />,
            gradient: 'from-pink-500 to-pink-600',
            change: '+18%',
            changeType: 'up'
          }
        ];
      default:
        return [
          { 
            title: 'My Clients', 
            value: 45, 
            icon: <UserOutlined />,
            gradient: 'from-blue-500 to-blue-600',
            change: '+5%',
            changeType: 'up'
          },
          { 
            title: 'Active Policies', 
            value: 62, 
            icon: <CalendarOutlined />,
            gradient: 'from-green-500 to-green-600',
            change: '+20%',
            changeType: 'up'
          },
          { 
            title: 'This Month Leads', 
            value: 12, 
            icon: <RiseOutlined />,
            gradient: 'from-purple-500 to-purple-600',
            change: '+10%',
            changeType: 'up'
          },
          { 
            title: 'Commission', 
            value: 12500, 
            prefix: '$',
            icon: <DollarOutlined />,
            gradient: 'from-pink-500 to-pink-600',
            change: '+15%',
            changeType: 'up'
          }
        ];
    }
  };

  const getCurrentTime = () => {
    return new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="royal-main-card">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title className="royal-page-title">
              Welcome back, {user?.fullName?.split(' ')[0] || user?.username}!
            </Title>
            <Text style={{ color: '#718096', fontSize: '16px' }}>
              {getRoleDisplayName(user?.userType)} • {getCurrentTime()}
            </Text>
          </motion.div>

          {/* Stats Cards */}
          <Row gutter={[32, 32]}>
            {getStatsForRole().map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <motion.div
                  className="relative bg-white rounded-2xl p-6 overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 } 
                  }}
                  style={{
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))'
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg, ${stat.gradient.includes('blue') ? 'rgba(59, 130, 246, 0.05)' : stat.gradient.includes('green') ? 'rgba(34, 197, 94, 0.05)' : stat.gradient.includes('purple') ? 'rgba(147, 51, 234, 0.05)' : 'rgba(236, 72, 153, 0.05)'}, rgba(255, 255, 255, 0.02))`
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Floating Particles */}
                  <motion.div 
                    className="absolute top-3 right-4 w-2 h-2 bg-blue-400/30 rounded-full"
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-purple-400/40 rounded-full"
                    animate={{ 
                      y: [0, -8, 0],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3 }}
                  />
                  
                  {/* Shimmer Effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <motion.div 
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center text-white text-xl overflow-hidden`}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        {/* Icon Glow Effect */}
                        <motion.div 
                          className="absolute inset-0 bg-white/20 rounded-2xl"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0, 0.3, 0]
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                        />
                        <motion.span
                          animate={{ 
                            textShadow: [
                              '0 0 10px rgba(255,255,255,0.5)',
                              '0 0 20px rgba(255,255,255,0.8)',
                              '0 0 10px rgba(255,255,255,0.5)'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {stat.icon}
                        </motion.span>
                      </motion.div>
                      
                      <motion.div 
                        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-bold ${
                          stat.changeType === 'up' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}
                        whileHover={{ scale: 1.1 }}
                        animate={{ 
                          boxShadow: [
                            '0 2px 8px rgba(0,0,0,0.1)',
                            '0 4px 16px rgba(0,0,0,0.15)',
                            '0 2px 8px rgba(0,0,0,0.1)'
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <motion.span
                          animate={{ 
                            rotate: stat.changeType === 'up' ? [0, 10, 0] : [0, -10, 0]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          {stat.changeType === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        </motion.span>
                        <span>{stat.change}</span>
                      </motion.div>
                    </div>
                    
                    <div>
                      <motion.div
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Text className="royal-table-header" style={{ color: '#718096' }}>
                          {stat.title}
                        </Text>
                      </motion.div>
                      
                      <div className="flex items-baseline space-x-1 mt-3">
                        {stat.prefix && (
                          <motion.span 
                            className="text-2xl font-bold" 
                            style={{ color: '#2D3748' }}
                            animate={{ 
                              scale: [1, 1.05, 1]
                            }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            {stat.prefix}
                          </motion.span>
                        )}
                        <motion.span 
                          className="text-4xl font-bold" 
                          style={{ color: '#2D3748' }}
                          animate={{ 
                            color: ['#2D3748', '#4299E1', '#2D3748']
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                        >
                          {stat.value.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Border Glow Effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(135deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
                      border: '1px solid rgba(59, 130, 246, 0.2)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </Col>
            ))}
          </Row>

          {/* Additional Dashboard Content */}
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={16}>
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Title level={3} style={{ color: '#2D3748', marginBottom: '2rem' }}>Performance Overview</Title>
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Text className="font-semibold" style={{ color: '#4A5568' }}>Monthly Sales Target</Text>
                      <Text style={{ color: '#718096' }}>75%</Text>
                    </div>
                    <Progress 
                      percent={75} 
                      strokeColor="#4299E1"
                      className="mb-4"
                      strokeWidth={8}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Text className="font-semibold" style={{ color: '#4A5568' }}>Client Satisfaction</Text>
                      <Text style={{ color: '#718096' }}>92%</Text>
                    </div>
                    <Progress 
                      percent={92} 
                      strokeColor="#48BB78"
                      className="mb-4"
                      strokeWidth={8}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <Text className="font-semibold" style={{ color: '#4A5568' }}>Policy Retention</Text>
                      <Text style={{ color: '#718096' }}>88%</Text>
                    </div>
                    <Progress 
                      percent={88} 
                      strokeColor="#ED8936"
                      strokeWidth={8}
                    />
                  </div>
                </div>
              </motion.div>
            </Col>
            <Col xs={24} lg={8}>
              <motion.div 
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Title level={3} style={{ color: '#2D3748', marginBottom: '2rem' }}>Quick Actions</Title>
                <div className="space-y-4">
                  <Text style={{ color: '#4A5568', marginBottom: '2rem', display: 'block' }}>
                    Welcome to Insurance CRM Pro. 
                    Use the sidebar to manage policies, clients, and claims.
                  </Text>
                  <div className="space-y-4">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button block size="large" className="royal-btn-secondary text-left h-auto py-4">
                        <div>
                          <div className="font-semibold">New Policy</div>
                          <div className="text-xs" style={{ color: '#718096' }}>Create new insurance policy</div>
                        </div>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button block size="large" className="royal-btn-secondary text-left h-auto py-4">
                        <div>
                          <div className="font-semibold">Process Claim</div>
                          <div className="text-xs" style={{ color: '#718096' }}>Handle insurance claims</div>
                        </div>
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button block size="large" className="royal-btn-primary text-left h-auto py-4">
                        <div>
                          <div className="font-semibold">View Reports</div>
                          <div className="text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>Analytics & insights</div>
                        </div>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;