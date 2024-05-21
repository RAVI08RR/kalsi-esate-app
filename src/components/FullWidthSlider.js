// import React, { useState, useEffect } from "react";
// import AwesomeSlider from "react-awesome-slider";
// import "react-awesome-slider/dist/styles.css";
// import withAutoplay from "react-awesome-slider/dist/autoplay";

// const FullWidthSlider = () => {
//   const AutoplaySlider = withAutoplay(AwesomeSlider);
//   const [fadeImages, setFadeImages] = useState([
//     "/assets/images/banner-1.png",
//     "/assets/images/banner-2.png",
//     "/assets/images/banner-1.png",
//   ]);

//   const SliderContent = [
//     {
//       title: "Start Your Home Journey Today.",
//       description:
//         "With The Most Complete Source Of Homes For Sale & Properties Near You.",
//       cities: [
//         "Mumbai",
//         "Delhi",
//         "Pune",
//         "Kolkata",
//         "Chennai",
//         "Bangalore",
//         "Ahmedabad",
//         "Hyderabad",
//       ],
//     },
//     {
//       title: "Start Your Home Journey Today.",
//       description:
//         "With The Most Complete Source Of Homes For Sale & Properties Near You.",
//       cities: [
//         "Mumbai",
//         "Delhi",
//         "Pune",
//         "Kolkata",
//         "Chennai",
//         "Bangalore",
//         "Ahmedabad",
//         "Hyderabad",
//       ],
//     },
//   ];

//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const newImages = await Promise.all(
//           fadeImages.map(async (url) => {
//             const response = await fetch(url);
//             const blob = await response.blob();
//             return URL.createObjectURL(blob);
//           })
//         );
//         setFadeImages(newImages);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);

//   const renderDots = (dotClick) => (
//     <div className="custom-dots">
//       {fadeImages.map((_, index) => (
//         <div
//           key={index}
//           className={`custom-dot ${index === 0 ? "active" : ""}`}
//           onClick={() => dotClick(index)}
//         />
//       ))}
//     </div>
//   );

//   return (
//     <div
//       className="full-width-slider-hero-section"
//       style={{ width: "100%", height: "auto", position: "relative" }}
//     >
//       <AutoplaySlider
//         animation="fadeAnimation"
//         orientation="vertical"
//         play={true}
//         cancelBehavior="freezeWhenNotVisible"
//         // interval={5000}
//         renderDots={renderDots}
//       >
//         {fadeImages.map((imageUrl, index) => (
//           <div
//             key={index}
//             style={{
//               width: "100%",
//               height: "100%",
//               backgroundImage: `url(${imageUrl})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//             }}
//           />
//         ))}
//       </AutoplaySlider>
//       {SliderContent.map((slide, index) => (
//         <div
//           key={index}
//           className="slide-content"
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             zIndex: "1000",
//             transform: "translate(-50%, -50%)",
//           }}
//         >
//           <div className="slides-contents">
//             <h2>{slide.title}</h2>
//             <p>{slide.description}</p>

//             <div className="search-box">
//               <button type="submit" className="serch-btn-home">
//                 <span className="web-search">Search Now</span>
//                 <img
//                   src="assets/images/search-mobiile-icon.svg"
//                   className="search-icon-mobile"
//                   alt="img"
//                 />
//               </button>
//               <input
//                 type="text"
//                 placeholder="Search Project, Locality or Builder"
//               />
//               <img
//                 src="/assets/images/map-icon.svg"
//                 className="city-map-icon"
//               />
//               <select id="citySelect">
//                 {slide.cities.map((city, index) => (
//                   <option key={index} value={city}>
//                     {city}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FullWidthSlider;

import React, { useState, useEffect } from "react";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
// import "./slider.css"; // Import the custom CSS

const FullWidthSlider = () => {
  const AutoplaySlider = withAutoplay(AwesomeSlider);
  const [fadeImages, setFadeImages] = useState([
    "/assets/images/banner-1.png",
    "/assets/images/banner-2.png",
    "/assets/images/banner-1.png",
  ]);

  const SliderContent = [
    {
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
    {
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const newImages = await Promise.all(
          fadeImages.map(async (url) => {
            const response = await fetch(url);
            const blob = await response.blob();
            return URL.createObjectURL(blob);
          })
        );
        setFadeImages(newImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const renderDots = (dotClick) => (
    <div className="custom-dots">
      {fadeImages.map((_, index) => (
        <div
          key={index}
          className={`custom-dot ${index === 0 ? "active" : ""}`}
          onClick={() => dotClick(index)}
        />
      ))}
    </div>
  );

  return (
    <div
      className="full-width-slider-hero-section"
      style={{ width: "100%", height: "auto", position: "relative" }}
    >
      <AutoplaySlider
        className="fade-slider" // Apply the custom class
        play={true}
        cancelOnInteraction={false} // Keep autoplay running after user interaction
        interval={5000}
        renderDots={renderDots}
      >
        {fadeImages.map((imageUrl, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </AutoplaySlider>
      {SliderContent.map((slide, index) => (
        <div
          key={index}
          className="slide-content"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "1000",
            transform: "translate(-50%, -50%)",
            color: "#fff",
          }}
        >
          <div className="slides-contents">
            <h2>{slide.title}</h2>
            <p>{slide.description}</p>
            <div className="search-box">
              <button type="submit" className="serch-btn-home">
                <span className="web-search">Search Now</span>
                <img
                  src="assets/images/search-mobiile-icon.svg"
                  className="search-icon-mobile"
                  alt="img"
                />
              </button>
              <input
                type="text"
                placeholder="Search Project, Locality or Builder"
              />
              <img
                src="/assets/images/map-icon.svg"
                className="city-map-icon"
                alt="map icon"
              />
              <select id="citySelect">
                {slide.cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FullWidthSlider;
