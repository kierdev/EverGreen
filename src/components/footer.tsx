import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-[#777777] text-white flex flex-col gap-4 p-4 md:flex-row md:justify-around">
      <Image
        src="/logo/4.png" // Correct path to the image
        alt="Logo"
        width={100} // Specify the width
        height={100} // Specify the height
      />
      <div className="flex flex-col px-4">
        <Link href="/">Home</Link>
        <Link href="/products">Products</Link>
        <Link href="/about">About</Link>
        <Link href="/contacts">Contacts</Link>
      </div>
      <div className="px-4 flex flex-col gap-4">
        <h1 className="text-xl">Address</h1>
        <h2>
          Progressive Village, Llano Road, Progressive Village 1, Barangay 167
          Caloocan City
        </h2>
      </div>
    </footer>
  );
};
