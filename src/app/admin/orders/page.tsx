"use client";
import { AdminNav } from "@/components/admin-nav";
import orders from "../../../data/orders.json";
export default function Orders() {
  console.log(orders);
  return (
    <>
      <AdminNav />
      <h1 className="text-3xl p-4">Orders</h1>
      <div className="w-full">
        {orders.map((order, index) => {
          return (
            <div
              key={index}
              className="rounded border gap-2 flex flex-col justify-center p-4"
            >
              <div className=" p-4 mx-2 grid grid-cols-2">
                <div className="font-bold">{order.customer_name}</div>
                <div>
                  {order.products.map((product, index) => {
                    return (
                      <div key={index} className="w-full grid grid-cols-2">
                        <div className="flex gap-2">
                          <span>{product.product_quantity} </span>
                          <span>{product.product_name}</span>
                        </div>
                        <div>
                          {product.product_price * product.product_quantity}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <button className="w-3/4 mx-auto p-4 rounded bg-green-600 text-white">
                Done
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
