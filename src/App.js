import React, { useState, useEffect } from "react";
import db from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Admin from "./Admin";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAdminView, setIsAdminView] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "A") {
        const code = prompt("Enter admin code:");
        if (code === "admin123") {
          setIsAdminView(true);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const groupedProducts = {
    Fishies: [
      { name: "Fish Cutlet", price: 20, image: require("./assets/fish_cutlet.jpeg") },
      { name: "Fish Momos", price: 15, image: require("./assets/fish_momos.jpeg") },
      { name: "Fish Somas", price: 15, image: require("./assets/fish_somas.jpeg") },
      { name: "Fish 65", price: 20, image: require("./assets/fish_65.jpeg") },
      { name: "Fish Pickle 100g", price: 50, image: require("./assets/fish_pickle.jpeg") }
    ],
    Shrimpies: [
      { name: "Shrimp Shawarma", price: 60, image: require("./assets/shrimp_shawarma.jpeg") },
      { name: "Shrimp Cutlet", price: 25, image: require("./assets/shrimp_cutlet.jpeg") },
      { name: "Shrimp Pickle 100g", price: 50, image: require("./assets/shrimp_pickle.jpeg") },
      { name: "Shrimp", price: 50, image: require("./assets/shrimp_pickle.jpeg") }
    ],
    Juices: [
      { name: "Blue Curacao Mojito", price: 40, image: require("./assets/blue.jpeg") },
      { name: "Green Apple Mojito", price: 40, image: require("./assets/green.jpeg") },
      { name: "Strawberry Mojito", price: 40, image: require("./assets/berry.jpeg") }
    ],
    Bowls: [
      { name: "Fish Fried Rice", price: 120, image: require("./assets/fish_rice.jpeg") },
      { name: "Shrimp Fried Rice", price: 140, image: require("./assets/shrimp_rice.jpeg") },
      { name: "Veg Fried Rice", price: 90, image: require("./assets/veg_rice.jpeg") },
      { name: "Special Mix Rice", price: 130, image: require("./assets/mix_rice.jpeg") }
    ]
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_live_M7y9PlvhWZlOd3",
      amount: getTotal() * 100,
      currency: "INR",
      name: "Ocean Bites",
      description: "Seafood Order Payment",
      handler: function () {
        alert("✅ Payment Successful!");
        placeOrder();
      },
      prefill: {
        name,
        contact: phone
      },
      theme: {
        color: "#007BFF"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  const addToCart = (product) => {
    const index = cart.findIndex((item) => item.name === product.name);
    if (index >= 0) {
      const newCart = [...cart];
      newCart[index].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // 👇 Show popup for 5 seconds
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 5000);
  };

  const incrementQuantity = (index) => {
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  };

  const decrementQuantity = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
    } else {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = async () => {
    if (!name || !phone || !address || cart.length === 0) {
      alert("Please fill all details and add items to cart.");
      return;
    }
    try {
      await addDoc(collection(db, "orders"), {
        name,
        phone,
        address,
        cart,
        total: getTotal(),
        createdAt: serverTimestamp()
      });
      alert("Order placed successfully!");
      setCart([]);
      setName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  return (
    <>
      <div className="app-container">

        {isAdminView ? (
          <Admin />
        ) : (
          <>
            <div className="brand-heading">
              <span className="ocean-text">OCEAN</span>
              <span className="bites-text">Bites</span>
            </div>

            {Object.entries(groupedProducts).map(([category, items]) => (
              <div key={category}>
                <h2>{category}</h2>
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

            <div className="cart-section">
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

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="Delivery Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <button onClick={handlePayment}>Place Order</button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Popup message */}
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

      {/* ✅ Floating Cart Icon */}
      <div style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#ffffff",
        padding: "10px",
        borderRadius: "50%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        zIndex: 1000
      }}>
        <span role="img" aria-label="cart">🛍️</span>
      </div>
    </>
  );
}

export default App;