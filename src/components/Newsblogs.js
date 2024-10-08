// import { NavLink, useNavigate } from "react-router-dom";
// import { getnewsandblogdata } from "../apis/callbacks";
// import React, { useState, useEffect } from "react";

// const Newsblogs = () => {
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
//         <div className="btn-c d-flex justify-content-end">
//           <h2 className="slider-heading news-home-heading">News and Blogs</h2>
//           <button className=" contact-us-btn text-white">
//             <NavLink to="/blog-list" className="nav-link">
//               View All{" "}
//             </NavLink>
//           </button>
//         </div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="row">
//             {newsBlogData.slice(0, 3).map((item) => (
//               <div className="col-lg-4" key={item.id}>
//                 <a
//                   onClick={() =>
//                     navigate(`/blog-detail/${item.id}`, {
//                       state: {
//                         item: item,
//                       },
//                     })
//                   }
//                 >
//                   <div className="card blogs-cards">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="card-blog-image"
//                     />
//                     <div className="card-body blog-content">
//                       <h6>{item.title}</h6>
//                       <span className="blog-card-date">
//                         {new Date(item.publish).toLocaleDateString()}
//                       </span>
//                       {/* <p className="card-blog-description">
//                         {item.description}
//                       </p> */}
//                       <div
//                         className="card-blog-description"
//                         dangerouslySetInnerHTML={{ __html: item.description }}
//                       />
//                       <button
//                         onClick={() =>
//                           navigate(`/blog-detail/${item.id}`, {
//                             state: {
//                               item: item,
//                             },
//                           })
//                         }
//                         className="read-more-btn"
//                       >
//                         Read More
//                       </button>
//                     </div>
//                   </div>
//                 </a>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Newsblogs;

import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getnewsandblogdata } from "../apis/callbacks";

const Newsblogs = () => {
  const [newsBlogData, setNewsBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsBlogData = async () => {
      try {
        const data = await getnewsandblogdata();
        // console.log("Fetched data:", data);
        if (data && Array.isArray(data)) {
          setNewsBlogData(data);
        }
      } catch (error) {
        console.error("Error fetching news and blog data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsBlogData();
  }, []);

  const handleNavigation = (url, state) => {
    navigate(url, { state });

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Adding setTimeout for reload as well
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Adjust this timeout as needed
    }, 1000); // Adjust this timeout as needed
  };

  const ResponsiveImage = ({ src, alt, sizes }) => (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={`${src}?w=300&q=75 1x, ${src}?w=600&q=75 2x`}
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${src}?w=400&q=80 1x, ${src}?w=800&q=80 2x`}
      />
      <source
        media="(min-width: 1025px)"
        srcSet={`${src}?w=600&q=90 1x, ${src}?w=1200&q=90 2x`}
      />
      <img
        src={`${src}?w=600&q=90`}
        alt={alt}
        sizes={sizes}
        loading="lazy"
        className="card-blog-image"
      />
    </picture>
  );

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="blog-section pt-0"
    >
      <div className="container">
        <div className="btn-c d-flex justify-content-end">
          <h2 className="slider-heading news-home-heading">News and Blogs</h2>
          <button className="contact-us-btn text-white">
            <NavLink to="/blog-list" className="nav-link">
              View All{" "}
            </NavLink>
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row">
            {newsBlogData.slice(0, 3).map((item) => (
              <div className="col-lg-4" key={item.id}>
                <div
                  className="card blogs-cards"
                  onClick={() =>
                    handleNavigation(`/blog-detail/${item.id}`, { item: item })
                  }
                >
                  <ResponsiveImage
                    src={item.image}
                    alt={item.title}
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 600px"
                  />
                  <div className="card-body blog-content">
                    <h6>{item.title}</h6>
                    <span className="blog-card-date">
                      {new Date(item.publish).toLocaleDateString()}
                    </span>
                    <div
                      className="card-blog-description"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <button className="read-more-btn">Read More</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Newsblogs;
