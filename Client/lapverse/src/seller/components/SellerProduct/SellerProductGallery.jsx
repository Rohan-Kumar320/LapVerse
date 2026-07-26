import { useState } from "react";

const SellerProductGallery = ({ images = [] }) => {

  const [activeImage, setActiveImage] =
    useState(0);

  if (!images.length) {

    return (

      <div
        className="
          flex
          h-96
          items-center
          justify-center
          rounded-3xl
          border
          border-border
          bg-card
        "
      >

        No Images

      </div>

    );

  }

  return (

    <div className="space-y-5">

      {/* Main Image */}

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-border
          bg-card
        "
      >

        <img
          src={images[activeImage].url}
          alt="Product"
          className="
            h-[500px]
            w-full
            object-cover
          "
        />

      </div>

      {/* Thumbnails */}

      <div
        className="
          grid
          grid-cols-5
          gap-4
        "
      >

        {images.map((image, index) => (

          <button
            key={image.public_id}
            onClick={() =>
              setActiveImage(index)
            }
            className={`
              overflow-hidden
              rounded-2xl
              border
              transition

              ${
                activeImage === index

                  ? "border-primary ring-2 ring-primary"

                  : "border-border"
              }
            `}
          >

            <img
              src={image.url}
              alt=""
              className="
                h-24
                w-full
                object-cover
              "
            />

          </button>

        ))}

      </div>

    </div>

  );

};

export default SellerProductGallery;