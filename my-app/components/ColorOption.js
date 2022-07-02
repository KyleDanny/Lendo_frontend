import styles from '../styles/Product.module.css';
import { useState, useEffect } from 'react'

const ColorOption = ({ color, nowSelected, handleClick }) => {
 
  const [clicked, setClicked] = useState(false);
  
  useEffect(() => {
  }, []);

  return (
    <div className={styles.productCard__sectionColors_box + " " + (nowSelected ? "active" : "")} 
      onClick={(e) => handleClick(e, color)} 
    >
      {color}
    </div>
  )
}

export default ColorOption;