import styles from "../styles/Product.module.css";

const ColorOption = ({ color, handleClick, selectedOption }) => {

  return (
    <div
      className={
        styles.productCard__sectionColors_box +
        " " +
        (selectedOption &&
        selectedOption.color === color
          ? "active"
          : "")
      }
      onClick={(e) => handleClick(e, color)}
    >
      {color}
    </div>
  );
};

export default ColorOption;
