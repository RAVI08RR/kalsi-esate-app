import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      id="ProjectReviewslider"
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
      id="ProjectReviewslider"
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <img src="/assets/images/prev-icon.svg" className="arrow-control" />
    </div>
  );
}

const ProjectReviewslider = () => {
  var settings = {
    dots: false,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
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
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="project-review-bg-container">
      <Slider className="project-review-container mt-5" {...settings}>
        <div className="container pt-0">
          <div className="row pt-0">
            <div className="col-lg-6 p-0">
              <img
                src="/assets/images/review-left-slide.png"
                className="right-side-img-review"
              />
            </div>
            <div className="col-lg-6">
              <div className="project-review-description">
                <span className="Preview-title">Upcoming Projects Preview</span>
                <h2 className="pb-2  pt-2 pl-0">
                  Swathi Prashanthi Apartments at Adyar, Chennai
                </h2>
                <p>
                  The renovation of this 1965 ranch-style home involved the
                  integration of two separate structures situated on a spacious
                  15,000 square foot lot, effectively transforming them into a
                  unified and cohesive single residence.
                </p>
                <ul className="p-0">
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai, Tamil Nadu, India, Mumbai
                  </li>
                </ul>
                <h3 className="text-black">Price 2.74 Cr-3.00 Cr</h3>

                <ul class="features-list">
                  <li class="features-list-icons">
                    <img
                      src="/assets/images/2-bad.svg"
                      class="amenties-icons"
                    />
                    3,4 BHK Flats
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/Sqft.svg" class="amenties-icons" />
                    1199-1887 sqft
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/year.svg" class="amenties-icons" />
                    2026
                  </li>
                </ul>
                <div className="equiry-list-btns">
                  <button className="view-project-btn" type="button">
                    View Project
                  </button>

                  <button className="send-inquiry-btn" type="button">
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-0">
          <div className="row pt-0">
            <div className="col-lg-6 p-0">
              <img
                src="/assets/images/review-left-slide.png"
                className="right-side-img-review"
              />
            </div>
            <div className="col-lg-6">
              <div className="project-review-description">
                <span className="Preview-title">Upcoming Projects Preview</span>
                <h2 className="pb-2  pt-2 pl-0">
                  Swathi Prashanthi Apartments at Adyar, Chennai
                </h2>
                <p>
                  The renovation of this 1965 ranch-style home involved the
                  integration of two separate structures situated on a spacious
                  15,000 square foot lot, effectively transforming them into a
                  unified and cohesive single residence.
                </p>
                <ul className="p-0">
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai, Tamil Nadu, India, Mumbai
                  </li>
                </ul>
                <h3 className="text-black">Price 2.74 Cr-3.00 Cr</h3>

                <ul class="features-list">
                  <li class="features-list-icons">
                    <img
                      src="/assets/images/2-bad.svg"
                      class="amenties-icons"
                    />
                    3,4 BHK Flats
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/Sqft.svg" class="amenties-icons" />
                    1199-1887 sqft
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/year.svg" class="amenties-icons" />
                    2026
                  </li>
                </ul>
                <div className="equiry-list-btns">
                  <button className="view-project-btn" type="button">
                    View Project
                  </button>

                  <button className="send-inquiry-btn" type="button">
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-0">
          <div className="row pt-0">
            <div className="col-lg-6 p-0">
              <img
                src="/assets/images/review-left-slide.png"
                className="right-side-img-review"
              />
            </div>
            <div className="col-lg-6">
              <div className="project-review-description">
                <span className="Preview-title">Upcoming Projects Preview</span>
                <h2 className="pb-2  pt-2 pl-0">
                  Swathi Prashanthi Apartments at Adyar, Chennai
                </h2>
                <p>
                  The renovation of this 1965 ranch-style home involved the
                  integration of two separate structures situated on a spacious
                  15,000 square foot lot, effectively transforming them into a
                  unified and cohesive single residence.
                </p>
                <ul className="p-0">
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai, Tamil Nadu, India, Mumbai
                  </li>
                </ul>
                <h3 className="text-black">Price 2.74 Cr-3.00 Cr</h3>

                <ul class="features-list">
                  <li class="features-list-icons">
                    <img
                      src="/assets/images/2-bad.svg"
                      class="amenties-icons"
                    />
                    3,4 BHK Flats
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/Sqft.svg" class="amenties-icons" />
                    1199-1887 sqft
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/year.svg" class="amenties-icons" />
                    2026
                  </li>
                </ul>
                <div className="equiry-list-btns">
                  <button className="view-project-btn" type="button">
                    View Project
                  </button>

                  <button className="send-inquiry-btn" type="button">
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-0">
          <div className="row pt-0">
            <div className="col-lg-6 p-0">
              <img
                src="/assets/images/review-left-slide.png"
                className="right-side-img-review"
              />
            </div>
            <div className="col-lg-6">
              <div className="project-review-description">
                <span className="Preview-title">Upcoming Projects Preview</span>
                <h2 className="pb-2  pt-2 pl-0">
                  Swathi Prashanthi Apartments at Adyar, Chennai
                </h2>
                <p>
                  The renovation of this 1965 ranch-style home involved the
                  integration of two separate structures situated on a spacious
                  15,000 square foot lot, effectively transforming them into a
                  unified and cohesive single residence.
                </p>
                <ul className="p-0">
                  <li class="loction-list">
                    <img
                      src="/assets/images/map-icon.svg"
                      alt="img"
                      class="map-location-icon"
                    />
                    At Adyar, Chennai, Tamil Nadu, India, Mumbai
                  </li>
                </ul>
                <h3 className="text-black">Price 2.74 Cr-3.00 Cr</h3>

                <ul class="features-list">
                  <li class="features-list-icons">
                    <img
                      src="/assets/images/2-bad.svg"
                      class="amenties-icons"
                    />
                    3,4 BHK Flats
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/Sqft.svg" class="amenties-icons" />
                    1199-1887 sqft
                  </li>
                  <li class="features-list-icons">
                    <img src="/assets/images/year.svg" class="amenties-icons" />
                    2026
                  </li>
                </ul>
                <div className="equiry-list-btns">
                  <button className="view-project-btn" type="button">
                    View Project
                  </button>

                  <button className="send-inquiry-btn" type="button">
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default ProjectReviewslider;
