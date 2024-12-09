"use client";

import Navbar from "@/components/navbar";
import { MapPin, Mail, Phone } from "lucide-react";
export default function ContactPage() {
  const handleSubmit = () => {
    console.log("test");
    alert("Submitted Successfully!");
  };
  return (
    <>
      <Navbar />
      <div className="w-full bg-[url('/about-tulip.jpg')] bg-no-repeat bg-cover bg-center bg-opacity-50 h-[40vh] flex items-center justify-center font-extrabold">
        <h1 className="text-[#85A43B] text-center text-6xl">Contact Us</h1>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2">
        <div className="flex flex-col items-center py-2 gap-4">
          <div className="inline-flex shadow-xl rounded-xl w-4/5 md:w-1/2 p-4 gap-2 border">
            <div className="bg-[#90A955] p-4 rounded-3xl aspect-square flex items-center justify-center">
              <MapPin className="w-full" />
            </div>
            <div className="flex flex-col">
              <span>Store Location</span>
              <span>1951 Bsop Street, Karuhatan</span>
            </div>
          </div>
          <div className="inline-flex shadow-xl rounded-xl w-4/5 md:w-1/2 p-4 gap-2 border">
            <div className="bg-[#90A955] p-4 rounded-3xl aspect-square flex items-center justify-center">
              <Mail className="w-full" />
            </div>
            <div className="flex flex-col">
              <span>Email</span>
              <span>evergreen@gmail.com</span>
            </div>
          </div>
          <div className="inline-flex shadow-xl rounded-xl w-4/5 md:w-1/2 p-4 gap-2 border">
            <div className="bg-[#90A955] p-4 rounded-3xl aspect-square flex items-center justify-center">
              <Phone className="w-full" />
            </div>
            <div className="flex flex-col">
              <span>Phone</span>
              <span>09238983490</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2 px-10 mt-4 pb-10">
          <h1 className="text-[#728C34]">Get in Touch</h1>
          <input
            type="text"
            placeholder="Name"
            className="w-full p-4 border border-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 border border-black"
          />
          <div className="flex w-full gap-2">
            <input
              type="text"
              placeholder="Subject"
              className="w-full p-4 border border-black"
            />
            <input
              type="text"
              placeholder="Number"
              className="w-full p-4 border border-black"
            />
          </div>
          <input
            type="text"
            placeholder="Message"
            className="w-full px-4 pt-4 pb-20 border border-black"
          />
          <button
            className="w-full p-4 border border-black"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
