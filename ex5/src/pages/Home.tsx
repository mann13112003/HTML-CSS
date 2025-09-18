import { Link } from "react-router-dom";
import { ROUTES } from "../constant/path.constants";
import "./Home.css";

function HomePage() {
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
    </div>
  );
}
export default HomePage;
