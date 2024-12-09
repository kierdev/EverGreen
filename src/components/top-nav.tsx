import Link from "next/link";
import { useRouter } from "next/navigation";
export const TopNav = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const router = useRouter();

  return (
    <div className="w-full bg-[#ECF39E]flex items-center justify-end p-2">
      {!isAuthenticated ? (
        <span className="flex gap-2 place-self-end">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </span>
      ) : (
        <span className="flex gap-2 place-self-end">
          <Link href="/checkout">Cart</Link>
          <span
            className="pointer-cursor"
            onClick={() => {
              router.push("/login");
              localStorage.removeItem("isAuthenticated");
            }}
          >
            Logout
          </span>
        </span>
      )}
    </div>
  );
};
