import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { useAppStore } from '../../store/useAppStore';

export const PaymentStatusChart = ({ data }) => {
  const { activeBranchId } = useAppStore();
  const [paymentData, setPaymentData] = useState(data?.paymentStatus || {
    paid: 78,
    pending: 15,
    overdue: 7
  });

  // Update chart when branch changes or data changes
  useEffect(() => {
    if (data?.paymentStatus) {
      setPaymentData(data.paymentStatus);
    }
  }, [data, activeBranchId]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates with small random changes
      setPaymentData(prev => ({
        paid: Math.max(prev.paid - 5, Math.min(prev.paid + 5, prev.paid + (Math.random() - 0.5) * 2)),
        pending: Math.max(prev.pending - 3, Math.min(prev.pending + 3, prev.pending + (Math.random() - 0.5) * 1)),
        overdue: Math.max(prev.overdue - 2, Math.min(prev.overdue + 2, prev.overdue + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, [data]);

  const total = paymentData.paid + paymentData.pending + paymentData.overdue;
  const paidPercent = (paymentData.paid / total) * 100;
  const pendingPercent = (paymentData.pending / total) * 100;
  const overduePercent = (paymentData.overdue / total) * 100;

  // Calculate angles for donut chart
  const paidAngle = (paidPercent / 100) * 360;
  const pendingAngle = (pendingPercent / 100) * 360;
  const overdueAngle = (overduePercent / 100) * 360;

  return (
    <div className="dashboard-card">
      <Typography variant="h6" fontWeight="bold" className="text-gray-700 mb-4">
        Payment Status Overview
      </Typography>
      
      <div className="flex items-center justify-center h-64 relative">
        {/* Professional SVG Donut Chart */}
        <svg width="280" height="280" className="transform -rotate-90">
          <circle
            cx="140"
            cy="140"
            r="110"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="25"
          />
          
          {/* Paid segment */}
          <circle
            cx="140"
            cy="140"
            r="110"
            fill="none"
            stroke="#10b981"
            strokeWidth="25"
            strokeDasharray={`${(paidAngle / 360) * 691.15} 691.15`}
            strokeDashoffset="0"
            className="transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
          
          {/* Pending segment */}
          <circle
            cx="140"
            cy="140"
            r="110"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="25"
            strokeDasharray={`${(pendingAngle / 360) * 691.15} 691.15`}
            strokeDashoffset={`-${(paidAngle / 360) * 691.15}`}
            className="transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
          
          {/* Overdue segment */}
          <circle
            cx="140"
            cy="140"
            r="110"
            fill="none"
            stroke="#ef4444"
            strokeWidth="25"
            strokeDasharray={`${(overdueAngle / 360) * 691.15} 691.15`}
            strokeDashoffset={`-${((paidAngle + pendingAngle) / 360) * 691.15}`}
            className="transition-all duration-1000 ease-in-out"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Typography variant="h3" fontWeight="bold" className="text-gray-800">
              {Math.round(paidPercent)}%
            </Typography>
            <Typography variant="body2" className="text-gray-600">
              Payments Received
            </Typography>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
            <Typography variant="body2" fontWeight="medium">Paid</Typography>
          </div>
          <Typography variant="h6" fontWeight="bold" className="text-green-600">
            {Math.round(paidPercent)}%
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ₹{Math.round(paymentData.paid * 1000).toLocaleString()}
          </Typography>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
            <Typography variant="body2" fontWeight="medium">Pending</Typography>
          </div>
          <Typography variant="h6" fontWeight="bold" className="text-yellow-600">
            {Math.round(pendingPercent)}%
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ₹{Math.round(paymentData.pending * 1000).toLocaleString()}
          </Typography>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
            <Typography variant="body2" fontWeight="medium">Overdue</Typography>
          </div>
          <Typography variant="h6" fontWeight="bold" className="text-red-600">
            {Math.round(overduePercent)}%
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            ₹{Math.round(paymentData.overdue * 1000).toLocaleString()}
          </Typography>
        </div>
      </div>
    </div>
  );
};