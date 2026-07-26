import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import ImageUploader from "./ProductImages/ImageUploader";
import ImagePreviewCard from "./ProductImages/ImagePreviewCard";
import SortableImage from "./ProductImages/SortableImage";


const ProductImages = ({
  images,
  setImages,
  removeExistingImage = () => {},
  errors
}) => {

  //-----------------------------------------

  const handleDragEnd = (event) => {

    const {
      active,
      over,
    } = event;

    if (!over) return;

    if (active.id === over.id) return;

    const oldIndex =
      images.findIndex(
        (image) =>
          image.id === active.id
      );

    const newIndex =
      images.findIndex(
        (image) =>
          image.id === over.id
      );

    setImages(
      arrayMove(
        images,
        oldIndex,
        newIndex
      )
    );

  };

  //-----------------------------------------

const removeImage = (image) => {

  if (image.existing) {

    removeExistingImage(image.public_id);

    return;

  }

  setImages((prev) =>

    prev.filter(

      (item) =>

        item.id !== image.id

    )

  );

};  //-----------------------------------------

  const setCoverImage = (id) => {

    const index =
      images.findIndex(

        (image) =>
          image.id === id

      );

    if (index === -1) return;

    const reordered =
      arrayMove(
        images,
        index,
        0
      );

    setImages(reordered);

  };

  //-----------------------------------------

  return (

    <div className="space-y-8">

      <ImageUploader

        images={images}

        setImages={setImages}

      />

      {errors?.images && (
  <p className="mt-3 text-sm text-red-500">
    {errors.images}
  </p>
)}

      {images.length > 0 && (

        <>

          <div className="flex items-center justify-between">

            <h3 className="font-semibold">

              Uploaded Images

            </h3>

            <span className="font-bold text-primary">

              {images.length}/5

            </span>

          </div>

          <DndContext

            collisionDetection={
              closestCenter
            }

            onDragEnd={
              handleDragEnd
            }

          >

            <SortableContext

              items={images.map(
                (image) =>
                  image.id
              )}

              strategy={
                rectSortingStrategy
              }

            >

              <div
                className="
                  grid
                  gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                "
              >

                {images.map(
                  (
                    image,
                    index
                  ) => (

<SortableImage
  key={image.id}
  id={image.id}
>

  {({
    dragAttributes,
    dragListeners,
  }) => (

    <ImagePreviewCard
      file={image}
      index={index}
      isCover={index === 0}
      onDelete={() =>
        removeImage(image)
      }
      onSetCover={() =>
        setCoverImage(image.id)
      }
      dragAttributes={dragAttributes}
      dragListeners={dragListeners}
    />

  )}

</SortableImage>
                  )
                )}

              </div>

            </SortableContext>

          </DndContext>

        </>

      )}

    </div>

  );

};

export default ProductImages;