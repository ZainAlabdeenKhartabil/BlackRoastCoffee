import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { X, Check } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
};

const ToastNotification = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div className="notification-container">
      <div className="notification-toast">
        <Check size={16} className="gold-text" />
        <span>{notification}</span>
      </div>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ToastNotification />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
