import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const HomeLoanSliderComponents = () => {
  const images = [
    "/assets/images/loanBrand-images/h1.png",
    "/assets/images/loanBrand-images/h2.png",
    "/assets/images/loanBrand-images/h3.png",
    "/assets/images/loanBrand-images/h4.png",
    "/assets/images/loanBrand-images/h6.png",
    "/assets/images/loanBrand-images/h7.png",
    "/assets/images/loanBrand-images/h8.png",

    "/assets/images/loanBrand-images/h6.png",
    "/assets/images/loanBrand-images/h7.png",
    "/assets/images/loanBrand-images/h8.png",
    // add more image URLs as needed
  ];

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const testSettings = {
    // Add your custom styles for the active dot here
    backgroundColor: "#C08735",
    color: "#D9D9D9",
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
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
        breakpoint: 768, // Medium screen breakpoint (tablets)
        settings: {
          slidesToShow: 1,
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
    <Slider className="home-loanslider" {...settings}>
      {images.map((image, index) => (
        <div key={index} className="p-2 box-load-slider">
          <img src={image} alt={`Slide ${index}`} className="img-fluid" />
        </div>
      ))}
    </Slider>
  );
};

export default HomeLoanSliderComponents;
