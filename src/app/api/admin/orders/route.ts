import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";

type OrderType = {
  user_info: {
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
  };
  cart_items: {
    product_id: string;
    product_name: string;
    product_price: number;
    product_quantity: number;
    product_image: string;
  }[];
  total_amount: number;
  order_status: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const orderData: OrderType = {
      user_info: body.user_info,
      cart_items: body.cart_items,
      total_amount: body.total_amount,
      order_status: "Pending", // Set default status or change based on your logic
    };

    // Add the order to Firestore
    const orderRef = await addDoc(collection(db, "orders"), orderData);

    return NextResponse.json(
      { message: "Order placed successfully", order_id: orderRef.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding order: ", error);
    return NextResponse.json(
      { message: "Error placing order", error },
      { status: 500 }
    );
  }
}
