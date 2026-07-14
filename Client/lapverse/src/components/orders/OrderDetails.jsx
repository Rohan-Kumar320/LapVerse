import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import {
  FiArrowLeft,
  FiPackage,
  FiMapPin,
  FiCreditCard,
  FiCalendar,
} from "react-icons/fi";

import { getOrderById } from "../../services/orderService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const data =
        await getOrderById(id);

      setOrder(data.order);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
  return (
    <div className="py-32 text-center text-xl">
      Loading...
    </div>
  );
}

return (

<section className="max-w-7xl mx-auto px-5 py-12">

<Link
to="/orders"
className="
inline-flex
items-center
gap-2
mb-8
text-primary
font-semibold
"
>

<FiArrowLeft />

Back to Orders

</Link>

<div className="grid gap-8 lg:grid-cols-3">
    <div className="lg:col-span-2 space-y-8">
        <div className="rounded-3xl border border-border bg-card p-8">

<h2 className="mb-6 text-2xl font-bold">

Order Information

</h2>

<div className="space-y-4">

<p>

<strong>Order ID:</strong>

{" "}
{order._id}

</p>

<p className="flex items-center gap-2">

<FiCalendar />

{new Date(order.createdAt).toLocaleString()}

</p>

<p className="flex items-center gap-2">

<FiCreditCard />

{order.paymentMethod}

</p>

<p>

<strong>Status:</strong>

{" "}

<StatusBadge
status={order.status}
/>

</p>

</div>

</div>

<div className="rounded-3xl border border-border bg-card p-8">

<h2 className="mb-6 text-2xl font-bold">

Ordered Products

</h2>

<div className="space-y-5">

{order.items.map((item)=>(

<div
key={item._id}
className="
flex
justify-between
border-b
border-border
pb-4
"
>

<div>

<h3 className="font-semibold">

{item.product.title}

</h3>

<p className="text-sm text-text-secondary">

Quantity : {item.quantity}

</p>

</div>

<p className="font-bold">

Rs.

{(item.price*item.quantity).toLocaleString()}

</p>

</div>

))}

</div>

</div>

<div className="space-y-8">
    <div className="rounded-3xl border border-border bg-card p-8">

<h2 className="mb-5 text-xl font-bold">

Shipping

</h2>

<p className="flex items-start gap-3 leading-8">

<FiMapPin />

{order.shippingAddress}

</p>

</div>
<div className="rounded-3xl border border-border bg-card p-8">

<h2 className="mb-6 text-xl font-bold">

Summary

</h2>

<div className="space-y-4">

<div className="flex justify-between">

<span>

Subtotal

</span>

<span>

Rs.

{order.subtotal.toLocaleString()}

</span>

</div>

<div className="flex justify-between">

<span>

Discount

</span>

<span className="text-green-500">

-

Rs.

{order.discount.toLocaleString()}

</span>

</div>

<hr className="border-border"/>

<div className="flex justify-between text-2xl font-bold">

<span>

Total

</span>

<span className="text-primary">

Rs.

{order.total.toLocaleString()}

</span>

</div>

</div>

</div>

</div>

</div>

</div>

</section>

)};

const StatusBadge = ({ status }) => {
  const colors = {
    Pending: "bg-yellow-500/20 text-yellow-400",
    Confirmed: "bg-blue-500/20 text-blue-400",
    Shipped: "bg-purple-500/20 text-purple-400",
    Delivered: "bg-green-500/20 text-green-400",
    Cancelled: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold ${colors[status]}`}
    >
      {status}
    </span>
  );
};

export default OrderDetails;