import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } else {
      navigate("/login");
    }
  }, []);

	return (
		<div className="min-h-[92vh] flex flex-col items-center justify-center px-4">
			<h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-center">Welcome to Your Dashboard</h2>
			<p className="text-lg sm:text-2xl md:text-3xl text-gray-500 mt-7 text-center">
        {user ? (
          `Hello, ${user.firstName}`
        ) : (
          <>
            You are now securely logged in and can <br />
            access your exclusive content.
          </>
        )}
      </p>
    </div>
  );
};

export default Home;
