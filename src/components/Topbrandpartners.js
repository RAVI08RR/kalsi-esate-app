import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { brandpartners } from "../apis/callbacks";
import { Link } from "react-router-dom";

const Topbrandpartners = () => {
  const [topBrandpartners, setTopBrandpartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTopProjects = async () => {
      const data = await brandpartners();

      if (data && data.featured_developers) {
        setTopBrandpartners(data.featured_developers);
      }
      setLoading(false);
    };

    getTopProjects();
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  const testSettings = {
    backgroundColor: "#C08735",
    color: "#D9D9D9",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "slickMain",
    dotsClass: "button__bar",
    arrows: false,
    beforeChange: (prev, next) => {
      setCurrentSlide(next);
    },
    appendDots: (dots) => {
      return (
        <div>
          <ul>
            {dots.map((item, index) => {
              return <li key={index}>{item.props.children}</li>;
            })}
          </ul>
        </div>
      );
    },
    customPaging: (i) => {
      return (
        <button
          style={
            i === currentSlide
              ? { ...testSettings, fontSize: "18px" }
              : { fontSize: "18px" }
          }
        ></button>
      );
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          customPaging: (i) => {
            return (
              <button
                style={
                  i === currentSlide
                    ? { ...testSettings, fontSize: "14px" }
                    : { fontSize: "14px" }
                }
              ></button>
            );
          },
        },
      },
    ],
  };

  return (
    <div className="container mt-5 top-builders-section">
      <h2 className="slider-heading mt-2" style={{ paddingBottom: "0px" }}>
        Top Branded Builders
      </h2>
      <Slider className="home-loanslider" {...settings}>
        {topBrandpartners.map((developer) => (
          <div key={developer.id} className="p-2 box-load-slider-top-brands">
            <Link to={`/builder-details/${developer.id}`}>
              <img
                src={developer.image}
                alt={`Developer ${developer.id}`}
                className="img-fluid"
                loading="lazy"
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Topbrandpartners;
