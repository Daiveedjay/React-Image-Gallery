import { useEffect, useState } from "react";

import "./Calls.css";
export default function Calls({ searchQuery }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsPending(true);
        // const API_KEY = "ovS3DUChaQ0h3LQ1TT4_jpAl43VrMZCRFZcs2aLmILw";
        const API_KEY = "Z0tlw9QPJ4IqguNkjH8Su_qwKOvru9DZuFGfntPSkXc";
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=1&client_id=${API_KEY}&query=${searchQuery}`
        );
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const fetchedImages = await response.json();
        const searches = JSON.parse(localStorage.getItem("searches")) || [];
        searches.push(searchQuery);
        localStorage.setItem("searches", JSON.stringify(searches));

        localStorage.setItem(searchQuery, JSON.stringify(fetchedImages));

        // const test = { ...fetchedImages };
        // console.log(`Test is ${test}`);
        // console.log(fetchedImages);

        setIsPending(false);
        setImages(fetchedImages);
        // console.log(images);
        setError(null);
      } catch (error) {
        setIsPending(false);
        setError("Could not fetch the data");
      }
    };
    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    console.log(images.results);
    // console.log(images.results.id);
  }, [images]);

  return (
    // <div>Render successful </div>
    <>
      {error && <div>Oops, did you search for balablu? 😁</div>}
      {isPending && <span className="loader"></span>}
      {images.results && (
        <div className="masonry-grid">
          {images.results &&
            images.results.map((image) => (
              <div className="masonry-grid-item">
                <img
                  loading="lazy"
                  key={image.id}
                  src={image.urls.regular}
                  alt={image.alt_description}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
