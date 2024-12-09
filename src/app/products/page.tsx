"use client";
import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import { ProductCard } from "@/components/product-card";
import products from "../../data/database.json";
export default function Products() {
  return (
    <div>
      <Navbar />
      <section className="w-full  px-8 py-4">
        <h1 className="uppercase border-b border-black text-4xl w-full font-bold text-center p-2">
          Products
        </h1>{" "}
      </section>
      <section className="py-8">
        <h1 className="font-bold text-2xl w-full text-center p-4">
          Anniversary Flowers
        </h1>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full place-items-center">
          <ProductCard
            product_id={products[0].product_id}
            product_name={products[0].product_name}
            product_price={products[0].product_price}
            product_image={products[0].product_image}
          />
          <ProductCard
            product_id={products[1].product_id}
            product_name={products[1].product_name}
            product_price={products[1].product_price}
            product_image={products[1].product_image}
          />
          <ProductCard
            product_id={products[2].product_id}
            product_name={products[2].product_name}
            product_price={products[2].product_price}
            product_image={products[2].product_image}
          />
          <ProductCard
            product_id={products[3].product_id}
            product_name={products[3].product_name}
            product_price={products[3].product_price}
            product_image={products[3].product_image}
          />
        </div>
      </section>
      <section className="py-8">
        <h1 className="font-bold text-2xl w-full text-center p-4">
          Birthday Flowers
        </h1>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full place-items-center">
          <ProductCard
            product_id={products[4].product_id}
            product_name={products[4].product_name}
            product_price={products[4].product_price}
            product_image={products[4].product_image}
          />
          <ProductCard
            product_id={products[5].product_id}
            product_name={products[5].product_name}
            product_price={products[5].product_price}
            product_image={products[5].product_image}
          />
          <ProductCard
            product_id={products[6].product_id}
            product_name={products[6].product_name}
            product_price={products[6].product_price}
            product_image={products[6].product_image}
          />
          <ProductCard
            product_id={products[7].product_id}
            product_name={products[7].product_name}
            product_price={products[7].product_price}
            product_image={products[7].product_image}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
}
