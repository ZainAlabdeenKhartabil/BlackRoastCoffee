import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('black_roast_cart');
    return localData ? JSON.parse(localData) : [];
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('black_roast_cart', JSON.stringify(cart));
  }, [cart]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === product.id);
      
      const currentQtyInCart = existingItemIndex > -1 ? prevCart[existingItemIndex].quantity : 0;
      const newQty = currentQtyInCart + quantity;
      
      if (product.stock !== undefined && newQty > product.stock) {
        showNotification(`Cannot add. Only ${product.stock} items left in stock.`);
        return prevCart;
      }

      showNotification(`Added ${quantity}x ${product.name} to cart.`);

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newQty,
        };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item) {
      showNotification(`Removed ${item.name} from cart.`);
    }
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          if (item.stock !== undefined && quantity > item.stock) {
            showNotification(`Cannot update. Only ${item.stock} items left in stock.`);
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    showNotification("Cart cleared.");
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        notification,
        showNotification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
