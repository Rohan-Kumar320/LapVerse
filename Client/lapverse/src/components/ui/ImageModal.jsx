import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";

const ImageModal = ({
  open,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
  title,
}) => {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, images.length, onClose, setCurrentIndex]);

  if (!open) return null;

  const previous = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999999] bg-black/95 backdrop-blur-md"
    >
      {/* Wrapper */}

      <div className="relative flex h-full w-full items-center justify-center px-20">

        {/* Close */}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="
            absolute
            top-10
            right-10
            z-999999
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-gray-800
            text-white
            shadow-2xl
            transition-all
            duration-300
            hover:bg-primary
            hover:text-white
            hover:rotate-90
          "
        >
          <FiX size={28} />
        </button>

        {/* Previous */}

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              previous();
            }}
            className="
              absolute
              left-8
              top-1/2
              z-[999999]
              -translate-y-1/2
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              shadow-xl
              transition
              hover:bg-primary
            "
          >
            <FiChevronLeft size={30} />
          </button>
        )}

        {/* Image */}

        <div
          onClick={(e) => e.stopPropagation()}
          className="
            flex
            items-center
            justify-center
            max-h-[80vh]
            max-w-[78vw]
          "
        >
          <img
            src={images[currentIndex].url}
            alt={title}
            draggable={false}
            className="
              max-h-[80vh]
              max-w-[78vw]
              object-contain
              rounded-2xl
              select-none
            "
          />
        </div>

        {/* Next */}

        {images.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="
              absolute
              right-8
              top-1/2
              z-[999999]
              -translate-y-1/2
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-black
              text-white
              shadow-xl
              transition
              hover:bg-primary
            "
          >
            <FiChevronRight size={30} />
          </button>
        )}

        {/* Counter */}

        <div
          className="
            absolute
            bottom-8
            rounded-full
            bg-black/70
            px-5
            py-2
            text-white
            font-semibold
            backdrop-blur
          "
        >
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;