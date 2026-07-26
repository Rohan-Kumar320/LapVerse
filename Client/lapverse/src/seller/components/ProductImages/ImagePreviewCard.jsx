import {
  FiTrash2,
  FiStar,
  FiMove,
} from "react-icons/fi";

const ImagePreviewCard = ({
  file,
  index,
  isCover,
  onDelete,
  onSetCover,
  dragAttributes,
  dragListeners,
}) => {

  const imageSrc = file.existing
  ? file.url
  : file.preview;

  return (

    <div
      className="
        overflow-hidden
        rounded-3xl
        border
        border-border
        bg-card
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >

      {/* Image */}

      <div className="relative">

<img
  src={imageSrc}
  alt={`Product ${index + 1}`}
  className="
    h-56
    w-full
    object-cover
  "
/>
        {isCover && (

          <div
            className="
              absolute
              left-3
              top-3
              rounded-full
              bg-primary
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >

            ⭐ Cover Image

          </div>

        )}

        {/* Drag Handle */}

        <button
          type="button"
          className="
            absolute
            right-3
            top-3
            flex
            h-10
            w-10
            cursor-grab
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-gray-700
            shadow-lg
            transition
            hover:bg-primary
            hover:text-white
            active:cursor-grabbing
          "
          {...dragAttributes}
          {...dragListeners}
        >

          <FiMove size={18} />

        </button>

      </div>

      {/* Footer */}

      <div className="space-y-4 p-5">

        <p className="font-semibold">

          Image {index + 1}

        </p>

        <div className="flex gap-3">

          {!isCover && (

            <button
              type="button"
              onClick={onSetCover}
              className="
                flex-1
                rounded-xl
                border
                border-primary
                py-2
                text-sm
                font-medium
                text-primary
                transition
                hover:bg-primary
                hover:text-white
              "
            >

              <span className="flex items-center justify-center gap-2">

                <FiStar />

                Set Cover

              </span>

            </button>

          )}

          <button
            type="button"
            onClick={onDelete}
            className="
              rounded-xl
              bg-red-500/10
              p-3
              text-red-500
              transition
              hover:bg-red-500
              hover:text-white
            "
          >

            <FiTrash2 />

          </button>

        </div>

      </div>

    </div>

  );

};

export default ImagePreviewCard;