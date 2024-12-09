"use client";
import { useState, useEffect } from "react";
import { CartItem } from "@/components/cart-item";
import { CartItemType } from "@/app/types/CartItemtype";
import { ScrollArea } from "@/components/ui/scroll-area";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Navbar from "@/components/navbar";

// Function to get the cart from localStorage
const getCartFromLocalStorage = (): CartItemType[] => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItemType[]>([]);

  // Fetch cart from localStorage on initial render
  useEffect(() => {
    setCart(getCartFromLocalStorage());
  }, []);

  // Function to update the cart state
  const updateCart = (updatedCart: CartItemType[]) => {
    setCart(updatedCart);
  };
  const handleCheckout = async () => {
    alert("Thank you for ordering!");
    console.log(cart); // Log the entire cart
    await addDoc(collection(db, "orders"), cart)
      .then(() => {
        console.log("ok");
      })
      .catch(() => {
        console.log("err");
      });

    // Here you can implement further functionality, like sending the cart data to an API
  };
  // Calculate total price for the entire cart
  const calculateTotal = (): number => {
    return cart.reduce((total, item) => {
      return total + item.product_price * item.product_quantity;
    }, 0);
  };

  return (
    <>
      <Navbar />
      <section className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col p-4">
          {/* Sender Information Section */}
          <section>
            <div className="text-3xl p-4">Sender Information</div>
            <div className="flex flex-col gap-2 p-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border p-4"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-4"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border p-4"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full border p-4"
              />
            </div>
          </section>

          {/* Recipient Information Section */}
          <section>
            <div className="text-3xl p-4">Recipient Information</div>
            <div className="flex flex-col gap-2 p-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full border p-4"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border p-4"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full border p-4"
              />
              <input
                type="text"
                placeholder="Contact Number"
                className="w-full border p-4"
              />
            </div>
          </section>
        </div>

        <div className="flex flex-col p-4 h-[80vh] gap-2">
          <div className="text-3xl p-4">Your Summary</div>

          {/* Display Cart Items */}
          <ScrollArea className="h-3/4 w-full rounded-md border">
            <div>
              {cart.map((item) => (
                <CartItem
                  key={item.product_id}
                  {...item}
                  updateCart={updateCart}
                />
              ))}
            </div>
          </ScrollArea>

          {/* Total Price */}
          <div className="flex justify-between text-2xl font-bold">
            <span>Total:</span>
            <span className="text-[#E3001B]">${calculateTotal()}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full p-4 bg-[#85A43B] text-white rounded"
          >
            Checkout
          </button>
        </div>
      </section>
    </>
  );
}
