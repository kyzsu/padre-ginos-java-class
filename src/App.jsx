import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import Order from "./Order.jsx";
import Header from "./Header.jsx";
import { CartContext } from "./contexts.jsx";
import PizzaOfTheDay from "./PizzaOfTheDay.jsx";

const App = () => {
  const cartHook = useState([]);
  return (
    <StrictMode>
      <CartContext.Provider value={cartHook}>
        <Header />
        <Order />
        <PizzaOfTheDay />
      </CartContext.Provider>
    </StrictMode>
  );
};

// strictMode memberikan extra warning, dan hanya dipakai saat development, karena dia memberikan extra warning, dia akan menjalankan app kita sebanyak dua kali/nge-render app dua kali.

// createRoot digunakan untuk membuat root React di dalam elemen DOM yang ditentukan. Ini adalah cara baru untuk menginisialisasi aplikasi React, menggantikan metode lama ReactDOM.render. Metode ini menerima satu argumen: elemen DOM tempat aplikasi React akan dirender. Setelah root dibuat, kita dapat menggunakan metode render untuk merender elemen React ke dalam root tersebut.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
