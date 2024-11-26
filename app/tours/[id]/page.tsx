import mapsImg from "@/images/map.jpg";
import Image from "next/image";
const url = "https://www.course-api.com/images/tours/tour-1.jpeg";
console.log(mapsImg);
function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 className="text-4xl">ID: {params.id}</h1>
      <section className="flex gap-x-4 mt-4">
        {/* local image */}
        <div>
          <Image
            src={mapsImg}
            alt="maps"
            className="w-48 h-48 object-cover rounded"
            width={192}
            height={192}
            priority
          />
          <h2>Local Image</h2>
        </div>
        {/* remote image */}
        <div>
          <Image
            src={url}
            width={192}
            height={192}
            alt="tour"
            className="w-48 h-48"
          />
        </div>
      </section>
    </div>
  );
}
export default Page;
