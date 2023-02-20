// Styles
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="nav__component">
      <Link to="/" className="logo">
        Imagely
      </Link>
      <form className="search__form">
        {/* <label htmlFor="search"></label> */}
        <input
          type="text"
          id="search"
          required
          placeholder="Enter a category"
        />
        <button>Search</button>
      </form>
      <span className="theme">💡</span>
    </nav>
  );
}
