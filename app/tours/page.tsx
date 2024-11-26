// import Image from "next/image";

import Image from "next/image";
import Link from "next/link";

const url = "https://www.course-api.com/react-tours-project";

type Tour = {
  id: string;
  info: string;
  name: string;
  image: string;
  price: string;
};

const fetchTours = async () => {
  await new Promise((resolve) => {
    return setTimeout(resolve, 3000);
  }); // delay 3s
  const response = await fetch(url);
  const data: Tour[] = await response.json();

  return data;
};

async function ToursPage() {
  const data = await fetchTours();
  return (
    <section>
      <h1 className="text-3xl mb-4">Tours</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {data.map((tour: Tour) => {
          return (
            <Link
              href={`/tours/${tour.id}`}
              key={tour.id}
              className=" my-1 hover:text-blue-500 hover:font-semibold transition-all"
            >
              <div className="relative h-48 mb-2">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  priority
                  sizes="(max-width: 786px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover rounded"
                />
              </div>
              <div>
                <p>{tour.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
export default ToursPage;
