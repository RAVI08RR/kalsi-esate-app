import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
      id="arrow-luxery-slider-arrow"
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
      id="arrow-luxery-slider-arrow"
    >
      <img src="/assets/images/prev-icon.svg" className="arrow-control" />
    </div>
  );
}

const Topprojectsslider = () => {
  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // speed: 500,

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
    <div className="section-top-project-mumbai">
      <div className="slider-container">
        <h2 className="slider-heading">Top Projects in Mumbai</h2>

        <Slider className="project-mumbai-slider" {...settings}>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-1.png"
                className="slider-top-card mumbai-img  "
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    By Sridhar Construction
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-2.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Prashanthi Apartments at Adyar, Chennai</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    By Goldorf Media
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-3.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    R K Builders
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-4.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-5.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-6.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    R K Builders
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink to="/property-detail" className="list-property-link">
            <div className="card slider-top-projects-cards">
              <img
                src="assets/images/top-sl-3.png"
                className="slider-top-card mumbai-img"
              />
              <div className="card-body">
                <div className="bg-slider-img-card">
                  <h2>Swathi Prashanthi Apartments at Adyar,..</h2>
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    By Sridhar Construction
                  </li>

                  <ul className="features-list">
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/home-icon.svg"
                        className="amenties-icons"
                      />
                      House
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bed.svg"
                        className="amenties-icons"
                      />
                      Bed
                    </li>
                    <li className="features-list-icons">
                      <img
                        src="/assets/images/bath.svg"
                        className="amenties-icons"
                      />
                      610-969 sqft
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </NavLink>
        </Slider>
      </div>
    </div>
  );
};

export default Topprojectsslider;
