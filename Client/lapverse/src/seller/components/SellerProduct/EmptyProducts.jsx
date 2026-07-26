import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const EmptyProducts = () => {

  const navigate = useNavigate();

  return (

    <div
      className="
        rounded-3xl
        border
        border-dashed
        border-border
        bg-card
        px-8
        py-24
        text-center
      "
    >

      <div className="text-7xl">

        📦

      </div>

      <h2 className="mt-6 text-3xl font-bold">

        No Products Yet

      </h2>

      <p className="mx-auto mt-4 max-w-lg text-text-secondary">

        Your inventory is empty.
        Add your first laptop listing
        to start selling on LapVerse.

      </p>

      <button

        onClick={() =>
          navigate("/seller/add-product")
        }

        className="
          mt-10
          inline-flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-primary
          to-blue-600
          px-8
          py-4
          font-semibold
          text-white
          shadow-lg
          transition
          hover:scale-[1.03]
        "

      >

        <FiPlusCircle />

        Add First Product

      </button>

    </div>

  );

};

export default EmptyProducts;