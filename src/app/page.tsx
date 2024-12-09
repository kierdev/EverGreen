"use client";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import products from "./../data/database.json";

export default function Home() {
  return (
    <>
      <Navbar />
      <div
        className="h-[80vh] flex bg-[url('/flower-bg.png')] bg-no-repeat bg-cover bg-center border items-center justify-center md:justify-end font-montserrat
      "
      >
        <div className="flex flex-col px-10">
          <h1 className="text-3xl lg:text-6xl">For Mother&apos;s Day</h1>
          <span className="text-xl lg:text-2xl">Exclusive offer-15% off</span>
          <div className="mt-4">
            <a
              href="/products"
              className="bg-[#90A955] inline text-sm md:text-2xl px-4 py-2 text-white rounded"
            >
              Buy now
            </a>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-bold text-3xl p-4">Best Sellers</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center items-center gap-4 md:px-16 py-4">
          <ProductCard
            product_id={products[8].product_id}
            product_name={products[8].product_name}
            product_price={products[8].product_price}
            product_image={products[8].product_image}
          />
          <ProductCard
            product_id={products[9].product_id}
            product_name={products[9].product_name}
            product_price={products[9].product_price}
            product_image={products[9].product_image}
          />
          <ProductCard
            product_id={products[10].product_id}
            product_name={products[10].product_name}
            product_price={products[10].product_price}
            product_image={products[10].product_image}
          />
          <ProductCard
            product_id={products[11].product_id}
            product_name={products[11].product_name}
            product_price={products[11].product_price}
            product_image={products[11].product_image}
          />
          <ProductCard
            product_id={products[12].product_id}
            product_name={products[12].product_name}
            product_price={products[12].product_price}
            product_image={products[12].product_image}
          />
          <ProductCard
            product_id={products[13].product_id}
            product_name={products[13].product_name}
            product_price={products[13].product_price}
            product_image={products[13].product_image}
          />
          <ProductCard
            product_id={products[14].product_id}
            product_name={products[14].product_name}
            product_price={products[14].product_price}
            product_image={products[14].product_image}
          />
          <ProductCard
            product_id={products[15].product_id}
            product_name={products[15].product_name}
            product_price={products[15].product_price}
            product_image={products[15].product_image}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
