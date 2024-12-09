import React from "react";
import { CartItemType } from "@/app/types/CartItemtype";

export type CartItemProps = CartItemType & {
  // Ensure the updateCart is a function that accepts CartItemType[] array
  updateCart: (updatedCart: CartItemType[]) => void;
};

export const CartItem = ({
  product_id,
  product_name,
  product_price,
  product_quantity,
  product_image,
  updateCart,
}: CartItemProps) => {
  // Function to get the cart from localStorage
  const getCartFromLocalStorage = (): CartItemType[] => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  };

  // Function to save the updated cart to localStorage
  const saveCartToLocalStorage = (cart: CartItemType[]): void => {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(cart); // Trigger update to parent cart state
  };

  // Function to handle increasing the quantity of a product
  const handleIncrease = () => {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.map((item) =>
      item.product_id === product_id
        ? { ...item, product_quantity: item.product_quantity + 1 }
        : item
    );
    saveCartToLocalStorage(updatedCart);
  };

  // Function to handle decreasing the quantity of a product
  const handleDecrease = () => {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.map((item) =>
      item.product_id === product_id && item.product_quantity > 1
        ? { ...item, product_quantity: item.product_quantity - 1 }
        : item
    );
    saveCartToLocalStorage(updatedCart);
  };

  // Function to handle removing a product from the cart
  const handleRemove = () => {
    const cart = getCartFromLocalStorage();
    const updatedCart = cart.filter((item) => item.product_id !== product_id);
    saveCartToLocalStorage(updatedCart);
  };

  // Function to calculate the total price for the current cart item
  const calculateItemTotal = (): number => {
    return product_price * product_quantity;
  };

  return (
    <div className="h-36 w-full p-4 flex justify-between items-center border-b border-gray-300">
      <img
        src={product_image}
        alt={product_name}
        className="h-full w-24 object-contain"
      />

      <div className="flex flex-col items-center">
        <span className="text-xl font-bold w-40">{product_name}</span>
        <div className="w-full flex justify-between items-center">
          <button onClick={handleIncrease} className="text-[#85A43B] text-xl">
            +
          </button>
          <span className="text-[#85A43B] text-lg">{product_quantity}</span>
          <button onClick={handleDecrease} className="text-[#85A43B] text-xl">
            -
          </button>
        </div>
      </div>

      <div className="text-2xl text-[#E3001B] font-bold">
        ${calculateItemTotal()}
      </div>

      <button
        onClick={handleRemove}
        className="text-[#E3001B] text-xl hover:underline"
      >
        Remove
      </button>
    </div>
  );
};
