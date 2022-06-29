import useStore from "../store";

const Cart = () => {
  const items = useStore((state) => state.cart);
  console.log(items)
  const { removeFromCart, addToCart, addItemToCart, removeItemFromCart } = useStore();
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <h3>{item.id}</h3>
          <p>{item.name}</p>
          <p>{item.brand}</p>
          <p>{item.price}</p>
          <p>{item.weight}</p>
          <p>color: {item.options.color}</p>
          <p>quantity: {item.quantity}</p>
          {item.options.power ? <p> power: {item.options.power}</p> : null}
          {item.options.storage ? <p>storage: {item.options.storage}</p> : null}

          <button onClick={() => addItemToCart(item)}>+</button>
          <button onClick={() => removeItemFromCart(item)}>-</button>
          <button onClick={() => removeFromCart(item)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
export default Cart;
