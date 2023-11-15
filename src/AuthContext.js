import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    name: '',
    id: '',
    password: '',
    email: '',
  });

  const setAuthInfo = (name, id, password, email) => {
    setAuthData({loginId: id, loginPassword: password, name, email });
  };

  return (
    <AuthContext.Provider value={{ authData, setAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내에서 사용되어야 합니다.');
  }
  return context;
};
