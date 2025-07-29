import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Fish Products",
    products: [
      { name: "Fish Cutlet", price: 50, img: "/fish1.jpg" },
      { name: "Fish Frankie", price: 50, img: "/fish2.jpg" },
    ],
  },
  {
    name: "Shrimp Products",
    products: [
      { name: "Shrimp Roll", price: 60, img: "/shrimp1.jpg" },
      { name: "Shrimp Burger", price: 70, img: "/shrimp2.jpg" },
    ],
  },
  {
    name: "Juices",
    products: [
      { name: "Green Mojito", price: 40, img: "/juice1.jpg" },
      { name: "Strawberry Mojito", price: 40, img: "/juice2.jpg" },
    ],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-50 text-gray-800 bg-[url('/ocean.jpg')] bg-cover bg-fixed">
      {/* Header */}
      <div className="p-5 text-center bg-blue-900/70 backdrop-blur-sm rounded-b-3xl shadow-md">
        <h1 className="text-4xl font-bold text-white">Ocean Bites</h1>
        <p className="text-white text-sm italic">Taste that makes waves at every bite 🌊</p>
      </div>

      {/* Product Categories */}
      {categories.map((cat) => (
        <section key={cat.name} className="my-6 px-4">
          <h2 className="text-2xl font-semibold text-white drop-shadow mb-2">{cat.name}</h2>
          <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
            {cat.products.map((product) => (
              <Card
                key={product.name}
                className="w-48 min-w-[190px] bg-white/80 backdrop-blur-md rounded-2xl shadow-md"
              >
                <CardContent className="p-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-28 object-cover rounded-xl mb-2"
                  />
                  <h3 className="font-semibold text-md">{product.name}</h3>
                  <p className="text-lg font-bold text-gray-800 mt-1" style={{ textDecoration: 'none' }}>
  ₹{product.price}
</p>
                  <Button className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm">
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="p-4 text-center bg-white/90 shadow-inner mt-10 rounded-t-2xl">
        <p className="text-sm">
          📞 <b>WhatsApp:</b> 9344391793 | 📧 <b>Email:</b> gaurabhutbay@gmail.com
        </p>
        <p className="text-xs mt-1 text-gray-600">© 2025 Ocean Bites. All rights reserved.</p>
      </footer>
    </main>
  );
}