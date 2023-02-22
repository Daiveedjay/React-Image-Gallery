import { useRef, useState } from "react";
import "./App.css";
import RenderButtons from "./components/RenderButtons/RenderButtons";
import Calls from "./Services/Calls";
// import SearchResults from "./components/SearchResults/SearchResults";

function App() {
  const query = useRef();
  const buttonContainer = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  // const [updateInput, setUpdateInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(query.current.value);

    console.log(searchQuery);
    buttonContainer.current.innerHTML += `<button> ${query.current.value}</button>`;
    query.current.value = "";
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
      <div ref={buttonContainer} className="render__buttons--container"></div>

      {searchQuery && <Calls searchQuery={searchQuery} />}
    </div>
  );
}

export default App;
