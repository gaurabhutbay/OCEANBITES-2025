<header className="header-bar">
  <img src="./assets/logo.png" alt="Ocean Bites Logo" className="logo-img" />
  <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
    &#9776;
  </div>
</header>

import { useState, useEffect } from "react";
import db from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Admin from "./Admin";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mainpage from "./Mainpage";
import About from "./About";

function App() {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAdminView, setIsAdminView] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Mainpage
              groupedProducts={groupedProducts}
              addToCart={addToCart}
              cart={cart}
              decrementQuantity={decrementQuantity}
              incrementQuantity={incrementQuantity}
              getTotal={getTotal}
              name={name}
              setName={setName}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              handlePayment={handlePayment}
              showPopup={showPopup}
            />
          }
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;