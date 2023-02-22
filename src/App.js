import { useEffect, useRef, useState } from "react";
import "./App.css";
import RenderButtons from "./components/RenderButtons/RenderButtons";
import Calls from "./Services/Calls";

function App() {
  const query = useRef();
  const buttonContainer = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );

  useEffect(() => {
    const storedSearches = JSON.parse(localStorage.getItem("searches"));
    if (storedSearches) {
      const uniqueSearches = Array.from(new Set(storedSearches));
      setSearches(uniqueSearches);
      // setSearches(storedSearches);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryValue = query.current.value.trim();
    // setSearchQuery(queryValue);

    if (queryValue) {
      if (!searches.includes(queryValue)) {
        setSearches((prevSearches) => {
          const newSearches = [...prevSearches, queryValue];
          localStorage.setItem("searches", JSON.stringify(newSearches));
          return newSearches;
        });
      }
      setSearchQuery(queryValue);
    }
    console.log(searchQuery);
    query.current.value = "";
  };

  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
    console.log("Yes");
  };

  return (
    <div className="App">
      <nav className="nav__component">
        <span to="/" className="logo">
          Imagely
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
        <span className="theme">💡</span>
      </nav>
      <div ref={buttonContainer} className="render__buttons--container">
        {searches &&
          searches.map((search) => (
            <button key={search} onClick={() => handleButtonClick(search)}>
              {search}
            </button>
          ))}
      </div>

      {searchQuery && <Calls searchQuery={searchQuery} />}
    </div>
  );
}

export default App;
