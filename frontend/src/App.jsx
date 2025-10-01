import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, useEffect } from "react";
import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
const PageNotFound = React.lazy(() => import("./Pages/PageNotFound/Index"));

const Public = React.lazy(() => import("./Pages/Public/Index"));
const PrivateRouting = React.lazy(() => import("./Pages/PrivateRouting/Index"));
const Dashboard = React.lazy(() => import("./Pages/Dashboard/index"));
const UsersPage = React.lazy(() => import("./pages/UserManagement/index"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-10">
          <LoadingOutlined />
        </div>
      }
    >
      <Routes>
        <Route path="/*" element={<Public />} />
        <Route 
          path="/admin/*" 
          element={
            <ProtectedRoute allowedRoles={['branchHead', 'doctor', 'staff']}>
              <PrivateRouting />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/superadmin/*" 
          element={
            <ProtectedRoute allowedRoles={['superAdmin']}>
              <PrivateRouting />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute allowedRoles={['superAdmin', 'branchHead', 'customer', 'doctor', 'staff']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/patient-portal/*" 
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/user-management" element={<DashboardLayout><UsersPage /></DashboardLayout>} />
      </Routes>
    </Suspense>
  );
}

export default App;
