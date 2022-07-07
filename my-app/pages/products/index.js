import styles from "../../styles/Products.module.css";
import useStore from "../../store";
import Link from "next/link";

const Products = () => {
  const products = useStore((state) => state.products.items);
  const cart = useStore((state) => state.cart);

  return (
    <div className={styles.productsContainter}>
      {cart.length > 0 ? (
        <button className="button_primary">
          <Link href={`/cart`}>Checkout</Link>
        </button>
      ) : (
        <button className="button_disabled" disabled>
          Checkout
        </button>
      )}

      <div className={styles.productsCard__grid}>
        {products.map((product) => (
          <div role="listitem" key={product.id} className={styles.productsCard}>
            <div className={styles.x}>
              <p>{product.name}</p>
            </div>
            <div>
              <p>Kr {product.price}</p>
            </div>
            <div>
              <button role="see_more" className="button_secondary">
                <Link href={`/products/${product.id}`}>see more</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
