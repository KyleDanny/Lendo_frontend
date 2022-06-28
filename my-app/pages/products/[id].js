import { useRouter } from "next/router";
import useStore from "../../store";
import { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [product, setProduct] = useState();
  const { getSingleProduct } = useStore();

  useEffect(() => {
    if (router && router.query) {
      setId(router.query.id);
      setProduct(getSingleProduct(id));
    }
  }, [router, id]);

  return (
    product ? (
    <div>
      <h1>
        {product.name} | {product.brand}
      </h1>
      <div>{product.price}</div>
      <div>available: {product.available.toString()}</div>
      <div>Weight: {product.weight}</div>
      {product.options.map((option, i) => {
        return (
          <div key={i}>
            <p>color: {option.color}</p>
            <p>quantity: {option.quantity}</p>
            {option.power ? <p>power: {option.power}</p> : false}
            {option.storage ? <p>storage: {option.storage}</p> : false}
          </div>
        );
      })}
      <span>Add to Cart</span>
      <span onClick={() => router.back()}>Back</span>
    </div>)
    : <div>Loading...</div>
  );
};

export default Product;
