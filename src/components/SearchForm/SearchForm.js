import { useRef } from "react";
import RenderErrorModal from "../RenderErrorModal/RenderErrorModal";

function SearchForm({ handleSubmit, searchLimit, query }) {
  // const query = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const queryValue = query.current.value.trim();
    console.log(queryValue);
    if (!queryValue) return;
    handleSubmit(queryValue);
    query.current.value = "";
  };

  return (
    <form onSubmit={handleFormSubmit} className="search__form">
      <input
        type="text"
        id="search"
        required
        placeholder="Enter a category e.g dogs"
        ref={query}
      />
      <button>Search</button>
      {searchLimit && <RenderErrorModal />}
      {/* <RenderErrorModal /> */}
    </form>
  );
}

export default SearchForm;
