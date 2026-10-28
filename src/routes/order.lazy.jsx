import { createLazyFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useContext } from "react";
import Pizza from "../Pizza";
import Cart from "../Cart";
import { CartContext } from "../contexts";

// intl untuk format angka menjadi bentuk currency.
const intl = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const Route = createLazyFileRoute("/order")({
  component: Order,
});

function Order() {
  // hook itu ada: useState, useEffect, useRef, useLayoutEffect, use lain-lainnya.
  // useState return dua hal: contohnya: pizzaType (index ke-0) itu adalah value dari useState tersebut, sedangkan setPizzaType (index ke-1) merupakan fungsi untuk mengubah valuenya.
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("S");
  // tambah dua state: pizzaTypes untuk menyimpan hasil fetch pizza dari API
  const [pizzaTypes, setPizzaTypes] = useState([]);
  // melacak status loading.
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  async function checkout() {
    setLoading(true);

    // fetch
    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cart,
      }),
    });

    setCart([]);
    setLoading(false);
  }

  let price, selectedPizza;
  if (!loading) {
    selectedPizza = pizzaTypes.find((pizza) => pizzaType === pizza.id);
    price = intl.format(
      selectedPizza.sizes ? selectedPizza.sizes[pizzaSize] : "",
    );
  }

  // useEffect ini menerima dua argumen, yaitu callback/fn dan dependencyList. Callback berisi fungsi ataupun hal yang ingin di lakukan saat halaman selesai di render dan jika ada variable didalam depList. Kalo deplist, itu merupakan list yang mengtrigger untuk menjalankan fungsi dalam callbacknya. Kalau arraynya kosong, maka dia akan dijalan sekali, saat halaman selesai di-render pertama kalinya. Kalau depListnya tidak disertakan, maka dia akan berjalan indefinitely.
  useEffect(() => {
    fetchPizzaTypes();
  }, []);

  async function fetchPizzaTypes() {
    // delayer artifisial, akan dihapus kedepannya
    await new Promise((res) => setTimeout(res, 3000));

    const response = await fetch("/api/pizzas");
    const parsedJson = await response.json();
    setPizzaTypes(parsedJson);
    setLoading(false);
  }

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
        }}
      >
        <div>
          <div>
            <label htmlFor="pizzaType">Pizza Type:</label>
            <select
              name="pizzaType"
              onChange={(e) => setPizzaType(e.target.value)}
              value={pizzaType}
            >
              {pizzaTypes.map((pizza) => (
                <option key={pizza.id} value={pizza.id}>
                  {pizza.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizzaSize">Pizza Size:</label>
            <div onChange={(e) => setPizzaSize(e.target.value)}>
              <span>
                <input
                  checked={pizzaSize === "S"}
                  type="radio"
                  id="pizza-s"
                  name="pizza-size"
                  //   onChange={(e) => setPizzaSize(e.target.value)}
                  value="S"
                />
                <label htmlFor="pizza-s">Small</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "M"}
                  type="radio"
                  id="pizza-m"
                  name="pizza-size"
                  //   onChange={(e) => setPizzaSize(e.target.value)}
                  value="M"
                />
                <label htmlFor="pizza-m">Medium</label>
              </span>
              <span>
                <input
                  checked={pizzaSize === "L"}
                  type="radio"
                  id="pizza-l"
                  name="pizza-size"
                  //   onChange={(e) => setPizzaSize(e.target.value)}
                  value="L"
                />
                <label htmlFor="pizza-l">Large</label>
              </span>
            </div>
          </div>
          <button type="submit">Add to cart</button>
        </div>
        {loading ? (
          <h3>Sedang memuat...</h3>
        ) : (
          <div className="order-pizza">
            <Pizza
              name={selectedPizza.name}
              description={selectedPizza.description}
              image={selectedPizza.image}
            />
            <p>{price}</p>
          </div>
        )}
      </form>
      {loading ? (
        <h2>Sedang memuat...</h2>
      ) : (
        <Cart cart={cart} checkout={checkout} />
      )}
    </div>
  );
}
