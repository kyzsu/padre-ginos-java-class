import { useState } from "react";
import Pizza from "./Pizza";

export default function Order() {
  // hook itu ada: useState, useEffect, useRef, useLayoutEffect, use lain-lainnya.
  // useState return dua hal: contohnya: pizzaType (index ke-0) itu adalah value dari useState tersebut, sedangkan setPizzaType (index ke-1) merupakan fungsi untuk mengubah valuenya.
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("S");

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizzaType">Pizza Type:</label>
            <select
              name="pizzaType"
              onChange={(e) => setPizzaType(e.target.value)}
              value={pizzaType}
            >
              <option value="pepperoni">Pepperoni</option>
              <option value="hawaiian">Hawaiian</option>
              <option value="big_meat">Meat Lovers</option>
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
        <div className="order-pizza">
          <Pizza
            name="Pepperoni"
            description="menyusul"
            image="/public/pizzas/pepperoni.webp"
          />
          <p>$6.9</p>
        </div>
      </form>
    </div>
  );
}
