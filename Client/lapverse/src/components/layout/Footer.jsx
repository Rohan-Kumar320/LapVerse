import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative bg-background border-t border-border">

      {/* Top Border */}

      <div className="h-1 w-full bg-linear-to-r from-primary via-purple-500 to-accent"></div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Company */}

          <div>

            <h2 className="text-3xl font-bold">
              LapVerse
            </h2>

            <p className="mt-4 text-text-secondary leading-7">

              Discover premium laptops from the world's
              leading brands.

              Built for students, gamers,
              professionals and creators.

            </p>

          </div>

          {/* Links */}

          <div>

            <h3 className="font-semibold text-xl mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <Link to="/">Home</Link>

              <Link to="/products">Products</Link>

              <Link to="/wishlist">Wishlist</Link>

              <Link to="/cart">Cart</Link>

            </div>

          </div>

          {/* Customer */}

          <div>

            <h3 className="font-semibold text-xl mb-5">
              Customer
            </h3>

            <div className="flex flex-col gap-3">

              <Link to="#">Contact Us</Link>

              <Link to="#">Privacy Policy</Link>

              <Link to="#">Terms & Conditions</Link>

              <Link to="#">FAQs</Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="font-semibold text-xl mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-text-secondary">

              <div className="flex gap-3">

                <FiMail className="mt-1" />

                support@lapverse.com

              </div>

              <div className="flex gap-3">

                <FiPhone className="mt-1" />

                +92 300 1234567

              </div>

              <div className="flex gap-3">

                <FiMapPin className="mt-1" />

                Karachi, Pakistan

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-14 border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex gap-5 text-2xl">

            <a href="#">
              <FiFacebook />
            </a>

            <a href="#">
              <FiInstagram />
            </a>

            <a href="#">
              <FiLinkedin />
            </a>

            <a href="#">
              <FiGithub />
            </a>

          </div>

          <p className="text-text-secondary text-center">

            © {new Date().getFullYear()} LapVerse.
            All Rights Reserved.

          </p>

          <button
            onClick={scrollTop}
            className="rounded-full bg-primary p-3 hover:bg-primary-hover transition"
          >

            <FiArrowUp />

          </button>

        </div>

      </div>

    </footer>
  );
};

export default Footer;