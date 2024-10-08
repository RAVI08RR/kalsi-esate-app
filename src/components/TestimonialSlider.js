import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="testimonial-arrow"
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    >
      <img
        src="https://d3v1h55v8tucsz.cloudfront.net/https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
        className="arrow-control"
      />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="testimonial-arrow"
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    >
      <img
        src="https://d3v1h55v8tucsz.cloudfront.net/https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
        className="arrow-control"
      />
    </div>
  );
}

const TestimonialSlider = () => {
  const settings = {
    dots: false,
    arrow: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="main-section-testimonial"
    >
      <div className="container my-5">
        <h2 className="text-center mb-4 pb-5">Unique Offerings</h2>
        <Slider className="testimonials-slide-section" {...settings}>
          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/1.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Zero brokerage</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/2.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Quick Response</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/3.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Listening skills</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>

          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/4.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Competitive price</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/5.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Site visit as per your convinent</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>

          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/6.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Expert legal advice</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>

          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/7.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">
                  Support till the date of possession
                </h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>

          <div className="px-3">
            <div className="card card testimonial-card">
              <div className="card-body">
                <div className="icon-box">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/unique-offers-icons/8.svg"
                    className="testimonilal-icon"
                    width="50%"
                    height="50%"
                  />
                </div>
                <h5 className="card-title">Loans from all banks</h5>
                {/* <p className="card-subtitle mb-2 text-muted">
                  Peruse through the different neighborhoods below .
                </p> */}
              </div>
            </div>
          </div>
          {/* Add more testimonial cards here */}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
