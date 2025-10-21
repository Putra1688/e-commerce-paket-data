
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import useApi from '../hooks/useApi'; // Ambil baseUrl

const TransactionForm = ({ user, packageData, onClose }) => {
  const { updateBalance } = useAuth();
  const { baseUrl } = useApi('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { id: packageId, name: packageName, price } = packageData;

  const handleTransaction = async () => {
    if (user.balance < price) {
      setMessage('Gagal! Saldo tidak mencukupi.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // 1. Buat Record Transaksi (POST)
      const newTransaction = {
        customerId: user.id,
        packageId: packageId,
        packageName: packageName,
        amount: price,
        phone: phone,
        date: new Date().toISOString(),
        status: 'Completed',
      };
      await axios.post(`${baseUrl}/transactions`, newTransaction);

      // 2. Kurangi Saldo Customer (PATCH/PUT)
      const newBalance = user.balance - price;
      await axios.patch(`${baseUrl}/customers/${user.id}`, {
        balance: newBalance,
      });

      // 3. Update Context
      updateBalance(newBalance);
      setMessage(`Pembelian ${packageName} ke ${phone} berhasil! Saldo baru: Rp ${newBalance.toLocaleString('id-ID')}`);

    } catch (error) {
      console.error("Transaction Error:", error);
      setMessage('Terjadi kesalahan saat memproses transaksi.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 scale-100 hover:scale-[1.02]">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">Konfirmasi Pembelian</h3>
          <button 
            onClick={onClose} 
            disabled={loading}
            className="text-white hover:bg-white/20 p-1 rounded-full transition-colors duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Package Info */}
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-600 font-medium">Paket Dipilih</span>
            <div className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {packageName}
            </div>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            Rp {price.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Balance Info */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Saldo Tersedia</p>
              <p className="text-lg font-semibold text-gray-900">
                Rp {user.balance.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
          <div className={`text-sm font-medium ${user.balance >= price ? 'text-green-600' : 'text-red-600'}`}>
            {user.balance >= price ? '✓ Cukup' : '✗ Tidak Cukup'}
          </div>
        </div>

        {/* Phone Input */}
        <div className="space-y-3">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Nomor Telepon Tujuan
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors duration-200"
              placeholder="Masukkan nomor telepon"
            />
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`p-4 rounded-xl border ${
            message.includes('Gagal') || message.includes('tidak mencukupi') 
              ? 'bg-red-50 border-red-200 text-red-700' 
              : 'bg-green-50 border-green-200 text-green-700'
          }`}>
            <div className="flex items-center">
              {message.includes('Gagal') || message.includes('tidak mencukupi') ? (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Batal
          </button>
          <button 
            onClick={handleTransaction} 
            disabled={loading || user.balance < price}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center shadow-lg shadow-blue-500/25"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Bayar Rp {price.toLocaleString('id-ID')}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  </div>
);
};

export default TransactionForm;