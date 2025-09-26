import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { 
  AppBar, 
  Toolbar, 
  TextField, 
  InputAdornment, 
  IconButton, 
  Badge, 
  Avatar, 
  Menu, 
  MenuItem,
  Select,
  FormControl,
  Typography
} from '@mui/material';
import { Search, Notifications, KeyboardArrowDown } from '@mui/icons-material';


const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setActiveBranchId } = useAppStore();
  const logout = () => alert('Logout functionality will be integrated with backend');
  
  const handleBranchChange = (event) => {
    setActiveBranchId(event.target.value);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', boxShadow: 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left: Branch Selector */}
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <Select
            value={useAppStore.getState().activeBranchId}
            onChange={handleBranchChange}
            displayEmpty
            sx={{ bgcolor: 'white' }}
          >
            <MenuItem value="all">All Branches</MenuItem>
            <MenuItem value="main_branch">Main Branch</MenuItem>
            <MenuItem value="west_branch">Branch 2 West</MenuItem>
          </Select>
        </FormControl>

        {/* Center: Search */}
        <TextField
          placeholder="Search patients, invoices, appointments..."
          size="small"
          sx={{ width: 400 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          <IconButton>
            <Badge badgeContent={12} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          
          <div className="flex items-center space-x-2">
            <Avatar sx={{ width: 32, height: 32 }}>
              {user?.name?.charAt(0)}
            </Avatar>
            <div>
              <Typography variant="body2" fontWeight="bold">
                {user?.name || 'System Administrator'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role?.replace('_', ' ') || 'Admin'}
              </Typography>
            </div>
            <IconButton 
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <KeyboardArrowDown />
            </IconButton>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;