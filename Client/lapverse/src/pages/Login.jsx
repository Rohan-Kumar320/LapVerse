import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

const data = await login(form);

toast.success(`Welcome ${data.user.name}!`);

navigate("/");
      
    } catch (err) {
      toast.error(
          err.response?.data?.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6 py-16">

      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-2xl">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-text-primary">
            Welcome Back
          </h1>

          <p className="mt-3 text-text-secondary">
            Sign in to continue to LapVerse
          </p>

        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >
          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Email Address
            </label>

            <div className="relative">

              <FiMail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 outline-none transition focus:border-primary"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <FiLock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-12 outline-none transition focus:border-primary"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <FiEyeOff />
                ) : (
                  <FiEye />
                )}
              </button>

            </div>

          </div>

          {/* Button */}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              "Signing In..."
            ) : (
              <>
                Login
                <FiArrowRight />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-primary hover:underline"
          >
            Register
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Login;