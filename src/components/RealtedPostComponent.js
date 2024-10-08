// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getbloglistdata } from "../apis/callbacks";
// import BreadcrumbComponent from "./BreadcrumbComponent";
// import Pagination from "./Pagination"; // Assuming Pagination component is in the same directory

// const RealtedPostComponent = () => {
//   const breadcrumbItems = [
//     { label: "Home", href: "/", active: false },
//     { label: "Blog list", active: true },
//   ];

//   const [newsBlogData, setNewsBlogData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPage, setCurrentPage] = useState(1); // State for current page
//   const [blogsPerPage] = useState(6); // Number of blogs per page
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchNewsBlogData = async () => {
//       const data = await getbloglistdata();
//       console.log("Fetched data:", data);
//       if (data && Array.isArray(data)) {
//         setNewsBlogData(data);
//       }
//       setLoading(false);
//     };

//     fetchNewsBlogData();
//   }, []);

//   // Logic to get current blogs
//   const indexOfLastBlog = currentPage * blogsPerPage;
//   const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
//   const currentBlogs = newsBlogData.slice(indexOfFirstBlog, indexOfLastBlog);
//   const totalPages = Math.ceil(newsBlogData.length / blogsPerPage);

//   // Change page
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//     const pageSetSize = 5;
//     const halfSet = Math.floor(pageSetSize / 2);

//     let startPage = Math.max(currentPage - halfSet, 1);
//     let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

//     if (endPage - startPage + 1 < pageSetSize) {
//       startPage = Math.max(endPage - pageSetSize + 1, 1);
//     }

//     const renderPageNumbers = () => {
//       const pageNumbers = [];

//       if (startPage > 1) {
//         pageNumbers.push(
//           <button
//             key={1}
//             className="pagination-btn"
//             onClick={() => handlePageChange(1)}
//           >
//             1
//           </button>
//         );
//         if (startPage > 2) {
//           pageNumbers.push(
//             <button key="ellipsis-start" className="pagination-btn" disabled>
//               ...
//             </button>
//           );
//         }
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(
//           <button
//             key={i}
//             className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </button>
//         );
//       }

//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//           pageNumbers.push(
//             <button key="ellipsis-end" className="pagination-btn" disabled>
//               ...
//             </button>
//           );
//         }
//         pageNumbers.push(
//           <button
//             key={totalPages}
//             className={`pagination-btn ${
//               totalPages === currentPage ? "active" : ""
//             }`}
//             onClick={() => handlePageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         );
//       }

//       return pageNumbers;
//     };

//     return (
//       <div className="pagination">
//         <button
//           className="pagination-btn"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <img
//             src="/assets/images/chevron-left.svg"
//             alt="arrow"
//             className="arrow-pagination"
//           />
//         </button>
//         {renderPageNumbers()}
//         <button
//           className="pagination-btn"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           <img
//             src="/assets/images/chevron-right.svg"
//             alt="arrow"
//             className="arrow-pagination"
//           />
//         </button>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="container mt-5 pb-2">
//         <BreadcrumbComponent items={breadcrumbItems} />
//       </div>

//       <div
//         data-aos="fade-up"
//         data-aos-duration="3000"
//         className="blog-section-list mt-2 pt-0"
//       >
//         <div className="container">
//           <h2 className="slider-heading">News and Blogs</h2>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <>
//               <div className="row">
//                 {currentBlogs.map((item) => (
//                   <div className="col-lg-4" key={item.id}>
//                     <div
//                       className="card blogs-cards"
//                       onClick={() =>
//                         navigate(`/blog-detail/${item.id}`, {
//                           state: {
//                             item: item,
//                           },
//                         })
//                       }
//                       style={{ cursor: "pointer" }}
//                     >
//                       <img
//                         onClick={() =>
//                           navigate(`/blog-detail/${item.id}`, {
//                             state: {
//                               item: item,
//                             },
//                           })
//                         }
//                         style={{ cursor: "pointer" }}
//                         src={item.image}
//                         alt={item.title}
//                         className="card-blog-image"
//                       />
//                       <div className="card-body blog-content">
//                         <h6
//                           onClick={() =>
//                             navigate(`/blog-detail/${item.id}`, {
//                               state: {
//                                 item: item,
//                               },
//                             })
//                           }
//                           style={{ cursor: "pointer" }}
//                         >
//                           {item.title}
//                         </h6>
//                         <span
//                           onClick={() =>
//                             navigate(`/blog-detail/${item.id}`, {
//                               state: {
//                                 item: item,
//                               },
//                             })
//                           }
//                           style={{ cursor: "pointer" }}
//                           className="blog-card-date"
//                         >
//                           {new Date(item.publish).toLocaleDateString()}
//                         </span>
//                         {/* <p
//                           onClick={() =>
//                             navigate(`/blog-detail/${item.id}`, {
//                               state: {
//                                 item: item,
//                               },
//                             })
//                           }
//                           style={{ cursor: "pointer" }}
//                           className="card-blog-description"
//                         >
//                           {item.description}
//                         </p> */}

//                         <div
//                           onClick={() =>
//                             navigate(`/blog-detail/${item.id}`, {
//                               state: {
//                                 item: item,
//                               },
//                             })
//                           }
//                           style={{ cursor: "pointer" }}
//                           className="card-blog-description"
//                           dangerouslySetInnerHTML={{ __html: item.description }}
//                         />
//                         <button
//                           onClick={() =>
//                             navigate(`/blog-detail/${item.id}`, {
//                               state: {
//                                 item: item,
//                               },
//                             })
//                           }
//                           style={{ cursor: "pointer" }}
//                           className="read-more-btn"
//                         >
//                           Read More
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 handlePageChange={handlePageChange}
//               />
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default RealtedPostComponent;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "./BreadcrumbComponent";

const RealtedPostComponent = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Blog list", active: true },
  ];

  const [newsBlogData, setNewsBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsBlogData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://admin.kalsiestate.com/public/api/newsList?page=${currentPage}`
        );
        const data = await response.json();
        if (data && data.data) {
          setNewsBlogData(data.data);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
      setLoading(false);
    };

    fetchNewsBlogData();
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPagination = () => {
    if (!pagination) return null;

    const { current_page, last_page } = pagination;
    const pageSetSize = 5;
    const halfSet = Math.floor(pageSetSize / 2);

    let startPage = Math.max(current_page - halfSet, 1);
    let endPage = Math.min(startPage + pageSetSize - 1, last_page);

    if (endPage - startPage + 1 < pageSetSize) {
      startPage = Math.max(endPage - pageSetSize + 1, 1);
    }

    const pageNumbers = [];

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <button key="ellipsis-start" className="pagination-btn" disabled>
            ...
          </button>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-btn ${i === current_page ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < last_page) {
      if (endPage < last_page - 1) {
        pageNumbers.push(
          <button key="ellipsis-end" className="pagination-btn" disabled>
            ...
          </button>
        );
      }
      pageNumbers.push(
        <button
          key={last_page}
          className={`pagination-btn ${
            last_page === current_page ? "active" : ""
          }`}
          onClick={() => handlePageChange(last_page)}
        >
          {last_page}
        </button>
      );
    }

    return (
      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(current_page - 1)}
          disabled={current_page === 1}
        >
          <img
            src="/assets/images/chevron-left.svg"
            alt="Previous"
            className="arrow-pagination"
          />
        </button>
        {pageNumbers}
        <button
          className="pagination-btn"
          onClick={() => handlePageChange(current_page + 1)}
          disabled={current_page === last_page}
        >
          <img
            src="/assets/images/chevron-right.svg"
            alt="Next"
            className="arrow-pagination"
          />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent items={breadcrumbItems} />
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="3000"
        className="blog-section-list mt-2 pt-0"
      >
        <div className="container">
          <h2 className="slider-heading">News and Blogs</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="row">
                {newsBlogData.map((item) => (
                  <div className="col-lg-4" key={item.id}>
                    <div
                      className="card blogs-cards"
                      onClick={() =>
                        navigate(`/blog-detail/${item.id}`, {
                          state: { item: item },
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
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
                          className="card-blog-description"
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                        <button className="read-more-btn">Read More</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {renderPagination()}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default RealtedPostComponent;
