import ".//RenderButtons.css";

export default function RenderButtons({ searchQuery }) {
  return (
    <div className="render__buttons--container">
      <button>{searchQuery.toUpperCase()}</button>
    </div>
  );
}
