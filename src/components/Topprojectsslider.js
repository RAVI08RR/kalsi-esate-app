import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchData } from "../apis/callbacks";
import { CityIdContext } from "../App";

// Define the slugify function
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
      id="arrow-luxery-slider-arrow"
    >
      <img
        src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
        className="arrow-control"
        alt="Next Arrow"
      />
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
      <img
        src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
        className="arrow-control"
        alt="Prev Arrow"
      />
    </div>
  );
}

const Topprojectsslider = ({ selectedCity, topdata }) => {
  const formatPriceRange = (priceRange) => {
    // Check if priceRange is null, undefined, or empty
    if (!priceRange) return "Call for price";

    // Extract the min and max prices from the price range string
    const match = priceRange.match(/(\d+)-(\d+) Lac/);

    // If the regex doesn't match, return "Call for price"
    if (!match) return "Call for price";

    const [_, minPrice, maxPrice] = match;

    // Function to format individual prices
    const formatPrice = (price) => {
      const numberPrice = parseFloat(price);

      if (numberPrice >= 10000000) {
        // Format for Crores with 1 or 2 decimal places
        const crores = numberPrice / 10000000;
        return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
      } else {
        // Format for Lacs with 1 or 2 decimal places
        const lacs = numberPrice / 100000;
        return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
      }
    };

    return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
  };

  const { cityId } = useContext(CityIdContext);
  const [topProjects, setTopProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State to hold error
  const navigate = useNavigate();
  console.log("cityId", cityId);

  useEffect(() => {
    const getTopProjects = async () => {
      setLoading(true);
      try {
        console.log("cityId fetch", cityId);
        // const data = await fetchData(cityId);
        // console.log("Fetched projects:", data); // Check fetched data
        if (topdata) {
          setTopProjects(topdata);
          // console.log("properties", data.top_projects);
          setError(null); // Reset error state if data is fetched successfully
        } else {
          setError("No projects found for the selected city.");
        }
      } catch (error) {
        console.error("Error fetching top projects:", error);
        setError("Error fetching top projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedCity) {
      getTopProjects();
    }
  }, [topdata]); // Re-fetch projects when selectedCity changes

  const slicedProjects = topProjects.slice(0, 20);

  var settings = {
    dots: false,
    arrow: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          infinite: true,
          slidesToShow: 1,
          centerMode: false,
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
      <style>{`
        .dots-container {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        .dot {
          height: 12px;
          width: 12px;
          margin-right: 10px;
          border-radius: 0px;
          background-color: #c08735;
          animation: pulse 1.5s infinite ease-in-out;
        }

        .dot:last-child {
          margin-right: 0;
        }

        .dot:nth-child(1) {
          animation-delay: -0.3s;
        }

        .dot:nth-child(2) {
          animation-delay: -0.1s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.1s;
        }

        @keyframes pulse {
          0% {
            transform: scale(0.8);
            background-color: #c08735;
            box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
          }

          50% {
            transform: scale(1.2);
            background-color: #c08735;
            box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
          }

          100% {
            transform: scale(0.8);
            background-color: #c08735;
            box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
          }
        }
      `}</style>
      <div className="slider-container" style={{ paddingBottom: "20px" }}>
        <h2 className="slider-heading">Top Projects in {selectedCity}</h2>

        {loading ? (
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Slider className="project-mumbai-slider" {...settings}>
            {Array.isArray(slicedProjects) && slicedProjects.length > 0 ? (
              slicedProjects.map((data) => (
                <div
                  onClick={() =>
                    navigate(
                      `/property-detail/${data.id}/${slugify(data.title)}`
                    )
                  }
                  className="list-property-link"
                  key={data.id}
                >
                  <div className="card slider-top-projects-cards mb-0">
                    <img
                      src={data.image}
                      className="slider-top-card mumbai-img"
                      alt={data.title}
                      loading="lazy"
                    />
                  </div>

                  <div
                    className="card-body bg-white "
                    style={{ width: "94%", padding: "14px" }}
                  >
                    <div className="bg-slider-img-card">
                      <h2>{data.title}</h2>
                      <li className="loction-list">
                        <img
                          src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                          alt="map"
                          className="map-location-icon"
                          loading="lazy"
                        />
                        {data.developer_name}
                      </li>
                      <li className="loction-list">
                        <p className="text-black pt-2 pl-2">
                          Price - {formatPriceRange(data?.price)}
                        </p>
                      </li>
                      {data.rera_no && data.rera_no.trim() !== "" && (
                        <li className="loction-list">
                          <p
                            className="pl-2 rera-no"
                            style={{ color: "#c08735" }}
                          >
                            RERA ID - {data.rera_no}
                          </p>
                        </li>
                      )}

                      <ul
                        className="features-list"
                        style={{ paddingTop: "0px", marginTop: "0rem" }}
                      >
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                            className="amenties-icons"
                            alt="home"
                            loading="lazy"
                          />
                          {data.project_type}
                        </li>
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                            className="amenties-icons"
                            alt="bed"
                            loading="lazy"
                          />
                          {data.unit_size}
                        </li>
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                            className="amenties-icons"
                            alt="bath"
                            loading="lazy"
                          />
                          {data.carpet_area}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">
                No projects found for the selected city.
              </p>
            )}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default Topprojectsslider;

// import React, { useState, useEffect, useContext } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { fetchData } from "../apis/callbacks";
// import { CityIdContext } from "../App";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/swiper.min.css";
// // import "swiper/swiper-bundle.min.css";

// // Define the slugify function
// const slugify = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, "-") // Replace spaces with -
//     .replace(/[^\w\-]+/g, "") // Remove all non-word chars
//     .replace(/\-\-+/g, "-") // Replace multiple - with single -
//     .replace(/^-+/, "") // Trim - from start of text
//     .replace(/-+$/, ""); // Trim - from end of text
// };

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//       id="arrow-luxery-slider-arrow"
//     >
//       <img
//         src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
//         className="arrow-control"
//         alt="Next Arrow"
//       />
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
//       <img
//         src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
//         className="arrow-control"
//         alt="Prev Arrow"
//       />
//     </div>
//   );
// }

// const Topprojectsslider = ({ selectedCity }) => {
//   const formatPriceRange = (priceRange) => {
//     if (!priceRange) return "NA";

//     const match = priceRange.match(/(\d+)-(\d+) Lac/);

//     if (!match) return "NA";

//     const [_, minPrice, maxPrice] = match;

//     const formatPrice = (price) => {
//       const formattedPrice = (price.slice(0, 2) / 10).toFixed(1);
//       return formattedPrice;
//     };

//     return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)} Lac`;
//   };

//   const { cityId } = useContext(CityIdContext);
//   const [topProjects, setTopProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 600);
//     };

//     window.addEventListener("resize", handleResize);

//     const getTopProjects = async () => {
//       setLoading(true);
//       try {
//         const data = await fetchData(cityId);
//         if (data && data.properties && data.properties.length > 0) {
//           setTopProjects(data.properties);
//           setError(null);
//         } else {
//           setError("No projects found for the selected city.");
//         }
//       } catch (error) {
//         setError("Error fetching top projects. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedCity) {
//       getTopProjects();
//     }

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [selectedCity, cityId]);

//   const slicedProjects = topProjects.slice(0, 20);

//   const slickSettings = {
//     dots: false,
//     arrow: true,
//     infinite: true,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     nextArrow: <SampleNextArrow />,
//     prevArrow: <SamplePrevArrow />,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//     ],
//   };

//   return (
//     <div className="section-top-project-mumbai">
//       <style>{`
//         .dots-container {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           height: 100%;
//           width: 100%;
//         }

//         .dot {
//           height: 12px;
//           width: 12px;
//           margin-right: 10px;
//           border-radius: 0px;
//           background-color: #c08735;
//           animation: pulse 1.5s infinite ease-in-out;
//         }

//         .dot:last-child {
//           margin-right: 0;
//         }

//         .dot:nth-child(1) {
//           animation-delay: -0.3s;
//         }

//         .dot:nth-child(2) {
//           animation-delay: -0.1s;
//         }

//         .dot:nth-child(3) {
//           animation-delay: 0.1s;
//         }

//         @keyframes pulse {
//           0% {
//             transform: scale(0.8);
//             background-color: #c08735;
//             box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
//           }

//           50% {
//             transform: scale(1.2);
//             background-color: #c08735;
//             box-shadow: 0 0 0 10px rgba(178, 212, 252, 0);
//           }

//           100% {
//             transform: scale(0.8);
//             background-color: #c08735;
//             box-shadow: 0 0 0 0 rgba(178, 212, 252, 0.7);
//           }
//         }
//       `}</style>
//       <div className="slider-container" style={{ paddingBottom: "20px" }}>
//         <h2 className="slider-heading">Top Projects in {selectedCity}</h2>

//         {loading ? (
//           <section className="dots-container">
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//             <div className="dot"></div>
//           </section>
//         ) : error ? (
//           <p>{error}</p>
//         ) : isMobile ? (
//           <Swiper
//             spaceBetween={0}
//             slidesPerView={2}
//             navigation
//             breakpoints={{
//               600: {
//                 slidesPerView: 2,
//               },
//               1024: {
//                 slidesPerView: 2,
//               },
//             }}
//           >
//             {slicedProjects.map((data) => (
//               <SwiperSlide
//                 key={data.id}
//                 onClick={() =>
//                   navigate(`/property-detail/${data.id}/${slugify(data.title)}`)
//                 }
//               >
//                 <div className="list-property-link">
//                   <div className="card slider-top-projects-cards mb-0">
//                     <img
//                       src={data.image}
//                       className="slider-top-card mumbai-img"
//                       alt={data.title}
//                     />
//                   </div>
//                   <div
//                     className="card-body bg-white "
//                     style={{ width: "94%", padding: "14px" }}
//                   >
//                     <div className="bg-slider-img-card">
//                       <h2>{data.title}</h2>
//                       <li className="loction-list">
//                         <img
//                           src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                           alt="map"
//                           className="map-location-icon"
//                         />
//                         {data.developer_name}
//                       </li>
//                       <li className="loction-list">
//                         <p className="text-black pt-2 pl-2">
//                           Price - {formatPriceRange(data?.price)}
//                         </p>
//                       </li>
//                       <ul
//                         className="features-list"
//                         style={{ paddingTop: "0px" }}
//                       >
//                         <li className="features-list-icons">
//                           <img
//                             src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                             className="amenties-icons"
//                             alt="home"
//                           />
//                           {data.project_type}
//                         </li>
//                         <li className="features-list-icons">
//                           <img
//                             src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
//                             className="amenties-icons"
//                             alt="bed"
//                           />
//                           {data.unit_size}
//                         </li>
//                         <li className="features-list-icons">
//                           <img
//                             src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
//                             className="amenties-icons"
//                             alt="bath"
//                           />
//                           {data.carpet_area}
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <Slider {...slickSettings}>
//             {slicedProjects.map((data) => (
//               <div
//                 className="slider-top-projects-cards"
//                 key={data.id}
//                 onClick={() =>
//                   navigate(`/property-detail/${data.id}/${slugify(data.title)}`)
//                 }
//               >
//                 <img
//                   src={data.image}
//                   className="slider-top-card mumbai-img"
//                   alt={data.title}
//                 />
//                 <div className="slider-card-body">
//                   <div className="bg-slider-img-card">
//                     <h2>{data.title}</h2>
//                     <li className="loction-list">
//                       <img
//                         src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                         alt="map"
//                         className="map-location-icon"
//                       />
//                       {data.developer_name}
//                     </li>
//                     <li className="loction-list">
//                       <p className="text-black pt-2 pl-2">
//                         Price - {formatPriceRange(data?.price)}
//                       </p>
//                     </li>
//                     <ul className="features-list">
//                       <li className="features-list-icons">
//                         <img
//                           src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                           className="amenties-icons"
//                           alt="home"
//                         />
//                         {data.project_type}
//                       </li>
//                       <li className="features-list-icons">
//                         <img
//                           src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
//                           className="amenties-icons"
//                           alt="bed"
//                         />
//                         {data.unit_size}
//                       </li>
//                       <li className="features-list-icons">
//                         <img
//                           src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
//                           className="amenties-icons"
//                           alt="bath"
//                         />
//                         {data.carpet_area}
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Topprojectsslider;
