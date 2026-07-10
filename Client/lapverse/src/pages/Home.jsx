import FeaturedBrands from "../components/home/FeaturedBrands";
import Hero from "../components/home/Hero";
import Categories from "../components/home/sections/Categories";
import FeaturedProducts from "../components/home/sections/FeaturedProducts";
import LatestArrivals from "../components/home/sections/LatestArrivals";
import WhyChooseUs from "../components/home/sections/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedBrands />
      <FeaturedProducts />
      <Categories />
      <LatestArrivals />
      <WhyChooseUs />
    </>
  );
};

export default Home;