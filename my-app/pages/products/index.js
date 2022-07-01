import styles from '../../styles/Products.module.css';
import useStore from "../../store";
import Link from "next/link";

const Products = () => {
  const products = useStore((state) => state.products.items);

  return (
    <div className={styles.productsContainter}>
      <button><Link href={`/cart`}>Checkout</Link></button>

      <div className={styles.productsCard__grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productsCard}>
            <div className={styles.x}><p>{product.name}</p></div>
            <div><p>Kr {product.price}</p></div>
            <div className={styles.z}><button><Link href={`/products/${product.id}`}>see more</Link></button></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
