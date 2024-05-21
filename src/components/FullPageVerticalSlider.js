import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./FullpageVerticalSlider.css";
const FullPageVerticalSlider = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const fadeImages = [
    "/assets/images/banner-1.png",
    "/assets/images/banner-2.png",
    "/assets/images/banner-1.png",
  ];

  const SliderContent = [
    {
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
    {
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
  ];

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      fade
      style={{ width: "100%", height: "auto" }}
    >
      {fadeImages.map((imageUrl, i) => (
        <Carousel.Item key={i}>
          <img
            className="d-block w-100"
            src={imageUrl}
            alt={`Slide ${i + 1}`}
            style={{ objectFit: "cover", height: "600px" }}
          />
          {SliderContent.map((slide, index) => (
            <div
              key={index}
              className="slide-content"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: "1000",
                transform: "translate(-50%, -50%)",
                color: "#fff",
              }}
            >
              <div className="slides-contents">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <div className="search-box">
                  <button type="submit" className="serch-btn-home">
                    <span className="web-search">Search Now</span>
                    <img
                      src="assets/images/search-mobiile-icon.svg"
                      className="search-icon-mobile"
                      alt="img"
                    />
                  </button>
                  <input
                    type="text"
                    placeholder="Search Project, Locality or Builder"
                  />
                  <img
                    src="/assets/images/map-icon.svg"
                    className="city-map-icon"
                    alt="map icon"
                  />
                  <select id="citySelect">
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
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default FullPageVerticalSlider;
