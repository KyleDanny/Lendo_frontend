import useStore from "../store";
import styles from "../styles/Cart.module.css";
import { useState, useEffect } from "react";

const Cart = () => {
  const items = useStore((state) => state.cart);
  const itemsUpdated = useState(items);
  const { removeFromCart, addItemToCart, removeItemFromCart } = useStore();
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    calculateTotal();
  }, [itemsUpdated]);

  const calculateTotal = () => {
    let total = items.reduce(
      (acc, item) => acc + Number(item.price) * item.quantity,
      0
    );
    setCartTotal(total);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartName}>
        <h1>Cart</h1>
      </div>

      <div className={styles.cart}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Brand</th>
              <th>Price (kr)</th>
              <th>Weight (kg)</th>
              <th className={styles.cartItem__center}>Color</th>
              <th className={styles.cartItem__center}>Quantity</th>
              <th className={styles.cartItem__center}>Power (w)</th>
              <th className={styles.cartItem__center}>Storage (gb)</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, i) => (
              <tr key={i} className={styles.cartItem}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.weight}</td>
                <td className={styles.cartItem__center}>
                  {" "}
                  <span
                    className={styles.itemColor}
                    style={{ backgroundColor: `${item.options.color}` }}
                  ></span>
                </td>
                <td className={styles.cartItem__center}>{item.quantity}</td>
                <td className={styles.cartItem__center}>
                  {item.options.power ? <p> {item.options.power}</p> : "-"}
                </td>
                <td className={styles.cartItem__center}>
                  {item.options.storage ? <p> {item.options.storage}</p> : "-"}
                </td>
                <td className={styles.cartItem__center}>
                  <button
                    className="buttonPlusMinus"
                    onClick={() => addItemToCart(item)}
                  >
                    +
                  </button>
                </td>
                <td className={styles.cartItem__center}>
                  <button
                    className="buttonPlusMinus"
                    onClick={() => removeItemFromCart(item)}
                  >
                    -
                  </button>
                </td>
                <td className={styles.cartItem__center}>
                  <button
                    className="button_remove"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.totalPrice}> Total: kr {cartTotal}</div>
      <div className={styles.sectionButtonSummary}>
        <button className="button_primary">Go to Summary</button>
      </div>
    </div>
  );
};

export default Cart;
