import { createContext, useContext, useState, useEffect } from 'react';
import { getMe, login, register } from '../eco/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getMe()
        .then((data) => {
          setUser(data);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const loginFn = async (email, password) => {
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const registerFn = async (name, email, password) => {
    try {
      const data = await register({ name, email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (err) {
      setUser(null);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginFn, register: registerFn, logout, loading }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}