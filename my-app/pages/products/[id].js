import styles from '../../styles/Product.module.css';

import { useRouter } from "next/router";
import useStore from "../../store";
import { useEffect, useState } from "react";
import VariantOptions from "../../components/VariantOptions";
import ColorOption from "../../components/ColorOption";

import { createSelectedOption, updateSelectedOptions, createItemForCart } from "../../helper_functions";

const Product = () => {
  const router = useRouter();
  const [id, setId] = useState();
  
  const [product, setProduct] = useState();
  const [selectedOption, setSelectedOption] = useState();

  const [updatedPower, setUpdatedPower] = useState();
  const [updatedStorage, setUpdatedStorage] = useState();

  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [loaded, setLoaded] = useState(false);
  
  const { getSingleProduct } = useStore();
  const { addToCart } = useStore();

  const [nowSelected, setNowSelected] = useState(false);

  const updatePower = power => setUpdatedPower(power);
  const updateStorage = storage => setUpdatedStorage(storage);

  const selectedVariant = (color) => {
    setLoaded(false);
    const newSelectedOption = createSelectedOption(product, color)
    setSelectedOption(newSelectedOption);
  };

  const handleClick = (e, color) => {
    e.preventDefault();
    e.stopPropagation();
    selectedVariant(color);

    console.log(selectedOption.color)
    console.log(color)
    // if (selectedOption && selectedOption.color === color) {}

  }

  const handleAddToCart = (e) => {
    e.preventDefault();
    const newCartItem = createItemForCart(product, selectedOption, updatedPower, updatedStorage)
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
      console.log("set default selected option", selectedOption);
    }
  }), [loaded];

  useEffect(() => {

  }, [selectedOption])
  
  return product ? (
    <div className={styles.productContainer}>
      <div className={styles.infoBar}>
        <div><button className="button_secondary" onClick={() => router.back()}>Back</button></div>
        <div>
          {confirmationMessage && (
            <p className="Product__confirmation">{confirmationMessage}</p>
          )}
        </div>
      </div>
      
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
              <ColorOption 
                key={i} 
                color={option.color} 
                nowSelected={nowSelected}
                handleClick={handleClick}
              />
            );
          })}
        </div>
        {selectedOption && ( 
        <VariantOptions 
          selectedOption={selectedOption} 
          updatePower={updatePower}
          updateStorage={updateStorage}
          />
        )}
        {product.available && (selectedOption && selectedOption.quantity !== 0) ? <button className="button_primary" onClick={(e) => handleAddToCart(e)}>Add to Cart</button> : <button className="button_disabled" disabled>Item not available</button>}

      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
