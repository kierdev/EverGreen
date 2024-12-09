"use client";
import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();
  const onSubmit = async (data: RegisterForm) => {
    console.log(data);
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((data) => {
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#FFF3FF] h-screen">
      <Navbar />
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-1/2 border p-16 shadow-md rounded-lg flex flex-col gap-4"
        >
          <div className="flex gap-4 justify-between">
            <div className="flex flex-col gap-2 flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: true,
                })}
                className="bg-[#D9D9D9] w-full px-2 py-4 rounded-xl"
              />
              {errors.firstName && <span>This field is required</span>}
            </div>
            <div className="flex flex-col gap-2 flex-grow">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: true,
                })}
                className="bg-[#D9D9D9] w-full px-2 py-4 rounded-xl"
              />
              {errors.lastName && <span>This field is required</span>}
            </div>
          </div>
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
          <div className="flex w-full justify-center">
            <button
              type="submit"
              className="bg-[#85A43B] flex text-white px-4 py-2 rounded-xl"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
