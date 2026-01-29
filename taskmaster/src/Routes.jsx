import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import UserLogin from './pages/user-login';
import LandingPage from './pages/landing-page';
import Dashboard from './pages/dashboard';
import UserRegistration from './pages/user-registration';
import ProgressAnalytics from './pages/progress-analytics';
import ProfilePage from './pages/profile';

import { ProtectedRoute, PublicRoute } from "./components/AuthRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Root Redirect */}
          <Route path="/" element={<Navigate to={localStorage.getItem('token') ? "/dashboard" : "/landing-page"} replace />} />

          {/* Public Routes (Accessible only when NOT logged in) */}
          <Route element={<PublicRoute />}>
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/user-registration" element={<UserRegistration />} />
          </Route>

          {/* Protected Routes (Accessible only when logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/progress-analytics" element={<ProgressAnalytics />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
