import { useEffect, useState } from "react";

import "./Calls.css";
export default function Calls({ searchQuery }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

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

        setIsPending(false);
        setImages(fetchedImages);
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
  }, [images]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {error && <div>Oops, did you search for balablu? 😁</div>}
      {isPending && <span className="loader"></span>}
      {images.results && (
        <div className="masonry-grid">
          {images.results &&
            images.results.map((image) => (
              <div className="masonry-grid-item" key={image.id}>
                <img
                  loading="lazy"
                  src={image.urls.regular}
                  alt={image.alt_description}
                  onClick={() => handleImageClick(image)}
                />
              </div>
            ))}
          {selectedImage && (
            <div
              className="modal-overlay"
              onClick={() => setSelectedImage(null)}
            >
              {" "}
              <div className="modal-content">
                <img
                  src={selectedImage.urls.regular}
                  alt={selectedImage.alt_description}
                />
                <button className="cancel-button" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
