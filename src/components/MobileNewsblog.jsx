// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { getnewsandblogdata } from "../apis/callbacks";
// import { Swiper, SwiperSlide } from "swiper/react";
// // import "swiper/swiper-bundle.min.css";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// // Ensure Swiper modules are used

// const MobileNewsblog = () => {
//   const [newsBlogData, setNewsBlogData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNewsBlogData = async () => {
//       const data = await getnewsandblogdata();
//       console.log("Fetched data:", data);
//       if (data && Array.isArray(data)) {
//         setNewsBlogData(data);
//       }
//       setLoading(false);
//     };

//     fetchNewsBlogData();
//   }, []);

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="3000"
//       className="blog-section pt-0"
//     >
//       <div className="container">
//         <div className="btn-c d-flex justify-content-end mb-2">
//           <h2 className="slider-heading" style={{ textAlign: "center" }}>
//             News and Blogs
//           </h2>
//         </div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <Swiper
//             spaceBetween={20}
//             slidesPerView={1.5}
//             navigation
//             loop
//             autoplay={{ delay: 5000 }} // Optional autoplay configuration
//             pagination={{ clickable: true }}

//             className="mySwiper news-blog-slider-section"
//           >
//             {newsBlogData.slice(0, 3).map((item) => (
//               <SwiperSlide className="news-blog-slider-container" key={item.id}>
//                 <div
//                   className="card blogs-cards"
//                   onClick={() =>
//                     navigate(`/blog-detail/${item.id}`, {
//                       state: { item: item },
//                     })
//                   }
//                 >
//                   <img
//                     src={item.image}
//                     alt={item.title}
//                     className="card-blog-image"
//                   />
//                   <div className="card-body blog-content">
//                     <h6>{item.title}</h6>
//                     <span className="blog-card-date">
//                       {new Date(item.publish).toLocaleDateString()}
//                     </span>
//                     {/* <p className="card-blog-description">{item.description}</p> */}
//                     <div
//                       onClick={() =>
//                         navigate(`/blog-detail/${item.id}`, {
//                           state: { item: item },
//                         })
//                       }
//                       className="card-blog-description"
//                       dangerouslySetInnerHTML={{ __html: item.description }}
//                     />
//                     <button
//                       onClick={() =>
//                         navigate(`/blog-detail/${item.id}`, {
//                           state: { item: item },
//                         })
//                       }
//                       className="read-more-btn"
//                     >
//                       Read More
//                     </button>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         )}
//         <button
//           className="contact-us-btn text-white m-auto"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//           }}
//         >
//           <NavLink to="/blog-list" className="nav-link">
//             View All{" "}
//           </NavLink>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MobileNewsblog;

import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { getnewsandblogdata } from "../apis/callbacks";
import ReactOwlCarousel from "react-owl-carousel2";

const MobileNewsblog = () => {
  const [newsBlogData, setNewsBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsBlogData = async () => {
      setLoading(true);
      try {
        const data = await getnewsandblogdata();
        if (data && Array.isArray(data)) {
          setNewsBlogData(data);
          setError(null);
        } else {
          setError("No news or blogs found.");
        }
      } catch (error) {
        setError("Error fetching news and blogs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsBlogData();
  }, []);

  const options = {
    items: 1.5,
    loop: true,
    margin: 20,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayTimeout: 5000,
    responsive: {
      0: {
        items: 1.2,
      },
      600: {
        items: 1.2,
      },
      1024: {
        items: 1.5,
      },
    },
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="blog-section pt-0"
    >
      <div className="container">
        <div className="btn-c d-flex justify-content-end mb-2">
          <h2 className="slider-heading" style={{ textAlign: "center" }}>
            News and Blogs
          </h2>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ReactOwlCarousel options={options}>
            {newsBlogData.slice(0, 3).map((item) => (
              <div
                className="news-blog-slider-container"
                key={item.id}
                onClick={() =>
                  navigate(`/blog-detail/${item.id}`, {
                    state: { item: item },
                  })
                }
              >
                <div className="card blogs-cards">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="card-blog-image"
                  />
                  <div className="card-body blog-content">
                    <h6>{item.title}</h6>
                    <span className="blog-card-date">
                      {new Date(item.publish).toLocaleDateString()}
                    </span>
                    <div
                      onClick={() =>
                        navigate(`/blog-detail/${item.id}`, {
                          state: { item: item },
                        })
                      }
                      className="card-blog-description"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <button
                      onClick={() =>
                        navigate(`/blog-detail/${item.id}`, {
                          state: { item: item },
                        })
                      }
                      className="read-more-btn"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ReactOwlCarousel>
        )}
        <button
          className="contact-us-btn text-white m-auto"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <NavLink to="/blog-list" className="nav-link">
            View All{" "}
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default MobileNewsblog;
