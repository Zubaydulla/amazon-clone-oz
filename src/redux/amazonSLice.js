import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productsAddedToCart: [],
  userInfo: null,
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    setProductsAddedToCart: (state, action) => {
      const sameProduct = state.productsAddedToCart.find(
        (product) => product.id === action.payload.id
      );
      if (sameProduct) {
        sameProduct.quantity += action.payload.quantity;
      } else {
        state.productsAddedToCart.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const selectedProduct = state.productsAddedToCart.find(
        (product) => product.id === action.payload
      );
      selectedProduct.quantity++;
    },
    decrementQuantity: (state, action) => {
      const selectedProduct = state.productsAddedToCart.find(
        (product) => product.id === action.payload
      );
      if (selectedProduct.quantity === 1) {
        selectedProduct.quantity = 1;
      } else {
        selectedProduct.quantity--;
      }
    },
    deleteProductFromCart: (state, action) => {
      state.productsAddedToCart = state.productsAddedToCart.filter(
        (product) => product.id !== action.payload
      );
    },
    resetCart: (state) => {
      state.productsAddedToCart = [];
    },
    // UserInfo Reducers start here
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },

    setUserSignOut: (state) => {
      state.userInfo = null;
    },
    // UserInfo Reducers end here
  },
});

export const {
  setProductsAddedToCart,
  deleteProductFromCart,
  resetCart,
  incrementQuantity,
  decrementQuantity,
  setUserInfo,
  setUserSignOut,
} = amazonSlice.actions;
export const productsAddedToCart = (state) => state.amazon.productsAddedToCart;
export const userInfo = (state) => state.amazon.userInfo;
export default amazonSlice.reducer;
