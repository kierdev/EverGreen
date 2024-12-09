import { NextResponse, NextRequest } from "next/server";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../../../firebase/firebase";
import { ProductType } from "@/app/types/ProductType";
import { storage } from "../../../../../firebase/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

export async function POST(request: NextRequest) {
  try {
    // Step 1: Parse the request body to get product data
    const body = await request.json();

    // Step 2: Validate the input (you can adjust validation based on your needs)
    if (
      !body.product_name ||
      !body.product_price ||
      !body.product_quantity ||
      !body.product_image
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Step 3: Prepare the image for upload (if provided as File)
    const imageFile = body.product_image;
    const imageRef = ref(storage, `images/${body.product_name}-${Date.now()}`); // Unique image path using product name and timestamp

    // Step 4: Upload the image to Firebase Storage
    const uploadResult = await uploadBytes(imageRef, imageFile);

    // Step 5: Get the image URL from Firebase Storage
    const imageUrl = await getDownloadURL(uploadResult.ref);

    // Step 6: Add product data to Firestore (along with image URL)
    const newProduct: ProductType = {
      product_name: body.product_name,
      product_price: parseFloat(body.product_price), // Ensure price is a number
      product_quantity: parseInt(body.product_quantity), // Ensure quantity is an integer
      product_image: imageUrl, // Store image URL from Firebase Storage
    };

    // Step 7: Add the new product to Firestore
    await addDoc(collection(db, "products"), newProduct);

    // Step 8: Return success response
    return NextResponse.json(
      { message: "Product created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Step 1: Get all products from Firestore
    const productsCollectionRef = collection(db, "products");
    const querySnapshot = await getDocs(productsCollectionRef);

    // Step 2: Process each product and fetch image URLs if necessary
    const products: ProductType[] = [];

    for (const docSnapshot of querySnapshot.docs) {
      const productData = docSnapshot.data();
      const product: ProductType = {
        product_id: docSnapshot.id, // Use the document ID as the product_id
        product_name: productData.product_name,
        product_price: productData.product_price,
        product_quantity: productData.product_quantity,
        product_image: productData.product_image || "", // product_image can be a File or a string URL
      };

      // Step 3: Handle the product_image (if it's a File, fetch the URL from Firebase Storage)
      if (product.product_image && typeof product.product_image === "string") {
        // If product_image is already a string (URL), no need to fetch it
        product.product_image = product.product_image;
      } else if (product.product_image) {
        // If it's a File object, fetch the URL from Firebase Storage
        const imageRef = ref(storage, `images/${product.product_name}.jpg`); // Adjust based on your storage structure
        try {
          const imageUrl = await getDownloadURL(imageRef); // Fetch the image URL from Firebase Storage
          product.product_image = imageUrl; // Update the product object with the image URL
        } catch (error) {
          console.error("Error fetching image URL:", error);
          product.product_image = ""; // If image retrieval fails, leave it empty
        }
      }

      // Step 4: Add the processed product to the products array
      products.push(product);
    }

    // Step 5: Return the list of products
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching the products" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Step 1: Parse the request body to get updated product data
    const body = await request.json();

    // Step 2: Validate input fields
    if (!body.product_id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    if (
      !body.product_name &&
      !body.product_price &&
      !body.product_quantity &&
      !body.product_image
    ) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    // Step 3: Check if a new image is provided for upload
    let imageUrl: string | undefined = undefined;
    if (body.product_image && body.product_image instanceof File) {
      const imageRef = ref(
        storage,
        `images/${body.product_name}-${Date.now()}`
      ); // Unique image path
      const uploadResult = await uploadBytes(imageRef, body.product_image);
      imageUrl = await getDownloadURL(uploadResult.ref); // Get image URL after upload
    }

    // Step 4: Prepare the updated product data
    const updatedProduct: ProductType = {
      product_name: body.product_name || undefined, // Keep previous if not provided
      product_price: body.product_price
        ? parseFloat(body.product_price)
        : undefined,
      product_quantity: body.product_quantity
        ? parseInt(body.product_quantity)
        : undefined,
      product_image: imageUrl || undefined, // Set the image URL if new image is uploaded
    };

    // Step 5: Update the product in Firestore
    const productDocRef = doc(db, "products", body.product_id); // Reference to the document by product ID
    await updateDoc(productDocRef, updatedProduct);

    // Step 6: Return success response
    return NextResponse.json(
      { message: "Product updated successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}
export async function DELETE(request: NextRequest) {
  try {
    // Step 1: Parse the product ID from the request
    const { product_id } = await request.json();

    // Step 2: Validate the product ID
    if (!product_id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Step 3: Get the product document reference from Firestore
    const productDocRef = doc(db, "products", product_id);

    // Step 4: Fetch the product data to get the image URL (if any)
    const productDoc = await productDocRef.get();
    if (!productDoc.exists) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const productData = productDoc.data();
    const imageUrl = productData?.product_image;

    // Step 5: Delete the product document from Firestore
    await deleteDoc(productDocRef);

    // Step 6: If the product has an image URL, delete it from Firebase Storage
    if (imageUrl) {
      const imageRef = ref(storage, imageUrl); // Use the stored image URL
      await deleteObject(imageRef); // Delete the image from Firebase Storage
    }

    // Step 7: Return success response
    return NextResponse.json(
      { message: "Product deleted successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
