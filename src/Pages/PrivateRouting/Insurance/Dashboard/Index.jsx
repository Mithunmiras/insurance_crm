import React from 'react';
import { Typography, Row, Col, Card, Statistic } from 'antd';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../../../store/useAuthStore';
import DashboardLayout from '../../../../layouts/DashboardLayout';
import {
  FileProtectOutlined,
  ExclamationCircleOutlined,
  TeamOutlined,
  DollarOutlined,
  RiseOutlined,
  ArrowUpOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const DashboardOverview = () => {
  const { user } = useAuthStore();

  return (
    <DashboardLayout>
      <div className="royal-main-card">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title className="royal-page-title">
              Dashboard Overview
            </Title>
            <Text style={{ color: '#718096', fontSize: '16px' }}>
              Welcome to Insurance CRM Pro. Get a quick view of your business metrics and activities.
            </Text>
          </motion.div>

          {/* Stats Grid - 4 Main Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-blue-500"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <FileProtectOutlined className="text-3xl text-blue-600" />
                </div>
              </div>
              <div>
                <Text className="text-gray-500 text-sm block mb-2">Active Policies</Text>
                <Title level={2} className="mb-0">1200</Title>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-orange-500"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
                  <ExclamationCircleOutlined className="text-3xl text-orange-600" />
                </div>
              </div>
              <div>
                <Text className="text-gray-500 text-sm block mb-2">Pending Claims</Text>
                <Title level={2} className="mb-0">45</Title>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-green-500"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <TeamOutlined className="text-3xl text-green-600" />
                </div>
              </div>
              <div>
                <Text className="text-gray-500 text-sm block mb-2">Total Clients</Text>
                <Title level={2} className="mb-0">650</Title>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-xl p-8 shadow-lg border-t-4 border-purple-500"
              whileHover={{ y: -5, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                  <DollarOutlined className="text-3xl text-purple-600" />
                </div>
              </div>
              <div>
                <Text className="text-gray-500 text-sm block mb-2">Revenue (YTD)</Text>
                <Title level={2} className="mb-0">₹2.5 Cr</Title>
              </div>
            </motion.div>
          </motion.div>

          {/* Sales Chart Section */}
          <motion.div
            className="bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="mb-6">
              <Title level={3} style={{ color: '#2D3748' }}>Sales Performance</Title>
              <Text style={{ color: '#718096' }}>Monthly sales trends and revenue growth</Text>
            </div>
            
            {/* Chart Placeholder */}
            <div className="w-full h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center">
                <RiseOutlined className="text-6xl text-blue-400 mb-4" />
                <Text className="text-gray-500 block text-lg">Sales Chart</Text>
                <Text className="text-gray-400 text-sm">Chart visualization will be displayed here</Text>
              </div>
            </div>
          </motion.div>

          {/* Additional Insights */}
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <motion.div
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Title level={4} style={{ color: '#2D3748', marginBottom: '1.5rem' }}>
                  Recent Activity
                </Title>
                <div className="space-y-4">
                  {[
                    { label: 'New policy created', value: 'John Doe - Term Life', time: '2 hours ago', color: 'blue' },
                    { label: 'Claim processed', value: 'Sarah Johnson - ₹50,000', time: '5 hours ago', color: 'green' },
                    { label: 'Policy renewed', value: 'Michael Brown - Whole Life', time: '1 day ago', color: 'purple' },
                    { label: 'Payment received', value: 'Alice Cooper - ₹15,000', time: '2 days ago', color: 'orange' }
                  ].map((activity, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + idx * 0.1 }}
                    >
                      <div className={`w-2 h-2 rounded-full mt-2 bg-${activity.color}-500`}></div>
                      <div className="flex-1">
                        <Text strong className="block">{activity.label}</Text>
                        <Text className="text-gray-600 text-sm">{activity.value}</Text>
                        <Text className="text-gray-400 text-xs">{activity.time}</Text>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Col>

            <Col xs={24} lg={12}>
              <motion.div
                className="bg-white rounded-xl p-8 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Title level={4} style={{ color: '#2D3748', marginBottom: '1.5rem' }}>
                  Quick Stats
                </Title>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-gray-500 block">Conversion Rate</Text>
                      <Text strong className="text-2xl">68%</Text>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <ArrowUpOutlined />
                      <Text className="text-green-600">+5.2%</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-gray-500 block">Average Policy Value</Text>
                      <Text strong className="text-2xl">₹4.2L</Text>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <ArrowUpOutlined />
                      <Text className="text-green-600">+12%</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-gray-500 block">Customer Satisfaction</Text>
                      <Text strong className="text-2xl">4.8/5.0</Text>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <ArrowUpOutlined />
                      <Text className="text-green-600">+0.3</Text>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Text className="text-gray-500 block">Policy Renewals</Text>
                      <Text strong className="text-2xl">92%</Text>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <ArrowUpOutlined />
                      <Text className="text-green-600">+8%</Text>
                    </div>
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

export default DashboardOverview;
