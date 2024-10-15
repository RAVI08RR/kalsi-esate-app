import React, { useContext, useEffect, useState } from "react";
import ReactOwlCarousel from "react-owl-carousel2";
import { useNavigate } from "react-router-dom";
import { CityIdContext } from "../App";

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

const MobileTopProjectsslider = ({ selectedCity, topdata }) => {
  const formatPriceRange = (priceRange) => {
    if (!priceRange) return "call for price";

    const match = priceRange.match(/(\d+)-(\d+) Lac/);

    if (!match) return "call for price";

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

  const { cityId } = useContext(CityIdContext);
  const [topProjects, setTopProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getTopProjects = async () => {
      setLoading(true);
      try {
        // const data = await fetchData(cityId);
        // console.log("topprojects ------", data);
        if (topdata) {
          setTopProjects(topdata);
          setError(null);
        } else {
          setError("No projects found for the selected city.");
        }
      } catch (error) {
        setError("Error fetching top projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedCity) {
      getTopProjects();
    }
  }, [topdata]);

  const slicedProjects = topProjects.slice(0, 20);

  const options = {
    items: 3,
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: false,
    center: true,
    responsive: {
      0: {
        items: 1.2,
      },
      600: {
        items: 1.2,
      },
      1024: {
        items: 1.2,
      },
    },
  };

  return (
    <div className="section-top-project-mumbai">
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
          <ReactOwlCarousel options={options}>
            {Array.isArray(slicedProjects) && slicedProjects.length > 0 ? (
              slicedProjects.map((data) => (
                <div
                  key={data.id}
                  onClick={() =>
                    navigate(
                      `/property-detail/${data.id}/${slugify(data.title)}`
                    )
                  }
                >
                  <div className="list-property-link">
                    <div className="card slider-top-projects-cards mb-0">
                      <img
                        src={data.image}
                        className="slider-top-card mumbai-img"
                        alt={data.title}
                      />
                    </div>

                    <div
                      className="card-body bg-white"
                      style={{ width: "100%", padding: "14px" }}
                    >
                      <div className="bg-slider-img-card">
                        <h2>{data.title}</h2>
                        <li className="loction-list">
                          <img
                            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                            alt="map"
                            className="map-location-icon"
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
                          style={{ paddingTop: "0px" }}
                        >
                          <li className="features-list-icons">
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                              className="amenties-icons"
                              alt="home"
                            />
                            {data.project_type}
                          </li>
                          <li className="features-list-icons">
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                              className="amenties-icons"
                              alt="bed"
                            />
                            {data.unit_size}
                          </li>
                          <li className="features-list-icons">
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                              className="amenties-icons"
                              alt="bath"
                            />
                            {data.carpet_area}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">
                No projects found for the selected city.
              </p>
            )}
          </ReactOwlCarousel>
        )}
      </div>
    </div>
  );
};

export default MobileTopProjectsslider;
