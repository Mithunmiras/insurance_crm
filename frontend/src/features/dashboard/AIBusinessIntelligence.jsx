import React, { useState, useEffect } from 'react';
import { RefreshCw, Brain, Lightbulb, ListChecks, ChevronRight, ArrowRight } from 'lucide-react';
import { Typography, Box, LinearProgress } from '@mui/material';

export const AIBusinessIntelligence = ({ data }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [lastUpdated] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for real-time display

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (lastUpdateTime) => {
    const diffInSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };
  return (
    <div className="ai-intelligence-card">
      {/* Refresh Icon */}
      <RefreshCw className="absolute top-4 right-4 w-5 h-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
      
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="p-3 bg-white bg-opacity-10 rounded-xl shadow-lg backdrop-blur-sm mr-4">
          <Brain className="w-8 h-8 drop-shadow-lg text-gray-800" strokeWidth={2.5} />
        </div>
        <div className="bg-white bg-opacity-10 p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <Typography variant="h5" fontWeight="bold" className="text-white drop-shadow-lg">
            AI Business Intelligence
          </Typography>
          <Typography variant="body2" className="text-white opacity-80 drop-shadow-md">
            Powered by DentexA AI Assistant
          </Typography>
        </div>
      </div>

      {/* Main Content - Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Left Column - Key Insights */}
        <div className="bg-white bg-opacity-10 p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg shadow-md mr-3">
              <Lightbulb className="w-5 h-5 drop-shadow-md text-gray-800" strokeWidth={2.5} />
            </div>
            <Typography variant="h6" fontWeight="bold" className="drop-shadow-md">Key Insights</Typography>
          </div>
          <ul className="space-y-2">
            {data.insights.map((insight, index) => (
              <li key={index} className="flex items-start bg-white bg-opacity-5 p-2 rounded-lg">
                <ChevronRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 drop-shadow-sm text-gray-700" strokeWidth={2.5} />
                <Typography variant="body2" className="opacity-90 drop-shadow-sm">{insight}</Typography>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column - Recommendations */}
        <div className="bg-white bg-opacity-10 p-4 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg shadow-md mr-3">
              <ListChecks className="w-5 h-5 drop-shadow-md text-gray-800" strokeWidth={2.5} />
            </div>
            <Typography variant="h6" fontWeight="bold" className="drop-shadow-md">Recommendations</Typography>
          </div>
          <ul className="space-y-2">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start bg-white bg-opacity-5 p-2 rounded-lg">
                <ArrowRight className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 drop-shadow-sm text-gray-700" strokeWidth={2.5} />
                <Typography variant="body2" className="opacity-90 drop-shadow-sm">{rec}</Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center">
        <Typography variant="caption" className="opacity-70">
          Last updated: {getTimeAgo(lastUpdated)}
        </Typography>
        <div className="flex items-center space-x-3">
          <Typography variant="caption" className="opacity-80">
            AI Confidence: {data.confidence}%
          </Typography>
          <Box sx={{ width: 100 }}>
            <LinearProgress 
              variant="determinate" 
              value={data.confidence} 
              sx={{ 
                backgroundColor: 'rgba(255,255,255,0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#10b981'
                }
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};