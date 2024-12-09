// CartUtils.ts (to manage cart operations)
import { CartItemType } from "../types/CartItemtype";

const CART_KEY = "user_cart"; // Key to store cart in localStorage

// Function to get cart data from localStorage
export const getCart = (): CartItemType[] => {
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Function to save the updated cart to localStorage
export const saveCart = (cart: CartItemType[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

// Function to add a product to the cart
export const addToCart = (product: CartItemType) => {
  const cart = getCart();

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(
    (item) => item.product_id === product.product_id
  );

  if (existingProductIndex >= 0) {
    // If product exists, update the quantity
    cart[existingProductIndex].product_quantity += product.product_quantity;
  } else {
    // Otherwise, add new product to the cart
    cart.push(product);
  }

  saveCart(cart); // Save updated cart to localStorage
};

// Function to remove a product from the cart
export const removeFromCart = (product_id: string) => {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.product_id !== product_id);
  saveCart(updatedCart);
};

// Function to clear the cart
export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
