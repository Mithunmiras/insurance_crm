import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Dashboard, 
  Business, 
  People, 
  PersonAdd, 
  CalendarToday, 
  Payment, 
  Support, 
  SmartToy, 
  Inventory, 
  Analytics, 
  Settings,
  Warning
} from '@mui/icons-material';
import { Box, Typography, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useAppStore } from '../../store/useAppStore';

const navLinks = [
  { name: 'Dashboard', path: '/', icon: Dashboard }
];

const Sidebar = () => {
  const { isAlertActive, alertMessage, modals, openModal, closeModal } = useAppStore();
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <Typography variant="h6" fontWeight="bold" color="primary">
          DentexA CRM
        </Typography>
      </div>

      {/* Today's Revenue Widget */}
      <Box sx={{ p: 2 }}>
        <div className="revenue-widget">
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Today's Revenue
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            ₹2,20,000
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.7 }}>
            2 Active Branches
          </Typography>
        </div>
      </Box>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {navLinks.map(link => {
          const IconComponent = link.icon;
          return (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `sidebar-nav-link ${
                  isActive ? 'sidebar-nav-link-active' : ''
                }`
              }
            >
              <IconComponent sx={{ fontSize: 20 }} />
              <span className="flex-1">{link.name}</span>
              {link.badge && (
                <Chip 
                  label={link.badge} 
                  size="small" 
                  sx={{ bgcolor: 'gray.200', color: 'gray.700', fontSize: '0.75rem' }}
                />
              )}
              {link.tag && (
                <Chip 
                  label={link.tag} 
                  size="small" 
                  color={link.tag === 'NEW' ? 'success' : 'info'}
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* System Alert */}
      <div className="p-4">
        <button 
          className={`alert-button ${isAlertActive ? 'animate-pulse' : ''}`}
          onClick={() => openModal('systemAlert')}
        >
          <Warning />
          <span>System Alert</span>
        </button>
      </div>

      {/* System Alert Modal */}
      <Dialog 
        open={modals.systemAlert} 
        onClose={() => closeModal('systemAlert')}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>System Alert</DialogTitle>
        <DialogContent>
          <Typography>{alertMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal('systemAlert')}>Close</Button>
        </DialogActions>
      </Dialog>
    </aside>
  );
};

export default Sidebar;