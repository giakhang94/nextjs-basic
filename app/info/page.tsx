import Link from "next/link";

function InfoPage() {
  return (
    <div className="text-7xl">
      <h1>Info Page</h1>
      <Link
        href="/info/contact"
        className="text-xl text-blue-500 inline-block mx-5 my-3"
      >
        Contact Page
      </Link>
    </div>
  );
}

export default InfoPage;
