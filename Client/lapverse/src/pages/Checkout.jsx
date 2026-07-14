import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiMapPin,
  FiPhone,
  FiUser,
  FiHome,
  FiCreditCard,
} from "react-icons/fi";

import { toast } from "react-toastify";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

const Checkout = () => {
  const navigate = useNavigate();

  const { summary, cart, refreshCart } = useCart();

  const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    postalCode: "",
  });

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handlePlaceOrder =
    async () => {
      const {
        fullName,
        phone,
        city,
        address,
        postalCode,
      } = formData;

      if (
        !fullName ||
        !phone ||
        !city ||
        !address ||
        !postalCode
      ) {
        toast.error(
          "Please complete all shipping information."
        );

        return;
      }

      setLoading(true);

      const shippingAddress = `${fullName},
${phone},
${address},
${city},
${postalCode}`;

      const result =
        await placeOrder({
          shippingAddress,
          paymentMethod,
        });

      setLoading(false);

      if (!result.success) return;

      await refreshCart();

      navigate("/order-success");
    };

  return (
    <section className="max-w-7xl mx-auto px-5 py-12">

      {/* Heading */}

      <div className="mb-10">

        <h1 className="text-4xl font-bold">

          Checkout

        </h1>

        <p className="mt-2 text-text-secondary">

          Complete your order and we'll
          take care of the rest.

        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Side */}

        <div className="space-y-8 lg:col-span-2">

          {/* Shipping */}

          <div className="rounded-3xl border border-border bg-card p-8">

            <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold">

              <FiMapPin />

              Shipping Information

            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">

                  Full Name

                </label>

                <div className="relative">

                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="fullName"
                    value={
                      formData.fullName
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="John Doe"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      py-3
                      pl-11
                      pr-4
                      outline-none
                      transition
                      focus:border-primary
                    "
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block font-medium">

                  Phone

                </label>

                <div className="relative">

                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

                  <input
                    type="text"
                    name="phone"
                    value={
                      formData.phone
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="03XXXXXXXXX"
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      py-3
                      pl-11
                      pr-4
                      outline-none
                      transition
                      focus:border-primary
                    "
                  />

                </div>

              </div>

              <div>

                <label className="mb-2 block font-medium">

                  City

                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">

                  Postal Code

                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={
                    formData.postalCode
                  }
                  onChange={
                    handleChange
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    outline-none
                    transition
                    focus:border-primary
                  "
                />

              </div>
                            <div className="md:col-span-2">

                <label className="mb-2 block font-medium">

                  Complete Address

                </label>

                <div className="relative">

                  <FiHome className="absolute left-4 top-5 text-gray-400" />

                  <textarea
                    rows={5}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Apartment, Street, Area..."
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-border
                      bg-background
                      py-3
                      pl-11
                      pr-4
                      outline-none
                      transition
                      resize-none
                      focus:border-primary
                    "
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Payment Method */}

          <div className="rounded-3xl border border-border bg-card p-8">

            <h2 className="mb-8 flex items-center gap-3 text-2xl font-semibold">

              <FiCreditCard />

              Payment Method

            </h2>

            <div className="space-y-4">

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-5 transition hover:border-primary">

                <div>

                  <h3 className="font-semibold">

                    Cash on Delivery

                  </h3>

                  <p className="text-sm text-text-secondary">

                    Pay when your order arrives.

                  </p>

                </div>

                <input
                  type="radio"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={() =>
                    setPaymentMethod("Cash on Delivery")
                  }
                />

              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-5 transition hover:border-primary">

                <div>

                  <h3 className="font-semibold">

                    Card

                  </h3>

                  <p className="text-sm text-text-secondary">

                    Credit / Debit Card

                  </p>

                </div>

                <input
                  type="radio"
                  checked={paymentMethod === "Card"}
                  onChange={() =>
                    setPaymentMethod("Card")
                  }
                />

              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-border p-5 transition hover:border-primary">

                <div>

                  <h3 className="font-semibold">

                    Bank Transfer

                  </h3>

                  <p className="text-sm text-text-secondary">

                    Transfer directly to our account.

                  </p>

                </div>

                <input
                  type="radio"
                  checked={paymentMethod === "Bank Transfer"}
                  onChange={() =>
                    setPaymentMethod("Bank Transfer")
                  }
                />

              </label>

            </div>

          </div>

        </div>

        {/* Right Side */}

        <div>

          <div className="sticky top-24 rounded-3xl border border-border bg-card p-8">

            <h2 className="mb-8 text-2xl font-semibold">

              Order Summary

            </h2>

            <div className="space-y-5">

              {cart.map((item) => (

                <div
                  key={item._id}
                  className="flex items-center justify-between border-b border-border pb-4"
                >

                  <div>

                    <h3 className="font-medium line-clamp-1">

                      {item.product.title}

                    </h3>

                    <p className="text-sm text-text-secondary">

                      Qty: {item.quantity}

                    </p>

                  </div>

                  <p className="font-semibold">

                    Rs.{" "}
                    {(
                      item.product.price *
                      item.quantity
                    ).toLocaleString()}

                  </p>

                </div>

              ))}

              <div className="pt-4 space-y-3">

                <div className="flex justify-between">

                  <span>Total Items</span>

                  <span>

                    {summary.totalItems}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>

                    Rs. {summary.subtotal.toLocaleString()}

                  </span>

                </div>

                <div className="flex justify-between text-green-500">

                  <span>Discount</span>

                  <span>

                    - Rs. {summary.discount.toLocaleString()}

                  </span>

                </div>

                <hr className="border-border" />

                <div className="flex justify-between text-2xl font-bold">

                  <span>Total</span>

                  <span className="text-primary">

                    Rs. {summary.total.toLocaleString()}

                  </span>

                </div>

              </div>
            </div>

              </div>

            </div>

            {/* Secure Checkout */}

            <div className="mt-8 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">

              <p className="text-center text-sm text-green-400">

                🔒 Your order information is securely processed.

              </p>

            </div>

            {/* Place Order */}

            <button
              onClick={handlePlaceOrder}
              disabled={loading || cart.length === 0}
              className="
                mt-8
                w-full
                rounded-2xl
                bg-primary
                py-4
                text-lg
                font-semibold
                text-white
                transition-all
                duration-300
                hover:scale-[1.02]
                hover:shadow-xl
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? "Placing Order..."
                : "Place Order"}
            </button>

            {cart.length === 0 && (

              <p className="mt-4 text-center text-sm text-red-400">

                Your cart is empty.

              </p>

            )}

          </div>
    </section>
  )
};

export default Checkout;