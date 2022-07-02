export const RenderOptionTags = (options) => {
  return options.map((option, i) => {
    return <option key={i} value={option}>{option}</option>;
  })
}

export const createSelectedOption = (product, color) => {
  const option = product.options.find((option) => option.color === color);
  return {
    color: option.color,
    quantity: option.quantity,
    power: option.power || null,
    storage: option.storage || null,
  };
}

export const updateSelectedOptions = (product, selectedOption) => {
  const updatedProductOption = product.options.find((option) => option.color === selectedOption.color);
  return {
    color: updatedProductOption.color,
    quantity: updatedProductOption.quantity,
    power: updatedProductOption.power || null,
    storage: updatedProductOption.storage || null,
  };
}

export const createItemForCart = (product, selectedOption, power, storage) => {
  return {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    weight: product.weight,
    quantity: 1,
    options: {
      color: selectedOption.color,
      power: Number(power) || null,
      storage: storage || null,
    }
  }
}
