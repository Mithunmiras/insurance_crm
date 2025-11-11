import React, { useState } from 'react';
import { Layout } from 'antd';
import { motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const { Content } = Layout;

const DashboardLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F7F9FC 0%, #EDF2F7 50%, #E2E8F0 100%)' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout className="relative overflow-hidden">
        {/* Floating Background Elements */}
        <motion.div 
          className="absolute top-20 right-10 w-32 h-32 bg-blue-400/5 rounded-full blur-3xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-32 right-32 w-24 h-24 bg-purple-400/8 rounded-full blur-2xl"
          animate={{ 
            y: [0, 25, 0],
            x: [0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute top-1/2 right-5 w-16 h-16 bg-pink-400/6 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
        
        <Header collapsed={collapsed} onToggle={handleToggle} />
        <Content className="royal-page-container relative">
          <motion.div 
            className="max-w-full mx-auto relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {children}
          </motion.div>
          

          

        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;