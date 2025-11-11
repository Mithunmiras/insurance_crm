import React, { useEffect, lazy } from "react";
import { Suspense } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import ScrollToTop from "../../Component/ScrollToTop";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuthStore } from "../../store/useAuthStore";

// Insurance CRM Pages
const LifeInsurance = lazy(() => import("./Insurance/LifeInsurance/Index"));
const Clients = lazy(() => import("./Insurance/Clients/Index"));

const Index = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      navigate("/login");
    }
  }, [isAuthenticated, user, navigate]);
  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="text-center mt-10">
            <LoadingOutlined />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={
            <DashboardLayout>
              <div className="text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Insurance CRM Dashboard</h2>
                <p>Welcome to Insurance CRM Pro. Use the sidebar to navigate.</p>
              </div>
            </DashboardLayout>
          } />
          
          {/* Insurance CRM Routes */}
          <Route path="/life-insurance" element={<LifeInsurance />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/leads" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Leads</h2>
                <p>Leads management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/quotes" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Quotes</h2>
                <p>Quotes management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/policies" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">All Policies</h2>
                <p>All policies management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/claims" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Claims</h2>
                <p>Claims management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/payments" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Payments</h2>
                <p>Payments management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/agents" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Agents</h2>
                <p>Agents management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/tasks" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Tasks</h2>
                <p>Tasks management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/documents" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Documents</h2>
                <p>Documents management coming soon...</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/reports" element={
            <DashboardLayout>
              <div className="p-8">
                <h2 className="text-2xl font-bold">Reports</h2>
                <p>Reports & Analytics coming soon...</p>
              </div>
            </DashboardLayout>
          } />
        </Routes>
      </Suspense>
    </>
  );
};
export default Index;
