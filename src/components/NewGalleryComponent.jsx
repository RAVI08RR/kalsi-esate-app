import React, { useState } from "react";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { images } from "./slides"; // Ensure the correct path to images.js

const NewGalleryComponent = () => {
  const [index, setIndex] = useState(-1);

  const currentImage = images[index];
  const nextIndex = (index + 1) % images.length;
  const nextImage = images[nextIndex] || currentImage;
  const prevIndex = (index + images.length - 1) % images.length;
  const prevImage = images[prevIndex] || currentImage;

  const handleClick = (event, { index }) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div>
            <Gallery
              images={images.map((img) => ({
                src: img.src,
                thumbnail: img.thumbnail,
                caption: img.caption,
                customOverlay: (
                  <div
                    style={{
                      backgroundColor: "rgba(0, 0, 0, 0.5)",
                      color: "white",
                      padding: "10px",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      textAlign: "center",
                    }}
                  >
                    {img.caption}
                  </div>
                ),
              }))}
              onClick={handleClick}
              enableImageSelection={false}
            />
            {index >= 0 && (
              <Lightbox
                mainSrc={currentImage.original}
                imageTitle={currentImage.caption}
                mainSrcThumbnail={currentImage.src}
                nextSrc={nextImage.original}
                nextSrcThumbnail={nextImage.src}
                prevSrc={prevImage.original}
                prevSrcThumbnail={prevImage.src}
                onCloseRequest={handleClose}
                onMovePrevRequest={handleMovePrev}
                onMoveNextRequest={handleMoveNext}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewGalleryComponent;
