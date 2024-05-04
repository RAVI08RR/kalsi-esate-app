import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      id="arrow-upcoming"
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
      id="arrow-upcoming"
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <img src="/assets/images/prev-icon.svg" className="arrow-control" />
    </div>
  );
}

const OurupcomingLaunch = () => {
  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 3,
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
    <div className="section-upcoming-projects">
      <div className="slider-container">
        <h2 className="slider-heading text-white">Upcoming New Launch</h2>

        <Slider {...settings}>
          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>
          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>

          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>

          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>

          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>

          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>

          <div className="card slider-upcoming-projects-cards">
            <img src="assets/images/top-sl-1.png" className="slider-top-card" />
            <div className="card-body">
              <div className="bg-slider-img-card">
                <h6 className="text-white pb-0 upcoming-title">
                  Swathi Prashanthi Apartments at Adyar,..
                </h6>
                <span className="builder-name">By Sridhar Construction</span>
                <p className="text-white pricing-upcoming">
                  Price 35 Lac-37.5 Lac
                </p>
                <li style={{ color: "#B1B0B0" }} class="loction-list ">
                  <img
                    src="/assets/images/map-icon.svg"
                    alt="img"
                    class="map-location-icon"
                  />
                  &nbsp; At Adyar, Chennai, Tamil Nadu, India, Mumbai
                </li>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default OurupcomingLaunch;
