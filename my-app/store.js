import create from 'zustand';

const products = require('./database.json');

const useStore = create((set) => ({
  products: products,
  cart: [],
  getSingleProduct: (id) => {
    return products.items.find((product) => product.id === Number(id));
  },
  addToCart: (product) => {
    set((state) => ({
      cart: [...state.cart, product],
    }));
  }, 
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((product) => product.id !== Number(id)),
    }));
  }
}));

export default useStore;