import "./MasonryGrid.css";

import image1 from "../../src/image1.jpg";
import image2 from "../../src/David-image.jpeg";

import { useFetch } from "../hooks/useFetch";

export default function MasonryGrid() {
  const {
    data: images,
    error,
    isPending,
  } = useFetch(
    "https://api.unsplash.com/photos/random?count=8&client_id=ovS3DUChaQ0h3LQ1TT4_jpAl43VrMZCRFZcs2aLmILw"
  );
  if (images) {
    console.log(images);
  }

  return (
    <div className="masonry-grid">
      {/* {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>} */}
      {images &&
        images.map((image) => (
          <div className="masonry-grid-item">
            <img
              key={image.id}
              src={image.urls.regular}
              alt={image.alt_description}
            />
          </div>
        ))}
      {/* <img src={data && data[0].urls.full} alt="" /> */}
      {/* <div className="masonry-grid-item">
        <img src={image2} alt="" />
      </div>
      <div className="masonry-grid-item">
        <img src={image1} alt="" />
      </div>
      <div className="masonry-grid-item">
        <img src={image2} alt="" />
      </div>
      <div className="masonry-grid-item">
        <img src={image1} alt="" />
      </div>
      <div className="masonry-grid-item">
        <img src={image2} alt="" />
      </div> */}
    </div>
  );
}
