import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from './context/AuthContext';
import { Toast } from './components/ui/Toast';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { ProgressBar } from './components/layout/ProgressBar';
import { useCurrentDay } from './hooks/useCurrentDay';

// Day Pages
import { RoseDay } from './pages/days/RoseDay';
import { ProposeDay } from './pages/days/ProposeDay';
import { ChocolateDay } from './pages/days/ChocolateDay';
import { TeddyDay } from './pages/days/TeddyDay';
import { PromiseDay } from './pages/days/PromiseDay';
import { HugDay } from './pages/days/HugDay';
import { KissDay } from './pages/days/KissDay';
import { ValentineDay } from './pages/days/ValentineDay';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminDashboard } from './pages/admin/AdminDashboard';

// Other Pages
import { NotFound } from './pages/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// Main Layout Component
const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <ProgressBar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
};

// Home Page Router
const HomePage = () => {
  const currentDay = useCurrentDay();

  // Route based on current day
  switch (currentDay.index) {
    case 0:
      return <RoseDay />;
    case 1:
      return <ProposeDay />;
    case 2:
      return <ChocolateDay />;
    case 3:
      return <TeddyDay />;
    case 4:
      return <PromiseDay />;
    case 5:
      return <HugDay />;
    case 6:
      return <KissDay />;
    case 7:
      return <ValentineDay />;
    default:
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="text-8xl mb-6">⏳</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Valentine's Week Hasn't Started Yet!
            </h1>
            <p className="text-xl text-gray-600">
              Come back on February 7th, 2026 to start the journey! 💕
            </p>
          </div>
        </div>
      );
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toast />
        <Routes>
          {/* Main Valentine's Week Pages */}
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

          {/* Direct day routes (optional, for testing) */}
          <Route path="/rose" element={<MainLayout><RoseDay /></MainLayout>} />
          <Route path="/propose" element={<MainLayout><ProposeDay /></MainLayout>} />
          <Route path="/chocolate" element={<MainLayout><ChocolateDay /></MainLayout>} />
          <Route path="/teddy" element={<MainLayout><TeddyDay /></MainLayout>} />
          <Route path="/promise" element={<MainLayout><PromiseDay /></MainLayout>} />
          <Route path="/hug" element={<MainLayout><HugDay /></MainLayout>} />
          <Route path="/kiss" element={<MainLayout><KissDay /></MainLayout>} />
          <Route path="/valentine" element={<MainLayout><ValentineDay /></MainLayout>} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
