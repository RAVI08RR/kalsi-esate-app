import * as React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import slides from "./slides"; // Ensure this is the correct path to your slides data

export default function Gallery() {
  const [index, setIndex] = React.useState(-1);
  const [displayedSlides, setDisplayedSlides] = React.useState(
    slides.slice(0, 5)
  );
  const [showAll, setShowAll] = React.useState(false);

  const loadMoreSlides = () => {
    setDisplayedSlides(slides);
    setShowAll(true);
  };

  const photoProps = (slide, { index }) => {
    if (index === 0) {
      return {
        style: {
          gridColumn: "span 3",
          gridRow: "span 2",
          width: "100%",
          height: "auto",
        },
      };
    }
    return {};
  };

  return (
    <>
      <div className="container gallery-section mt-5">
        <div className="row">
          <div className="col-lg-12">
            <PhotoAlbum
              layout="columns"
              photos={displayedSlides}
              columns={3} // Adjust the number of columns as needed
              spacing={10} // Adjust the spacing between photos
              padding={5} // Adjust the padding around photos
              photoProps={photoProps}
              onClick={({ index: current }) => setIndex(current)}
            />

            <Lightbox
              open={index >= 0}
              index={index}
              close={() => setIndex(-1)}
              slides={displayedSlides}
            />

            {!showAll && (
              <div className="text-center mt-4">
                <button
                  className="btn btn-primary load-more-btn"
                  onClick={loadMoreSlides}
                >
                  <img
                    src="/assets/images/gallery-images/camera-icon.svg"
                    alt="img"
                    className="gallery-btn-load-more"
                  />
                  <span>27</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
