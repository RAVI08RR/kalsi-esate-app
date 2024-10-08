"use client";

import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ExpertForm from "./ExpertForm";
import ListpagesExpertform from "./ListpagesExpertform";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Header from "./Header";
import { CityIdContext } from "../App";

// Static filter options
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];
const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Duplex", "Penthouse"];
const carpetAreas = [
  "500-1000 sqft",
  "1000-4000 sqft",
  "4000-6000 sqft",
  "6000-8000 sqft",
  "8000-10000 sqft",
  "10000-12000 sqft",
  "12000+ sqft",
];
const priceRanges = [
  "0-20 Lac",
  "20-40 Lac",
  "40-60 Lac",
  "60-80 Lac",
  "80-100 Lac",
  "100+ Lac",
];

export const fetchNewLaunchProjects = async (
  city,
  priceRange,
  unitSize,
  carpetArea,
  cityid,
  page = "1"
) => {
  try {
    const queryParams = new URLSearchParams();
    if (city) queryParams.append("city", city);
    if (priceRange) queryParams.append("priceRange", priceRange);
    if (unitSize) queryParams.append("unitSize", unitSize);
    if (carpetArea) queryParams.append("carpetArea", carpetArea);

    const response = await fetch(
      `https://admin.kalsiestate.com/public/api/newLaunch-projects?city_id=${cityid}&page=${page}&${queryParams.toString()}`
    );

    const data = await response.json();

    return {
      properties: data.properties,
      currentPage: data.current_page,
      totalPages: data.total_pages,
      totalItems: data.total_items,
    };
  } catch (error) {
    console.error("Error fetching new launch projects data:", error);
    return {
      properties: [],
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
    };
  }
};

const ProjectListComponent = () => {
  const [showPrice, setShowPrice] = useState(true);
  const [open, setOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const { cityId } = useContext(CityIdContext);
  const navigate = useNavigate();
  const [storedCityId, setStoredCityId] = useState(
    localStorage.getItem("cityId")
  );
  const [isLoading, setIsLoading] = useState(true);
  const [paginationEnabled, setPaginationEnabled] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [bestMatch, setBestMatch] = useState(null);
  const [sortOption, setSortOption] = useState("Default");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchNewLaunchProjects(
        selectedCity,
        selectedPriceRange,
        selectedUnitSize,
        selectedCarpetArea,
        storedCityId,
        currentPage
      );
      setProjectData(data.properties);
      setFilteredProjects(data.properties);
      setPaginationEnabled(true);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setIsLoading(false);
    };

    fetchData();
  }, [
    selectedCity,
    selectedPriceRange,
    selectedUnitSize,
    selectedCarpetArea,
    currentPage,
    storedCityId,
  ]);

  useEffect(() => {
    const filtered = projectData.filter((project) => {
      const cityMatch = selectedCity === "" || project.city_id === selectedCity;
      const priceMatch =
        selectedPriceRange === "" || project.price.includes(selectedPriceRange);
      const unitSizeMatch =
        selectedUnitSize === "" ||
        project.unit_sizes.includes(selectedUnitSize);
      const carpetAreaMatch =
        selectedCarpetArea === "" ||
        project.carpet_area.includes(selectedCarpetArea);
      const searchMatch =
        searchQuery === "" ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.developer_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return (
        cityMatch &&
        priceMatch &&
        unitSizeMatch &&
        carpetAreaMatch &&
        searchMatch
      );
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortOption === "Price Low to High") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOption === "Price High to Low") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortOption === "Newest to Oldest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortOption === "Oldest to Newest") {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return 0;
    });

    setFilteredProjects(sorted);
  }, [
    projectData,
    selectedCity,
    selectedPriceRange,
    selectedUnitSize,
    selectedCarpetArea,
    searchQuery,
    sortOption,
  ]);

  const handleSearch = (string, results) => {
    setSearchQuery(string);
    if (results.length > 0) {
      setBestMatch(results[0]);
    } else {
      setBestMatch(null);
    }
  };

  const handleOnSelect = (item) => {
    setSearchQuery(item.name);
    const selected = projectData.find((project) => project.id === item.id);
    setSelectedProject(selected);
    setBestMatch(selected);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
    setCurrentPage(1);
  };

  const handleUnitSizeChange = (e) => {
    setSelectedUnitSize(e.target.value);
    setCurrentPage(1);
  };

  const handleCarpetAreaChange = (e) => {
    setSelectedCarpetArea(e.target.value);
    setCurrentPage(1);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpen = (project) => {
    setOpen(true);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    Padding: "0px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };

  const renderProjectList = () => {
    const projectsToRender = bestMatch
      ? [bestMatch, ...filteredProjects.filter((p) => p.id !== bestMatch.id)]
      : filteredProjects;

    return projectsToRender.map((project) => (
      <div key={project.id} className="row bg-row-list property-card">
        <div
          className="col-lg-4 p-0"
          style={{ overflow: "hidden", cursor: "pointer" }}
          onClick={() =>
            navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
          }
        >
          <img
            src={project.banner}
            alt="img"
            className="project-list-image property-banner"
          />
        </div>
        <div className="col-lg-8 bg-hover-card property-card-container">
          <div className="card project-list-card property-info">
            {project.rera_no && project.rera_no.trim() !== "" && (
              <h6
                className="Project-title property-rera-id property-rera-id price-rera-mobile"
                style={{ color: "#C08735" }}
              >
                RERA ID: {project.rera_no}
              </h6>
            )}

            <span className="badge-button bgprice-range-transperent price-rera-mobile">
              {formatPriceRange(project.price)}
            </span>
            <div className="priceing-section-mb">
              <div className="price-rera">
                <h6
                  className="Preview-title "
                  style={{ alignItems: "flex-start" }}
                >
                  {formatPriceRange(project.price)}
                </h6>
              </div>
            </div>
            <h2 className="property-title">{project.title}</h2>
            <ul className="location-list-project-list ">
              <li
                className="loction-list-pr property-address"
                style={{ color: "black" }}
              >
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                  alt="img"
                  className="map-location-icon"
                />
                {project.address}
              </li>
              <li className="loction-list-pr group-builder  mt-2 property-builder-name">
                {" "}
                <span style={{ color: "#787878", paddingRight: "10px" }}>
                  {" "}
                  By
                </span>
                {project.developer_name} group{" "}
              </li>
              {project.rera_no && project.rera_no.trim() !== "" && (
                <li className="loction-list-pr property-address mb-mobile-rera-list">
                  {" "}
                  <h6
                    className="Project-title property-rera-id property-rera-id"
                    style={{ color: "#C08735", marginTop: "16px" }}
                  >
                    RERA ID: {project.rera_no}
                  </h6>
                </li>
              )}
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
                      : "/assets/images/default-icon.svg"
                  }
                  className="amenties-icons"
                />
                <span className="property-type-1">{project.project_type}</span>
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
                <span className="property-bhk">{project.unit_sizes}</span>
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
                    `/property-detail/${project.id}/${slugify(project.title)}`
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
            </div>

            <ul
              className="features-list pl-0
              property-info-mobile
             "
            >
              <li className="project-list-icons">
                <img
                  src={
                    project.project_type === "Residential "
                      ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                      : project.project_type === "Plots"
                      ? "/assets/images/Plot.svg"
                      : project.project_type === "Commercial"
                      ? "/assets/images/Commercial.svg"
                      : "/assets/images/default-icon.svg"
                  }
                  className="amenties-icons"
                />
                {project.project_type}
              </li>
              <li
                className="project-list-icons"
                style={{
                  display:
                    project.project_type == "Plots" ||
                    project.project_type == "Commercial "
                      ? "none"
                      : "flex",
                }}
              >
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                  className="amenties-icons"
                />
                {project.unit_sizes}
              </li>
              <li className="project-list-icons">
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
                      `/property-detail/${project.id}/${slugify(project.title)}`
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
                <button className="kss-btn-info details-btn">
                  <img
                    src="/assets/images/info-mark.svg"
                    alt="img "
                    className="info-img"
                  />
                </button>
                <span className="bg-color-theme"> Talk to Expert</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ));
  };

  const renderHeading = () => {
    const baseHeading = `Property In New Launch Projects`;
    const dynamicHeading = `${baseHeading} ${
      selectedPriceRange ? `under ${selectedPriceRange}` : ""
    } ${selectedUnitSize ? `with ${selectedUnitSize}` : ""} ${
      selectedCarpetArea ? `and ${selectedCarpetArea}` : ""
    } ${searchQuery ? `matching "${searchQuery}"` : ""} - ${
      filteredProjects.length
    } results found`;

    return (
      <div className="heading-section web-section-property-heading">
        <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
          New Launch Projects
        </h2>
        {dynamicHeading && (
          <h6
            className="property-result-text text-right"
            style={{ textAlign: "center" }}
          >
            {dynamicHeading}
          </h6>
        )}
      </div>
    );
  };

  return (
    <div className="project-list-section">
      <div className="project-fillter-bg filters-bg">
        <div className="container ">
          <div className="row">
            <div className="col-md-4">
              <ReactSearchAutocomplete
                className="fillter-search-box"
                items={projectData.map((project) => ({
                  id: project.id,
                  name: project.title,
                }))}
                onSearch={handleSearch}
                onSelect={handleOnSelect}
                placeholder="Search Project, Locality or Builder"
                styling={{
                  height: "40px",
                  borderRadius: "0px",
                  border: "1px solid #ddd",
                  backgroundColor: "#fff",
                  zIndex: "5",
                }}
              />
            </div>
            <div className="col-md-6 filters-mobile">
              <div className="row">
                <div className="col-md-4">
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
                <div className="col-md-4">
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
                <div className="col-md-4">
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
      <div className="project-list-bg">
        <div className="container ">
          <Breadcrumb className="menu-breadcrumb-items">
            <Breadcrumb.Item className="breadcrumb-link" href="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" href="#">
              Property {cities[selectedCity - 1]}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" active>
              New Launch
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="short-list-section properties-sorter">
            <label>Sort By:</label>
            <select
              value={sortOption}
              onChange={handleSortOptionChange}
              className="form-control shortling-list-select"
            >
              <option value="Default">Default</option>
              <option value="Price Low to High">Price Low to High</option>
              <option value="Price High to Low">Price High to Low</option>
              <option value="Newest to Oldest">Newest to Oldest</option>
              <option value="Oldest to Newest">Oldest to Newest</option>
            </select>
          </div>
          {renderHeading()}
          <div className="project-list-link properties-mapper">
            {isLoading ? <div>Loading...</div> : renderProjectList()}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
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
        style={{ backgroundColor: "transparent" }}
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
          {selectedProject && (
            <ListpagesExpertform
              addressTitle={selectedProject?.title}
              propertyiddata={selectedProject?.id}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageSetSize = 5;
  const halfSet = Math.floor(pageSetSize / 2);

  let startPage = Math.max(currentPage - halfSet, 1);
  let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

  if (endPage - startPage + 1 < pageSetSize) {
    startPage = Math.max(endPage - pageSetSize + 1, 1);
  }

  const renderPageNumbers = () => {
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
          className={`pagination-btn ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <button key="ellipsis-end" className="pagination-btn" disabled>
            ...
          </button>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          className={`pagination-btn ${
            totalPages === currentPage ? "active" : ""
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img
          src="/assets/images/chevron-left.svg"
          alt="Previous"
          className="arrow-pagination"
        />
      </button>
      {renderPageNumbers()}
      <button
        className="pagination-btn"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
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

export default ProjectListComponent;

// import React, { useState, useEffect, useContext } from "react";
// import Breadcrumb from "react-bootstrap/Breadcrumb";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import ExpertForm from "./ExpertForm";
// import ListpagesExpertform from "./ListpagesExpertform";
// import { ReactSearchAutocomplete } from "react-search-autocomplete"; // Import ReactSearchAutocomplete
// import Header from "./Header";
// import { CityIdContext } from "../App";

// // Static filter options
// const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];

// const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Duplex", "Penthouse"];
// const carpetAreas = [
//   "1000-4000 sqft",
//   "4000-6000 sqft",
//   "6000-8000 sqft",
//   "8000-10000 sqft",
//   "10000-12000 sqft",
//   "12000+ sqft",
// ];
// const priceRanges = [
//   "0-20 Lac",
//   "20-40 Lac",
//   "40-60 Lac",
//   "60-80 Lac",
//   "80-100 Lac",
//   "100+ Lac",
// ];

// // const BASE_URL =
// //   "https://admin.kalsiestate.com/public/api/newLaunch-projects?city_id=1";

// export const fetchNewLaunchProjects = async (
//   city,
//   priceRange,
//   unitSize,
//   carpetArea,
//   cityid,
//   page = "1"
// ) => {
//   console.log("Fetching new launch projects data");
//   try {
//     const queryParams = new URLSearchParams();
//     if (city) queryParams.append("city", city);
//     if (priceRange) queryParams.append("priceRange", priceRange);
//     if (unitSize) queryParams.append("unitSize", unitSize);
//     if (carpetArea) queryParams.append("carpetArea", carpetArea);

//     const response = await fetch(
//       // `${BASE_URL}/newLaunch-projects?${queryParams.toString()}`
//       `https://admin.kalsiestate.com/public/api/newLaunch-projects?city_id=${cityid}&page=${page}`
//     );
//     console.log("response", response);
//     const data = await response.json();
//     console.log("New launch projects data", data);
//     console.log("New launch projects data", data?.properties);
//     return {
//       properties: data.properties,
//       currentPage: data.current_page,
//       totalPages: data.total_pages,
//       totalItems: data.total_items,
//     };
//   } catch (error) {
//     console.error("Error fetching new launch projects data:", error);
//     return {
//       properties: [],
//       currentPage: 1,
//       totalPages: 1,
//       totalItems: 0,
//     };
//   }
// };

// const ProjectListComponent = () => {
//   const [showPrice, setShowPrice] = useState(true);
//   //
// const formatPriceRange = (priceRange) => {
//   if (!priceRange) return "Call For Price";

//   // Extract the min and max prices from the price range string
//   const match = priceRange.match(/(\d+)-(\d+) Lac/);

//   if (!match) return "Call For Price";

//   const [_, minPrice, maxPrice] = match;

//   // Function to format individual prices
//   const formatPrice = (price) => {
//     const numberPrice = parseFloat(price);

//     if (numberPrice >= 10000000) {
//       // Format for Crores with 1 or 2 decimal places
//       const crores = numberPrice / 10000000;
//       return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
//     } else {
//       // Format for Lacs with 1 or 2 decimal places
//       const lacs = numberPrice / 100000;
//       return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
//     }
//   };

//   return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
// };
// function shortenStringBeforeComma(str) {
//   // Get the part before the first comma
//   const firstPart = str.split(",")[0];
//   // Slice the string to the desired number of characters and add ellipsis
//   return firstPart.slice(0, 15) + "...";
// }

// const slugify = (text) => {
//   return text
//     .toString()
//     .toLowerCase()
//     .replace(/\s+/g, "-") // Replace spaces with -
//     .replace(/[^\w\-]+/g, "") // Remove all non-word chars
//     .replace(/\-\-+/g, "-") // Replace multiple - with single -
//     .replace(/^-+/, "") // Trim - from start of text
//     .replace(/-+$/, ""); // Trim - from end of text
// };

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   Padding: "0px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-end",
// };

//   const [open, setOpen] = useState(false);
//   // const handleOpen = () => setOpen(true);
//   // const handleClose = () => setOpen(false);
//   const [projectData, setProjectData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");
//   const [selectedUnitSize, setSelectedUnitSize] = useState("");
//   const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [projectsPerPage] = useState(10);
//   const { cityId } = useContext(CityIdContext);
//   const navigate = useNavigate();
//   const [storedCityId, setStoredCityId] = useState(
//     localStorage.getItem("cityId")
//   );
//   const [isLoading, setIsLoading] = useState(true);
//   const [paginationEnabled, setPaginationEnabled] = useState(false);
//   const [totalPages, setTotalPages] = useState(1);
//   const [bestMatch, setBestMatch] = useState(null);
//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "cityId") {
//         setStoredCityId(event.newValue);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   const [sortOption, setSortOption] = useState("Default");

//   // const [open, setOpen] = useState(false);
//   const [selectedProject, setSelectedProject] = useState(null);

//   const handleOpen = (project) => {
//     setOpen(true);
//     setSelectedProject(project);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedProject(null);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const data = await fetchNewLaunchProjects(
//         selectedCity,
//         selectedPriceRange,
//         selectedUnitSize,
//         selectedCarpetArea,
//         storedCityId,
//         currentPage
//       );
//       setProjectData(data.properties);
//       setPaginationEnabled(true);
//       console.log(
//         "STroing new page data",
//         data.properties,
//         "PAGE = ",
//         data.currentPage
//       );
//       setCurrentPage(data.currentPage);
//       setTotalPages(data.totalPages);
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [
//     selectedCity,
//     selectedPriceRange,
//     selectedUnitSize,
//     selectedCarpetArea,
//     currentPage,
//     storedCityId,
//   ]);

//   // const handleSearch = (e) => {
//   //   setSearchQuery(e.target.value);
//   // };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   const handlePriceRangeChange = (e) => {
//     setSelectedPriceRange(e.target.value);
//   };

//   const handleUnitSizeChange = (e) => {
//     setSelectedUnitSize(e.target.value);
//   };

//   const handleCarpetAreaChange = (e) => {
//     setSelectedCarpetArea(e.target.value);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//     setCurrentPage(pageNumber);
//   };

//   const handleSortOptionChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const handleSearch = (string, results) => {
//     setSearchQuery(string);
//   };

//   const handleOnSelect = (item) => {
//     setSearchQuery(item.name);
//     const selected = projectData.find((project) => project.id === item.id);
//     setSelectedProject(selected);
//   };
//   const parsePriceRange = (priceRange) => {
//     if (!priceRange) return [0, Infinity];
//     const match = priceRange.match(/(\d+)-(\d+)/);
//     if (match) {
//       const [_, minPrice, maxPrice] = match.map(Number);
//       return [minPrice * 100000, maxPrice * 100000];
//     }
//     if (priceRange.includes("100+")) return [10000000, Infinity];
//     return [0, Infinity];
//   };

//   const parseCarpetAreaRange = (carpetArea) => {
//     if (!carpetArea) return [0, Infinity];
//     const match = carpetArea.match(/(\d+)-(\d+)/);
//     if (match) {
//       const [_, minArea, maxArea] = match?.map(Number);
//       return [minArea, maxArea];
//     }
//     if (carpetArea.includes("1200+")) return [1200, Infinity];
//     return [0, Infinity];
//   };

//   const filteredProjects = projectData.filter((project) => {
//     const cityMatch = selectedCity === "" || project.city_id === selectedCity;
//     const [minPrice, maxPrice] = parsePriceRange(selectedPriceRange);
//     const projectPriceStr = project.price?.toLowerCase?.() || "";
//     let projectPrice = 0;

//     if (
//       projectPriceStr !== "call for price" &&
//       projectPriceStr !== "- lac" &&
//       projectPriceStr.trim() !== ""
//     ) {
//       projectPrice = parseFloat(project.price) || 0;
//     }

//     const priceRangeMatch =
//       projectPrice >= minPrice && projectPrice <= maxPrice;
//     const [minArea, maxArea] = parseCarpetAreaRange(selectedCarpetArea);
//     const projectArea = parseFloat(project.carpet_area) || 0;
//     const carpetAreaMatch = projectArea >= minArea && projectArea <= maxArea;

//     let unitSizeMatch = false;
//     if (Array.isArray(project.unit_sizes)) {
//       unitSizeMatch =
//         selectedUnitSize === "" ||
//         project.unit_sizes.some((unitSize) => {
//           const projectBhk = parseInt(unitSize);
//           const selectedBhk = parseInt(selectedUnitSize);
//           return (
//             !isNaN(projectBhk) &&
//             !isNaN(selectedBhk) &&
//             (projectBhk === selectedBhk || projectBhk > selectedBhk)
//           );
//         });
//     } else if (typeof project.unit_sizes === "string") {
//       const projectBhk = parseInt(project.unit_sizes);
//       const selectedBhk = parseInt(selectedUnitSize);
//       unitSizeMatch =
//         selectedUnitSize === "" ||
//         (!isNaN(projectBhk) &&
//           !isNaN(selectedBhk) &&
//           (projectBhk === selectedBhk || projectBhk > selectedBhk));
//     }

//     const searchMatch =
//       searchQuery === "" ||
//       (project.title &&
//         project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (project.developer_name &&
//         project.developer_name
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()));

//     return (
//       cityMatch &&
//       priceRangeMatch &&
//       unitSizeMatch &&
//       carpetAreaMatch &&
//       searchMatch
//     );
//   });

//   const totalProjectsFound = filteredProjects.length;

//   const developerCounts = {};
//   filteredProjects.forEach((project) => {
//     const developer = project.developer_name;
//     if (developerCounts[developer]) {
//       developerCounts[developer]++;
//     } else {
//       developerCounts[developer] = 1;
//     }
//   });

//   const chosenDeveloper = Object.keys(developerCounts)[0];
//   const projectsByChosenDeveloper = developerCounts[chosenDeveloper];

//   const heading = `${chosenDeveloper} Group ${projectsByChosenDeveloper} Projects Found`;

//   const sortedProjects = [...filteredProjects].sort((a, b) => {
//     if (sortOption === "Price Low to High") {
//       return (
//         parseFloat(a.price.split(" ")[0]) - parseFloat(b.price.split(" ")[0])
//       );
//     } else if (sortOption === "Price High to Low") {
//       return (
//         parseFloat(b.price.split(" ")[0]) - parseFloat(a.price.split(" ")[0])
//       );
//     } else if (sortOption === "Newest to Oldest") {
//       return b.id - a.id;
//     } else if (sortOption === "Oldest to Newest") {
//       return a.id - b.id;
//     }
//     return 0;
//   });

//   // Move best match to the top if it exists
//   const finalSortedProjects = bestMatch
//     ? [
//         bestMatch,
//         ...sortedProjects.filter((project) => project.id !== bestMatch.id),
//       ]
//     : sortedProjects;

//   const indexOfLastProject = currentPage * projectsPerPage;
//   const indexOfFirstProject = indexOfLastProject - projectsPerPage;
//   const currentProjects = finalSortedProjects.slice(
//     indexOfFirstProject,
//     indexOfLastProject
//   );

//   const renderProjectList = currentProjects.map((project) => (
//     <div
//       // onClick={() => navigate(`/property-detail/${project.id}`)}

//       key={project.id}
//       className="row bg-row-list property-card"
//     >
//       <div
//         className="col-lg-4 p-0"
//         style={{ overflow: "hidden", cursor: "pointer" }}
//         onClick={() =>
//           navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
//         }
//       >
//         <img
//           src={project.banner}
//           alt="img"
//           className="project-list-image property-banner"
//         />
//       </div>
//       <div className="col-lg-8 bg-hover-card property-card-container">
//         <div className="card project-list-card property-info">
//           {project.rera_no && project.rera_no.trim() !== "" && (
//             <h6
//               className="Project-title property-rera-id property-rera-id price-rera-mobile"
//               style={{ color: "#C08735" }}
//             >
//               RERA ID: {project.rera_no}
//             </h6>
//           )}

//           <span className="badge-button bgprice-range-transperent price-rera-mobile">
//             {formatPriceRange(project.price)}
//           </span>
//           <div className="priceing-section-mb">
//             <div className="price-rera">
//               <h6
//                 className="Preview-title "
//                 style={{ alignItems: "flex-start" }}
//               >
//                 {formatPriceRange(project.price)}
//               </h6>
//             </div>
//           </div>
//           <h2 className="property-title">{project.title}</h2>
//           <ul className="location-list-project-list ">
//             <li
//               className="loction-list-pr property-address"
//               style={{ color: "black" }}
//             >
//               <img
//                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                 alt="img"
//                 className="map-location-icon"
//               />
//               {/* <span style={{ color: "#787878", paddingRight: "2px" }}>At</span> */}
//               {project.address}
//             </li>
//             <li className="loction-list-pr group-builder  mt-2 property-builder-name">
//               {" "}
//               <span style={{ color: "#787878", paddingRight: "10px" }}>
//                 {" "}
//                 By
//               </span>
//               {project.developer_name} group{" "}
//             </li>
//             {project.rera_no && project.rera_no.trim() !== "" && (
//               <li className="loction-list-pr property-address mb-mobile-rera-list">
//                 {" "}
//                 <h6
//                   className="Project-title property-rera-id property-rera-id"
//                   style={{ color: "#C08735", marginTop: "16px" }}
//                 >
//                   RERA ID: {project.rera_no}
//                 </h6>
//               </li>
//             )}
//           </ul>
//           {/* <ul className="features-list pl-0 property-type">
//             <li className="project-list-icons info-item">
//               <img
//                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                 className="amenties-icons"
//               />
//               {project.project_type}
//             </li>
//             <li className="project-list-icons info-item">
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               {project.unit_sizes}
//             </li>
//             <li className="project-list-icons info-item">
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               {project.carpet_area}
//             </li>
//             </ul> */}
//           <div className="property-info-container">
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg" // Default icon in case no match
//                 }
//                 className="amenties-icons"
//               />
//               <span className="property-type-1">{project.project_type}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               <span className="property-bhk">{project.unit_sizes}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               <span className="property-carpet-area">
//                 {project.carpet_area}
//               </span>
//             </div>
//           </div>
//           <div className="buttons-container">
//             <button
//               className="details-btn"
//               onClick={() =>
//                 navigate(
//                   `/property-detail/${project.id}/${slugify(project.title)}`
//                 )
//               }
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               View Details
//             </button>
//             <button
//               className="details-btn expert-btn"
//               onClick={() => handleOpen(project)}
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               <img
//                 src="/assets/images/info-mark.svg"
//                 alt="img "
//                 className="info-img"
//                 style={{ marginRight: "10px" }}
//               />
//               Talk to Expert
//             </button>

//             {/* <button className="details-btn">
//                 <img
//                   src="/assets/images/info-mark.svg"
//                   alt="img "
//                   className="info-img"
//                 />
//               <span className="bg-color-theme" style={{color:"white"}}> Talk to Expert</span>
//               </button> */}
//             {/* </li> */}
//           </div>

//           <ul
//             className="features-list pl-0
//             property-info-mobile
//            "
//           >
//             <li className="project-list-icons">
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg" // Default icon in case no match
//                 }
//                 className="amenties-icons"
//               />
//               {project.project_type}
//             </li>
//             <li
//               className="project-list-icons"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial "
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               {project.unit_sizes}
//             </li>
//             <li className="project-list-icons">
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               {project.carpet_area}
//             </li>

//             <li className="view-btn-list">
//               <button
//                 className="kss-btn"
//                 onClick={() =>
//                   navigate(
//                     `/property-detail/${project.id}/${slugify(project.title)}`
//                   )
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {" "}
//                 View Details
//               </button>
//             </li>
//             <li
//               className="view-btn-list-talk-expert"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleOpen(project)}
//             >
//               <button className="kss-btn-info details-btn">
//                 <img
//                   src="/assets/images/info-mark.svg"
//                   alt="img "
//                   className="info-img"
//                 />
//               </button>
//               <span className="bg-color-theme"> Talk to Expert</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   ));

//   const renderProjectListPagination = projectData.map((project) => (
//     <div key={project.id} className="row bg-row-list property-card">
//       <div
//         className="col-lg-4 p-0"
//         style={{ overflow: "hidden", cursor: "pointer" }}
//         onClick={() =>
//           navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
//         }
//       >
//         <img
//           src={project.banner}
//           alt="img"
//           className="project-list-image property-banner"
//         />
//       </div>
//       <div className="col-lg-8 bg-hover-card property-card-container">
//         <div className="card project-list-card property-info">
//           {project.rera_no && project.rera_no.trim() !== "" && (
//             <h6
//               className="Project-title property-rera-id property-rera-id price-rera-mobile"
//               style={{ color: "#C08735" }}
//             >
//               RERA ID: {project.rera_no}
//             </h6>
//           )}

//           <span className="badge-button bgprice-range-transperent price-rera-mobile">
//             {formatPriceRange(project.price)}
//           </span>
//           <div className="priceing-section-mb">
//             <div className="price-rera">
//               <h6
//                 className="Preview-title "
//                 style={{ alignItems: "flex-start" }}
//               >
//                 {formatPriceRange(project.price)}
//               </h6>
//             </div>
//           </div>
//           <h2 className="property-title">{project.title}</h2>
//           <ul className="location-list-project-list ">
//             <li
//               className="loction-list-pr property-address"
//               style={{ color: "black" }}
//             >
//               <img
//                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                 alt="img"
//                 className="map-location-icon"
//               />
//               {project.address}
//             </li>
//             <li className="loction-list-pr group-builder  mt-2 property-builder-name">
//               {" "}
//               <span style={{ color: "#787878", paddingRight: "10px" }}>
//                 {" "}
//                 By
//               </span>
//               {project.developer_name} group{" "}
//             </li>
//             {project.rera_no && project.rera_no.trim() !== "" && (
//               <li className="loction-list-pr property-address mb-mobile-rera-list">
//                 {" "}
//                 <h6
//                   className="Project-title property-rera-id property-rera-id"
//                   style={{ color: "#C08735", marginTop: "16px" }}
//                 >
//                   RERA ID: {project.rera_no}
//                 </h6>
//               </li>
//             )}
//           </ul>
//           <div className="property-info-container">
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg"
//                 }
//                 className="amenties-icons"
//               />
//               <span className="property-type-1">{project.project_type}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               <span className="property-bhk">{project.unit_sizes}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               <span className="property-carpet-area">
//                 {project.carpet_area}
//               </span>
//             </div>
//           </div>
//           <div className="buttons-container">
//             <button
//               className="details-btn"
//               onClick={() =>
//                 navigate(
//                   `/property-detail/${project.id}/${slugify(project.title)}`
//                 )
//               }
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               View Details
//             </button>
//             <button
//               className="details-btn expert-btn"
//               onClick={() => handleOpen(project)}
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               <img
//                 src="/assets/images/info-mark.svg"
//                 alt="img "
//                 className="info-img"
//                 style={{ marginRight: "10px" }}
//               />
//               Talk to Expert
//             </button>
//           </div>

//           <ul
//             className="features-list pl-0
//             property-info-mobile
//            "
//           >
//             <li className="project-list-icons">
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg"
//                 }
//                 className="amenties-icons"
//               />
//               {project.project_type}
//             </li>
//             <li
//               className="project-list-icons"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial "
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               {project.unit_sizes}
//             </li>
//             <li className="project-list-icons">
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               {project.carpet_area}
//             </li>

//             <li className="view-btn-list">
//               <button
//                 className="kss-btn"
//                 onClick={() =>
//                   navigate(
//                     `/property-detail/${project.id}/${slugify(project.title)}`
//                   )
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {" "}
//                 View Details
//               </button>
//             </li>
//             <li
//               className="view-btn-list-talk-expert"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleOpen(project)}
//             >
//               <button className="kss-btn-info details-btn">
//                 <img
//                   src="/assets/images/info-mark.svg"
//                   alt="img "
//                   className="info-img"
//                 />
//               </button>
//               <span className="bg-color-theme"> Talk to Expert</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   ));

//   // Render the heading based on search and filtering criteria
//   const renderHeading = () => {
//     const title = "New Launch Projects"; // Define your title here
//     const projectType = 1; // Define your projectType here

//     const baseHeading = `Property In ${cities[selectedCity - 1] || cities[0]}`;

//     const dynamicHeading = `${
//       projectType === 1
//         ? "New Launch Projects"
//         : projectType === 2
//         ? "Commercial"
//         : "Plots"
//     } ${selectedCity ? ` in ${cities[selectedCity - 1]}` : ""} ${
//       selectedPriceRange ? ` under ${selectedPriceRange}` : ""
//     } ${selectedUnitSize ? ` with ${selectedUnitSize}` : ""} ${
//       selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""
//     } ${
//       searchQuery ? ` matching "${searchQuery}"` : ""
//     } - ${totalProjectsFound} results found`;

//     return (
//       <div className="heading-section web-section-property-heading">
//         <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
//           {title}
//         </h2>
//         {dynamicHeading && (
//           <h6
//             className="property-result-text text-right"
//             style={{ textAlign: "center" }}
//           >
//             {dynamicHeading}
//           </h6>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="project-list-section">
//       <div className="project-fillter-bg filters-bg">
//         <div className="container ">
//           <div className="row">
//             {/* <div className="col-md-2">
//               <div className="mp-box-city-state">
//                 <img
//                   src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                   className="city-map-icon-project"
//                   alt="map icon"
//                 />
//                 <select
//                   value={selectedCity}
//                   onChange={handleCityChange}
//                   className="form-control"
//                 >
//                   <option value="">City</option>
//                   {cities.map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div> */}
//             <div className="col-md-4">
//               {/* <input
//                 type="text"
//                 placeholder="Search Project, Locality or Builder"
//                 value={searchQuery}
//                 onChange={handleSearch}
//                 className="form-control"
//               /> */}

//               <ReactSearchAutocomplete
//                 className="fillter-search-box"
//                 items={projectData.map((project) => ({
//                   id: project.id,
//                   name: project.title,
//                 }))}
//                 onSearch={handleSearch}
//                 onSelect={handleOnSelect}
//                 placeholder="Search Project, Locality or Builder"
//                 styling={{
//                   height: "40px",
//                   borderRadius: "0px",
//                   border: "1px solid #ddd",
//                   backgroundColor: "#fff",
//                   zIndex: "5",
//                 }}
//               />
//             </div>
//             <div className="col-md-6 filters-mobile">
//               <div className="row">
//                 <div className="col-md-4">
//                   <select
//                     value={selectedUnitSize}
//                     onChange={handleUnitSizeChange}
//                     className="form-control"
//                   >
//                     <option value="">Unit Size</option>
//                     {unitSizes.map((size) => (
//                       <option key={size} value={size}>
//                         {size}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <select
//                     value={selectedCarpetArea}
//                     onChange={handleCarpetAreaChange}
//                     className="form-control"
//                   >
//                     <option value="">Carpet Area</option>
//                     {carpetAreas.map((area) => (
//                       <option key={area} value={area}>
//                         {area}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <select
//                     value={selectedPriceRange}
//                     onChange={handlePriceRangeChange}
//                     className="form-control"
//                   >
//                     <option value="">Price Range</option>
//                     {priceRanges.map((range) => (
//                       <option key={range} value={range}>
//                         {range}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="container filters-container">
//               <div className="col-md-4 filter-select-size">
//                 <select
//                   value={selectedUnitSize}
//                   onChange={handleUnitSizeChange}
//                   className="form-control"
//                 >
//                   <option value="">Unit Size</option>
//                   {unitSizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 filter-select-carpet">
//                 <select
//                   value={selectedCarpetArea}
//                   onChange={handleCarpetAreaChange}
//                   className="form-control"
//                 >
//                   <option value="">Carpet Area</option>
//                   {carpetAreas.map((area) => (
//                     <option key={area} value={area}>
//                       {area}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 filter-select-price">
//                 <select
//                   value={selectedPriceRange}
//                   onChange={handlePriceRangeChange}
//                   className="form-control"
//                 >
//                   <option value="">Price Range</option>
//                   {priceRanges.map((range) => (
//                     <option key={range} value={range}>
//                       {range}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="project-list-bg">
//         <div className="container ">
//           <Breadcrumb className="menu-breadcrumb-items">
//             <Breadcrumb.Item className="breadcrumb-link" href="/">
//               Home
//             </Breadcrumb.Item>
//             <Breadcrumb.Item className="breadcrumb-link" href="#">
//               Property {cities[selectedCity - 1]}
//             </Breadcrumb.Item>
//             <Breadcrumb.Item className="breadcrumb-link" active>
//               New Launch
//             </Breadcrumb.Item>
//           </Breadcrumb>

//           <div className="short-list-section properties-sorter">
//             <label>Sort By:</label>
//             <select
//               value={sortOption}
//               onChange={handleSortOptionChange}
//               className="form-control shortling-list-select"
//             >
//               <option value="Default">Default</option>
//               <option value="Price Low to High">Price Low to High</option>
//               <option value="Price High to Low">Price High to Low</option>
//               <option value="Newest to Oldest">Newest to Oldest</option>
//               <option value="Oldest to Newest">Oldest to Newest</option>
//             </select>
//           </div>
//           {renderHeading()}
//           <a
//             className="project-list-link properties-mapper"
//             style={{ cursor: "pointer" }}
//           >
//             {paginationEnabled
//               ? renderProjectListPagination
//               : renderProjectList}
//           </a>
//           {/* Render pagination */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={totalPages}
//             handlePageChange={handlePageChange}
//           />
//         </div>
//       </div>

//       <Modal
//         className="video-pop-box-content-detail bg-transparent"
//         open={open}
//         BackdropProps={{
//           sx: {
//             backgroundColor: "rgb(0 0 0 / 0%)",
//           },
//           onClick: (event) => {
//             event.stopPropagation();
//           },
//         }}
//         style={{ backgroundColor: "transparent" }}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box className="video-pop-box-content-box-detail" sx={style}>
//           <IconButton
//             className="btn-dwonload-brochure-detail"
//             aria-label="close"
//             onClick={handleClose}
//             style={{ marginBottom: "10px" }}
//           >
//             <CloseIcon className="icon-close-btn-Brochure-detail" />
//           </IconButton>
//           {selectedProject && (
//             <ListpagesExpertform
//               addressTitle={selectedProject?.title}
//               propertyiddata={selectedProject?.id}
//             />
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//   const pageSetSize = 5;
//   const halfSet = Math.floor(pageSetSize / 2);

//   let startPage = Math.max(currentPage - halfSet, 1);
//   let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

//   if (endPage - startPage + 1 < pageSetSize) {
//     startPage = Math.max(endPage - pageSetSize + 1, 1);
//   }

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     if (startPage > 1) {
//       pageNumbers.push(
//         <button
//           key={1}
//           className="pagination-btn"
//           onClick={() => handlePageChange(1)}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pageNumbers.push(
//           <button key="ellipsis-start" className="pagination-btn" disabled>
//             ...
//           </button>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(
//           <button key="ellipsis-end" className="pagination-btn" disabled>
//             ...
//           </button>
//         );
//       }
//       pageNumbers.push(
//         <button
//           key={totalPages}
//           className={`pagination-btn ${
//             totalPages === currentPage ? "active" : ""
//           }`}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="pagination">
//       <button
//         className="pagination-btn"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <img
//           src="/assets/images/chevron-left.svg"
//           alt="Previous"
//           className="arrow-pagination"
//         />
//       </button>
//       {renderPageNumbers()}
//       <button
//         className="pagination-btn"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <img
//           src="/assets/images/chevron-right.svg"
//           alt="Next"
//           className="arrow-pagination"
//         />
//       </button>
//     </div>
//   );
// };

// export default ProjectListComponent;

// import React, { useState, useEffect, useContext } from "react";
// import Breadcrumb from "react-bootstrap/Breadcrumb";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import ListpagesExpertform from "./ListpagesExpertform";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import { CityIdContext } from "../App";

// // Static filter options
// const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];
// const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Duplex", "Penthouse"];
// const carpetAreas = [
//   "1000-4000 sqft",
//   "4000-6000 sqft",
//   "6000-8000 sqft",
//   "8000-10000 sqft",
//   "10000-12000 sqft",
//   "12000+ sqft",
// ];
// const priceRanges = [
//   "0-20 Lac",
//   "20-40 Lac",
//   "40-60 Lac",
//   "60-80 Lac",
//   "80-100 Lac",
//   "100+ Lac",
// ];

// export const fetchNewLaunchProjects = async (
//   city,
//   priceRange,
//   unitSize,
//   carpetArea,
//   cityid,
//   page = 1
// ) => {
//   console.log("Fetching new launch projects data");
//   try {
//     const response = await fetch(
//       `https://admin.kalsiestate.com/public/api/newLaunch-projects?city_id=${cityid}&page=${page}`
//     );
//     const data = await response.json();
//     console.log("New launch projects data", data);
//     console.log("New launch projects data", data?.properties);
//     return {
//       properties: data.properties,
//       currentPage: data.current_page,
//       totalPages: data.total_pages,
//       totalItems: data.total_items,
//     };
//   } catch (error) {
//     console.error("Error fetching new launch projects data:", error);
//     return {
//       properties: [],
//       currentPage: 1,
//       totalPages: 1,
//       totalItems: 0,
//     };
//   }
// };

// const ProjectListComponent = () => {
//   const [showPrice, setShowPrice] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [projectData, setProjectData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCity, setSelectedCity] = useState("");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");
//   const [selectedUnitSize, setSelectedUnitSize] = useState("");
//   const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
// const [totalPages, setTotalPages] = useState(1);
//   const [projectsPerPage] = useState(10);
//   const { cityId } = useContext(CityIdContext);
//   const navigate = useNavigate();
//   const [storedCityId, setStoredCityId] = useState(
//     localStorage.getItem("cityId")
//   );
//   const [sortOption, setSortOption] = useState("Default");
//   const [selectedProject, setSelectedProject] = useState(null);
// const [isLoading, setIsLoading] = useState(true);
// const [paginationEnabled, setPaginationEnabled] = useState(false);

//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "cityId") {
//         setStoredCityId(event.newValue);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

// useEffect(() => {
//   const fetchData = async () => {
//     setIsLoading(true);
//     const data = await fetchNewLaunchProjects(
//       selectedCity,
//       selectedPriceRange,
//       selectedUnitSize,
//       selectedCarpetArea,
//       storedCityId,
//       currentPage
//     );
//     setProjectData(data.properties);
//     setPaginationEnabled(true);
//     console.log(
//       "STroing new page data",
//       data.properties,
//       "PAGE = ",
//       data.currentPage
//     );
//     setCurrentPage(data.currentPage);
//     setTotalPages(data.totalPages);
//     setIsLoading(false);
//   };

//   fetchData();
// }, [
//   selectedCity,
//   selectedPriceRange,
//   selectedUnitSize,
//   selectedCarpetArea,
//   currentPage,
//   storedCityId,
// ]);

//   const handleOpen = (project) => {
//     setOpen(true);
//     setSelectedProject(project);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedProject(null);
//   };

//   const handleCityChange = (e) => {
//     setSelectedCity(e.target.value);
//   };

//   const handlePriceRangeChange = (e) => {
//     setSelectedPriceRange(e.target.value);
//   };

//   const handleUnitSizeChange = (e) => {
//     setSelectedUnitSize(e.target.value);
//   };

//   const handleCarpetAreaChange = (e) => {
//     setSelectedCarpetArea(e.target.value);
//   };

//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleSortOptionChange = (e) => {
//     setSortOption(e.target.value);
//   };

//   const handleSearch = (string, results) => {
//     setSearchQuery(string);
//   };

//   const handleOnSelect = (item) => {
//     setSearchQuery(item.name);
//   };

//   const formatPriceRange = (priceRange) => {
//     if (!priceRange) return "Call For Price";

//     const match = priceRange.match(/(\d+)-(\d+) Lac/);

//     if (!match) return "Call For Price";

//     const [_, minPrice, maxPrice] = match;

//     const formatPrice = (price) => {
//       const numberPrice = parseFloat(price);

//       if (numberPrice >= 10000000) {
//         const crores = numberPrice / 10000000;
//         return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
//       } else {
//         const lacs = numberPrice / 100000;
//         return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
//       }
//     };

//     return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
//   };

//   const slugify = (text) => {
//     return text
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "")
//       .replace(/\-\-+/g, "-")
//       .replace(/^-+/, "")
//       .replace(/-+$/, "");
//   };

//   const parsePriceRange = (priceRange) => {
//     if (!priceRange) return [0, Infinity];
//     const match = priceRange.match(/(\d+)-(\d+)/);
//     if (match) {
//       const [_, minPrice, maxPrice] = match.map(Number);
//       return [minPrice * 100000, maxPrice * 100000];
//     }
//     if (priceRange.includes("100+")) return [10000000, Infinity];
//     return [0, Infinity];
//   };

//   const parseCarpetAreaRange = (carpetArea) => {
//     if (!carpetArea) return [0, Infinity];
//     const match = carpetArea.match(/(\d+)-(\d+)/);
//     if (match) {
//       const [_, minArea, maxArea] = match?.map(Number);
//       return [minArea, maxArea];
//     }
//     if (carpetArea.includes("1200+")) return [1200, Infinity];
//     return [0, Infinity];
//   };

//   const filteredProjects = projectData.filter((project) => {
//     const cityMatch = selectedCity === "" || project.city_id === selectedCity;

//     const [minPrice, maxPrice] = parsePriceRange(selectedPriceRange);
//     const projectPriceStr = project.price?.toLowerCase?.() || "";
//     let projectPrice = 0;

//     if (
//       projectPriceStr !== "call for price" &&
//       projectPriceStr !== "- lac" &&
//       projectPriceStr.trim() !== ""
//     ) {
//       projectPrice = parseFloat(project.price) || 0;
//     }

//     const priceRangeMatch =
//       projectPrice >= minPrice && projectPrice <= maxPrice;

//     const [minArea, maxArea] = parseCarpetAreaRange(selectedCarpetArea);
//     const projectArea = parseFloat(project.carpet_area) || 0;
//     const carpetAreaMatch = projectArea >= minArea && projectArea <= maxArea;

//     let unitSizeMatch = false;
//     if (Array.isArray(project.unit_sizes)) {
//       unitSizeMatch =
//         selectedUnitSize === "" ||
//         project.unit_sizes.some((unitSize) => {
//           const projectBhk = parseInt(unitSize);
//           const selectedBhk = parseInt(selectedUnitSize);
//           return (
//             !isNaN(projectBhk) &&
//             !isNaN(selectedBhk) &&
//             (projectBhk === selectedBhk || projectBhk > selectedBhk)
//           );
//         });
//     } else if (typeof project.unit_sizes === "string") {
//       const projectBhk = parseInt(project.unit_sizes);
//       const selectedBhk = parseInt(selectedUnitSize);
//       unitSizeMatch =
//         selectedUnitSize === "" ||
//         (!isNaN(projectBhk) &&
//           !isNaN(selectedBhk) &&
//           (projectBhk === selectedBhk || projectBhk > selectedBhk));
//     }

//     const searchMatch =
//       searchQuery === "" ||
//       (project.title &&
//         project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (project.developer_name &&
//         project.developer_name
//           .toLowerCase()
//           .includes(searchQuery.toLowerCase()));

//     return (
//       cityMatch &&
//       priceRangeMatch &&
//       unitSizeMatch &&
//       carpetAreaMatch &&
//       searchMatch
//     );
//   });

// const totalProjectsFound = filteredProjects.length;

// const developerCounts = {};
// filteredProjects.forEach((project) => {
//   const developer = project.developer_name;
//   if (developerCounts[developer]) {
//     developerCounts[developer]++;
//   } else {
//     developerCounts[developer] = 1;
//   }
// });

// const chosenDeveloper = Object.keys(developerCounts)[0];
// const projectsByChosenDeveloper = developerCounts[chosenDeveloper];

// const heading = `${chosenDeveloper} Group ${projectsByChosenDeveloper} Projects Found`;

// const sortedProjects = [...filteredProjects].sort((a, b) => {
//   if (sortOption === "Price Low to High") {
//     return (
//       parseFloat(a.price.split(" ")[0]) - parseFloat(b.price.split(" ")[0])
//     );
//   } else if (sortOption === "Price High to Low") {
//     return (
//       parseFloat(b.price.split(" ")[0]) - parseFloat(a.price.split(" ")[0])
//     );
//   } else if (sortOption === "Newest to Oldest") {
//     return b.id - a.id;
//   } else if (sortOption === "Oldest to Newest") {
//     return a.id - b.id;
//   }
//   return 0;
// });

// const indexOfLastProject = currentPage * projectsPerPage;
// const indexOfFirstProject = indexOfLastProject - projectsPerPage;
// const currentProjects = sortedProjects.slice(
//   indexOfFirstProject,
//   indexOfLastProject
// );

// const renderProjectList = currentProjects.map((project) => (
//     <div key={project.id} className="row bg-row-list property-card">
//       <div
//         className="col-lg-4 p-0"
//         style={{ overflow: "hidden", cursor: "pointer" }}
//         onClick={() =>
//           navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
//         }
//       >
//         <img
//           src={project.banner}
//           alt="img"
//           className="project-list-image property-banner"
//         />
//       </div>
//       <div className="col-lg-8 bg-hover-card property-card-container">
//         <div className="card project-list-card property-info">
//           {project.rera_no && project.rera_no.trim() !== "" && (
//             <h6
//               className="Project-title property-rera-id property-rera-id price-rera-mobile"
//               style={{ color: "#C08735" }}
//             >
//               RERA ID: {project.rera_no}
//             </h6>
//           )}

//           <span className="badge-button bgprice-range-transperent price-rera-mobile">
//             {formatPriceRange(project.price)}
//           </span>
//           <div className="priceing-section-mb">
//             <div className="price-rera">
//               <h6
//                 className="Preview-title "
//                 style={{ alignItems: "flex-start" }}
//               >
//                 {formatPriceRange(project.price)}
//               </h6>
//             </div>
//           </div>
//           <h2 className="property-title">{project.title}</h2>
//           <ul className="location-list-project-list ">
//             <li
//               className="loction-list-pr property-address"
//               style={{ color: "black" }}
//             >
//               <img
//                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                 alt="img"
//                 className="map-location-icon"
//               />
//               {project.address}
//             </li>
//             <li className="loction-list-pr group-builder  mt-2 property-builder-name">
//               {" "}
//               <span style={{ color: "#787878", paddingRight: "10px" }}>
//                 {" "}
//                 By
//               </span>
//               {project.developer_name} group{" "}
//             </li>
//             {project.rera_no && project.rera_no.trim() !== "" && (
//               <li className="loction-list-pr property-address mb-mobile-rera-list">
//                 {" "}
//                 <h6
//                   className="Project-title property-rera-id property-rera-id"
//                   style={{ color: "#C08735", marginTop: "16px" }}
//                 >
//                   RERA ID: {project.rera_no}
//                 </h6>
//               </li>
//             )}
//           </ul>
//           <div className="property-info-container">
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg"
//                 }
//                 className="amenties-icons"
//               />
//               <span className="property-type-1">{project.project_type}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               <span className="property-bhk">{project.unit_sizes}</span>
//             </div>
//             <div
//               className="info-box"
//               style={{
//                 width:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial"
//                     ? "48%"
//                     : "32.5",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               <span className="property-carpet-area">
//                 {project.carpet_area}
//               </span>
//             </div>
//           </div>
//           <div className="buttons-container">
//             <button
//               className="details-btn"
//               onClick={() =>
//                 navigate(
//                   `/property-detail/${project.id}/${slugify(project.title)}`
//                 )
//               }
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               View Details
//             </button>
//             <button
//               className="details-btn expert-btn"
//               onClick={() => handleOpen(project)}
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               <img
//                 src="/assets/images/info-mark.svg"
//                 alt="img "
//                 className="info-img"
//                 style={{ marginRight: "10px" }}
//               />
//               Talk to Expert
//             </button>
//           </div>

//           <ul
//             className="features-list pl-0
//             property-info-mobile
//            "
//           >
//             <li className="project-list-icons">
//               <img
//                 src={
//                   project.project_type === "Residential "
//                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                     : project.project_type === "Plots"
//                     ? "/assets/images/Plot.svg"
//                     : project.project_type === "Commercial"
//                     ? "/assets/images/Commercial.svg"
//                     : "/assets/images/default-icon.svg"
//                 }
//                 className="amenties-icons"
//               />
//               {project.project_type}
//             </li>
//             <li
//               className="project-list-icons"
//               style={{
//                 display:
//                   project.project_type == "Plots" ||
//                   project.project_type == "Commercial "
//                     ? "none"
//                     : "flex",
//               }}
//             >
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//               {project.unit_sizes}
//             </li>
//             <li className="project-list-icons">
//               <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//               {project.carpet_area}
//             </li>

//             <li className="view-btn-list">
//               <button
//                 className="kss-btn"
//                 onClick={() =>
//                   navigate(
//                     `/property-detail/${project.id}/${slugify(project.title)}`
//                   )
//                 }
//                 style={{ cursor: "pointer" }}
//               >
//                 {" "}
//                 View Details
//               </button>
//             </li>
//             <li
//               className="view-btn-list-talk-expert"
//               style={{ cursor: "pointer" }}
//               onClick={() => handleOpen(project)}
//             >
//               <button className="kss-btn-info details-btn">
//                 <img
//                   src="/assets/images/info-mark.svg"
//                   alt="img "
//                   className="info-img"
//                 />
//               </button>
//               <span className="bg-color-theme"> Talk to Expert</span>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   ));
// const renderProjectListPagination = projectData.map((project) => (
//   <div key={project.id} className="row bg-row-list property-card">
//     <div
//       className="col-lg-4 p-0"
//       style={{ overflow: "hidden", cursor: "pointer" }}
//       onClick={() =>
//         navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
//       }
//     >
//       <img
//         src={project.banner}
//         alt="img"
//         className="project-list-image property-banner"
//       />
//     </div>
//     <div className="col-lg-8 bg-hover-card property-card-container">
//       <div className="card project-list-card property-info">
//         {project.rera_no && project.rera_no.trim() !== "" && (
//           <h6
//             className="Project-title property-rera-id property-rera-id price-rera-mobile"
//             style={{ color: "#C08735" }}
//           >
//             RERA ID: {project.rera_no}
//           </h6>
//         )}

//         <span className="badge-button bgprice-range-transperent price-rera-mobile">
//           {formatPriceRange(project.price)}
//         </span>
//         <div className="priceing-section-mb">
//           <div className="price-rera">
//             <h6
//               className="Preview-title "
//               style={{ alignItems: "flex-start" }}
//             >
//               {formatPriceRange(project.price)}
//             </h6>
//           </div>
//         </div>
//         <h2 className="property-title">{project.title}</h2>
//         <ul className="location-list-project-list ">
//           <li
//             className="loction-list-pr property-address"
//             style={{ color: "black" }}
//           >
//             <img
//               src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//               alt="img"
//               className="map-location-icon"
//             />
//             {project.address}
//           </li>
//           <li className="loction-list-pr group-builder  mt-2 property-builder-name">
//             {" "}
//             <span style={{ color: "#787878", paddingRight: "10px" }}>
//               {" "}
//               By
//             </span>
//             {project.developer_name} group{" "}
//           </li>
//           {project.rera_no && project.rera_no.trim() !== "" && (
//             <li className="loction-list-pr property-address mb-mobile-rera-list">
//               {" "}
//               <h6
//                 className="Project-title property-rera-id property-rera-id"
//                 style={{ color: "#C08735", marginTop: "16px" }}
//               >
//                 RERA ID: {project.rera_no}
//               </h6>
//             </li>
//           )}
//         </ul>
//         <div className="property-info-container">
//           <div
//             className="info-box"
//             style={{
//               width:
//                 project.project_type == "Plots" ||
//                 project.project_type == "Commercial"
//                   ? "48%"
//                   : "32.5",
//             }}
//           >
//             <img
//               src={
//                 project.project_type === "Residential "
//                   ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                   : project.project_type === "Plots"
//                   ? "/assets/images/Plot.svg"
//                   : project.project_type === "Commercial"
//                   ? "/assets/images/Commercial.svg"
//                   : "/assets/images/default-icon.svg"
//               }
//               className="amenties-icons"
//             />
//             <span className="property-type-1">{project.project_type}</span>
//           </div>
//           <div
//             className="info-box"
//             style={{
//               display:
//                 project.project_type == "Plots" ||
//                 project.project_type == "Commercial"
//                   ? "none"
//                   : "flex",
//             }}
//           >
//             <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//             <span className="property-bhk">{project.unit_sizes}</span>
//           </div>
//           <div
//             className="info-box"
//             style={{
//               width:
//                 project.project_type == "Plots" ||
//                 project.project_type == "Commercial"
//                   ? "48%"
//                   : "32.5",
//             }}
//           >
//             <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//             <span className="property-carpet-area">
//               {project.carpet_area}
//             </span>
//           </div>
//         </div>
//         <div className="buttons-container">
//           <button
//             className="details-btn"
//             onClick={() =>
//               navigate(
//                 `/property-detail/${project.id}/${slugify(project.title)}`
//               )
//             }
//             style={{ cursor: "pointer" }}
//           >
//             {" "}
//             View Details
//           </button>
//           <button
//             className="details-btn expert-btn"
//             onClick={() => handleOpen(project)}
//             style={{ cursor: "pointer" }}
//           >
//             {" "}
//             <img
//               src="/assets/images/info-mark.svg"
//               alt="img "
//               className="info-img"
//               style={{ marginRight: "10px" }}
//             />
//             Talk to Expert
//           </button>
//         </div>

//         <ul
//           className="features-list pl-0
//           property-info-mobile
//          "
//         >
//           <li className="project-list-icons">
//             <img
//               src={
//                 project.project_type === "Residential "
//                   ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                   : project.project_type === "Plots"
//                   ? "/assets/images/Plot.svg"
//                   : project.project_type === "Commercial"
//                   ? "/assets/images/Commercial.svg"
//                   : "/assets/images/default-icon.svg"
//               }
//               className="amenties-icons"
//             />
//             {project.project_type}
//           </li>
//           <li
//             className="project-list-icons"
//             style={{
//               display:
//                 project.project_type == "Plots" ||
//                 project.project_type == "Commercial "
//                   ? "none"
//                   : "flex",
//             }}
//           >
//             <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg" className="amenties-icons" />
//             {project.unit_sizes}
//           </li>
//           <li className="project-list-icons">
//             <img src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg" className="amenties-icons" />
//             {project.carpet_area}
//           </li>

//           <li className="view-btn-list">
//             <button
//               className="kss-btn"
//               onClick={() =>
//                 navigate(
//                   `/property-detail/${project.id}/${slugify(project.title)}`
//                 )
//               }
//               style={{ cursor: "pointer" }}
//             >
//               {" "}
//               View Details
//             </button>
//           </li>
//           <li
//             className="view-btn-list-talk-expert"
//             style={{ cursor: "pointer" }}
//             onClick={() => handleOpen(project)}
//           >
//             <button className="kss-btn-info details-btn">
//               <img
//                 src="/assets/images/info-mark.svg"
//                 alt="img "
//                 className="info-img"
//               />
//             </button>
//             <span className="bg-color-theme"> Talk to Expert</span>
//           </li>
//         </ul>
//       </div>
//     </div>
//   </div>
// ));

//   const renderHeading = () => {
//     const title = "New Launch Projects";
//     const projectType = 1;

//     const baseHeading = `Property In ${cities[selectedCity - 1] || cities[0]}`;

//     const dynamicHeading = `${
//       projectType === 1
//         ? "New Launch Projects"
//         : projectType === 2
//         ? "Commercial"
//         : "Plots"
//     } ${selectedCity ? ` in ${cities[selectedCity - 1]}` : ""} ${
//       selectedPriceRange ? ` under ${selectedPriceRange}` : ""
//     } ${selectedUnitSize ? ` with ${selectedUnitSize}` : ""} ${
//       selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""
//     } ${
//       searchQuery ? ` matching "${searchQuery}"` : ""
//     } - ${totalProjectsFound} results found`;

//     return (
//       <div className="heading-section web-section-property-heading">
//         <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
//           {title}
//         </h2>
//         {dynamicHeading && (
//           <h6
//             className="property-result-text text-right"
//             style={{ textAlign: "center" }}
//           >
//             {dynamicHeading}
//           </h6>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="project-list-section">
//       <div className="project-fillter-bg filters-bg">
//         <div className="container ">
//           <div className="row">
//             <div className="col-md-4">
//               <ReactSearchAutocomplete
//                 className="fillter-search-box"
//                 items={projectData.map((project) => ({
//                   id: project.id,
//                   name: project.title,
//                 }))}
//                 onSearch={handleSearch}
//                 onSelect={handleOnSelect}
//                 placeholder="Search Project, Locality or Builder"
//                 styling={{
//                   height: "40px",
//                   borderRadius: "0px",
//                   border: "1px solid #ddd",
//                   backgroundColor: "#fff",
//                   zIndex: "5",
//                 }}
//               />
//             </div>
//             <div className="col-md-6 filters-mobile">
//               <div className="row">
//                 <div className="col-md-4">
//                   <select
//                     value={selectedUnitSize}
//                     onChange={handleUnitSizeChange}
//                     className="form-control"
//                   >
//                     <option value="">Unit Size</option>
//                     {unitSizes.map((size) => (
//                       <option key={size} value={size}>
//                         {size}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <select
//                     value={selectedCarpetArea}
//                     onChange={handleCarpetAreaChange}
//                     className="form-control"
//                   >
//                     <option value="">Carpet Area</option>
//                     {carpetAreas.map((area) => (
//                       <option key={area} value={area}>
//                         {area}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="col-md-4">
//                   <select
//                     value={selectedPriceRange}
//                     onChange={handlePriceRangeChange}
//                     className="form-control"
//                   >
//                     <option value="">Price Range</option>
//                     {priceRanges.map((range) => (
//                       <option key={range} value={range}>
//                         {range}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//             <div className="container filters-container">
//               <div className="col-md-4 filter-select-size">
//                 <select
//                   value={selectedUnitSize}
//                   onChange={handleUnitSizeChange}
//                   className="form-control"
//                 >
//                   <option value="">Unit Size</option>
//                   {unitSizes.map((size) => (
//                     <option key={size} value={size}>
//                       {size}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 filter-select-carpet">
//                 <select
//                   value={selectedCarpetArea}
//                   onChange={handleCarpetAreaChange}
//                   className="form-control"
//                 >
//                   <option value="">Carpet Area</option>
//                   {carpetAreas.map((area) => (
//                     <option key={area} value={area}>
//                       {area}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 filter-select-price">
//                 <select
//                   value={selectedPriceRange}
//                   onChange={handlePriceRangeChange}
//                   className="form-control"
//                 >
//                   <option value="">Price Range</option>
//                   {priceRanges.map((range) => (
//                     <option key={range} value={range}>
//                       {range}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="project-list-bg">
//         <div className="container ">
//           <Breadcrumb className="menu-breadcrumb-items">
//             <Breadcrumb.Item className="breadcrumb-link" href="/">
//               Home
//             </Breadcrumb.Item>
//             <Breadcrumb.Item className="breadcrumb-link" href="#">
//               Property {cities[selectedCity - 1]}
//             </Breadcrumb.Item>
//             <Breadcrumb.Item className="breadcrumb-link" active>
//               New Launch
//             </Breadcrumb.Item>
//           </Breadcrumb>

//           <div className="short-list-section properties-sorter">
//             <label>Sort By:</label>
//             <select
//               value={sortOption}
//               onChange={handleSortOptionChange}
//               className="form-control shortling-list-select"
//             >
//               <option value="Default">Default</option>
//               <option value="Price Low to High">Price Low to High</option>
//               <option value="Price High to Low">Price High to Low</option>
//               <option value="Newest to Oldest">Newest to Oldest</option>
//               <option value="Oldest to Newest">Oldest to Newest</option>
//             </select>
//           </div>
//           {isLoading ? (
//             <div>Loading...</div>
//           ) : (
//             <>
//               {renderHeading()}
//               <a
//                 className="project-list-link properties-mapper"
//                 style={{ cursor: "pointer" }}
//               >
// {paginationEnabled
//   ? renderProjectListPagination
//   : renderProjectList}
//               </a>
//               <Pagination
//                 currentPage={currentPage}
//                 totalPages={totalPages}
//                 handlePageChange={handlePageChange}
//               />
//             </>
//           )}
//         </div>
//       </div>

//       <Modal
//         className="video-pop-box-content-detail bg-transparent"
//         open={open}
//         BackdropProps={{
//           sx: {
//             backgroundColor: "rgb(0 0 0 / 0%)",
//           },
//           onClick: (event) => {
//             event.stopPropagation();
//           },
//         }}
//         style={{ backgroundColor: "transparent" }}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box
//           className="video-pop-box-content-box-detail"
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 800,
//             bgcolor: "background.paper",
//             border: "2px solid #000",
//             boxShadow: 24,
//             Padding: "0px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-end",
//           }}
//         >
//           <IconButton
//             className="btn-dwonload-brochure-detail"
//             aria-label="close"
//             onClick={handleClose}
//             style={{ marginBottom: "10px" }}
//           >
//             <CloseIcon className="icon-close-btn-Brochure-detail" />
//           </IconButton>
//           {selectedProject && (
//             <ListpagesExpertform
//               addressTitle={selectedProject?.title}
//               propertyiddata={selectedProject?.id}
//             />
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//   const pageSetSize = 5;
//   const halfSet = Math.floor(pageSetSize / 2);

//   let startPage = Math.max(currentPage - halfSet, 1);
//   let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

//   if (endPage - startPage + 1 < pageSetSize) {
//     startPage = Math.max(endPage - pageSetSize + 1, 1);
//   }

//   const renderPageNumbers = () => {
//     const pageNumbers = [];

//     if (startPage > 1) {
//       pageNumbers.push(
//         <button
//           key={1}
//           className="pagination-btn"
//           onClick={() => handlePageChange(1)}
//         >
//           1
//         </button>
//       );
//       if (startPage > 2) {
//         pageNumbers.push(
//           <button key="ellipsis-start" className="pagination-btn" disabled>
//             ...
//           </button>
//         );
//       }
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(
//         <button
//           key={i}
//           className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//           onClick={() => handlePageChange(i)}
//         >
//           {i}
//         </button>
//       );
//     }

//     if (endPage < totalPages) {
//       if (endPage < totalPages - 1) {
//         pageNumbers.push(
//           <button key="ellipsis-end" className="pagination-btn" disabled>
//             ...
//           </button>
//         );
//       }
//       pageNumbers.push(
//         <button
//           key={totalPages}
//           className={`pagination-btn ${
//             totalPages === currentPage ? "active" : ""
//           }`}
//           onClick={() => handlePageChange(totalPages)}
//         >
//           {totalPages}
//         </button>
//       );
//     }

//     return pageNumbers;
//   };

//   return (
//     <div className="pagination">
//       <button
//         className="pagination-btn"
//         onClick={() => handlePageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//       >
//         <img
//           src="/assets/images/chevron-left.svg"
//           alt="Previous"
//           className="arrow-pagination"
//         />
//       </button>
//       {renderPageNumbers()}
//       <button
//         className="pagination-btn"
//         onClick={() => handlePageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//       >
//         <img
//           src="/assets/images/chevron-right.svg"
//           alt="Next"
//           className="arrow-pagination"
//         />
//       </button>
//     </div>
//   );
// };

// export default ProjectListComponent;
