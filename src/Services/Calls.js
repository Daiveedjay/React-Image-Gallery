import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import "./Calls.css";
export default function Calls({ searchQuery }) {
  const [isPending, setIsPending] = useState(false);
  // const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  const [searchError, setSearchError] = useState(false);

  // const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsPending(true);
        // const API_KEY = "ovS3DUChaQ0h3LQ1TT4_jpAl43VrMZCRFZcs2aLmILw";
        const API_KEY = "Z0tlw9QPJ4IqguNkjH8Su_qwKOvru9DZuFGfntPSkXc";
        const response = await fetch(
          `https://api.unsplash.com/search/photos?page=2&per_page=12&client_id=${API_KEY}&query=${searchQuery}`
        );
        if (!response.ok) throw new Error(response.statusText);

        const fetchedImages = await response.json();
        if (fetchedImages.total === 0) {
          setIsPending(false);
          setSearchError(true);
          setTimeout(() => {
            setSearchError(false);
          }, 3500);
        } else if (fetchedImages.total > 0) {
          const searches = JSON.parse(localStorage.getItem("searches")) || [];
          searches.push(searchQuery);
          localStorage.setItem("searches", JSON.stringify(searches));
          localStorage.setItem(searchQuery, JSON.stringify(fetchedImages));
          setIsPending(false);
          setImages(fetchedImages);
        }
      } catch (error) {
        setIsPending(false);
        console.log(error);
      }
      console.log("Yessir");
    };
    fetchImages();
  }, [searchQuery]);

  useEffect(() => {
    console.log(images.results);
  }, [images]);

  return (
    <>
      {searchError && (
        <div className="error--modal">
          Oops, it seems you spelt something incorectly or searched for
          something not in our database.
        </div>
      )}
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
                />
                <div className="details">
                  <p className="username">
                    By: <span> {image.user.name}</span>
                  </p>
                  <div className="socials">
                    {" "}
                    <a target="_blank" rel="noreferrer" href={image.links.html}>
                      <i className="fa-solid fa-link"></i>
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={image.links.download}
                    >
                      <i className="fa-solid fa-download"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
