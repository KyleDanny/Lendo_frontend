import { RenderOptionTags } from "../helper_functions";
import styles from '../styles/VariantOptions.module.css';

const VariantOptions = ({ selectedOption, updatePower, updateStorage, updatedPower, setUpdatedPower, updatedStorage, setUpdatedStorage }) => {
  
  const handlePowerChange = (e) => {
    e.preventDefault();
    updatePower(e.target.value);
  }

  const handleStorageChange = (e) => {
    e.preventDefault();
    updateStorage(e.target.value);
  }

  return (
    <div className={styles.OptionsContainer}>
      <div>
        {selectedOption.power && (
          <>
            <label>Power:  </label>
            <select className="custom-select" style={{width: "100px" }} name="powers" onChange={(e)=> handlePowerChange(e)} value={updatedPower || setUpdatedPower(selectedOption.power[0])} >
              {RenderOptionTags(selectedOption.power)}
            </select>
          </>
        )}
      
        {selectedOption.storage && (
          <>
            <label>Storage:  </label>
            <select className="custom-select" style={{width: "100px" }} name="storage" onChange={(e)=> handleStorageChange(e)} value={updatedStorage || setUpdatedStorage(selectedOption.storage[0])} >
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