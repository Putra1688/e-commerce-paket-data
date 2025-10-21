import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext.jsx';
import Header from './components/Header.jsx';
import LoginPage from './pages/LoginPage.jsx';
import PackageListPage from './pages/PackageListPage.jsx';
import CustomerProfilePage from './pages/CustomerProfilePage.jsx';
import TransactionHistoryPage from './pages/TransactionHistoryPage.jsx';

// Komponen Pembungkus untuk Proteksi Route
const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  // Jika belum login, redirect ke halaman login
  return isLoggedIn ? element : <Navigate to="/login" replace />;
};

const AppContent = () => {
  return (
    <Router>
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          {/* Default Route: Redirect ke halaman beli paket (jika sudah login) */}
          <Route path="/packages" element={<PackageListPage />} />
          <Route path="/" element={<Navigate to="/packages" replace />} />
          
          {/* Halaman yang diproteksi (hanya bisa diakses setelah login) */}
          <Route path="/packages" element={<ProtectedRoute element={<PackageListPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<CustomerProfilePage />} />} />
          <Route path="/history" element={<ProtectedRoute element={<TransactionHistoryPage />} />} />
          
          {/* Error / Not Found */}
          <Route path="*" element={<div className="page-content">404: Halaman Tidak Ditemukan</div>} />
        </Routes>
      </main>
    </Router>
  );
};

const App = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;