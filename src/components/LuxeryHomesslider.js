// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchData, fetchCategories } from "../apis/callbacks";

// function SampleNextArrow(props) {
//   const { className, style, onClick } = props;
//   return (
//     <div
//       className={className}
//       style={{ ...style, display: "block", background: "red" }}
//       onClick={onClick}
//       id="arrow-luxery-slider-arrow"
//     >
//       <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/next-arrow.svg" className="arrow-control" />
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
//       <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/prev-icon.svg" className="arrow-control" />
//     </div>
//   );
// }

// export default function LuxeryHomesslider() {
//   const [data, setData] = useState(null);
//   const [categories, setCategories] = useState(null);

//   useEffect(() => {
//     fetchCategories().then((data) => setData(data));
//     console.log("locations", data);
//     fetchCategories().then((categories) => setCategories(categories));
//   }, []);

//   if (!data || !categories) {
//     return <div>Loading...</div>;
//   }

//   var settings = {
//     dots: false,
//     arrow: true,
//     // infinite: true,
//     // centerMode: true,
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
//   };

//   return (
//     <div className="container mt-5 wb-pd-b">
//       <h2 className="slider-heading">
//         Find Luxury Homes: Kalsi Estate, India's Best.
//       </h2>

//       <Slider className="luxery-slider-section-main" {...settings}>
//         {data.locations?.map((location, index) => (
//           <div key={location.id} className="slider-luxary">
//             <div
//               className="bg-slider-img"
//               style={{
//                 backgroundImage: `url('${location.image}')`,
//               }}
//             >
//               <div
//                 className="overlay-image"
//                 style={{
//                   backgroundImage: `url('${location.image}')`,
//                 }}
//               ></div>
//               <div className="hover-box-new">
//                 <h2 className="city-names text-white">{location.location}</h2>
//                 <div className="icon-box-city">
//                   <img
//                     src={location.icon}
//                     alt="img"
//                     className="icon-box-city"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
// import { fetchCategories } from "../apis/callbacks";

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
      />
    </div>
  );
}

const LuxeryHomesslider = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    locations: [
      {
        id: 1,
        location: "Mumbai",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725625489.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727011840.png",
      },
      {
        id: 2,
        location: "Delhi",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725884087.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1718101370.svg",
      },
      {
        id: 3,
        location: "Pune",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1727012328.png",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727011979.png",
      },
      {
        id: 4,
        location: "Kolkata",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725627312.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727012409.png",
      },
      {
        id: 6,
        location: "Chennai",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725627476.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727012463.png",
      },
      {
        id: 7,
        location: "Hyderabad",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725630228.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1718101511.svg",
      },
      {
        id: 8,
        location: "Bangalore",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725626306.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727011261.png",
      },
      {
        id: 9,
        location: "Ahmedabad",
        image:
          "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Image/1725631419.webp",
        icon: "https://d3v1h55v8tucsz.cloudfront.net/public/Admin/Location/Icons/1727012637.png",
      },
    ],
  });
  // useEffect(() => {
  //   fetchCategories().then((data) => setData(data));
  //   // fetchCategories().then((categories) => setCategories(categories));
  // }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  var settings = {
    dots: false,
    arrow: true,
    centerPadding: "25px",
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
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

  const handleLocationClick = (locationId, locationName) => {
    const slug = locationName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/city-detail/${slug}/${locationId}`, {
      state: { locationId, locationName },
    });
  };

  return (
    <div className="container mt-5 wb-pd-b">
      <h2 className="slider-heading">
        Find Luxury Homes: Kalsi Estate, India's Best.
      </h2>

      <Slider className="luxery-slider-section-main" {...settings}>
        {data.locations?.map((location, index) => (
          <div key={location.id} className="slider-luxary">
            <div
              className="bg-slider-img"
              style={{
                backgroundImage: `url('${location.image}')`,
              }}
              onClick={() =>
                handleLocationClick(location.id, location.location)
              }
            >
              <div
                className="overlay-image"
                style={{
                  backgroundImage: `url('${location.image}')`,
                }}
              ></div>
              <div className="hover-box-new">
                <h2 className="city-names text-white">{location.location}</h2>
                <div className="icon-box-city">
                  <img
                    src={location.icon}
                    alt="img"
                    className="icon-box-city"
                    loading="lazy"
                    width="105px"
                    height="105px"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default LuxeryHomesslider;
