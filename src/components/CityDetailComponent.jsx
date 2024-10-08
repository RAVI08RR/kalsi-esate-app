import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListpagesExpertform from "./ListpagesExpertform";
import Pagination from "./Pagination";
import { BASE_URL } from "../apis/constatnts";
import { BeatLoader } from "react-spinners";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const CityDetailComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lid } = useParams();
  const [cityResults, setCityResults] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("Default");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [cityName, setCityName] = useState("");
  const [totalNoOfProjects, setTotalNoOfProjects] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const resultsPerPage = 10;
  const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5 BHK", "+5 BHK"];
  const carpetAreas = [
    "200-400 sqft",
    "400-600 sqft",
    "600-800 sqft",
    "800-1000 sqft",
    "1000-1200 sqft",
    "1200+ sqft",
  ];
  const priceRanges = [
    "0-20 Lac",
    "20-40 Lac",
    "40-60 Lac",
    "60-80 Lac",
    "80-100 Lac",
    "100+ Lac",
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };

  useEffect(() => {
    if (location.state?.results?.data) {
      setCityResults(location.state.results.data);
      setProjectData(location.state.results.data);
      setCityName(
        location.state.results.data.length > 0
          ? location.state.results.data[0].location
          : "Unknown"
      );
      setIsLoading(false);
    } else {
      fetchCityResults();
    }
  }, [location.state]);

  const fetchCityResults = async (query = "") => {
    setIsLoading(true);
    setError(null);
    try {
      let cityId = location.state?.locationId || lid;
      const response = await fetch(
        `${BASE_URL}/properties/by-city/${cityId}?search=${query}`
      );
      const data = await response.json();
      if (data.status === 200) {
        setCityResults(data.data || []);
        setProjectData(data.data || []);

        // Handle single search result here
        if (query && data.data.length === 1) {
          setTotalNoOfProjects(1);
        }

        setCityName(
          data.data && data.data.length > 0 ? data.data[0].location : "Unknown"
        );
      } else {
        setError(data.message);
        setCityResults([]);
        setProjectData([]);
      }
    } catch (error) {
      setError("Error fetching city results.");
      setCityResults([]);
      setProjectData([]);
    }
    setIsLoading(false);
  };

  const handleSearch = (string) => {
    setSearchQuery(string);

    // Filter cityResults based on the search query
    const filtered = cityResults.filter((result) =>
      result.title
        ? result.title.toLowerCase().includes(string?.toLowerCase())
        : false
    );

    // Update filtered results based on the search
    setProjectData(filtered);
  };

  const handleSelect = async (item) => {
    setSearchQuery(item.name);

    // Fetch city results for the selected item
    await fetchCityResults(item.name);

    // Assuming the fetched data includes the selected item, filter it out
    const selectedResult = projectData.find((result) => result.id === item.id);

    if (selectedResult) {
      // Show only the selected result
      setProjectData([selectedResult]);

      // Update the total number of projects to reflect the single result
      setTotalNoOfProjects(1);
    }

    // Hide suggestions
    setShowSuggestions(false);
  };

  const handleUnitSizeChange = (event) =>
    setSelectedUnitSize(event.target.value);
  const handleCarpetAreaChange = (event) =>
    setSelectedCarpetArea(event.target.value);
  const handlePriceRangeChange = (event) =>
    setSelectedPriceRange(event.target.value);
  const handleSortOptionChange = (event) => setSortOption(event.target.value);

  const handleOpen = (result) => {
    setSelectedResult(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedResult();
  };

  // Filtering logic
  const applyFilters = (results) => {
    let filteredResults = results;

    // Apply Unit Size Filter
    if (selectedUnitSize) {
      filteredResults = filteredResults.filter((result) =>
        result.unit_sizes.includes(selectedUnitSize)
      );
    }

    // Apply Carpet Area Filter
    if (selectedCarpetArea) {
      const [min, max] = selectedCarpetArea
        .split("-")
        .map((value) => parseInt(value));
      filteredResults = filteredResults.filter((result) => {
        const [resultMin, resultMax] = result.carpet_area
          .split("-")
          .map((value) => parseInt(value));
        return resultMin >= min && (resultMax <= max || isNaN(max));
      });
    }

    // Apply Price Range Filter
    if (selectedPriceRange) {
      const [min, max] = selectedPriceRange
        .split("-")
        .map((value) => parseInt(value.replace(/[^\d]/g, "")));
      filteredResults = filteredResults.filter((result) => {
        const [resultMin, resultMax] = result.price
          .split("-")
          .map((value) => parseInt(value.replace(/[^\d]/g, "")));
        return resultMin >= min && (resultMax <= max || isNaN(max));
      });
    }

    // Sort based on selected option
    switch (sortOption) {
      case "Price Low to High":
        filteredResults.sort((a, b) => {
          const aPrice = parseInt(a.price.split("-")[0].replace(/[^\d]/g, ""));
          const bPrice = parseInt(b.price.split("-")[0].replace(/[^\d]/g, ""));
          return aPrice - bPrice;
        });
        break;
      case "Price High to Low":
        filteredResults.sort((a, b) => {
          const aPrice = parseInt(a.price.split("-")[0].replace(/[^\d]/g, ""));
          const bPrice = parseInt(b.price.split("-")[0].replace(/[^\d]/g, ""));
          return bPrice - aPrice;
        });
        break;
      default:
        break;
    }

    return filteredResults;
  };

  // Apply the filters to the project data
  const filteredResults = applyFilters(projectData);

  // Prioritize search results by placing them at the top
  const prioritizedResults = [
    ...filteredResults.filter((result) =>
      result.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    ),
    ...filteredResults.filter(
      (result) =>
        !result.title?.toLowerCase().includes(searchQuery?.toLowerCase())
    ),
  ];

  // Pagination logic
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = prioritizedResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const totalPages = Math.ceil(prioritizedResults.length / resultsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(pageNumber);
  }, []);

  // Filter summary generation
  const filterSummary = `${
    selectedPriceRange ? `under ${selectedPriceRange}` : ""
  }${selectedUnitSize ? ` with ${selectedUnitSize}` : ""}${
    selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""
  }${searchQuery ? ` matching "${searchQuery}"` : ""} ${
    prioritizedResults.length
  } results found`;

  // if (isLoading) {
  //   return (
  //     <div className="loader-container">
  //       <BeatLoader color="#c08735" />
  //     </div>
  //   );
  // }

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
    if (!priceRange) return "Call For Price";

    // Extract the min and max prices from the price range string
    const match = priceRange.match(/(\d+)-(\d+) Lac/);

    if (!match) return "Call For Price";

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
  function shortenStringBeforeComma(str) {
    // Get the part before the first comma
    const firstPart = str.split(",")[0];
    // Slice the string to the desired number of characters and add ellipsis
    return firstPart.slice(0, 15) + "...";
  }

  return (
    <div className="citylistdetail-section">
      <div className="project-list-section search-result-section">
        <div className="project-fillter-bg filters-bg">
          <div className="container ">
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={handleSearch}>
                  {/* <input
                    type="text"
                    placeholder="Search Project, Locality or Builder"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control"
                  /> */}

                  <ReactSearchAutocomplete
                    className="filter-search-box"
                    items={projectData.map((project) => ({
                      id: project.id,
                      name: project.title,
                    }))}
                    onSearch={handleSearch}
                    onSelect={handleSelect}
                    placeholder="Search Project, Locality, or Builder"
                    styling={{
                      height: "40px",
                      borderRadius: "0px",
                      border: "1px solid #ddd",
                      backgroundColor: "#fff",
                      zIndex: "5",
                    }}
                  />
                  <button type="submit" style={{ display: "none" }}></button>
                </form>
              </div>
              <div className="col-md-8 filters-mobile">
                <div className="row">
                  <div className="col-md-3">
                    <select
                      value={selectedUnitSize}
                      onChange={handleUnitSizeChange}
                      className="form-control detail-input-box"
                    >
                      <option value="">Unit Size</option>
                      {unitSizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      value={selectedCarpetArea}
                      onChange={handleCarpetAreaChange}
                      className="form-control detail-input-box"
                    >
                      <option value="">Carpet Area</option>
                      {carpetAreas.map((area, index) => (
                        <option key={index} value={area}>
                          {area}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      value={selectedPriceRange}
                      onChange={handlePriceRangeChange}
                      className="form-control detail-input-box"
                    >
                      <option value="">Price Range</option>
                      {priceRanges.map((range, index) => (
                        <option key={index} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <select
                      value={sortOption}
                      onChange={handleSortOptionChange}
                      className="form-control detail-input-box"
                    >
                      <option value="Default">Default Sorting</option>
                      <option value="Price Low to High">
                        Price Low to High
                      </option>
                      <option value="Price High to Low">
                        Price High to Low
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="container filters-container">
                <div className="col-md-4 filter-select-size">
                  <select
                    value={selectedUnitSize}
                    onChange={handleUnitSizeChange}
                    className="form-control"
                  >
                    <option value="">Unit Size</option>
                    {unitSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 filter-select-carpet">
                  <select
                    value={selectedCarpetArea}
                    onChange={handleCarpetAreaChange}
                    className="form-control"
                  >
                    <option value="">Carpet Area</option>
                    {carpetAreas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4 filter-select-price">
                  <select
                    value={selectedPriceRange}
                    onChange={handlePriceRangeChange}
                    className="form-control"
                  >
                    <option value="">Price Range</option>
                    {priceRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error ? (
          <p className="text-center">{error}</p>
        ) : (
          <div className="project-list-data">
            <div className="container">
              <div className="total-results-found">
                <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center ">
                  {" "}
                  {cityName && `${cityName} `}
                </h2>
                {/* <p className="text-center">
                  {`${filteredResults.length} projects found`} */}

                <div className="filter-summary">
                  <p className="text-center">{filterSummary}</p>
                </div>
                {/* </p> */}
              </div>
              <div className="row properties-mapper">
                {currentResults.map((project) => (
                  <div
                    key={project.id}
                    className="row bg-row-list property-card"
                  >
                    <div
                      className="col-lg-4 p-0"
                      style={{ overflow: "hidden" }}
                    >
                      <img
                        onClick={() =>
                          navigate(
                            `/property-detail/${project.id}/${slugify(
                              project.title
                            )}`
                          )
                        }
                        style={{ cursor: "pointer" }}
                        src={project.banner || "/assets/images/default-img.jpg"}
                        alt="Project Banner property-banner"
                        className="project-list-image property-banner"
                      />
                    </div>
                    <div
                      className="col-lg-8 bg-hover-card property-card-container"
                      style={{ cursor: "pointer" }}
                    >
                      <div className="card project-list-card property-info">
                        <h6
                          className="Project-title price-rera-mobile"
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                          style={{ color: "#C08735", cursor: "pointer" }}
                        >
                          RERA ID: {shortenStringBeforeComma(project.rera_no)}
                        </h6>
                        <span
                          className="badge-button bgprice-range-transperent price-rera-mobile"
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {formatPriceRange(project.price)}
                        </span>
                        <div
                          className="priceing-section-mb"
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            className="price-rera"
                            onClick={() =>
                              navigate(
                                `/property-detail/${project.id}/${slugify(
                                  project.title
                                )}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <h6
                              className="Preview-title "
                              style={{ alignItems: "flex-start" }}
                            >
                              {formatPriceRange(project.price)}
                            </h6>
                          </div>
                        </div>
                        <h2
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                          className="property-title"
                        >
                          {project.title}
                        </h2>
                        <ul
                          className="location-list-project-list"
                          onClick={() =>
                            navigate(
                              `/property-detail/${project.id}/${slugify(
                                project.title
                              )}`
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          <li
                            className="loction-list-pr property-builder-name"
                            style={{ color: "black" }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                              alt="img"
                              className="map-location-icon"
                            />
                            <span
                              style={{ color: "#787878", paddingRight: "2px" }}
                            >
                              At
                            </span>
                            {project.address}
                          </li>
                          <li className="loction-list-pr group-builder  mt-2 property-builder-name">
                            {" "}
                            <span
                              style={{ color: "#787878", paddingRight: "10px" }}
                            >
                              {" "}
                              By
                            </span>
                            {project.developer_name} group{" "}
                          </li>
                          <li className="loction-list-pr property-address mb-mobile-rera-list">
                            {" "}
                            <h6
                              className="Project-title property-rera-id property-rera-id"
                              style={{ color: "#C08735", marginTop: "16px" }}
                            >
                              RERA ID: {project.rera_no}
                            </h6>
                          </li>
                        </ul>
                        <div className="property-info-container">
                          <div
                            className="info-box"
                            style={{
                              width:
                                project.project_type == "Plots" ||
                                project.project_type == "Commercial"
                                  ? "48%"
                                  : "32.5",
                            }}
                          >
                            <img
                              src={
                                project.project_type === "Residential "
                                  ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                                  : project.project_type === "Plots"
                                  ? "/assets/images/Plot.svg"
                                  : project.project_type === "Commercial"
                                  ? "/assets/images/Commercial.svg"
                                  : "/assets/images/default-icon.svg" // Default icon in case no match
                              }
                              className="amenties-icons"
                            />
                            <span className="property-type-1">
                              {project.project_type}
                            </span>
                          </div>
                          <div
                            className="info-box"
                            style={{
                              display:
                                project.project_type == "Plots" ||
                                project.project_type == "Commercial"
                                  ? "none"
                                  : "flex",
                            }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                              className="amenties-icons"
                            />
                            <span className="property-bhk">
                              {project.unit_sizes}
                            </span>
                          </div>
                          <div
                            className="info-box"
                            style={{
                              width:
                                project.project_type == "Plots" ||
                                project.project_type == "Commercial"
                                  ? "48%"
                                  : "32.5",
                            }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                              className="amenties-icons"
                            />
                            <span className="property-carpet-area">
                              {project.carpet_area}
                            </span>
                          </div>
                        </div>
                        <div className="buttons-container">
                          <button
                            className="details-btn"
                            onClick={() =>
                              navigate(
                                `/property-detail/${project.id}/${slugify(
                                  project.title
                                )}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            View Details
                          </button>
                          <button
                            className="details-btn expert-btn"
                            onClick={() => handleOpen(project)}
                            style={{ cursor: "pointer" }}
                          >
                            {" "}
                            <img
                              src="/assets/images/info-mark.svg"
                              alt="img "
                              className="info-img"
                              style={{ marginRight: "10px" }}
                            />
                            Talk to Expert
                          </button>

                          {/* <button className="details-btn">
                          <img
                            src="/assets/images/info-mark.svg"
                            alt="img "
                            className="info-img"
                          />
                        <span className="bg-color-theme" style={{color:"white"}}> Talk to Expert</span>
                        </button> */}
                          {/* </li> */}
                        </div>

                        <ul className="features-list pl-0 property-info-mobile">
                          <li
                            className="project-list-icons"
                            onClick={() =>
                              navigate(
                                `/property-detail/${project.id}/${slugify(
                                  project.title
                                )}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={
                                project.project_type === "Residential "
                                  ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                                  : project.project_type === "Plots"
                                  ? "/assets/images/Plot.svg"
                                  : project.project_type === "Commercial"
                                  ? "/assets/images/Commercial.svg"
                                  : null // Default icon in case no match
                              }
                              className="amenties-icons"
                            />
                            {project.project_type}
                          </li>
                          <li
                            onClick={() =>
                              navigate(
                                `/property-detail/${project.id}/${slugify(
                                  project.title
                                )}`
                              )
                            }
                            className="project-list-icons"
                            style={{
                              display:
                                project.project_type == "Plots" ||
                                project.project_type == "Commercial "
                                  ? "none"
                                  : "flex",
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                              className="amenties-icons"
                            />
                            {project.unit_sizes}
                          </li>
                          <li
                            className="project-list-icons"
                            onClick={() =>
                              navigate(
                                `/property-detail/${project.id}/${slugify(
                                  project.title
                                )}`
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                              className="amenties-icons"
                            />
                            {project.carpet_area}
                          </li>

                          <li className="view-btn-list">
                            <button
                              className="kss-btn"
                              onClick={() =>
                                navigate(
                                  `/property-detail/${project.id}/${slugify(
                                    project.title
                                  )}`
                                )
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {" "}
                              View Details
                            </button>
                          </li>
                          <li
                            className="view-btn-list-talk-expert"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpen(project)}
                          >
                            <button className="kss-btn-info">
                              <img
                                src="/assets/images/info-mark.svg"
                                alt="img "
                                className="info-img"
                              />
                            </button>
                            <span className="bg-color-theme">
                              {" "}
                              Talk to Expert
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>

      <Modal
        className="video-pop-box-content-detail bg-transparent"
        open={open}
        BackdropProps={{
          sx: {
            backgroundColor: "rgb(0 0 0 / 0%)",
          },
          onClick: (event) => {
            event.stopPropagation();
          },
        }}
        style={{ backgroundColor: "#000000b5" }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="video-pop-box-content-box-detail" sx={style}>
          <IconButton
            className="btn-dwonload-brochure-detail"
            aria-label="close"
            onClick={handleClose}
            style={{ marginBottom: "10px" }}
          >
            <CloseIcon className="icon-close-btn-Brochure-detail" />
          </IconButton>
          {selectedResult && (
            <ListpagesExpertform
              addressTitle={selectedResult.title}
              propertyiddata={selectedResult.id}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CityDetailComponent;
