import { Link } from "react-router-dom";
import "./Home.css";
function HomePage() {
  return (
    <div className="home">
      <h1 className="home__title">Home Page</h1>
      <nav className="home__nav">
        <Link to="/to-do-app" className="home__link">
          ToDo App
        </Link>
        <Link to="/form-validate" className="home__link">
          Form Validate
        </Link>
      </nav>
    </div>
  );
}
export default HomePage;
