import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
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
import ProductList from '../components/ProductList';
import Cart from '../components/cart';

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem('auth_token');
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
  return (
    <CartProvider>
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
          {/* Saree Categories */}
          {/* Backwards-compatible static routes */}
          <Route path="category/banarasi" element={<BanarasiSareeList />} />
          <Route path="silk/banarasi" element={<BanarasiSareeList />} />

          {/* Dynamic category/subcategory routes - single UI (ProductList) */}
          <Route path="category/:categoryName" element={<ProductList />} />
          <Route path="category/:categoryName/:subCategoryName" element={<ProductList />} />
          {/* Product Detail - Using ID for better reliability */}
          <Route path="product/:id" element={<BanarasiSareeDetail />} />
          <Route path="silk/banarasi" element={<BanarasiSareeList />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="signin" element={<RedirectIfAuth><SignIn /></RedirectIfAuth>} />
        <Route path="signup" element={<RedirectIfAuth><SignUp /></RedirectIfAuth>} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
};

export default Router;