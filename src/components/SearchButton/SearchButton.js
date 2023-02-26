function SearchButton({ search, handleButtonClick }) {
  return <button onClick={() => handleButtonClick(search)}>{search}</button>;
}

export default SearchButton;
