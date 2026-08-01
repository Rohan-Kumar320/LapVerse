import {
  FiSearch,
} from "react-icons/fi";

const OrderFilters = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}) => {

  return (

    <div
      className="
        rounded-3xl
        border
        border-border
        bg-card
        p-6
      "
    >

      <div
        className="
          flex
          flex-col
          gap-5
          lg:flex-row
        "
      >

        {/* Search */}

        <div className="relative flex-1">

          <FiSearch
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-text-secondary
            "
          />

          <input

            value={search}

            onChange={(e)=>

              setSearch(
                e.target.value
              )

            }

            placeholder="Search customer, email or order..."

            className="
              w-full
              rounded-2xl
              border
              border-border
              bg-background
              py-3
              pl-12
              pr-4
              outline-none
              transition
              focus:border-primary
            "

          />

        </div>

        {/* Status */}

        <select

          value={statusFilter}

          onChange={(e)=>

            setStatusFilter(
              e.target.value
            )

          }

          className="
            rounded-2xl
            border
            border-border
            bg-background
            px-5
            py-3
            outline-none
          "

        >

          <option value="All">
            All Orders
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Shipped">
            Shipped
          </option>

          <option value="Delivered">
            Delivered
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>

      </div>

    </div>

  );

};

export default OrderFilters;