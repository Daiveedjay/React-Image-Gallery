import RenderErrorModal from "../RenderErrorModal/RenderErrorModal";

function Navbar({ toggleMode, searchLimit }) {
  return (
    <nav className="nav__component">
      <a href="/" to="/" className="logo">
        Pixplorer
      </a>
      <i
        className="fa-light fa-light-switch theme--switch"
        onClick={toggleMode}
      ></i>
      {searchLimit && <RenderErrorModal />}
    </nav>
  );
}

export default Navbar;
