import SearchButton from "../SearchButton/SearchButton";

function SearchButtonsContainer({ searches, handleButtonClick }) {
  return (
    <div className="render__buttons--container">
      {searches &&
        searches.map((search) => (
          <SearchButton
            key={Math.random() * 10000}
            search={search}
            handleButtonClick={handleButtonClick}
          />
        ))}
    </div>
  );
}

export default SearchButtonsContainer;
