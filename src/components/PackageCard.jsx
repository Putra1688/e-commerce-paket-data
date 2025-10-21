
import React from 'react';
import '../index.css';

const PackageCard = ({ packageData, onSelectPackage }) => {
  const { name, provider, price } = packageData;

  return (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100">
    {/* Header dengan gradient */}
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
      <h3 className="text-xl font-bold truncate">{name}</h3>
      <div className="flex items-center mt-1">
        <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{provider}</span>
      </div>
    </div>
    
    {/* Konten utama */}
    <div className="p-5">
      {/* Harga dengan penekanan visual */}
      <div className="mb-4">
        <div className="text-gray-500 text-sm">Mulai dari</div>
        <div className="text-2xl font-bold text-gray-800">
          Rp {price.toLocaleString('id-ID')}
        </div>
        <div className="text-xs text-gray-400 mt-1">Harga sudah termasuk pajak</div>
      </div>
      
      {/* Fitur unggulan */}
      <div className="mb-5 text-sm text-gray-600">
        <div className="flex items-center mb-1">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Kecepatan tinggi</span>
        </div>
        <div className="flex items-center mb-1">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Kuota besar</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
          </svg>
          <span>Dukungan 24/7</span>
        </div>
      </div>
      
      {/* Tombol aksi */}
      <button 
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center"
        onClick={() => onSelectPackage(packageData)}
      >
        <span>Beli Sekarang</span>
        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
      </button>
    </div>
  </div>
);
};

export default PackageCard;