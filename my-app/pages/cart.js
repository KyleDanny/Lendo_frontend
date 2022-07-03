import useStore from "../store";
import styles from "../styles/Cart.module.css";

const Cart = () => {
  const items = useStore((state) => state.cart);
  
  const { removeFromCart, addItemToCart, removeItemFromCart } = useStore();
  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartName}><h1>Cart</h1></div>
      
      <div className={styles.cart}>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Weight</th>
              <th>Color</th>
              <th>Quantity</th>
              <th>Power</th>
              <th>Storage</th>
              <th>+</th>
              <th>-</th>
              <th>Remove</th>
            </tr>
          </thead>
          
          <tbody>
            {items.map((item, i) => (
              <tr key={i} className={styles.cartItem}>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.price}</td>
                <td>{item.weight} (g)</td>
                <td>{item.options.color}</td>
                <td>{item.quantity}</td>
                <td>{item.options.power ? <p> {item.options.power}</p> : null}</td>
                <td>{item.options.storage ? <p> {item.options.storage}</p> : null}</td>
                <td><button onClick={() => addItemToCart(item)}>+</button></td>
                <td><button onClick={() => removeItemFromCart(item)}>-</button></td>
                <td><button onClick={() => removeFromCart(item)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Cart;
