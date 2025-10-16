import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setToken }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://auth-backend-p0zj.onrender.com/api/auth/register",
        formData
      );
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
      });
      setMessage(res.data.message || "Registered successfully");
      navigate("/home");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went Wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
		<div className="min-h-[92vh] flex flex-col items-center justify-center px-4">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center">Create Your Account</h2>
			<p className="text-lg sm:text-2xl md:text-3xl text-gray-500 mt-3 text-center">Join us today! </p>
        <form
          onSubmit={handleSubmit}
				className="mt-8 sm:mt-12 p-6 sm:p-8 md:p-10 flex flex-col gap-6 w-full max-w-3xl"
        >
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phoneNumber"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="password"
              name="confirmPassword"
						className="border w-full rounded-xl text-base sm:text-lg md:text-xl px-4 sm:px-5 py-3 placeholder:text-gray-400"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
				<div className="flex flex-col gap-2 mt-3">
            <button
              type="submit"
              disabled={loading}
						className="px-6 py-2 mx-auto rounded-xl text-white bg-blue-600 font-semibold hover:bg-blue-700 transition-colors"
            >
              {loading ? "Registering" : "Register"}
            </button>

            <Link
              to="/login"
              className="text-blue-600 mx-auto  hover:underline"
            >
              Already have an account?
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

export default Signup;
