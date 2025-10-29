import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Collections from '../pages/Collections';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import BanarasiSareeList from '../pages/Banarasi/BanarasiSareeList';
import BanarasiSareeDetail from '../pages/Banarasi/BanarasiSareeDetail';

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('auth_token');
    // For testing: uncomment next line to always show login
    // return false;
    return Boolean(token);
  } catch {
    return false;
  }
};

const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

const RedirectIfAuth = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const Router = () => {
  // Add logout function for testing
  const logout = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/signin';
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="collections" element={<Collections />} />
        <Route path="banarasi">
          <Route index element={<BanarasiSareeList />} />
          <Route path=":sareeId" element={<BanarasiSareeDetail />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="signin" element={<RedirectIfAuth><SignIn /></RedirectIfAuth>} />
      <Route path="signup" element={<RedirectIfAuth><SignUp /></RedirectIfAuth>} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Router;