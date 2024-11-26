import Link from "next/link";

function Navbar() {
  return (
    <nav className="max-w-3xl mx-auto py-4 flex gap-x-4 border-b-2 border-b-gray-300">
      <Link href="/" className="">
        Home
      </Link>
      <Link href="/counter" className="">
        Counter
      </Link>
      <Link href="/tours" className="">
        Tours
      </Link>
      <Link href="/actions" className="">
        Action
      </Link>
    </nav>
  );
}

export default Navbar;
