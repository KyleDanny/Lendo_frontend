import styles from '../../styles/Product.module.css';

import { useRouter } from "next/router";
import useStore from "../../store";
import { useEffect, useState } from "react";
import VariantOptions from "../../components/VariantOptions";

import { updateSelectedOptions, createItemForCart } from "../../helper_functions";

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
    // CAN USE SAME FUNCTION IN HELPER FUNCTIONS
    const currentSelectedOption = {
      color: option.color,
      quantity: option.quantity,
      power: option.power || null,
      storage: option.storage || null,
    };
    setSelectedOption(currentSelectedOption);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    const newCartItem = createItemForCart(product, selectedOption, power, storage)
    addToCart(newCartItem);
    setConfirmationMessage("Item added to cart!");

    const currentSelectedOption = updateSelectedOptions(product, selectedOption)    
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

  return product ? (
    <div className={styles.productContainer}>
      <div><button onClick={() => router.back()}>Back</button></div>
      
      <div className={styles.productCard}>
        <div className={styles.productCard__sectionHeader}>
          <div className={styles.productCard__name}>
            <h1>{product.name}</h1>
          </div>
          <div className={styles.productCard__brand}>
            <h1>{product.brand}</h1>
          </div>
        </div>
        <div className={styles.productCard__sectionMain}>
          <div><h3>Kr {product.price}</h3></div>
          <div><h3>Weight: {product.weight} (g)</h3></div>
        </div>
        <div className={styles.productCard__sectionColors}>
          {product.options.map((option, i) => {
            return (
              <div className={styles.productCard__sectionColors_box} key={i} onClick={() => selectedVariant(option.color)}>
                {option.color}
              </div>
            );
          })}
        </div>
        {selectedOption && ( 
        <VariantOptions 
          selectedOption={selectedOption} 
          power={power}
          setPower={setPower}
          storage={storage}
          setStorage={setStorage}
          />
        )}
        {product.available && (selectedOption && selectedOption.quantity !== 0) ? <button onClick={(e) => handleAddToCart(e)}>Add to Cart</button> : <button disabled>Item not available</button>}

        {confirmationMessage && (
                <p className="Product__confirmation">{confirmationMessage}</p>
              )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
