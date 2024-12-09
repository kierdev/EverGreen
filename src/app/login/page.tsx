"use client";
import { useForm } from "react-hook-form";
import Navbar from "@/components/navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const onSubmit = async (data: LoginForm) => {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      router.push("/");
      localStorage.setItem("isAuthenticated", "true");
    });
  };

  return (
    <div className="bg-[#FFF3FF] h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <Image
          src="/logo.png" // Correct path to the image
          alt="Logo"
          width={500} // Specify the width
          height={500} // Specify the height
          className="border"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-1/2 border p-16 shadow-md rounded-lg flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email", {
                required: true,
              })}
              className="bg-[#D9D9D9] w-full px-2 py-4 rounded-xl"
            />
            {errors.email && <span>This field is required</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
              })}
              type="password"
              className="bg-[#D9D9D9] w-full px-2 py-4 rounded-xl"
            />
            {errors.password && (
              <span>
                This field is required and must be at least 8 characters
              </span>
            )}
          </div>
          <div className="flex w-full justify-between">
            <span>Forgot Password</span>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-[#90A955] px-4 py-2 text-white rounded"
              >
                Log in
              </button>

              <button className="bg-[#828282] px-4 py-2 text-white rounded">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
