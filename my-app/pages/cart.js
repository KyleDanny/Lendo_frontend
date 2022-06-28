import useStore from "../store";

const Cart = () => {
  const items = useStore((state) => state.cart);
  const { removeFromCart } = useStore();
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};
export default Cart;
