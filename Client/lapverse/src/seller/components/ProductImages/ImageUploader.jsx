import { useRef } from "react";
import {
  FiUploadCloud,
} from "react-icons/fi";

const MAX_IMAGES = 5;

const ImageUploader = ({
  images,
  setImages,
}) => {

  const inputRef = useRef(null);

  //------------------------------------

  const handleFiles = (files) => {

    const selected =
      Array.from(files);

    if (!selected.length) return;

    if (
      images.length +
        selected.length >
      MAX_IMAGES
    ) {

      alert(
        `Maximum ${MAX_IMAGES} images allowed.`
      );

      return;

    }

const formattedImages = selected.map((file) => ({

  id: crypto.randomUUID(),

  file,

  preview: URL.createObjectURL(file),

  existing: false,

}));

setImages([
  ...images,
  ...formattedImages,
]);
  };

  //------------------------------------

  const handleDrop = (e) => {

    e.preventDefault();

    handleFiles(e.dataTransfer.files);

  };

  //------------------------------------

  return (

    <div

      onClick={() =>
        inputRef.current.click()
      }

      onDragOver={(e) =>
        e.preventDefault()
      }

      onDrop={handleDrop}

      className="
        cursor-pointer
        rounded-3xl
        border-2
        border-dashed
        border-primary/30
        bg-primary/5
        p-14
        text-center
        transition-all
        duration-300
        hover:border-primary
        hover:bg-primary/10
      "

    >

      <FiUploadCloud

        size={65}

        className="
          mx-auto
          text-primary
        "

      />

      <h2 className="mt-6 text-2xl font-bold">

        Upload Product Images

      </h2>

      <p className="mt-3 text-text-secondary">

        Drag & Drop your laptop images

      </p>

      <p className="mt-2 text-text-secondary">

        or click here to browse

      </p>

      <p className="mt-5 font-semibold text-primary">

        Maximum 5 Images

      </p>

      <input

        ref={inputRef}

        hidden

        multiple

        type="file"

        accept="image/*"

        onChange={(e)=>

          handleFiles(e.target.files)

        }

      />

    </div>

  );

};

export default ImageUploader;