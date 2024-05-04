import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Topbrandpartners = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
    <div className="partners-review-main-section">
      <div className="section-parners-logos mt-5">
        <h2 className="slider-heading">Top Branded Builders</h2>

        <Slider {...settings}>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/rk-brothers.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/ansul-logo.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/sdc.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/margana.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/parkkave.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
          <div className=" partners-card">
            <div className="card card-partners">
              <img
                src="/assets/images/partners-logos/svs-mythri-real.png"
                className="partners-logos"
                style={{ paddingLeft: "10px", paddingRight: "10px" }}
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Topbrandpartners;
