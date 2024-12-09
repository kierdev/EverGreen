"use client";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ProductType } from "@/app/types/ProductType";
import { AdminNav } from "@/components/admin-nav";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function AdminPage() {
  const [products, setProducts] = useState<ProductType[]>();
  const { register, handleSubmit } = useForm<ProductType>();
  const [productFile, setProductFile] = useState<File | null>(null);
  const [productFileError, setProductFileError] = useState<string>("");

  useEffect(() => {}, []);

  const fetchProducts = async () => {
    await fetch("/api/admin/products", {
      method: "GET",
      body: JSON.stringify(formData),
    }).then((data: any) => {
      setProducts(data.data);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProductFileError("");

    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        setProductFileError("Please upload a JPG, JPEG, or PNG file");
        return;
      }

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        setProductFileError("File size must be less than 2MB");
        return;
      }

      setProductFile(file);
    }
  };
  const onSubmit: SubmitHandler<ProductType> = async (data: ProductType) => {
    const formData = new FormData();
    formData.append("product_name", data.product_name);
    formData.append("product_price", data.product_price.toString());
    formData.append("product_quantity", data.product_quantity.toString());

    if (productFile) {
      formData.append("product_image", productFile);
    }
    await fetch("/api/admin/products", {
      method: "POST",
      body: JSON.stringify(formData),
    });
  };

  return (
    <div>
      <AdminNav />
      <section>{}</section>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>

            <form
              className="w-full flex flex-col gap-2 p-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                {...register("product_name")}
                type="text"
                placeholder="Product Name"
              />
              <Input
                {...register("product_price")}
                type="text"
                placeholder="Product Price"
              />
              <Input
                {...register("product_quantity")}
                type="text"
                placeholder="Product Quantity"
              />

              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="cursor-pointer w-64"
              />

              <Button type="submit">Save</Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <h1 className="text-3xl p-4">Inventory</h1>
    </div>
  );
}
