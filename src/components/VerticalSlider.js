import React, { useEffect, useRef, useState } from "react";
import "./VerticalSlider.css";

const VerticalSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const handlePrev = () => {
    setSlideIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % 3);
  };

  const handleDotClick = (index) => {
    setSlideIndex(index);
  };

  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide  vertical"
        data-ride="carousel"
        ref={carouselRef}
      >
        <div className="carousel-inner" role="listbox">
          <div
            className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}
            style={{
              backgroundImage: "url('/assets/images/banner-1.png')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">Start Your Home Journey Today.</h2>
              <p className="lead">
                With The Most Complete Source Of Homes For Sale & Properties
                Near You.
              </p>
            </div>

            <div class="wrapper">
              <div class="search_box">
                <div class="dropdown">
                  <div class="default_option">All</div>
                  <ul>
                    <li>All</li>
                    <li>Recent</li>
                    <li>Popular</li>
                  </ul>
                </div>
                <div class="search_field">
                  <input type="text" class="input" placeholder="Search" />
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`carousel-item ${slideIndex === 1 ? "active" : ""}`}
            style={{
              backgroundImage: "url('/assets/images/banner-1.png')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">Second Slide</h2>
              <p className="lead">
                This is a description for the second slide.
              </p>
            </div>
          </div>
          <div
            className={`carousel-item ${slideIndex === 2 ? "active" : ""}`}
            style={{
              backgroundImage: "url('/assets/images/banner-1.png')",
            }}
          >
            <div className="carousel-caption d-none d-md-block">
              <h2 className="display-4">Third Slide</h2>
              <p className="lead">This is a description for the third slide.</p>
            </div>
          </div>
        </div>
        <a
          className="carousel-control-prev up"
          href="#carouselExampleIndicators"
          role="button"
          onClick={handlePrev}
        >
          <i className="fas fa-chevron-up fa-2x" aria-hidden="true"></i>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next down"
          href="#carouselExampleIndicators"
          role="button"
          onClick={handleNext}
        >
          <i className="fas fa-chevron-down fa-2x" aria-hidden="true"></i>
          <span className="sr-only">Next</span>
        </a>
        <div className="dot-navigation">
          {[0, 1, 2].map((index) => (
            <span
              key={index}
              className={`dot ${slideIndex === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalSlider;

// import React, { Component } from "react";
// import Slider from "react-slick";

// function VerticalSlider() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     vertical: true,
//     verticalSwiping: true,
//     swipeToSlide: true,
//     beforeChange: function (currentSlide, nextSlide) {
//       console.log("before change", currentSlide, nextSlide);
//     },
//     afterChange: function (currentSlide) {
//       console.log("after change", currentSlide);
//     },
//   };
//   return (
//     <div className="slider-container hero">
//       <Slider {...settings}>
//         <div>
//           <div
//             className="slider-hero-container"
//             style={{
//               backgroundImage: "url('/assets/images/banner-1.png')",
//               backgroundSize: "cover",
//             }}
//           >
//             home
//           </div>
//         </div>
//         <div>
//           <h3>2</h3>
//         </div>
//         <div>
//           <h3>3</h3>
//         </div>
//         <div>
//           <h3>4</h3>
//         </div>
//         <div>
//           <h3>5</h3>
//         </div>
//         <div>
//           <h3>6</h3>
//         </div>
//       </Slider>
//     </div>
//   );
// }

// export default VerticalSlider;
