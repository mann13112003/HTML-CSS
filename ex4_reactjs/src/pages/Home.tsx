import { Link } from "react-router-dom";
import { ROUTES } from "../constant/path.constants";
import "./Home.css";
import { useAppDispatch } from "../redux/store";
import { logout } from "../redux/authSlide";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
function HomePage() {
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    try {
      const refreshToken = Cookies.get("refreshToken");
      await dispatch(logout(refreshToken));
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      toast.success("logout success");
    } catch (error) {
      toast.error(error as string);
      console.error(error);
    }
  };
  return (
    <div className="home">
      <h1 className="home__title">Home Page</h1>
      <nav className="home__nav">
        <Link to={ROUTES.TODOAPP} className="home__link">
          ToDo App
        </Link>
        <Link to={ROUTES.LOGIN} className="home__link">
          Form Validate
        </Link>
      </nav>
      <button className="home__logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
export default HomePage;
