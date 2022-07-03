import styles from '../styles/Product.module.css';
import { useState, useEffect } from 'react'

const ColorOption = ({ color, handleClick, selectedOption }) => {
   
  useEffect(() => {
  }, []);

  return (
    <div className={styles.productCard__sectionColors_box + " " + ((selectedOption && selectedOption.color) && selectedOption.color === color ? "active" : "")} 
      onClick={(e) => handleClick(e, color)} 
    >
      {color}
    </div>
  )
}

export default ColorOption;