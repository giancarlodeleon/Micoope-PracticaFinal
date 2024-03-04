import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-green-600 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-2xl font-bold">MiCoope</h1>
      </Link>

      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link
                to="add-product"
                className="bg-green-700 px-4 py-1 rounded-sm"
              >
                Add Product
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="bg-green-700 px-4 py-1 rounded-sm"
                onClick={() => {
                  logout();
                }}
              >
                LogOut
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-green-700 px-4 py-1 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-green-700 px-4 py-1 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
