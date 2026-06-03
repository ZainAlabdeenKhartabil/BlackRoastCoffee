import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import Button from '../components/Button';

const Cart = () => {
  const { cart, cartTotal, clearCart, showNotification } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const shippingThreshold = 50;
  const shippingCost = cartTotal >= shippingThreshold || cartTotal === 0 ? 0 : 5.00;
  const taxRate = 0.08;
  const taxCost = cartTotal * taxRate;
  const finalTotal = cartTotal + shippingCost + taxCost;

  const distanceToFreeShipping = shippingThreshold - cartTotal;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const mockOrderNum = 'BRC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(mockOrderNum);
    setCheckoutComplete(true);

    setTimeout(() => {
      clearCart();
    }, 100);
    showNotification("Order placed successfully! Thank you.");
  };

  if (checkoutComplete) {
    return (
      <div className="container section text-center checkout-success-page animate-fade-in">
        <CheckCircle2 size={72} className="gold-text" style={{ marginBottom: '1.5rem', animation: 'float 3s infinite ease-in-out' }} />
        <h1 className="success-title">Order Received</h1>
        <p className="success-order-num">Your Order ID: <span className="gold-text font-serif">{orderNumber}</span></p>
        <div className="success-card">
          <h3>Your specialty roasts are being prepared</h3>
          <p>
            We have sent a confirmation email containing your invoice and roasting schedule. Sourcing authentic beans takes care—we slow-roast each bag to order. Expect shipment tracking within 48 hours.
          </p>
          <div className="success-details">
            <div className="success-detail-row">
              <span>Estimated Delivery:</span>
              <strong>3-5 Business Days</strong>
            </div>
            <div className="success-detail-row">
              <span>Roasting Date:</span>
              <strong>Tomorrow Morning</strong>
            </div>
          </div>
        </div>
        <Link to="/shop">
          <Button variant="primary">Continue Roastery Tour</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container section text-center empty-cart-page animate-fade-in">
        <ShoppingBag size={64} className="empty-cart-icon" />
        <h1 className="empty-title">Your Cart is Empty</h1>
        <p className="empty-desc">
          Your coffee vault is currently void. Journey to our shop to select from our artisanal dark roasts.
        </p>
        <Link to="/shop">
          <Button variant="primary">
            <span>Explore Collection</span>
            <ArrowRight size={14} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div className="cart-hero-overlay"></div>
        <div className="container cart-hero-container animate-fade-in">
          <h1 className="cart-hero-title">Your Cart Selections</h1>
          <p className="cart-hero-desc">Review your curated specialty roasts and gear.</p>
        </div>
      </section>

      <section className="section cart-main-section">
        <div className="container cart-layout">
          <div className="cart-items-column">
            <div className="shipping-progress-banner">
              {shippingCost === 0 ? (
                <div className="shipping-alert success">
                  <CheckCircle2 size={16} />
                  <span>Congratulations! You qualify for <strong>Free Vault Delivery</strong>.</span>
                </div>
              ) : (
                <div className="shipping-alert info">
                  <AlertCircle size={16} />
                  <span>
                    Add <strong>${distanceToFreeShipping.toFixed(2)}</strong> more to unlock <strong>Free Vault Delivery</strong>.
                  </span>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${Math.min(100, (cartTotal / shippingThreshold) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            <div className="cart-items-list-header">
              <span>Item details</span>
              <span>Price</span>
              <span>Qty</span>
              <span>Subtotal</span>
              <span>Remove</span>
            </div>

            <div className="cart-items-container">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-items-actions">
              <Link to="/shop" className="back-to-shop-link">
                <ArrowRight size={14} style={{ transform: 'rotate(180deg)', marginRight: '8px' }} />
                <span>Add More Coffee</span>
              </Link>

              <button className="btn-clear-cart" onClick={clearCart}>
                Clear Entire Cart
              </button>
            </div>
          </div>

          <div className="cart-summary-column animate-fade-in">
            <div className="summary-card">
              <h3 className="summary-title">Summary</h3>

              <div className="summary-divider"></div>

              <div className="summary-rows">
                <div className="summary-row">
                  <span>Cart Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Vault Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="summary-row">
                  <span>Estimated Tax (8%)</span>
                  <span>${taxCost.toFixed(2)}</span>
                </div>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="total-amount">${finalTotal.toFixed(2)}</span>
              </div>

              <form className="checkout-form" onSubmit={handleCheckout}>
                <h4 className="checkout-form-title">Delivery Vault Address</h4>

                <input
                  type="text"
                  placeholder="Full Name"
                  className="input-field summary-input"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field summary-input"
                  required
                />

                <input
                  type="text"
                  placeholder="Shipping Address"
                  className="input-field summary-input"
                  required
                />

                <div className="checkout-card-row">
                  <input
                    type="text"
                    placeholder="Card Number (Mock)"
                    className="input-field summary-input"
                    required
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="input-field summary-input"
                    style={{ maxWidth: '80px' }}
                    required
                  />
                </div>

                <Button type="submit" variant="primary" className="btn-checkout">
                  <span>Authorize Checkout</span>
                  <ShieldCheck size={16} />
                </Button>
              </form>

              <p className="checkout-security-note">
                <ShieldCheck size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Secure Checkout. Fully frontend sandboxed simulator.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
