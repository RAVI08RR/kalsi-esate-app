import React from "react";
import { Carousel } from "react-bootstrap";
// import "./FullWidthCarousel.css"; // Import custom CSS for custom buttons

const Projectplanslider = () => {
  return (
    <Carousel
      nextIcon={<span className="custom-next">Next</span>}
      prevIcon={<span className="custom-prev">Prev</span>}
    >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/images/pr-sl-1.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/images/pr-sl-2.png"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/assets/images/pr-sl-1.png"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Projectplanslider;
