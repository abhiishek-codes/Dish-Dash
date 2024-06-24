import { createSlice } from "@reduxjs/toolkit";

// Initial state for the cart
const initialState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
  status: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          restroname: newItem.restroname,
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          category: newItem.category,
          quantity: 1,
          totalPrice: newItem.price,
          imageId: newItem.imageId,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
        if (existingItem.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  setError,
  setStatus,
} = cartSlice.actions;

export default cartSlice.reducer;
