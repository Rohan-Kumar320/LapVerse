import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Email is required.");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      toast.success("Account created successfully.");

      navigate("/login");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
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
            Create Account
          </h1>

          <p className="mt-3 text-text-secondary">
            Join LapVerse today.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* Name */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <div className="relative">

              <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 outline-none focus:border-primary"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <div className="relative">

              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-4 outline-none focus:border-primary"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <div className="relative">

              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-12 outline-none focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full rounded-xl border border-border bg-background py-3 pl-12 pr-12 outline-none focus:border-primary"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

          </div>

          {/* Register Button */}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? (
              "Creating Account..."
            ) : (
              <>
                Register
                <FiArrowRight />
              </>
            )}
          </button>

        </form>

        <div className="mt-8 text-center text-sm text-text-secondary">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-primary hover:underline"
          >
            Login
          </Link>

        </div>

      </div>

    </main>
  );
};

export default Register;