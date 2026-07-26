import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableImage = ({
  id,
  children,
}) => {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id,
  });

  const style = {

    transform: CSS.Transform.toString(
      transform
    ),

    transition,

  };

  return (

    <div
      ref={setNodeRef}
      style={style}
    >

      {children({
        dragAttributes: attributes,
        dragListeners: listeners,
      })}

    </div>

  );

};

export default SortableImage;