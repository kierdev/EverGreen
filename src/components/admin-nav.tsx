import Link from "next/link";
export const AdminNav = () => {
  return (
    <nav className=" w-full px-8 py-2 bg-[#90A955] flex items-center justify-end p-2">
      <div className="flex gap-2 place-self-end">
        <Link href={"/admin/inventory"}>Inventory</Link>
        <Link href={"/admin/orders"}>Orders</Link>
      </div>
    </nav>
  );
};
