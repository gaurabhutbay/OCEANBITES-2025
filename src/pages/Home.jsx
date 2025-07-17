import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const categories = [
  {
    name: "Fishies",
    products: [
      { name: "Fish Cutlet", price: 50, img: "/fish1.jpg" },
      { name: "Fish Frankie", price: 50, img: "/fish2.jpg" },
    ],
  },
  {
    name: "Shrimpies",
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
    <main className="min-h-screen bg-blue-100 text-gray-900 bg-[url('/ocean.jpg')] bg-cover bg-fixed">
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold text-white drop-shadow-md">Ocean Bites</h1>
        <p className="text-white text-lg italic drop-shadow-sm">Taste that makes waves at every bite 🌊</p>
      </div>

      {categories.map((cat) => (
        <section key={cat.name} className="mb-6 px-4">
          <h2 className="text-2xl font-bold mb-2 text-white drop-shadow">{cat.name}</h2>
          <div className="flex overflow-x-auto gap-4 pb-2">
            {cat.products.map((product) => (
              <Card
                key={product.name}
                className="w-52 min-w-[200px] bg-white/80 backdrop-blur-md rounded-2xl shadow-md"
              >
                <CardContent className="p-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded-xl mb-2"
                  />
                 <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-sm text-gray-700">₹{product.price}</p>
                  <Button className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      <footer className="p-4 text-center bg-white/80 mt-10">
        <p className="text-sm">
          Customer Support: <b>WhatsApp:</b> 9344391793 | <b>Email:</b> gaurabhutbay@gmail.com
        </p>
      </footer>
    </main>
  );
}