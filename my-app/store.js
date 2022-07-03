import create from 'zustand';

const products = require('./database.json');

const useStore = create((set) => ({
  products: products,
  cart: [],
  getSingleProduct: (id) => {
    return products.items.find((product) => product.id === Number(id));
  },
  addToCart: (product) => {
    set(state => {
      console.log(product)
      const cartProduct = state.cart.find(cartProduct => cartProduct.id === product.id && JSON.stringify(cartProduct.options) === JSON.stringify(product.options));
      const productDB = state.products.items.find(productInDB => productInDB.id === product.id);

      if (cartProduct) {
        const productDBOptions = productDB.options.find(option => option.color === cartProduct.options.color);
        if (productDBOptions.quantity > 0 && productDBOptions.quantity <= productDBOptions.quantity + cartProduct.quantity) {
          cartProduct.quantity += 1;
          productDBOptions.quantity -= 1;
        }
      } else {
        const productDBOptions = productDB.options.find(option => option.color === product.options.color);
        if (productDBOptions.quantity > 0 && productDBOptions.quantity >= product.quantity) {
          productDBOptions.quantity -= 1;
        }
        return {
          cart: [...state.cart, product],
        };
      }
    })
  }, 
  removeFromCart: (product) => {
    set((state) => {
      const productDB = state.products.items.find(productInDB => productInDB.id === product.id);
      const productDBOptions = productDB.options.find(option => option.color === product.options.color);
      productDBOptions.quantity += product.quantity;
      
      return {
        cart: state.cart.filter((cartProduct) => JSON.stringify(cartProduct.options) !== JSON.stringify(product.options))
      }
    });
  },
  addItemToCart: (product) => {
    set((state) => {
      const cartProduct = state.cart.find(cartProduct => cartProduct.id === product.id && JSON.stringify(cartProduct.options) === JSON.stringify(product.options));
      const productDB = state.products.items.find(productInDB => productInDB.id === product.id);

      const productDBOptions = productDB.options.find(option => option.color === cartProduct.options.color);

      if (productDBOptions.quantity > 0) {
        cartProduct.quantity += 1;
        productDBOptions.quantity -= 1;
      }

    });
  },
  removeItemFromCart: (product) => {
    set((state) => {
      const cartProduct = state.cart.find(cartProduct => cartProduct.id === product.id && JSON.stringify(cartProduct.options) === JSON.stringify(product.options));
      const productDB = state.products.items.find(productInDB => productInDB.id === product.id);
      const productDBOptions = productDB.options.find(option => option.color === cartProduct.options.color);
        if (cartProduct.quantity > 1) {
          cartProduct.quantity -= 1;
          productDBOptions.quantity += 1;
        }
    });
  }
}));

export default useStore;
