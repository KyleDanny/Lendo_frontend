import { useRouter } from "next/router";
import useStore from "../../store";
import { useEffect, useState } from "react";

const Product = () => {
  const router = useRouter();
  const [id, setId] = useState();
  
  const [product, setProduct] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const [power, setPower] = useState();
  const [storage, setStorage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  const { getSingleProduct } = useStore();
  const { addToCart } = useStore();

  const selectedVariant = (color) => {
    setLoaded(false);
    const option = product.options.find((option) => option.color === color);
    const currentSelectedOption = {
      color: option.color,
      quantity: option.quantity,
      power: option.power || null,
      storage: option.storage || null,
    };
    console.log(currentSelectedOption)
    setSelectedOption(currentSelectedOption);
    setPower(null);
    setStorage(null);
  };

  const RenderOptionTags = (options) => {
    return options.map((option, i) => {
      return <option key={i} value={option}>{option}</option>;
    })
  }

  const handlePowerChange = (e) => {
    e.preventDefault();
    setPower(e.target.value);
  }

  const handleStorageChange = (e) => {
    e.preventDefault();
    setStorage(e.target.value);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      weight: product.weight,
      quantity: 1,
      options: {
        color: selectedOption.color,
        power: power || null,
        storage: storage || null,
      }
    });
    setConfirmationMessage("Item added to cart!");

    // check this below - do we need? 
    const currentProduct = getSingleProduct(product.id);
    const updatedOption = currentProduct.options.find((option) => option.color === selectedOption.color);
    console.log(updatedOption)
    const currentSelectedOption = {
      color: updatedOption.color,
      quantity: updatedOption.quantity,
      power: updatedOption.power || null,
      storage: updatedOption.storage || null,
    };
    setSelectedOption(currentSelectedOption);

		setTimeout(() => {
			setConfirmationMessage(null);
		}, 2000);
  }

  useEffect(() => {
    if (router && router.query) {
      setId(router.query.id);
      setProduct(getSingleProduct(id));
      setLoaded(true);
    }
  }, [router, id]);
  
  useEffect(() => {
    if (loaded && product) {
      setSelectedOption(product.options[0]);
    }
  }), [loaded];

  // check this below - do we need? 
  // useEffect(() => {
    
  // }, [product])

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
              <select name="powers" onChange={(e)=> handlePowerChange(e)} value={power || setPower(selectedOption.power[0])} >
                {RenderOptionTags(selectedOption.power)}
              </select>
            )}
          </div>
          <div>
            {selectedOption.storage && (
              <select name="storage" onChange={(e)=> handleStorageChange(e)} value={storage || setStorage(selectedOption.storage[0])} >
                {RenderOptionTags(selectedOption.storage)}
              </select>
            )}
          </div>

        </div>
      )}
      {product.available && (selectedOption && selectedOption.quantity !== 0) ? <button onClick={(e) => handleAddToCart(e)}>Add to Cart</button> : <button disabled>Item not available</button>}
     
      <button onClick={() => router.back()}>Back</button>

      {confirmationMessage && (
							<p className="Product__confirmation">{confirmationMessage}</p>
						)}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
