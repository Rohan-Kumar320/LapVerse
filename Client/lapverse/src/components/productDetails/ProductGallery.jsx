import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
} from "react-icons/fi";
import ImageModal from "../ui/ImageModal";

const ProductGallery = ({ product }) => {
  const images = product.images || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
  }, [product]);

  if (!images.length) {
    return (
      <div className="aspect-square rounded-3xl border border-border bg-card flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  const previousImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="space-y-6">

        {/* Main Image */}

        <div
          className="
            relative
            aspect-square
            rounded-3xl
            border
            border-border
            bg-card
            overflow-hidden
            shadow-xl
          "
        >

          <img
            src={images[currentIndex].url}
            alt={product.title}
            onClick={() => setShowModal(true)}
            className="
              h-full
              w-full
              cursor-zoom-in
              object-contain
              p-8
              transition-transform
              duration-500
              hover:scale-105
            "
          />

          {/* Expand */}

          <button
            onClick={() => setShowModal(true)}
            className="
              absolute
              top-4
              right-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:bg-primary
              hover:scale-110
            "
          >
            <FiMaximize2 size={18} />
          </button>

          {/* Previous */}

          {images.length > 1 && (
            <button
              onClick={previousImage}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:bg-primary
                hover:scale-110
              "
            >
              <FiChevronLeft size={22} />
            </button>
          )}

          {/* Next */}

          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                z-20
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-full
                bg-black
                text-white
                shadow-xl
                transition-all
                duration-300
                hover:bg-primary
                hover:scale-110
              "
            >
              <FiChevronRight size={22} />
            </button>
          )}

        </div>

        {/* Thumbnails */}

        {images.length > 1 && (

          <div className="flex gap-4 overflow-x-auto premium-scrollbar pb-2">

            {images.map((image, index) => (

              <button
                key={image.public_id || index}
                onClick={() => setCurrentIndex(index)}
                className={`
                  relative
                  h-24
                  w-24
                  flex-shrink-0
                  rounded-2xl
                  bg-card
                  overflow-hidden
                  transition-all
                  duration-300

                  ${
                    currentIndex === index
                      ? "ring-2 ring-primary scale-105"
                      : "ring-1 ring-border hover:ring-primary"
                  }
                `}
              >

                <img
                  src={image.url}
                  alt=""
                  className="h-full w-full object-contain p-2"
                />

              </button>

            ))}

          </div>

        )}

      </div>

      <ImageModal
        open={showModal}
        onClose={() => setShowModal(false)}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
        title={product.title}
      />
    </>
  );
};

export default ProductGallery;