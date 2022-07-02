import { RenderOptionTags } from "../helper_functions";
import { useState } from "react";
import styles from '../styles/VariantOptions.module.css';

const VariantOptions = ({ selectedOption, updatePower, updateStorage }) => {
  const [power, setPower] = useState();
  const [storage, setStorage] = useState();
  
  const handlePowerChange = (e) => {
    e.preventDefault();
    setPower(e.target.value);
    updatePower(e.target.value);
  }

  const handleStorageChange = (e) => {
    e.preventDefault();
    setStorage(e.target.value);
    updateStorage(e.target.value);
  }

  return (
    <div className={styles.OptionsContainer}>
      <div>
        {selectedOption.power && (
          <>
            <label>Power:  </label>
            <select name="powers" onChange={(e)=> handlePowerChange(e)} value={power || setPower(selectedOption.power[0])} >
              {RenderOptionTags(selectedOption.power)}
            </select>
          </>
        )}
      
        {selectedOption.storage && (
          <>
            <label>Storage:  </label>
            <select name="storage" onChange={(e)=> handleStorageChange(e)} value={storage || setStorage(selectedOption.storage[0])} >
              {RenderOptionTags(selectedOption.storage)}
            </select>
          </>
        )}
      </div>
      <div>Stock: {selectedOption.quantity}</div>
    </div>
  )
}

export default VariantOptions;