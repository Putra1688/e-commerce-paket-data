
import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import PackageCard from '../components/PackageCard';
import TransactionForm from '../components/TransactionForm';
import '../index.css';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

const PackageListPage = () => {
  const { isLoggedIn, user } = useAuth();
  const { data: packages, loading, error, refetch } = useApi('dataPackages');
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Proteksi Route
  // if (!isLoggedIn) {
  //   return <Navigate to="/login" replace />;
  // }

  // Tampilan Loading dan Error
  if (loading) return <div className="page-content">Memuat daftar paket...</div>;
  if (error) return <div className="page-content error-message">{error}</div>;

  const handleSelectPackage = (pkg) => {
    // Jika belum login, paksa ke halaman login
    if (!isLoggedIn) {
      alert("Anda harus login untuk melanjutkan pembelian!");
      // Biasanya menggunakan useNavigate untuk redirect, tapi kita simulasikan dengan alert
      // useNavigator('/login')
      return;
    }
    setSelectedPackage(pkg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Beli Paket Data Internet</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Pilih paket internet terbaik sesuai kebutuhan Anda dengan harga terjangkau
          </p>
        </div>

        {/* Balance Info - Only for logged in users */}
        {isLoggedIn && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-xl mr-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Saldo Tersedia</p>
                  <p className="text-2xl font-bold text-gray-900">
                    Rp {user?.balance?.toLocaleString('id-ID') || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Modal */}
        {isLoggedIn && selectedPackage && (
          <TransactionForm
            user={user}
            packageData={selectedPackage}
            onClose={() => setSelectedPackage(null)}
            onSuccess={refetch}
          />
        )}

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              packageData={pkg}
              onSelectPackage={handleSelectPackage}
            />
          ))}
        </div>

        {/* Login Prompt for non-logged in users */}
        {!isLoggedIn && (
          <div className="text-center mt-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Login untuk Membeli</h3>
              <p className="text-gray-600 mb-4">
                Login terlebih dahulu untuk melakukan pembelian paket internet
              </p>
              <button
                onClick={() => window.location.href = '/login'}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Login Sekarang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageListPage;