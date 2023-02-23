import { useEffect, useRef, useState } from "react";
import "./App.css";
import RenderErrorModal from "./components/RenderErrorModal/RenderErrorModal";
import Calls from "./Services/Calls";

function App() {
  const query = useRef();
  const buttonContainer = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );
  const [searchLimit, setSearchLimit] = useState(false);
  // const [searchError, setSearchError] = useState(null);

  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("searches"));
    if (storedSearches) {
      const uniqueSearches = Array.from(new Set(storedSearches));
      setSearches(uniqueSearches);
    }
    if (storedSearches && storedSearches.length > 0) {
      const mostRecentSearch = storedSearches[storedSearches.length - 1];
      setSearchQuery(mostRecentSearch);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryValue = query.current.value.trim();

    if (!queryValue) return;

    if (searches.length >= 5) {
      setSearchLimit(true);
      setTimeout(() => {
        setSearchLimit(false);
      }, 3000);
      return;
    }

    if (searches.includes(queryValue)) return;

    setSearches((prevSearches) => {
      const newSearches = [...prevSearches, queryValue];
      localStorage.setItem("searches", JSON.stringify(newSearches));
      return newSearches;
    });

    setSearchQuery(queryValue);

    console.log(searchQuery);
    query.current.value = "";
  };

  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "darkmode" : ""}`}>
      <nav className="nav__component">
        <span to="/" className="logo">
          Pixplorer
        </span>
        <form onSubmit={handleSubmit} className="search__form">
          <input
            type="text"
            id="search"
            required
            placeholder="Enter a category"
            ref={query}
          />
          <button>Search</button>
        </form>
        <i
          className="fa-light fa-light-switch theme--switch"
          onClick={toggleMode}
        ></i>
        {searchLimit && <RenderErrorModal />}
      </nav>
      <div ref={buttonContainer} className="render__buttons--container">
        {searches &&
          searches !== undefined &&
          searches.map((search) => (
            <button
              key={Math.random() * 10000}
              onClick={() => handleButtonClick(search)}
            >
              {search}
            </button>
          ))}
      </div>
      {/* {searchLimit && <RenderErrorModal />} */}

      {searchQuery && <Calls searchQuery={searchQuery} />}
    </div>
  );
}

export default App;
