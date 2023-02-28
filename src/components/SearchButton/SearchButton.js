function SearchButton({ search, searches, handleButtonClick }) {
  const presence = localStorage.getItem(search);
  if (!presence) {
    localStorage.setItem(
      "searches",
      JSON.stringify(searches.filter((x) => x !== search))
    );
  }
  return presence ? (
    <button onClick={() => handleButtonClick(search)}>{search}</button>
  ) : null;
}

export default SearchButton;
