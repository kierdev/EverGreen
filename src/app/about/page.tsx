import { Footer } from "@/components/footer";
import Navbar from "@/components/navbar";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div>
      <Navbar />
      <div className="w-full bg-[url('/about-tulip.jpg')] bg-no-repeat bg-cover bg-center h-[40vh] flex items-center justify-center font-extrabold">
        <h1 className="text-[#ECF39E] text-center text-6xl">Learn About Us</h1>
      </div>
      <section className="flex flex-col-reverse md:flex-row w-full p-4 items-center justify-between">
        <div className="w-full md:w-2/3 text-2xl text-justify md:text-right md:pl-20">
          At <span className="text-[#5D8500]">Evergreen</span>, we believe in
          the timeless beauty of nature and the power of flowers to convey
          emotions, celebrate moments, and create lasting memories. Whether it’s
          a romantic gesture, a joyful celebration, or a comforting expression
          of sympathy, we’re here to help you find the perfect arrangement that
          speaks from the heart.
        </div>
        <div className="w-full md:w-1/3">
          <Image
            src={"/logo/4.png"}
            width={500}
            height={500}
            alt="evergreen logo"
            className="w-3/4"
          />
        </div>
      </section>
      <section className="flex w-full flex-col">
        <div className="w-full flex text-4xl flex-col md:flex-row justify-center items-center">
          Why choose
          <span className="text-5xl px-2 text-[#85A43B]">Evergreen</span>?
        </div>
        <div className="flex items-center gap-2 flex-col md:flex-row justify-evenly w-full md:w-5/6 self-center p-8 h-full">
          <div className="flex w-full md:w-1/2 items-center justify-center">
            <Image
              src={"/about-flower.png"}
              width={500}
              height={500}
              alt="evergreen logo"
              className="w-full md:w-3/4 rounded-md"
            />
          </div>
          <div className="flex flex-col justify-between gap-6 h-full w-full md:w-1/2">
            <div>
              <span className="text-[#85A43B] text-3xl mr-2">
                Fresh and Sustainable:
              </span>
              <span className="text-2xl">
                We take pride in offering blooms that are vibrant, fragrant, and
                responsibly sourced.
              </span>
            </div>
            <div>
              <span className="text-[#85A43B] text-3xl mr-2">
                Custom Creations:
              </span>
              <span className="text-2xl">
                From classic bouquets to unique arrangements, we design to suit
                your needs.
              </span>
            </div>
            <div>
              <span className="text-[#85A43B] text-3xl mr-2">
                Unmatched Care:
              </span>
              <span className="text-2xl">
                Your satisfaction is our priority, from the quality of our
                flowers to the seamless service we provide.
              </span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
