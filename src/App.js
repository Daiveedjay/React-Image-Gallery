import { useEffect, useRef, useState } from "react";
import "./App.css";
import RenderErrorModal from "./components/RenderErrorModal/RenderErrorModal";
import Calls from "./Services/Calls";

function App() {
  // Reference to user inour value
  const query = useRef();
  // Reference to container that holds all rendred buttons
  const buttonContainer = useRef();
  // State of search query
  const [searchQuery, setSearchQuery] = useState("");
  // State of array of searched queries
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );
  const [searchLimit, setSearchLimit] = useState(false);
  // const [searchError, setSearchError] = useState(null);

  // Darkmode state
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Loading all data stored in local storage
  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("searches"));
    if (!storedSearches) return;
    const uniqueSearches = Array.from(new Set(storedSearches));
    setSearches(uniqueSearches);

    if (storedSearches && storedSearches.length > 0) {
      const mostRecentSearch = storedSearches[storedSearches.length - 1];
      setSearchQuery(mostRecentSearch);
    }
  }, []);

  // Load Dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Handles submit funtionality
  const handleSubmit = (e) => {
    e.preventDefault();
    // Grabs the value in the search bar
    const queryValue = query.current.value.trim();

    if (!queryValue) return;

    // Checks if a user has searched for more than 5 things
    if (searches.length >= 5) {
      setSearchLimit(true);
      setTimeout(() => {
        setSearchLimit(false);
      }, 3000);
      return;
    }

    // If the user has searched for
    if (searches.includes(queryValue)) return;

    // Sets the searched value in local storage
    setSearches((prevSearches) => {
      const newSearches = [...prevSearches, queryValue];
      localStorage.setItem("searches", JSON.stringify(newSearches));
      return newSearches;
    });

    setSearchQuery(queryValue);

    console.log(searchQuery);
    // Clears the input field after eachh search
    query.current.value = "";
  };

  // Stores the value of the user's search on click of the button
  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
  };

  // Darkmode toggle
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  console.log("Yes");
  console.log(searches);

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
          searches.map((search) => (
            <button
              key={Math.random() * 10000}
              onClick={() => handleButtonClick(search)}
            >
              {search}
            </button>
          ))}
      </div>

      {searchQuery && <Calls searchQuery={searchQuery} />}
    </div>
  );
}

export default App;
