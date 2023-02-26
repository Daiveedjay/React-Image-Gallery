import "./ToggleMode.css";

export default function ToggleMode({ toggleMode }) {
  return (
    <i
      className="fa-light fa-light-switch theme--switch"
      onClick={toggleMode}
    ></i>
  );
}
