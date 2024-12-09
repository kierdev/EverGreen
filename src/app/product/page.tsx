"use client";
import Navbar from "@/components/navbar";

export default function ProductView() {
  const handleAddToCart = () => {};

  return (
    <div>
      <Navbar />
      <section className="w-full h-[80vh] flex items-center justify-evenly">
        <div className="w-1/4 border bg-gray-500">
          <img
            src="https://cdn11.bigcommerce.com/s-96246/images/stencil/2560w/products/1771/2307/dozyellow__86000.1479624452.jpg?c=2"
            alt=""
            className=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl">Chocolate Love</h1>
          <span className="text-[#E3001B] text-xl">P1999</span>
          <div className="flex gap-4">
            <button
              className="bg-[white] border-[4px] border-[#90A955] p-4"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button className="bg-[#90A955] text-white p-4">Buy Now</button>
          </div>
        </div>
      </section>
    </div>
  );
}
