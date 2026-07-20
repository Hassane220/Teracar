import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

/* Public layout */
import Header    from './components/Header/Header';
import Footer    from './components/Footer/Footer';
import MobileNav from './components/MobileNav/MobileNav';

/* Public pages */
import HomePage          from './pages/HomePage';
import CataloguePage     from './pages/CataloguePage';
import CarDetailsPage    from './pages/CarDetailsPage';
import BrandsPage        from './pages/BrandsPage';
import ServicesPage      from './pages/ServicesPage';
import ContactPage       from './pages/ContactPage';
import SearchResultsPage from './pages/SearchResultsPage';

/* Admin */
import AdminLayout       from './components/admin/AdminLayout';
import LoginPage         from './pages/admin/LoginPage';
import DashboardPage     from './pages/admin/DashboardPage';
import VehiclesAdminPage from './pages/admin/VehiclesAdminPage';
import AddEditVehiclePage from './pages/admin/AddEditVehiclePage';
import BrandsAdminPage   from './pages/admin/BrandsAdminPage';
import LeadsPage         from './pages/admin/LeadsPage';
import SettingsAdminPage from './pages/admin/SettingsAdminPage';
import UsersPage         from './pages/admin/UsersPage';

import './App.css';

function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileNav />
    </>
  );
}

function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <SettingsProvider>
        <Router>
          <Routes>
            {/* Public site */}
            <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/catalogue" element={<PublicLayout><CataloguePage /></PublicLayout>} />
            <Route path="/cars/:id" element={<PublicLayout><CarDetailsPage /></PublicLayout>} />
            <Route path="/marques" element={<PublicLayout><BrandsPage /></PublicLayout>} />
            <Route path="/services" element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><ContactPage /></PublicLayout>} />
            <Route path="/search" element={<PublicLayout><SearchResultsPage /></PublicLayout>} />

            {/* Admin login */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* Admin (protected) */}
            <Route path="/admin" element={<RequireAuth><AdminLayout /></RequireAuth>}>
              <Route index element={<DashboardPage />} />
              <Route path="vehicles" element={<VehiclesAdminPage />} />
              <Route path="vehicles/add" element={<AddEditVehiclePage />} />
              <Route path="vehicles/edit/:id" element={<AddEditVehiclePage />} />
              <Route path="brands" element={<BrandsAdminPage />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="settings" element={<SettingsAdminPage />} />
              <Route path="users" element={<UsersPage />} />
            </Route>
          </Routes>
        </Router>
      </SettingsProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
