import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ token, setToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  return (
    <>
			<div className="w-full shadow-md">
				<div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20 px-4">
					<Link to="/" className="text-2xl sm:text-3xl md:text-4xl font-bold">
          AUTH
        </Link>
					<nav className="flex items-center gap-4 sm:gap-6">
						{!token ? (
							<>
								<Link to="/login" className="text-base sm:text-lg md:text-xl p-1 hover:underline">
									Login
								</Link>
								<Link to="/signup" className="text-base sm:text-lg md:text-xl p-1 hover:underline">
									Sign Up
								</Link>
							</>
						) : (
							<button
								onClick={handleLogout}
								className="text-base sm:text-lg md:text-xl p-1 cursor-pointer hover:underline"
							>
								Logout
							</button>
						)}
					</nav>
				</div>
			</div>
    </>
  );
};

export default Navbar;
