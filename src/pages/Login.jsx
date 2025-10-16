import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "https://auth-backend-p0zj.onrender.com/api/auth/login",
        formData
      );
      setMessage(res.data.message);
      setTimeout(() => setMessage(""), 3000);
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
		<div className="min-h-[92vh] flex flex-col items-center justify-center px-4">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center">Welcome Back</h2>
			<p className="text-lg sm:text-2xl md:text-3xl text-gray-500 mt-3 text-center">
          Securely login to your account
        </p>
        <form
          onSubmit={handleSubmit}
				className="mt-8 sm:mt-12 p-6 sm:p-8 md:p-10 flex flex-col gap-4 sm:gap-5 w-full max-w-md"
        >
          <input
            type="email"
            name="email"
					className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
					className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center mt-2">
            <Link
              to="/forget-password"
              className="text-blue-600  hover:underline"
            >
              Forget Password?
            </Link>
            <button
              type="submit"
						className="px-5 py-2 rounded-xl text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-colors"
              disabled={loading}
            >
              {loading ? "Logging In" : "Log in"}
            </button>
            <Link to="/signup" className="text-blue-600  hover:underline">
              Create Account
            </Link>
          </div>
        </form>
        {message && (
				<p className="bg-red-100 p-3 mt-3 text-sm sm:text-base md:text-lg text-red-600 rounded-xl">
            {message}
          </p>
        )}
      </div>
    </>
  );
};

export default Login;
