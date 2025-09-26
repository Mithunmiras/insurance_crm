import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Typography } from '@mui/material';
import { Users, UserCheck, AlertTriangle, CalendarDays } from 'lucide-react';

import { useAppStore } from '../store/useAppStore';
import { getDashboardData } from '../api/mockApi';

// Import detailed components
import { AIBusinessIntelligence } from '../features/dashboard/AIBusinessIntelligence';
import { BranchSummaryCard } from '../features/dashboard/BranchSummaryCard';
import { KpiCard } from '../components/common/KpiCard';
import { RevenueByBranchChart } from '../features/dashboard/RevenueByBranchChart';
import { PaymentStatusChart } from '../features/dashboard/PaymentStatusChart';

// Animation variants for smooth, staggered load
const containerVariants = { 
  hidden: { opacity: 0 }, 
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};
const itemVariants = { 
  hidden: { y: 20, opacity: 0 }, 
  visible: { y: 0, opacity: 1 } 
};

const Dashboard = () => {
  const activeBranchId = useAppStore((state) => state.activeBranchId);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboardData', activeBranchId],
    queryFn: () => getDashboardData(activeBranchId),
    keepPreviousData: true, // Prevents UI flashing on refetch
  });

  if (isLoading && !data) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Typography color="error">Error fetching dashboard data.</Typography>
      </div>
    );
  }

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="space-y-8"
    >
      {/* AI WIDGET */}
      <motion.div variants={itemVariants}>
        <AIBusinessIntelligence data={data.aiInsights} />
      </motion.div>

      {/* QUICK OVERVIEW SECTION */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-6 group">
          <Typography variant="h5" fontWeight="bold" className="text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            📊 Quick Overview
          </Typography>
          <div className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-300">
            {activeBranchId === 'all' ? 'All Branches' : 
             activeBranchId === 'main_branch' ? 'Main Branch' : 'West Branch'}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 group">
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <KpiCard 
              icon={<Users />} 
              title="Total Patients" 
              value={data.kpis.totalPatients.value} 
              change={data.kpis.totalPatients.change} 
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <KpiCard 
              icon={<UserCheck />} 
              title="Active Staff" 
              value={data.kpis.activeStaff.value} 
              subtext={data.kpis.activeStaff.subtext} 
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <KpiCard 
              icon={<AlertTriangle />} 
              title="Pending Payments" 
              value={data.kpis.pendingPayments.value} 
              subtext={data.kpis.pendingPayments.subtext} 
              isWarning={true} 
            />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <KpiCard 
              icon={<CalendarDays />} 
              title="Today's Appointments" 
              value={data.kpis.todayAppointments.value} 
              subtext={data.kpis.todayAppointments.subtext} 
            />
          </div>
        </div>
      </motion.div>

      {/* BRANCH PERFORMANCE */}
      {activeBranchId === 'all' && (
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-6">
            <Typography variant="h5" fontWeight="bold" className="text-gray-700">
              🏢 Branch Performance
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              Compare all branches
            </Typography>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.branchSummaries.map((branch, index) => (
              <BranchSummaryCard 
                key={branch.id} 
                branch={branch} 
                iconColor={index === 0 ? 'blue' : 'green'} 
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* ANALYTICS SECTION */}
      <motion.div variants={itemVariants}>
        <div className="flex justify-between items-center mb-6 group">
          <Typography variant="h5" fontWeight="bold" className="text-gray-700 group-hover:text-green-600 transition-colors duration-300">
            📈 Financial Analytics
          </Typography>
          <div className="flex items-center space-x-2 text-sm text-gray-500 group-hover:text-green-500 transition-colors duration-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
            <span>Live Data</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <RevenueByBranchChart data={data.charts?.revenueByBranch} />
          </div>
          <div className="transform hover:scale-105 transition-all duration-300 hover:z-10">
            <PaymentStatusChart data={data.charts} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;