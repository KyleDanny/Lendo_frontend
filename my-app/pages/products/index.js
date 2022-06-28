import useStore from "../../store";
import Link from "next/link";

const Products = () => {
  const products = useStore((state) => state.products.items);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <Link href={`/products/${product.id}`}>see more</Link>
        </div>
      ))}
    </div>
  );
};

export default Products;
