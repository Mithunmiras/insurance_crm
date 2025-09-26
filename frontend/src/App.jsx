import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

function App() {

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;