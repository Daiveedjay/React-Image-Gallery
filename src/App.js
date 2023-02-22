import { useEffect, useRef, useState } from "react";
import "./App.css";
import RenderButtons from "./components/RenderButtons/RenderButtons";
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
  const [darkMode, setDarkMode] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryValue = query.current.value.trim();
    // setSearchQuery(queryValue);

    if (queryValue) {
      if (searches.length >= 5) {
        setSearchLimit(true);
        setTimeout(() => {
          setSearchLimit(false);
        }, 3000);

        // alert("You have exceeded the limit of 5 searches.");
      } else if (!searches.includes(queryValue)) {
        setSearches((prevSearches) => {
          const newSearches = [...prevSearches, queryValue];
          localStorage.setItem("searches", JSON.stringify(newSearches));
          return newSearches;
        });
        setSearchQuery(queryValue);
      }

      // setSearchCount(searchCount + 1);
      // console.log(searchCount);
    }
    console.log(searchQuery);
    query.current.value = "";
  };

  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  // {`App ${isDarkMode ? "dark-mode" : ""}

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
        {/* <RenderErrorModal /> */}
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
      {/* {searchLimit && <RenderErrorModal />} */}

      {searchQuery && <Calls searchQuery={searchQuery} />}
    </div>
  );
}

export default App;
