import React from 'react';
import { Typography, Box } from '@mui/material';
import { ArrowUp, AlertTriangle, Users, AlertCircle, Clock } from 'lucide-react';

export const KpiCard = ({ 
  icon, 
  title, 
  value, 
  change, 
  subtext, 
  isWarning = false
}) => {
  const getIconColors = () => {
    if (isWarning) return { bg: 'bg-red-50', icon: 'text-red-500' };
    if (title.includes('Patients')) return { bg: 'bg-blue-50', icon: 'text-blue-500' };
    if (title.includes('Staff')) return { bg: 'bg-green-50', icon: 'text-green-500' };
    if (title.includes('Appointments')) return { bg: 'bg-purple-50', icon: 'text-purple-500' };
    return { bg: 'bg-gray-50', icon: 'text-gray-500' };
  };

  const colors = getIconColors();

  return (
    <div className="kpi-card-large">
      <div className="flex items-center justify-between">
        {/* Left Column - Data */}
        <div className="flex-1">
          <Typography variant="h4" fontWeight="bold" className="text-gray-900 mb-1">
            {value}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-2">
            {title}
          </Typography>
          {change && (
            <div className="flex items-center">
              <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
              <Typography variant="body2" className="text-green-600 font-medium">
                {change}
              </Typography>
            </div>
          )}
          {subtext && (
            <div className="flex items-center">
              {subtext.includes('branches') && (
                <Users className="w-4 h-4 text-blue-600 mr-1" strokeWidth={2.5} />
              )}
              {subtext.includes('overdue') && (
                <AlertCircle className="w-4 h-4 text-red-600 mr-1" strokeWidth={2.5} />
              )}
              {subtext.includes('upcoming') && (
                <Clock className="w-4 h-4 text-green-600 mr-1" strokeWidth={2.5} />
              )}
              <Typography variant="body2" className={
                subtext.includes('branches') ? 'text-blue-600' : 
                subtext.includes('overdue') ? 'text-red-600' : 
                subtext.includes('upcoming') ? 'text-green-600' : 'text-gray-500'
              }>
                {subtext}
              </Typography>
            </div>
          )}
        </div>

        {/* Right Column - Icon */}
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center ml-4`}>
          {isWarning ? (
            <AlertTriangle className="w-6 h-6 text-red-700" strokeWidth={2.5} />
          ) : (
            React.cloneElement(icon, { className: `w-6 h-6 text-gray-700`, strokeWidth: 2.5 })
          )}
        </div>
      </div>
    </div>
  );
};