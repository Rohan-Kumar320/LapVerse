import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  FiLock,
  FiMail,
  FiShield,
} from "react-icons/fi";

import { toast } from "react-toastify";

import { useAdmin } from "../context/AdminContext";

const AdminLogin = () => {

  const navigate = useNavigate();

  const { login } = useAdmin();

  const [form, setForm] = useState({

    email: "",

    password: "",

  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await login(form);

      toast.success("Welcome Administrator");

      navigate("/admin");

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login failed."

      );

    }

    finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
      min-h-screen
      bg-neutral-100
      flex
      items-center
      justify-center
      p-8
    "
    >

      <div
        className="
        w-full
        max-w-md
        rounded-[36px]
        bg-white
        border
        border-neutral-200
        shadow-2xl
        shadow-black/10
        p-10
      "
      >

        <div className="flex justify-center">

          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-3xl
            bg-emerald-50
            text-emerald-600
          "
          >

            <FiShield size={40} />

          </div>

        </div>

        <h1
          className="
          mt-8
          text-center
          text-3xl
          font-black
          text-neutral-900
        "
        >

          LapVerse Admin

        </h1>

        <p
          className="
          mt-3
          text-center
          text-neutral-500
        "
        >

          Secure Administration Portal

        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-6"
        >

          <div>

            <label
              className="
              mb-2
              block
              text-sm
              font-semibold
              text-black
            "
            >

              Email

            </label>

            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-neutral-200
              px-5
              py-4
            "
            >

              <FiMail color="black"/>

              <input

                name="email"

                type="email"

                value={form.email}

                onChange={handleChange}

                placeholder="admin@lapverse.com"

                className="
                flex-1
                outline-none
                bg-transparent
                text-black
              "

                required

              />

            </div>

          </div>

          <div>

            <label
              className="
              mb-2
              block
              text-sm
              font-semibold
              text-black
            "
            >

              Password

            </label>

            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-neutral-200
              px-5
              py-4
            "
            >

              <FiLock color="black"/>

              <input

                name="password"

                type="password"

                value={form.password}

                onChange={handleChange}

                placeholder="••••••••"

                className="
                flex-1
                outline-none
                bg-transparent
                text-black
              "

                required

              />

            </div>

          </div>

          <button

            disabled={loading}

            className="
            w-full
            rounded-2xl
            bg-neutral-900
            py-4
            text-white
            font-bold
            transition
            hover:bg-black
            disabled:opacity-60
          "

          >

            {

              loading

                ? "Signing In..."

                : "Login"

            }

          </button>

        </form>

      </div>

    </div>

  );

};

export default AdminLogin;