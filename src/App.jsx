import { createRoot } from "react-dom/client";
import Order from "./Order.jsx";

const App = () => {
  return (
    <div>
      <h1>Hello, World!</h1>
      <Order />
    </div>
  );

  // React.createElement digunakan untuk membuat elemen React secara manual. Ini adalah cara yang lebih rendah tingkat dibandingkan dengan JSX, tetapi memberikan kontrol penuh atas pembuatan elemen. Metode ini menerima tiga argumen: tipe elemen, properti (props), dan anak-anak (children). Dalam contoh ini, kita membuat elemen <div> yang berisi elemen <h1> dengan teks "Hello, World!".
  //   return React.createElement(
  //     "div", // element HTML yang akan dibuat
  //     {}, // properti (props) untuk elemen tersebut, dalam hal ini kosong
  //     [
  //       React.createElement("h1", {}, "Hello, World!"),
  //       React.createElement(Pizza, {
  //         name: "Margherita",
  //         description: "Classic pizza with tomato sauce and mozzarella cheese.",
  //       }),
  //       React.createElement(Pizza, {
  //         name: "Pepperoni",
  //         description: "Spicy pepperoni with tomato sauce and mozzarella cheese.",
  //       }),
  //       React.createElement(Pizza, {
  //         name: "Meat Lovers",
  //         description: "Delicious pizza with a variety of meats.",
  //       }),
  //     ], // anak-anak (children) dari elemen <div>, dalam hal ini sebuah elemen <h1> dan komponen Pizza
  //   );
};

// createRoot digunakan untuk membuat root React di dalam elemen DOM yang ditentukan. Ini adalah cara baru untuk menginisialisasi aplikasi React, menggantikan metode lama ReactDOM.render. Metode ini menerima satu argumen: elemen DOM tempat aplikasi React akan dirender. Setelah root dibuat, kita dapat menggunakan metode render untuk merender elemen React ke dalam root tersebut.
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
