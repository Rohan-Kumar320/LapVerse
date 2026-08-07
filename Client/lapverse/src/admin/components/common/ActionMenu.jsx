import { useEffect, useRef, useState } from "react";

import {
  FiMoreHorizontal,
} from "react-icons/fi";

const ActionMenu = ({
  items = [],
}) => {

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef(null);

  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (

        menuRef.current &&

        !menuRef.current.contains(
          event.target
        )

      ) {

        setOpen(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>

      document.removeEventListener(

        "mousedown",

        handleClickOutside

      );

  }, []);

  return (

    <div
      ref={menuRef}
      className="relative"
    >

      <button

        onClick={()=>

          setOpen(!open)

        }

        className="
        rounded-xl
        p-3
        transition
        hover:bg-slate-100
      "

      >

        <FiMoreHorizontal
          size={20}
          className="text-slate-600"
        />

      </button>

      {open && (

        <div
          className="
          absolute
          right-0
          z-50
          mt-2
          w-52
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
        >

          {items.map((item)=>(

            <button

              key={item.label}

              onClick={()=>{

                setOpen(false);

                item.onClick();

              }}

              className={`
              flex
              w-full
              items-center
              gap-3
              px-5
              py-3
              text-left
              text-sm
              font-medium
              transition

              ${
                item.danger

                ?

                "text-red-600 hover:bg-red-50"

                :

                "text-slate-700 hover:bg-slate-50"

              }
            `}

            >

              <item.icon
                size={17}
              />

              {item.label}

            </button>

          ))}

        </div>

      )}

    </div>

  );

};

export default ActionMenu;