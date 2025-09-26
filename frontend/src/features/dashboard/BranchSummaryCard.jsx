import React from 'react';
import { Building, ArrowUp, Star } from 'lucide-react';
import { Typography, Box } from '@mui/material';

export const BranchSummaryCard = ({ branch, iconColor }) => {
  const colorClasses = {
    blue: {
      dot: 'bg-blue-500',
      revenue: 'text-blue-600',
      icon: 'text-blue-500',
      iconBg: 'bg-blue-50'
    },
    green: {
      dot: 'bg-green-500',
      revenue: 'text-green-600',
      icon: 'text-green-500',
      iconBg: 'bg-green-50'
    }
  };

  const colors = colorClasses[iconColor] || colorClasses.blue;

  return (
    <div className="branch-card">
      {/* Branch Name with Colored Dot */}
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full ${colors.dot} mr-3`}></div>
        <Typography variant="h6" fontWeight="bold" className="text-gray-800">
          {branch.name}
        </Typography>
      </div>

      {/* Revenue */}
      <div className="mb-2">
        <Typography variant="h3" fontWeight="bold" className={colors.revenue}>
          {branch.revenue}
        </Typography>
      </div>

      {/* Percentage Change */}
      <div className="flex items-center mb-6">
        <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
        <Typography variant="body2" className="text-green-600 font-medium">
          {branch.change}
        </Typography>
      </div>

      {/* Stats Row */}
      <div className="flex space-x-3 mb-4">
        <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1 text-center">
          <Typography variant="body2" className="text-gray-600">
            {branch.patients} Patients
          </Typography>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1 text-center">
          <Typography variant="body2" className="text-gray-600">
            {branch.staff} Staff
          </Typography>
        </div>
        <div className="bg-gray-100 px-3 py-2 rounded-lg flex-1 text-center flex items-center justify-center">
          <Star className="w-4 h-4 text-yellow-500 mr-1" />
          <Typography variant="body2" className="text-gray-600">
            {branch.rating}
          </Typography>
        </div>
      </div>

      {/* Footer */}
      <Typography variant="caption" className="text-gray-500">
        Est. {branch.established}
      </Typography>

      {/* Large Icon */}
      <div className={`absolute top-6 right-6 w-16 h-16 ${colors.iconBg} rounded-xl flex items-center justify-center`}>
        <Building className="w-8 h-8 text-gray-700" strokeWidth={2.5} />
      </div>
    </div>
  );
};