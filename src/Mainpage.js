// src/Mainpage.js
import React from 'react';
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
    showPopup
}) {
    return (
        <>
            {/* Optional: Navigation link to About page */}
            <div className="header-bar">
                <img src={logo} alt="Ocean Bites Logo" className="logo-img" />

                <div className="hamburger-menu" onClick={() => {
                    const menu = document.getElementById('menu-dropdown');
                    if (menu) menu.classList.toggle('show-menu');
                }}>
                    ☰
                </div>

                <div id="menu-dropdown" className="menu-dropdown">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/chefs">Chefs</a>
                    <a href="/support">Customer Support</a>
                </div>
            </div>

            <div className="app-container">
                <div className="brand-heading">
                    <span className="ocean-text">OCEAN</span>
                    <span className="bites-text">BITES</span>
                </div>


                {Object.entries(groupedProducts).map(([category, items]) => (
                    <div key={category}>
                        <div className="category-heading-container">
                            <h2 className="category-heading">{category}</h2>
                        </div>
                        <hr className="category-divider" />
                        <div className="product-scroll scrollbar-hide">
                            {items.map((product, idx) => (
                                <div key={idx} className="product-card">
                                    <img src={product.image} alt={product.name} />
                                    <p className="mt-1 text-[13px] font-semibold text-center">{product.name}</p>
                                    <p className="text-xs text-gray-500 text-center">₹{product.price}</p>
                                    <button onClick={() => addToCart(product)}>Add</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="cart-section" id="cart-section">
                    <h2>Your Cart</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-600">Cart is empty.</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <span>{item.name}</span>
                                <div className="flex gap-2 items-center">
                                    <button className="qty-btn minus" onClick={() => decrementQuantity(index)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button className="qty-btn" onClick={() => incrementQuantity(index)}>+</button>
                                </div>
                            </div>
                        ))
                    )}
                    <h3>Total: ₹{getTotal()}</h3>

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
                <div style={{
                    position: "fixed",
                    bottom: "80px",
                    right: "20px",
                    background: "#007BFF",
                    color: "white",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    zIndex: 1000
                }}>
                    🛒 Added to Cart Below!
                </div>
            )}

            {/* Floating cart icon */}
            <div
                onClick={() => {
                    const cart = document.getElementById("cart-section");
                    cart && cart.scrollIntoView({ behavior: "smooth" });
                }}
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
                    background: "#ffffff",
                    padding: "10px",
                    borderRadius: "50%",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                    zIndex: 1000,
                    cursor: "pointer",
                }}
                title="Go to Cart"
            >
                🛒
            </div>
        </>
    );
}

export default Mainpage;