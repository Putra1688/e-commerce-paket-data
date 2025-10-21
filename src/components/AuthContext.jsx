import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // Ambil user dari localStorage jika ada, untuk persistensi
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Fungsi untuk update saldo di context (simulasi)
  const updateBalance = (newBalance) => {
    setUser(prevUser => {
      const updatedUser = { ...prevUser, balance: newBalance };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateBalance, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};