import {
  FiShoppingBag,
} from "react-icons/fi";

const statusColor = {

  Pending:
    "bg-amber-100 text-amber-700",

  Confirmed:
    "bg-sky-100 text-sky-700",

  Shipped:
    "bg-violet-100 text-violet-700",

  Delivered:
    "bg-emerald-100 text-emerald-700",

  Cancelled:
    "bg-rose-100 text-rose-700",

};

const RecentOrdersTable = ({

  orders = [],

}) => {

  return (

    <div
      className="
      rounded-[30px]
      border
      border-neutral-200
      bg-white
      shadow-lg
      shadow-black/5
      overflow-hidden
    "
    >

      <div
        className="
        flex
        items-center
        justify-between
        border-b
        border-neutral-100
        p-7
      "
      >

        <div>

          <h2
            className="
            text-2xl
            font-black
            text-neutral-900
          "
          >

            Recent Orders

          </h2>

          <p
            className="
            mt-2
            text-sm
            text-neutral-500
          "
          >

            Latest marketplace activity

          </p>

        </div>

        <div
          className="
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-blue-50
          text-blue-600
        "
        >

          <FiShoppingBag size={24} />

        </div>

      </div>

      {orders.length === 0 ? (

        <div
          className="
          p-16
          text-center
          text-neutral-500
        "
        >

          No orders found.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr
                className="
                bg-neutral-50
                text-left
              "
              >

                <th className="px-7 py-4 text-sm">

                  Order

                </th>

                <th className="px-7 py-4 text-sm">

                  Customer

                </th>

                <th className="px-7 py-4 text-sm">

                  Amount

                </th>

                <th className="px-7 py-4 text-sm">

                  Status

                </th>

                <th className="px-7 py-4 text-sm">

                  Date

                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => (

                <tr

                  key={order._id}

                  className="
                  border-b
                  border-neutral-100
                  hover:bg-neutral-50
                "

                >

                  <td className="px-7 py-5">

                    <p className="font-bold">

                      {order.orderId}

                    </p>

                  </td>

                  <td className="px-7 py-5">

                    <div>

                      <p className="font-semibold text-neutral-900">

                        {order.user?.name}

                      </p>

                      <p className="text-sm text-neutral-500">

                        {order.user?.email}

                      </p>

                    </div>

                  </td>

                  <td className="px-7 py-5 font-bold">

                    Rs {order.total.toLocaleString()}

                  </td>

                  <td className="px-7 py-5">

                    <span
                      className={`
                      rounded-full
                      px-4
                      py-2
                      text-xs
                      font-bold
                      ${
                        statusColor[
                          order.status
                        ]
                      }
                    `}
                    >

                      {order.status}

                    </span>

                  </td>

                  <td className="px-7 py-5 text-neutral-500">

                    {new Date(

                      order.createdAt

                    ).toLocaleDateString()}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

};

export default RecentOrdersTable;