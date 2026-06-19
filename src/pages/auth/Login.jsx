import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

import { loginService } from "../../services/admin.service";
import { useAuth } from "../../context/AuthContext";

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

    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const payload = {
        email: form.email.trim(),
        password: form.password.trim(),
      };

      const { data } = await loginService(payload);

      if (!data.success) {
        throw new Error(data.message);
      }

      login(data.token, data.admin);

      toast.success(data.message || "Login successful");

      navigate("/", { replace: true });

    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Login failed";

      setError(message);
      toast.error(message);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">

        <h2 className="text-2xl font-bold text-center mb-2 text-gold">
          Admin Login
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Sign in to continue
        </p>

        {error && (
          <div className="status status-danger mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="form-control pr-12"
                placeholder="Enter password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <TailSpin height={18} width={18} color="#fff" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;