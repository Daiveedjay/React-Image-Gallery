import "./Search.css";

import { Route } from "react-router-dom";
import { useState } from "react";
import MasonryGrid from "../MasonryGrid/MasonryGrid";
import { useFetch } from "../../hooks/useFetch";
import SearchResults from "../SearchResults/SearchResults";

export default function Search() {
  // const [searchQuery, setSearchQuery] = useState("");

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(searchQuery);
  // };
  return (
    <div>
      {/* <form onClick={handleSubmit} className="search__form">
        <input
          type="text"
          id="search"
          required
          placeholder="Enter a category"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
        />
        <button>Search</button>
      </form> */}
    </div>
  );
}

// &query=${searchQuery}
