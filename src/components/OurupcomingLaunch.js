// import React, { useState, useEffect, useContext } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { CityIdContext } from "../App";
// import { useNavigate } from "react-router-dom";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       id="arrow-upcoming"
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
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
//       id="arrow-upcoming"
//       className={className}
//       style={{ ...style, display: "block", background: "green" }}
//       onClick={onClick}
//     >
//       <img
//         src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
//         className="arrow-control"
//         alt="Prev Arrow"
//       />
//     </div>
//   );
// }

// const OurupcomingLaunch = ({ upcommingdata }) => {
//   const slugify = (text) => {
//     return text
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, "-") // Replace spaces with -
//       .replace(/[^\w\-]+/g, "") // Remove all non-word chars
//       .replace(/\-\-+/g, "-") // Replace multiple - with single -
//       .replace(/^-+/, "") // Trim - from start of text
//       .replace(/-+$/, ""); // Trim - from end of text
//   };

//   const { cityId } = useContext(CityIdContext);
//   const [topupcomingProjects, setTopupcomingProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTopUpcomingProjects = async () => {
//       setLoading(true);
//       try {
//         if (upcommingdata) {
//           setTopupcomingProjects(upcommingdata);
//           setError(null);
//         } else {
//           setError("No upcoming projects found.");
//         }
//       } catch (error) {
//         console.error("Error fetching upcoming projects:", error);
//         setError("Error fetching upcoming projects. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTopUpcomingProjects();
//   }, [upcommingdata]);

//   const formatPriceRange = (priceRange) => {
//     if (!priceRange) return "- Call for price";

//     const match = priceRange.match(/(\d+)-(\d+) Lac/);

//     if (!match) return "- Call for price";

//     const [_, minPrice, maxPrice] = match;

//     const formatPrice = (price) => {
//       const numberPrice = parseFloat(price);

//       if (numberPrice >= 10000000) {
//         const crores = numberPrice / 10000000;
//         return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
//       } else {
//         const lacs = numberPrice / 100000;
//         return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
//       }
//     };

//     return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
//   };

//   const slicedProjects = topupcomingProjects.slice(0, 12);

//   const settings = {
//     dots: false,
//     arrows: true,
//     infinite: true,
//     slidesToShow: 3,
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
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="section-upcoming-projects">
//       <div className="slider-container">
//         <h2 className="slider-heading text-white">Upcoming New Launch</h2>

//         <Slider {...settings}>
//           {slicedProjects.map((project, idx) => (
//             <div
//               key={idx}
//               style={{ cursor: "pointer" }}
//               onClick={() =>
//                 navigate(
//                   `/property-detail/${project.id}/${slugify(project.title)}`
//                 )
//               }
//             >
//               <div key={project.id} className="upcoming-projects">
//                 <div className="card slider-upcoming-projects-cards">
//                   <img
//                     src={project.image || "/assets/images/up-slide-1.png"}
//                     className="slider-top-card upcoming-launch-card-img"
//                     alt={project.title}
//                     loading="lazy"
//                   />
//                 </div>
//                 <div className="card-body" style={{ paddingTop: "20px" }}>
//                   <div className="bg-slider-img-card">
//                     <h6 className="text-white pb-0 upcoming-title">
//                       {project.title}
//                     </h6>
//                     <span className="builder-name">
//                       By {project.developer_name}
//                     </span>
//                     <p className="text-white pricing-upcoming">
//                       Price {formatPriceRange(project.price)}
//                     </p>
//                     <li style={{ color: "#B1B0B0" }} className="loction-list">
//                       <img
//                         src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                         alt="img"
//                         className="map-location-icon"
//                         loading="lazy"
//                       />
//                       &nbsp; {project.address}
//                     </li>
//                     {project.rera_no && project.rera_no.trim() !== "" && (
//                       <li
//                         className="loction-list"
//                         style={{ paddingTop: "10px " }}
//                       >
//                         <p
//                           className=" pt-2 pb-2 pl-2 rera-no"
//                           style={{
//                             color: "#c08735",
//                           }}
//                         >
//                           RERA ID - {project.rera_no}
//                         </p>
//                       </li>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default OurupcomingLaunch;

import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CityIdContext } from "../App";
import { useNavigate } from "react-router-dom";

const SampleNextArrow = React.memo(({ className, style, onClick }) => (
  <div
    id="arrow-upcoming"
    className={className}
    style={{ ...style, display: "block", background: "red" }}
    onClick={onClick}
  >
    <img
      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg"
      className="arrow-control"
      alt="Next Arrow"
    />
  </div>
));

const SamplePrevArrow = React.memo(({ className, style, onClick }) => (
  <div
    id="arrow-upcoming"
    className={className}
    style={{ ...style, display: "block", background: "green" }}
    onClick={onClick}
  >
    <img
      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg"
      className="arrow-control"
      alt="Prev Arrow"
    />
  </div>
));

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

const formatPriceRange = (priceRange) => {
  if (!priceRange) return "- Call for price";

  const match = priceRange.match(/(\d+)-(\d+) Lac/);

  if (!match) return "- Call for price";

  const [_, minPrice, maxPrice] = match;

  const formatPrice = (price) => {
    const numberPrice = parseFloat(price);

    if (numberPrice >= 10000000) {
      const crores = numberPrice / 10000000;
      return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
    } else {
      const lacs = numberPrice / 100000;
      return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
    }
  };

  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

const ProjectCard = React.memo(({ project, onClick }) => (
  <div style={{ cursor: "pointer" }} onClick={onClick}>
    <div className="upcoming-projects">
      <div className="card slider-upcoming-projects-cards">
        <img
          src={project.image || "/assets/images/up-slide-1.png"}
          className="slider-top-card upcoming-launch-card-img"
          alt={project.title}
          loading="lazy"
        />
      </div>
      <div className="card-body" style={{ paddingTop: "20px" }}>
        <div className="bg-slider-img-card">
          <h6 className="text-white pb-0 upcoming-title">{project.title}</h6>
          <span className="builder-name">By {project.developer_name}</span>
          <p className="text-white pricing-upcoming">
            Price {formatPriceRange(project.price)}
          </p>
          <li style={{ color: "#B1B0B0" }} className="loction-list">
            <img
              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
              alt="img"
              className="map-location-icon"
              loading="lazy"
            />
            &nbsp; {project.address}
          </li>
          {project.rera_no && project.rera_no.trim() !== "" && (
            <li className="loction-list" style={{ paddingTop: "10px " }}>
              <p
                className=" pt-2 pb-2 pl-2 rera-no"
                style={{
                  color: "#c08735",
                }}
              >
                RERA ID - {project.rera_no}
              </p>
            </li>
          )}
        </div>
      </div>
    </div>
  </div>
));

const OurupcomingLaunch = ({ upcommingdata }) => {
  const { cityId } = useContext(CityIdContext);
  const [topupcomingProjects, setTopupcomingProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTopUpcomingProjects = async () => {
      setLoading(true);
      try {
        if (upcommingdata) {
          setTopupcomingProjects(upcommingdata.slice(0, 12));
          setError(null);
        } else {
          setError("No upcoming projects found.");
        }
      } catch (error) {
        console.error("Error fetching upcoming projects:", error);
        setError("Error fetching upcoming projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopUpcomingProjects();
  }, [upcommingdata]);

  const settings = useMemo(
    () => ({
      dots: false,
      arrows: true,
      infinite: true,
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
            slidesToShow: 1,
          },
        },
      ],
    }),
    []
  );

  const handleProjectClick = useCallback(
    (project) => {
      navigate(`/property-detail/${project.id}/${slugify(project.title)}`);
    },
    [navigate]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="section-upcoming-projects">
      <div className="slider-container">
        <h2 className="slider-heading text-white">Upcoming New Launch</h2>

        <Slider {...settings}>
          {topupcomingProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default React.memo(OurupcomingLaunch);
