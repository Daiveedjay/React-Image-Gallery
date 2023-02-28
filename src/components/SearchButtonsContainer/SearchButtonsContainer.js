import SearchButton from "../SearchButton/SearchButton";
import "./SearchButtonsContainer.css";
function SearchButtonsContainer({ searches, setSearches, handleButtonClick }) {
  return (
    <div className="render__buttons--container">
      {searches &&
        searches.map((search) => (
          <SearchButton
            key={Math.random() * 10000}
            search={search}
            searches={searches}
            setSearches={setSearches}
            handleButtonClick={handleButtonClick}
          />
        ))}
    </div>
  );
}

export default SearchButtonsContainer;
