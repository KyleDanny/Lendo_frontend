import { useRouter } from "next/router";
import useStore from "../../store";
import { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();
  const [id, setId] = useState();
  const [product, setProduct] = useState();

  const [selectedOption, setSelectedOption] = useState();

  const { getSingleProduct } = useStore();
  const { addToCart } = useStore();

  const selectedVariant = (color) => {
    const option = product.options.find((option) => option.color === color);
    const currentSelectedOption = {
      color: option.color,
      quantity: option.quantity,
      power: option.power || null,
      storage: option.storage || null,
    };
    setSelectedOption(currentSelectedOption);
  };

  const RenderOptionTags = (powers) => {
    return powers.map((power) => {
      return <option value={power}>{power}</option>;
    })
  }

  useEffect(() => {
    if (router && router.query) {
      setId(router.query.id);
      setProduct(getSingleProduct(id));
    }
  }, [router, id]);

  return product ? (
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
            <div onClick={() => selectedVariant(option.color)}>
              {option.color}
            </div>
          </div>
        );
      })}

      {selectedOption && (
        <div>
          <div>{selectedOption.quantity}</div>
          <div>
            {selectedOption.power && (
              <select name="powers" onChange={()=>console.log('i am working')} defaultValue={selectedOption.power[0]} >
                {RenderOptionTags(selectedOption.power)}
              </select>
            )}
          </div>
          <div>{selectedOption.storage}</div>
        </div>
      )}
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <button onClick={() => router.back()}>Back</button>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;

{
  /* <p>color: {option.color}</p>
            <p>quantity: {option.quantity}</p>
            {option.power ? <p>power: {option.power}</p> : false}
          {option.storage ? <p>storage: {option.storage}</p> : false} */
}
