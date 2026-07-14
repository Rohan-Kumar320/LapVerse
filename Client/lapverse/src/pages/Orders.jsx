import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  FiPackage,
  FiCalendar,
  FiArrowRight,
  FiXCircle,
} from "react-icons/fi";
import { useOrders } from "../context/OrderContext";


const Orders = () => {
  const {
    orders,
    loading,
    fetchOrders,
    cancelUserOrder,
  } = useOrders();

  useEffect(() => {
    fetchOrders();
  }, []);

    if (loading) {
    return (
      <div className="py-32 text-center text-xl">
        Loading Orders...
      </div>
    );
  }

    if (orders.length === 0) {
    return (
      <section className="max-w-6xl mx-auto px-5 py-20">

        <div className="rounded-3xl border border-border bg-card p-14 text-center">

          <FiPackage
            size={70}
            className="mx-auto text-primary"
          />

          <h2 className="mt-6 text-3xl font-bold">

            No Orders Yet

          </h2>

          <p className="mt-3 text-text-secondary">

            Looks like you haven't purchased
            anything yet.

          </p>

          <Link
            to="/products"
            className="
              mt-8
              inline-flex
              rounded-2xl
              bg-primary
              px-8
              py-4
              font-semibold
              text-white
            "
          >
            Start Shopping
          </Link>

        </div>

      </section>
    );
  }

    return (
    <section className="max-w-7xl mx-auto px-5 py-12">

      <h1 className="mb-10 text-4xl font-bold">

        My Orders

      </h1>

      <div className="space-y-6"></div>
      {orders.map((order) => (

<div
key={order._id}
className="
rounded-3xl
border
border-border
bg-card
p-8
"
>

<div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

<div>

<h2 className="text-xl font-bold">

Order #{order._id.slice(-8)}

</h2>

<div className="mt-3 flex flex-wrap gap-6 text-sm text-text-secondary">

<span className="flex items-center gap-2">

<FiCalendar />

{new Date(order.createdAt).toLocaleDateString()}

</span>

<span>

{order.items.length} Item(s)

</span>

</div>

</div>

<div>

<StatusBadge
status={order.status}
/>

</div>

</div>
<div className="mt-8 space-y-4">

{order.items.map((item)=>(

<div
key={item._id}
className="
flex
items-center
justify-between
border-b
border-border
pb-4
"
>

<div>

<h3 className="font-semibold">

{item.product?.title}

</h3>

<p className="text-sm text-text-secondary">

Quantity : {item.quantity}

</p>

</div>

<p className="font-semibold">

Rs. {(item.price*item.quantity).toLocaleString()}

</p>

</div>

))}

</div>
<div className="mt-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

<div>

<p className="text-lg">

Total

</p>

<p className="text-3xl font-bold text-primary">

Rs. {order.total.toLocaleString()}

</p>

</div>

<div className="flex gap-4">

<Link
to={`/orders/${order._id}`}
className="
flex
items-center
gap-2
rounded-2xl
border
border-primary
px-6
py-3
font-semibold
text-primary
transition
hover:bg-primary
hover:text-white
"
>

View Details

<FiArrowRight />

</Link>

{order.status==="Pending" && (

<button
onClick={()=>
cancelUserOrder(order._id)
}
className="
flex
items-center
gap-2
rounded-2xl
bg-red-600
px-6
py-3
font-semibold
text-white
hover:bg-red-700
"
>

<FiXCircle />

Cancel

</button>

)}

</div>

</div>

</div>

))}

    </section>

  );

};

const StatusBadge = ({ status }) => {
  const colors = {
    Pending:
      "bg-yellow-500/20 text-yellow-400",

    Confirmed:
      "bg-blue-500/20 text-blue-400",

    Shipped:
      "bg-purple-500/20 text-purple-400",

    Delivered:
      "bg-green-500/20 text-green-400",

    Cancelled:
      "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`
        rounded-full
        px-4
        py-2
        text-sm
        font-semibold
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
};
export default Orders;