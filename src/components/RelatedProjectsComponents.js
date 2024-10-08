import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BASE_URL } from "../apis/constatnts";

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

const RelatedProjectsComponents = ({ propertyid }) => {
  const [relatedProjects, setRelatedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedProjects = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/property/${propertyid}/related-projects`
        );
        const result = await response.json();
        setRelatedProjects(result.data);
      } catch (error) {
        console.error("Error fetching related projects:", error);
      }
    };

    if (propertyid) {
      fetchRelatedProjects();
    }
  }, [propertyid]);

  const formatPrice = (price) => {
    if (!price || price === 0) return null;

    if (price >= 10000000) {
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else {
      return `${(price / 100000).toFixed(2)} Lac`;
    }
  };
  if (!relatedProjects || relatedProjects.length === 0) {
    return null; // Return nothing if there are no related projects
  }

  return (
    <div className="Related-Projects-container">
      <h2 className="slider-heading">Related Projects</h2>
      <div className="container">
        <div className="row">
          {relatedProjects?.map((project) => {
            const formattedFromPrice = formatPrice(project?.price?.from);
            const formattedToPrice = formatPrice(project?.price?.to);

            let priceRange = "Call for price";
            if (formattedFromPrice && formattedToPrice) {
              priceRange = `${formattedFromPrice} - ${formattedToPrice}`;
            } else if (formattedFromPrice) {
              priceRange = formattedFromPrice;
            } else if (formattedToPrice) {
              priceRange = formattedToPrice;
            }

            return (
              <div className="col-lg-4" key={project.id}>
                <div
                  className="card slider-related-projects-cards"
                  onClick={() =>
                    navigate(
                      `/property-detail/${project.id}/${slugify(project.title)}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="card-img-container">
                    <img
                      src={project.banner}
                      className="slider-top-card mumbai-img"
                      alt={project.title}
                    />
                    <span className="badge-button">{project.project_type}</span>
                  </div>
                  <div className="card-body">
                    <div className="bg-slider-img-card">
                      <h2 className="pb-0">{project.title}</h2>
                      <ul className="features-list pt-0 mb-2 related-pr">
                        <li className="location-list">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                            alt="img"
                            className="map-location-icon"
                          />
                          {project.location}
                        </li>
                      </ul>
                      <ul
                        className="list-unstyled "
                        style={{ marginBottom: "0px" }}
                      >
                        <li className="location-list">Price - {priceRange}</li>

                        {project.rera_no && project.rera_no.trim() !== "" && (
                          <li
                            className="loction-list"
                            // style={{ paddingTop: "10px " }}
                          >
                            <p
                              className="pt-2 pl-2 rera-no"
                              style={{
                                color: "#c08735",
                              }}
                            >
                              RERA ID - {project.rera_no}
                            </p>
                          </li>
                        )}
                      </ul>
                      <ul className="features-list residentail">
                        {/* <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                            className="amenities-icons residentail-icons"
                            alt="House Icon"
                          />
                          {project.project_type.trim()}
                        </li> */}

                        <li className="features-list-icons">
                          <img
                            src={
                              project.project_type.trim() === "Residential"
                                ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                                : project.project_type.trim() === "Plots"
                                ? "/assets/images/Plot.svg"
                                : project.project_type.trim() === "Commercial"
                                ? "/assets/images/Commercial.svg"
                                : "/assets/images/default-icon.svg" // Default icon in case no match
                            }
                            className="amenities-icons residentail-icons"
                            alt={project.project_type.trim() + " Icon"}
                          />
                          {project.project_type.trim()}
                        </li>
                        {project.project_type !== "Commercial" &&
                        project.unit_size ? (
                          <li
                            className="features-list-icons"
                            style={{
                              display:
                                project.project_type.trim().toLowerCase() ===
                                  "plots" ||
                                project.project_type.trim().toLowerCase() ===
                                  "commercial"
                                  ? "none"
                                  : "flex",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                              className="amenities-icons residentail-icons"
                              alt="Bed Icon"
                            />
                            {project.unit_size}
                          </li>
                        ) : null}

                        <li className="features-list-icons">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                            className="amenities-icons residentail-icons"
                            alt="Bath Icon"
                          />
                          {project.carpet_area}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RelatedProjectsComponents;
