// import ResizeObserver from "resize-observer-polyfill";
// import * as React from "react";
// import PhotoAlbum from "react-photo-album";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";

// export default function Gallery({ data }) {
//   const [index, setIndex] = React.useState(-1);
//   const [lightboxSlides, setLightboxSlides] = React.useState([]);
//   const [isMobile, setIsMobile] = React.useState(false);

//   React.useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   React.useEffect(() => {
//     if (data && data.length) {
//       const slides = data.map((url) => ({
//         src: url,
//         width: 1000,
//         height: 800,
//       }));
//       setLightboxSlides(slides);
//     }
//   }, [data]);

//   const loadMoreSlides = React.useCallback(() => {
//     if (lightboxSlides.length > 0) {
//       setIndex(isMobile ? 1 : 5); // Open the Lightbox starting from the 2nd image (index 1) in mobile or 6th image (index 5) in desktop
//     }
//   }, [lightboxSlides, isMobile]);

//   const photoProps = (photo, { index }) => {
//     if (data.length === 2) {
//       return {
//         style: {
//           width: "50%",
//           height: "auto",
//         },
//       };
//     }
//     if (!isMobile && data.length > 1 && index === 0) {
//       return {
//         style: {
//           gridColumn: "span 3",
//           gridRow: "span 2",
//           width: "100%",
//           height: "auto",
//         },
//       };
//     }
//     if (data.length === 4 && index === 0) {
//       return {
//         style: {
//           width: "70%",
//           height: "70vh",
//         },
//       };
//     }
//     return {};
//   };

//   const debouncedLoadMoreSlides = React.useCallback(
//     debounce(loadMoreSlides, 200),
//     [loadMoreSlides]
//   );

//   if (!data || !data.length) {
//     return null; // or render some fallback UI
//   }

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="3000"
//       className="container gallery-section mt-2"
//     >
//       <div className="row">
//         <div className="col-lg-12">
//           {isMobile || data.length === 1 ? (
//             <>
//               <img
//                 src={data[0]}
//                 alt="Gallery Banner"
//                 style={{ width: "100%", height: "70vh", objectFit: "cover" }}
//                 className="mobile-banner-image"
//               />
// {data.length > 1 && (
//   <button
//     className="btn btn-primary load-more-btn"
//     onClick={debouncedLoadMoreSlides}
//   >
//     <img
//       src="/assets/images/gallery-images/camera-icon.svg"
//       alt="Load more"
//       className="gallery-btn-load-more"
//     />
//     <span>{data.length}</span>
//   </button>
// )}
//               <Lightbox
//                 open={index >= 0}
//                 index={index}
//                 close={() => setIndex(-1)}
//                 slides={lightboxSlides}
//               />
//             </>
//           ) : (
//             <>
//               <PhotoAlbum
//                 className="gallery-items"
//                 layout="columns"
//                 photos={data
//                   .slice(0, isMobile ? 1 : 5)
//                   .map((url) => ({ src: url, width: 1000, height: 800 }))}
//                 columns={data.length === 2 ? 2 : 3}
//                 spacing={10}
//                 padding={0}
//                 photoProps={photoProps}
//                 onClick={({ index: current }) => {
//                   setIndex(current);
//                 }}
//               />

//               <Lightbox
//                 open={index >= 0}
//                 index={index}
//                 close={() => setIndex(-1)}
//                 slides={lightboxSlides}
//               />

//               {data.length > (isMobile ? 1 : 5) && (
//                 <button
//                   className="btn btn-primary load-more-btn"
//                   onClick={debouncedLoadMoreSlides}
//                 >
//                   <img
//                     src="/assets/images/gallery-images/camera-icon.svg"
//                     alt="Load more"
//                     className="gallery-btn-load-more"
//                   />
//                   <span>{data.length}</span>
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function debounce(fn, delay) {
//   let timeoutId;
//   return function (...args) {
//     if (timeoutId) {
//       clearTimeout(timeoutId);
//     }
//     timeoutId = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }
import ResizeObserver from "resize-observer-polyfill";
import * as React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function Gallery({ data }) {
  const [index, setIndex] = React.useState(-1);
  const [lightboxSlides, setLightboxSlides] = React.useState([]);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (data && data.length) {
      const slides = data.map((url) => ({
        src: url,
        width: 1000,
        height: 800,
      }));
      setLightboxSlides(slides);
    }
  }, [data]);

  const handleClickMobileImage = () => {
    if (data.length > 0) {
      setIndex(0); // Open the Lightbox starting from the first image on mobile
    }
  };

  const debouncedLoadMoreSlides = React.useCallback(
    debounce(() => {
      if (lightboxSlides.length > 0) {
        setIndex(isMobile ? 0 : 5); // Adjust index for mobile and desktop
      }
    }, 200),
    [lightboxSlides, isMobile]
  );

  const photoProps = (photo, { index }) => {
    if (data.length === 2) {
      return {
        style: {
          width: "50%",
          height: "auto",
        },
      };
    }
    if (!isMobile && data.length > 1 && index === 0) {
      return {
        style: {
          gridColumn: "span 3",
          gridRow: "span 2",
          width: "100%",
          height: "auto",
        },
      };
    }
    if (data.length === 4 && index === 0) {
      return {
        style: {
          width: "70%",
          height: "70vh",
        },
      };
    }
    return {};
  };

  if (!data || !data.length) {
    return null; // or render some fallback UI
  }

  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="container gallery-section mt-2"
    >
      <div className="row">
        <div className="col-lg-12">
          {isMobile || data.length === 1 ? (
            <>
              <img
                src={data[0]}
                alt="Gallery Banner"
                style={{ width: "100%", height: "70vh", objectFit: "cover" }}
                className="mobile-banner-image"
                onClick={handleClickMobileImage}
              />

              {data.length > 1 && (
                <button
                  className="btn btn-primary load-more-btn"
                  onClick={debouncedLoadMoreSlides}
                >
                  <img
                    src="/assets/images/gallery-images/camera-icon.svg"
                    alt="Load more"
                    className="gallery-btn-load-more"
                  />
                  <span>{data.length}</span>
                </button>
              )}
              <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={lightboxSlides}
              />
            </>
          ) : (
            <>
              <PhotoAlbum
                className="gallery-items"
                layout="columns"
                photos={data
                  .slice(0, isMobile ? 1 : 5)
                  .map((url) => ({ src: url, width: 1000, height: 800 }))}
                columns={data.length === 2 ? 2 : 3}
                spacing={10}
                padding={0}
                photoProps={photoProps}
                onClick={({ index: current }) => {
                  setIndex(current);
                }}
              />

              <Lightbox
                open={index >= 0}
                index={index}
                close={() => setIndex(-1)}
                slides={lightboxSlides}
              />

              {data.length > (isMobile ? 1 : 5) && (
                <button
                  className="btn btn-primary load-more-btn"
                  onClick={debouncedLoadMoreSlides}
                >
                  <img
                    src="/assets/images/gallery-images/camera-icon.svg"
                    alt="Load more"
                    className="gallery-btn-load-more"
                  />
                  <span>{data.length}</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
