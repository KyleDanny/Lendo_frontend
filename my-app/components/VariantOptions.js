import { RenderOptionTags } from "../helper_functions"
// FIX RENDERING ISSUE
const VariantOptions = ({ selectedOption, power, setPower, storage, setStorage }) => {
  
  const handlePowerChange = (e) => {
    e.preventDefault();
    setPower(e.target.value);
  }

  const handleStorageChange = (e) => {
    e.preventDefault();
    setStorage(e.target.value);
  }

  return (
    <div>
      <div>Stock: {selectedOption.quantity}</div>
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
  )
}

export default VariantOptions;