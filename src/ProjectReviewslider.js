import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../apis/callbacks";
import { CityIdContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom";

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
      id="ProjectReviewslider"
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
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      id="ProjectReviewslider"
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
  );
}

const ProjectReviewslider = ({ highlighteddata }) => {
  const { cityId } = useContext(CityIdContext);
  const [tophighlightedprojects, setTophighlightedprojects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({}); // State to track which project descriptions are expanded

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  const [activeSection, setActiveSection] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchTophighlightedprojects = async () => {
      setLoading(true);
      try {
        // const data = await fetchData(cityId);
        // console.log("Fetched data:", data?.highlighted);
        if (highlighteddata) {
          setTophighlightedprojects(highlighteddata);
          setError(null);
        } else {
          setError("No highlighted projects found.");
        }
      } catch (error) {
        console.error("Error fetching highlighted projects:", error);
        setError(
          "Error fetching highlighted projects. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTophighlightedprojects();
  }, [highlighteddata]);

  const formatPriceRange = (priceRange) => {
    if (!priceRange) return "Call for price";

    // Extract the min and max prices from the price range string
    const match = priceRange.match(/(\d+)-(\d+) Lac/);

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

  const toggleReadMore = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const renderDescription = (description, id) => {
    const isExpanded = expanded[id];
    const truncatedDescription = description?.slice(0, 100);

    return (
      <>
        {isExpanded ? description : truncatedDescription}
        {description?.length > 100 && (
          <span
            className="read-more-toggle"
            onClick={() => toggleReadMore(id)}
            style={{ color: "#c08835", cursor: "pointer" }}
          >
            {isExpanded ? " Read less" : "... Read more"}
          </span>
        )}
      </>
    );
  };
  var settings = {
    dots: false,
    arrow: false,
    infinite: true,
    slidesToShow: 1,
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
  };

  return (
    <div className="highlight-pr">
      <div className="project-review-bg-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Slider className="project-review-container mt-5" {...settings}>
            {tophighlightedprojects.map((project) => (
              <div key={project.id} className="container pt-0">
                <div className="row pt-0">
                  <div className="col-lg-6 p-0">
                    <img
                      onClick={() =>
                        navigate(
                          `/property-detail/${project.id}/${slugify(
                            project.title
                          )}`
                        )
                      }
                      style={{ cursor: "pointer" }}
                      src={project.image}
                      className="right-side-img-review"
                      alt={project.title}
                    />
                  </div>
                  <div className="col-lg-6">
                    <div className="project-review-description">
                      <span className="Preview-title">
                        Highlighted Projects
                      </span>
                      <h2
                        onClick={() =>
                          navigate(
                            `/property-detail/${project.id}/${slugify(
                              project.title
                            )}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                        className="pb-2  pt-2 pl-0"
                      >
                        {project.title}
                      </h2>
                      <p className="kss-light-gray ">
                        {renderDescription(project.description, project.id)}
                      </p>
                      <ul
                        className="p-0"
                        onClick={() =>
                          navigate(
                            `/property-detail/${project.id}/${slugify(
                              project.title
                            )}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <li className="loction-list">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                            alt="img"
                            className="map-location-icon"
                          />
                          {project.address}
                        </li>
                      </ul>
                      <h5 className="text-black fs-20">
                        Price - {formatPriceRange(project.price)}
                      </h5>
                      {project.rera_no && project.rera_no.trim() !== "" && (
                        <li
                          className="loction-list"
                          // style={{ paddingTop: "10px " }}
                        >
                          <p
                            className=" pt-2 pb-0 pl-2 rera-no"
                            style={{
                              color: "#c08735",
                              lineHeight: "12px",
                            }}
                          >
                            RERA ID - {project.rera_no}
                          </p>
                        </li>
                      )}
                      <li className="loction-list">
                        <p
                          className=""
                          style={{
                            lineHeight: "12px",
                          }}
                        >
                          By - {project.developer_name}
                        </p>
                      </li>
                      <ul
                        onClick={() =>
                          navigate(
                            `/property-detail/${project.id}/${slugify(
                              project.title
                            )}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                        className="features-list highlighted-list md-none"
                      >
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.nethttps://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                            className="amenties-icons highlight-project"
                            alt="project type"
                          />
                          {project.project_type}
                        </li>
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                            className="amenties-icons highlight-project"
                            alt="bed"
                          />
                          {project.unit_size}
                        </li>
                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/sqft-hi.svg"
                            className="amenties-icons highlight-project"
                            alt="carpet area"
                          />
                          {project.carpet_area}
                        </li>
                      </ul>
                      <div className="equiry-list-btns">
                        <button
                          className="view-project-btn"
                          type="button"
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                        >
                          View Project
                        </button>
                        <button
                          className="send-inquiry-btn"
                          type="button"
                          onClick={() => scrollToSection("contact-us")}
                          style={{ cursor: "pointer" }}
                        >
                          <a
                            style={{ textDecoration: "none" }}
                            className="text-black"
                          >
                            Send Inquiry
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default ProjectReviewslider;
