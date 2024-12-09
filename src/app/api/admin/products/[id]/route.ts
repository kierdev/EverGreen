import { NextResponse, NextRequest } from "next/server";
import { db } from "../../../../../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
import { ProductType } from "@/app/types/ProductType";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../../../firebase/firebase";
export async function GET(request: NextRequest) {
  try {
    // Step 1: Extract product ID from URL query parameters
    const url = new URL(request.url); // Create a URL object from the request URL
    const productId = url.searchParams.get("id"); // Get the 'id' parameter from the URL

    if (!productId) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Step 2: Fetch the product document from Firestore using the provided ID
    const productDocRef = doc(db, "products", productId);
    const productDoc = await getDoc(productDocRef);

    // If the product does not exist, return a 404 response
    if (!productDoc.exists()) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Step 3: Get the product data from Firestore
    const productData = productDoc.data();
    const product: ProductType = {
      product_id: productDoc.id, // The document ID is assigned to product_id
      product_name: productData.product_name,
      product_price: productData.product_price,
      product_quantity: productData.product_quantity,
      product_image: productData.product_image || "", // product_image can be a File or a string URL
    };

    // Step 4: If the product_image is a File (null or undefined is also treated as File),
    // fetch its URL from Firebase Storage
    if (product.product_image && typeof product.product_image === "string") {
      // If product_image is already a string (URL), no need to fetch it
      product.product_image = product.product_image;
    } else if (product.product_image) {
      // If it's a File object, you would need to get the URL from Firebase Storage
      const imageRef = ref(storage, `images/${product.product_name}.jpg`); // Image path, adjust based on your storage structure
      const imageUrl = await getDownloadURL(imageRef); // Fetch the image URL from Firebase Storage
      product.product_image = imageUrl; // Update the product object with the image URL
    }

    // Step 5: Return the product data along with the image URL (if fetched)
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
}
