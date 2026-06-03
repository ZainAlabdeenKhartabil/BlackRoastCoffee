import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item-row animate-fade-in">
      <div className="cart-item-img-wrapper img-wrapper">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="cart-item-details">
        <span className="cart-item-category">{item.category}</span>
        <h4 className="cart-item-name">
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h4>
        {item.roastLevel > 0 && (
          <span className="cart-item-roast">Roast Level: {item.roastLevel}/5</span>
        )}
      </div>

      <div className="cart-item-price">
        <span className="price-label">Price</span>
        <span className="price-val">${item.price.toFixed(2)}</span>
      </div>

      <div className="cart-item-quantity">
        <span className="qty-label">Quantity</span>
        <div className="qty-picker">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="qty-btn"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="qty-btn"
            disabled={item.stock !== undefined && item.quantity >= item.stock}
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      <div className="cart-item-subtotal">
        <span className="subtotal-label">Total</span>
        <span className="subtotal-val">${(item.price * item.quantity).toFixed(2)}</span>
      </div>

      <div className="cart-item-action">
        <button
          onClick={() => removeFromCart(item.id)}
          className="cart-remove-btn"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
