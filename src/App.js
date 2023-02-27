// Styles
import "./App.css";

// React Imports
import { useEffect, useState, useRef } from "react";

// Component Imports
import IntroText from "./components/IntroText/IntroText";
import Calls from "./Services/Calls";
import SearchButtonsContainer from "./components/SearchButtonsContainer/SearchButtonsContainer";
import Navbar from "../src/components/NavBar/NavBar";
import SearchForm from "./components/SearchForm/SearchForm";
import RenderErrorModal from "./components/RenderErrorModal/RenderErrorModal";
import Footer from "./components/Footer/Footer";

function App() {
  // User Input Reference
  const query = useRef();
  // Render button reference
  const buttonContainer = useRef();

  // States
  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );
  const [searchLimit, setSearchLimit] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

  // Load from local storage
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

  // Load Darkmode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSubmit = () => {
    // Grabs query value
    const queryValue = query.current?.value?.trim();
    if (!queryValue) return;

    // Checks if user has exceeded 5 searches
    if (searches.length >= 5) {
      setSearchLimit(true);
      setTimeout(() => {
        setSearchLimit(false);
      }, 3000);
      return;
    }

    // If user has searched for something that has already been searched for
    if (searches.includes(queryValue)) query.current.value = "";

    // Stores each search in local storage
    setSearches((prevSearches) => {
      const newSearches = [...prevSearches, queryValue];
      localStorage.setItem("searches", JSON.stringify(newSearches));
      return newSearches;
    });

    setSearchQuery(queryValue);
    query.current.value = "";
  };
// Binds the this keyword to the handle submit
  const boundHandleSubmit = handleSubmit.bind(this);

  // Renders search result on click of any of the rendred buttons
  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
  };

  // Toggles dark mode
  const toggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "darkmode" : ""}`}>
      {!searchQuery && <IntroText />}
      <Navbar toggleMode={toggleMode} />
      <SearchForm query={query} handleSubmit={boundHandleSubmit} />

      {searchLimit && <RenderErrorModal />}
      <SearchButtonsContainer
        searches={searches}
        handleButtonClick={handleButtonClick}
        buttonContainer={buttonContainer}
      />
      {searchQuery && <Calls searchQuery={searchQuery} />}
      <Footer />
    </div>
  );
}

export default App;
