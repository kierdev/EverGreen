import React from "react";

// Type for product
export type ProductType = {
  product_id: string;
  product_name: string;
  product_price: number;
  product_image: string;
};

export const ProductCard: React.FC<ProductType> = (props: ProductType) => {
  // Sample product data

  // Function to add the product to cart in localStorage
  const addToCart = () => {
    // Get the current cart from localStorage
    if (!localStorage.getItem("isAuthenticated")) {
      alert("Please log in first");
      return;
    }
    const cart = localStorage.getItem("cart");
    const parsedCart = cart ? JSON.parse(cart) : [];

    // Check if the product is already in the cart
    const existingProductIndex = parsedCart.findIndex(
      (item: ProductType) => item.product_id === props.product_id
    );

    if (existingProductIndex > -1) {
      // If the product exists in the cart, increase the quantity
      parsedCart[existingProductIndex].product_quantity += 1;
    } else {
      // If the product doesn't exist, add it to the cart with quantity 1
      parsedCart.push({ ...props, product_quantity: 1 });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(parsedCart));

    // Optionally, show a success message or feedback
    alert(`${props.product_name} has been added to the cart!`);
  };

  return (
    <div className="w-72 p-6 bg-[#F1F1F1] flex flex-col gap-2">
      <img
        src={props.product_image}
        alt={props.product_name}
        className="border aspect-square w-full bg-white"
      />
      <h1 className="text-xl">{props.product_name}</h1>
      <h2 className="text-[#3486E7] text-xl">P {props.product_price}</h2>
      <button
        onClick={addToCart}
        className="mt-4 bg-[#3486E7] text-white p-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};
