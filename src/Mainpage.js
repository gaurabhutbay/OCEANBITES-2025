import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/logo.png';

function Mainpage({
  groupedProducts,
  addToCart,
  cart,
  decrementQuantity,
  incrementQuantity,
  getTotal,
  name,
  setName,
  phone,
  setPhone,
  address,
  setAddress,
  handlePayment,
  showPopup,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      {/* Header */}
      <div className="header-bar">
        {/* Logo */}
        <img src={logo} alt="Ocean Bites Logo" className="logo-img" />

        {/* Search Bar */}
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const target = document.getElementById(searchTerm.toLowerCase());
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }
            }}
          />
        </div>

        {/* Hamburger Menu */}
        <div
          className="hamburger-menu"
          onClick={() => {
            const menu = document.getElementById('menu-dropdown');
            if (menu) menu.classList.toggle('show-menu');
          }}
        >
          ☰
        </div>

        {/* Dropdown */}
        <div id="menu-dropdown" className="menu-dropdown">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/chefs">Chefs</a>
          <a href="/support">Customer Support</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="app-container">
        <div className="brand-heading">
          <span className="ocean-text">OCEAN</span>
          <span className="bites-text">BITES</span>
        </div>

        {Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category} id={category.toLowerCase()}>
            <div className="category-heading-container">
              <h2 className="category-heading">{category}</h2>
            </div>
            <hr className="category-divider" />
            <div className="product-scroll scrollbar-hide">
              {items.map((product, idx) => (
                <Link
                  to={`/product/${product.id}`}
                  key={idx}
                  className="product-card"
                >
                  <div className="product-card-inner">
                    <div className="w-full h-32 overflow-hidden rounded-t-xl">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-1 text-[13px] font-semibold text-center no-underline">
                      {product.name}
                    </p>
                    <p className="text-lg font-bold text-gray-800 mt-1" style={{ textDecoration: 'none' }}>
                      ₹{product.price}
                    </p>
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // prevent navigation
                        addToCart(product);
                      }}
                    >
                      Add
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Cart Section */}
        <div className="cart-section" id="cart-section">
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Cart Is Empty.</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name}</span>
                <div className="flex gap-2 items-center">
                  <button
                    className="qty-btn minus"
                    onClick={() => decrementQuantity(index)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => incrementQuantity(index)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
          <h3>Total: ₹{getTotal()}</h3>

          {/* Order Input Fields */}
          <div className="order-inputs-container">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="order-input"
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="order-input"
            />
            <textarea
              placeholder="DELIVERY ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="order-input"
            />
          </div>

          <button onClick={handlePayment}>Place Order</button>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            background: '#007BFF',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          🛒 Added to Cart Below!
        </div>
      )}

      {/* Floating Cart Icon */}
      <div
        onClick={() => {
          const cart = document.getElementById('cart-section');
          cart && cart.scrollIntoView({ behavior: 'smooth' });
        }}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#ffffff',
          padding: '10px',
          borderRadius: '50%',
          boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          zIndex: 1000,
          cursor: 'pointer',
        }}
        title="Go to Cart"
      >
        🛒
      </div>
    </>
  );
}

export default Mainpage;