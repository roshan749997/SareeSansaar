import { Routes, Route } from 'react-router-dom';
import { CartProvider } from '../context/CartContext';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Shop from '../pages/Shop';
import Collections from '../pages/Collections';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import BanarasiSareeList from '../pages/Banarasi/BanarasiSareeList';
import BanarasiSareeDetail from '../pages/Banarasi/BanarasiSareeDetail';
import Cart from '../components/cart';
const Router = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="collections" element={<Collections />} />
          <Route path="banarasi">
            <Route index element={<BanarasiSareeList />} />
            <Route path=":sareeId" element={<BanarasiSareeDetail />} />
          </Route>
          <Route path="silk/banarasi" element={<BanarasiSareeList />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
      </Routes>
    </CartProvider>
  );
};

export default Router;