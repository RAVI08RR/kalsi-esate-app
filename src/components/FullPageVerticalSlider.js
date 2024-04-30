import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FullpageVerticalSlider.css";
import { Button } from "bootstrap";

const FullPageVerticalSlider = ({ slides }) => {
  return (
    <div className="full-page-vertical-slider">
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={true}
        showThumbs={false}
        infiniteLoop={true}
        verticalSwipe="standard"
        autoPlay={true}
        interval={5000}
        transitionTime={500}
        axis="vertical"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="slide"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
              <div className="search-box">
                <button type="submit" className="serch-btn-home">
                  Search Now
                </button>
                <input type="text" placeholder="Search..." />

                <img
                  src="/assets/images/map-icon.svg"
                  className="city-map-icon"
                />

                <select>
                  <option value="">Select City</option>
                  {slide.cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default FullPageVerticalSlider;
