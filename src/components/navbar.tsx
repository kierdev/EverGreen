"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { TopNav } from "./top-nav";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav>
      {/* Conditional rendering for TopNav based on authentication */}
      <TopNav />

      {/* Desktop Navbar */}
      <div className="hidden w-full px-8 py-2 bg-[#90A955] md:flex justify-between items-center">
        <Image
          src="/logo/nav.png" // Correct path to the image
          alt="Logo"
          width={100}
          height={100}
        />
        <ul className="flex gap-6">
          <li>
            <Link
              className={`uppercase ${
                pathname === "/" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase ${
                pathname === "/products" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase ${
                pathname === "/about" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase ${
                pathname === "/contact" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/contact"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar (Hamburger Menu) */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#90A955] md:hidden">
        <Image src="/logo/nav.png" alt="Logo" width={80} height={80} />
        <button className="text-white text-3xl" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 md:hidden transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
        onClick={toggleMenu}
      >
        <div
          className="flex justify-between items-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src="/logo/nav.png" alt="Logo" width={80} height={80} />
          <button className="text-white text-3xl" onClick={toggleMenu}>
            ×
          </button>
        </div>
        <ul className="flex flex-col items-center text-white">
          <li>
            <Link
              className={`uppercase py-4 ${
                pathname === "/" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase py-4 ${
                pathname === "/products" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/products"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase py-4 ${
                pathname === "/about" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/about"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className={`uppercase py-4 ${
                pathname === "/contact" ? "text-[#4E71B1]" : "text-white"
              }`}
              href="/contact"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
