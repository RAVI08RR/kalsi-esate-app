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

export default function LuxeryHomesslider() {
  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 1000,
    // speed: 500,
    // variableWidth: true,
    centerMode: true,
    centerPadding: "20px", // Add 20px padding on the left side
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

      <Slider className="luxery-slider-section-main" {...settings}>
        <div className="slider-luxary">
          <div
            className="bg-slider-img"
            style={{
              backgroundImage: `url('/assets/images/cities-images/delhi.png')`,
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/banner-city-gloden.png')`,
              }}
            ></div>
            <div className="hover-box-new">
              <h2 className="city-names text-white">Delhi</h2>
              <div className="icon-box-city">
                <img
                  src="/assets/images/city-icons/delhi-icon.svg"
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
              backgroundImage: `url('/assets/images/cities-images/mumbai.png')`, // Set background image here
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
              }}
            ></div>
            <div className="hover-box-new">
              <h2 className="city-names text-white">Mumbai</h2>
              <div className="icon-box-city">
                <img
                  src="/assets/images/city-icons/mumbai-icon.svg"
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
              backgroundImage: `url('/assets/images/cities-images/chennai.png')`, // Set background image here
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/chennai-golden.png')`,
              }}
            ></div>
            <div className="hover-box-new">
              <h2 className="city-names text-white">Chennai</h2>

              <div className="icon-box-city">
                <img
                  src="/assets/images/city-icons/chennai-icon.svg"
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
              backgroundImage: `url('/assets/images/cities-images/bangalore.png')`, // Set background image here
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/bangalore-golden.png')`,
              }}
            ></div>
            <div className="hover-box-new">
              <h2 className="city-names text-white">Banglore</h2>

              <div className="icon-box-city">
                <img
                  src="/assets/images/city-icons/bangalore-icon.svg"
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
              backgroundImage: `url('/assets/images/cities-images/ahmedabad-1.png')`, // Set background image here
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/ahmedabad-golden.png')`,
              }}
            ></div>

            <div className="hover-box-new">
              <h2 className="city-names text-white">Ahmedabad</h2>

              <div className="icon-box-city">
                <img
                  src="/assets/images/city-icons/ahmedabad-icon.svg"
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
              backgroundImage: `url('/assets/images/cities-images/mumbai.png')`, // Set background image here
            }}
          >
            <div
              className="overlay-image"
              style={{
                backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
              }}
            ></div>
            <div className="hover-box-new">
              <h2 className="city-names text-white">Mumbai</h2>

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

// neww code start here
// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//       id="arrow-luxery-slider-arrow"
//     >
//       <img src="/assets/images/next-arrow.svg" className="arrow-control" />
//     </div>
//   );
// }

// function SamplePrevArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//       id="arrow-luxery-slider-arrow"
//     >
//       <img src="/assets/images/prev-icon.svg" className="arrow-control" />
//     </div>
//   );
// }

// export default function LuxeryHomesslider() {
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleBeforeChange = () => {
//     setIsTransitioning(true);
//   };

//   const handleAfterChange = () => {
//     setIsTransitioning(false);
//   };

//   const settings = {
//     dots: false,
//     arrow: true,
//     infinite: true,
//     centerMode: true,
//     centerPadding: "20px",
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//     beforeChange: handleBeforeChange,
//     afterChange: handleAfterChange,
//   };

//   return (
//     <div className="slider-container">
//       <h2 className="slider-heading">
//         Find Luxury Homes: Kalsi Estate, India's Best.
//       </h2>

//       <Slider
//         className={`luxery-slider-section-main ${
//           isTransitioning ? "transitioning" : ""
//         }`}
//         {...settings}
//       >
//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/delhi.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/banner-city-gloden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Delhi</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/delhi-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/mumbai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Mumbai</h2>
//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/mumbai-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/chennai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/chennai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Chennai</h2>

//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/chennai-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/bangalore.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/bangalore-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Banglore</h2>

//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/bangalore-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/ahmedabad-1.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/ahmedabad-golden.png')`,
//               }}
//             ></div>

//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Ahmedabad</h2>

//               <div className="icon-box-city">
//                 <img
//                   src="/assets/images/city-icons/ahmedabad-icon.svg"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="slider-luxary">
//           <div
//             className="bg-slider-img"
//             style={{
//               backgroundImage: `url('/assets/images/cities-images/mumbai.png')`,
//             }}
//           >
//             <div
//               className="overlay-image"
//               style={{
//                 backgroundImage: `url('/assets/images/cities-images/mumbai-golden.png')`,
//               }}
//             ></div>
//             <div className="hover-box-new">
//               <h2 className="city-names text-white">Mumbai</h2>

//               <div className="icon-box-city">
//                 <img
//                   src="assets/images/hyd-icon.png"
//                   alt="img"
//                   className="icon-box-city"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Slider>

//       <style jsx global>{`
//         .slick-list {
//           padding: 10px 15px !important;
//           margin-left: 8rem !important;
//           transition: margin-left 0.3s ease;
//         }

//         .luxery-slider-section-main.transitioning .slick-list {
//           padding: 10px 15px !important;
//           margin-left: 0 !important;
//         }
//       `}</style>
//     </div>
//   );
// }
