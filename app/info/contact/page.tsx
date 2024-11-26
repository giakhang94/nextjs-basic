import Link from "next/link";

function ContactPage() {
  return (
    <div>
      <h1 className="text-7xl">Contact Page</h1>
      <Link
        href="/"
        className="text-lg text-blue-500 mx-5 my-3
      "
      >
        back to home
      </Link>
    </div>
  );
}

export default ContactPage;
