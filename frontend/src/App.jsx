import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import { LoginPage, SignupPage } from "./pages/AuthPages";
import DashboardPage from "./pages/DashboardPage";
import ProfileSettings from "./components/ProfileSettings";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/app/*" element={<DashboardPage />} />
        <Route path="/settings" element={<ProfileSettings />} />
        {/* Redirect unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
