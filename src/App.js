import { useEffect, useState, useRef } from "react";
import "./App.css";
import IntroText from "./components/IntroText/IntroText";
import Calls from "./Services/Calls";
import SearchButtonsContainer from "./components/SearchButtonsContainer/SearchButtonsContainer";
import Navbar from "../src/components/NavBar/NavBar";
import SearchForm from "./components/SearchForm/SearchForm";
import RenderErrorModal from "./components/RenderErrorModal/RenderErrorModal";
import ToggleMode from "./components/ToggleMode/ToggleMode";
import Footer from "./components/Footer/Footer";

function App() {
  const query = useRef();
  const buttonContainer = useRef();

  const [searchQuery, setSearchQuery] = useState("");
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("searches")) || []
  );
  const [searchLimit, setSearchLimit] = useState(false);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || false
  );

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

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    const queryValue = query.current?.value?.trim();
    if (!queryValue) return;

    if (searches.length >= 5) {
      setSearchLimit(true);
      setTimeout(() => {
        setSearchLimit(false);
      }, 3000);
      return;
    }

    if (searches.includes(queryValue)) query.current.value = "";

    setSearches((prevSearches) => {
      const newSearches = [...prevSearches, queryValue];
      localStorage.setItem("searches", JSON.stringify(newSearches));
      return newSearches;
    });

    setSearchQuery(queryValue);
    query.current.value = "";
  };
  const boundHandleSubmit = handleSubmit.bind(this);

  const handleButtonClick = (queryValue) => {
    setSearchQuery(queryValue);
  };

  const toggleMode = () => {
    setDarkMode(!darkMode);
    // console.log("Success");
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
