import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      <img src="/assets/images/next-arrow.svg" className="arrow-control" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <img src="/assets/images/prev-icon.svg" className="arrow-control" />
    </div>
  );
}

export default function LuxeryHomesslider() {
  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <h2 className="slider-heading">
        Find Luxury Homes: Kalsi Estate, India's Best.
      </h2>

      <Slider {...settings}>
        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/mumbai.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Mumbai</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/delhi.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Delhi</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/chennai.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Mumbai</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/banglore.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Banglore</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/banner-1.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Mumbai</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/mumbai.png')`, // Set background image here
            }}
          >
            <div className="hover-box">
              <h2>Mumbai</h2>

              <div className="icon-box-city">
                <img
                  src="assets/images/hyd-icon.png"
                  alt="img"
                  className="icon-box-city"
                />
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
