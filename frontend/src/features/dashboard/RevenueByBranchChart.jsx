import React from 'react';
import { Typography } from '@mui/material';

export const RevenueByBranchChart = ({ data }) => {
  if (!data) return null;
  
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const maxRevenue = Math.max(...data.map(item => item.revenue));
  const avgRevenue = totalRevenue / data.length;
  
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h6" fontWeight="bold" className="text-gray-700">
          Revenue by Branch
        </Typography>
        <div className="text-right">
          <Typography variant="body2" className="text-gray-500">Total Revenue</Typography>
          <Typography variant="h6" fontWeight="bold" className="text-blue-600">
            ₹{totalRevenue.toLocaleString()}
          </Typography>
        </div>
      </div>
      
      {/* Key Insights */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <Typography variant="body2" className="text-gray-500 mb-1">Top Performer</Typography>
          <Typography variant="body1" fontWeight="bold" className="text-green-600">
            {data.find(item => item.revenue === maxRevenue)?.branch}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            {((maxRevenue / totalRevenue) * 100).toFixed(1)}% of total
          </Typography>
        </div>
        <div className="text-center">
          <Typography variant="body2" className="text-gray-500 mb-1">Average Revenue</Typography>
          <Typography variant="body1" fontWeight="bold" className="text-blue-600">
            ₹{avgRevenue.toLocaleString()}
          </Typography>
          <Typography variant="caption" className="text-gray-500">
            Per branch
          </Typography>
        </div>
      </div>
      
      {/* Enhanced Bar Chart */}
      <div className="space-y-6">
        {data.map((item, index) => {
          const percentage = (item.revenue / maxRevenue) * 100;
          const shareOfTotal = (item.revenue / totalRevenue) * 100;
          const colors = ['bg-blue-500', 'bg-green-500'];
          const bgColors = ['bg-blue-50', 'bg-green-50'];
          const textColors = ['text-blue-600', 'text-green-600'];
          const isTopPerformer = item.revenue === maxRevenue;
          
          return (
            <div key={index} className={`p-4 rounded-lg border-2 ${isTopPerformer ? 'border-green-200 bg-green-50' : 'border-gray-100'}`}>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <div className={`w-3 h-3 ${colors[index]} rounded-full mr-3`}></div>
                  <div>
                    <Typography variant="body1" fontWeight="bold" className="text-gray-800">
                      {item.branch}
                      {isTopPerformer && <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">TOP</span>}
                    </Typography>
                    <Typography variant="caption" className="text-gray-500">
                      {shareOfTotal.toFixed(1)}% of total revenue
                    </Typography>
                  </div>
                </div>
                <div className="text-right">
                  <Typography variant="h6" fontWeight="bold" className={textColors[index]}>
                    ₹{item.revenue.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" className="text-gray-500">
                    {item.revenue > avgRevenue ? '+' : ''}{((item.revenue - avgRevenue) / avgRevenue * 100).toFixed(1)}% vs avg
                  </Typography>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className={`${colors[index]} h-4 rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 bg-white opacity-20 animate-shimmer"></div>
                  </div>
                </div>
                <Typography variant="caption" className="absolute right-0 -top-5 text-gray-500">
                  {percentage.toFixed(1)}% of max
                </Typography>
              </div>
              
              {/* Performance Indicator */}
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center space-x-2">
                  {item.revenue > avgRevenue ? (
                    <span className="text-green-600 text-xs">📈 Above Average</span>
                  ) : (
                    <span className="text-orange-600 text-xs">📊 Below Average</span>
                  )}
                </div>
                <Typography variant="caption" className="text-gray-500">
                  Growth potential: {item.revenue < maxRevenue ? `₹${(maxRevenue - item.revenue).toLocaleString()}` : 'Market leader'}
                </Typography>
              </div>
            </div>
          );
        })}
      </div>
      

    </div>
  );
};