import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

// const images = [
//   "/assets/images/pr-sl-1.png",
//   "/assets/images/pr-sl-2.png",
//   "/assets/images/pr-sl-1.png",
// ];

const Projectplanslider = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <>
      <Carousel
        className="project-plan-arrow-controller"
        nextIcon={
          <span className="custom-next">
            <img
              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
              className="pr-arrow-control"
            />
          </span>
        }
        prevIcon={
          <span className="custom-prev">
            <img
              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
              className="pr-arrow-control"
            />
          </span>
        }
      >
        {images?.map((image, index) => (
          <Carousel.Item key={index} onClick={() => openLightbox(index)}>
            <img
              className="d-block w-100 florplanslideimg"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        >
          <button
            className="lightbox-close-button"
            onClick={() => setIsOpen(false)}
          >
            <img
              src="/assets/images/cross-icon.svg"
              alt="cross-icon"
              className="light-box-cross-icon"
            />
          </button>
        </Lightbox>
      )}
    </>
  );
};

export default Projectplanslider;
