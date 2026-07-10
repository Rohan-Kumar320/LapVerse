import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import heroimage from "../../assets/images/heroimage.jpg"

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-surface to-[#1E1B4B]">

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">

        <div className="grid lg:grid-cols-2 items-center gap-14">

          {/* Left Content */}

          <div>

            <span className="inline-flex items-center rounded-full border border-indigo-500/40 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
              🚀 Premium Laptop Marketplace
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight text-white">

              Discover

              <span className="block bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">

                Your Next Laptop

              </span>

            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-300">

              From gaming powerhouses to sleek ultrabooks,
              explore thousands of laptops from trusted brands,
              all in one place.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Link
                to="/products"
                className="inline-flex items-center gap-3 rounded-full bg-indigo-600 hover:bg-indigo-700 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105"
              >
                Shop Now
                <FiArrowRight />
              </Link>

              <Link
                to="/products"
                className="rounded-full border border-gray-700 px-8 py-4 text-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Explore Products
              </Link>

            </div>

          </div>

          {/* Right Content */}

          <div className="relative flex justify-center">

            <div className="absolute h-80 w-80 rounded-full bg-indigo-600 blur-[120px] opacity-30"></div>

            <img
              src={heroimage}
              alt="Laptop"
              className="relative w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-800 object-cover"
            />

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;