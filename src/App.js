import React, { useState } from "react";
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

  const groupedProducts = {
    'Fish Products': [
      { name: "Fish Cutlet", price: 20, image: require('./assets/fish_cutlet.jpeg') },
      { name: "Fish Momos", price: 15, image: require('./assets/fish_momos.jpeg') },
      { name: "Fish Somas", price: 15, image: require('./assets/fish_somas.jpeg') },
      { name: "Fish 65", price: 20, image: require('./assets/fish_65.jpeg') },
      { name: "Fish Pickle 100g", price: 50, image: require('./assets/pickle.jpeg') }
    ],
    'Shrimp Products': [
      { name: "Shrimp Shawarma", price: 60, image: require('./assets/shrimp_shawarma.jpeg') },
      { name: "Shrimp Cutlet", price: 25, image: require('./assets/shrimp_cutlet.jpeg') }
    ],
    'Juices': [
      { name: "Blue Curacao Mojito", price: 40, image: require('./assets/blue.jpeg') },
      { name: "Green Apple Mojito", price: 40, image: require('./assets/green.jpeg') },
      { name: "Strawberry Mojito", price: 40, image: require('./assets/berry.jpeg') }
    ]
  };

  const handlePayment = async () => {
    const options = {
      key: "rzp_live_M7y9PlvhWZlOd3",
      amount: getTotal() * 100,
      currency: "INR",
      name: "Ocean Bites",
      description: "Seafood Order Payment",
      handler: function (response) {
        alert("✅ Payment Successful!");
        placeOrder();
      },
      prefill: {
        name: name,
        contact: phone,
      },
      theme: {
        color: "#007BFF",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const addToCart = (product) => {
    const existingIndex = cart.findIndex((item) => item.name === product.name);
    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
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
    <div className="p-4 space-y-6 bg-blue-50 min-h-screen max-w-md mx-auto">
      <button
        onClick={() => setIsAdminView(!isAdminView)}
        className="mb-4 bg-gray-800 text-white px-4 py-2 rounded w-full"
      >
        Switch to {isAdminView ? "Customer" : "Admin"} View
      </button>

      {isAdminView ? (
        <Admin />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Ocean Bites
          </h1>

          {Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">{category}</h2>
              <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide">
                {items.map((product, idx) => (
                  <div
                    key={idx}
                    className="min-w-[120px] max-w-[120px] bg-white rounded-xl shadow p-2 flex-shrink-0"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-[80px] object-cover rounded"
                    />
                    <p className="mt-1 text-[13px] font-semibold text-center">{product.name}</p>
                    <p className="text-xs text-gray-500 text-center">₹{product.price}</p>
                    <button
                      className="mt-1 w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600"
                      onClick={() => addToCart(product)}
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10 space-y-3">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            {cart.length === 0 ? (
              <p className="text-gray-600">Cart is empty.</p>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="border p-3 rounded shadow flex justify-between items-center bg-white"
                >
                  <div>
                    <p className="font-semibold text-sm">{item.name}</p>
                    <p className="text-sm">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrementQuantity(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => incrementQuantity(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))
            )}

            <h3 className="text-base font-bold">Total: ₹{getTotal()}</h3>

            <input
              className="w-full border p-2 rounded text-sm"
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded text-sm"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="w-full border p-2 rounded text-sm"
              type="text"
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 text-sm"
            >
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;