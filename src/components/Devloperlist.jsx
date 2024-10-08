import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ExpertForm from "./ExpertForm";
import ListpagesExpertform from "./ListpagesExpertform";
import { ReactSearchAutocomplete } from "react-search-autocomplete"; // Import ReactSearchAutocomplete
import Header from "./Header";
import { CityIdContext } from "../App";

// let developerProjects = location.state.projects;
// let developerTitle = location.state.projetstite;
// console.log("developerProjects", developerProjects);
// console.log("developerProjects", developerTitle);
// Static filter options

const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];

const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Duplex", "Penthouse"];
const carpetAreas = [
  "100-400 sqft",
  "400-800 sqft",
  "800-1000 sqft",
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
  cityid
) => {
  try {
    const queryParams = new URLSearchParams();
    if (city) queryParams.append("city", city);
    if (priceRange) queryParams.append("priceRange", priceRange);
    if (unitSize) queryParams.append("unitSize", unitSize);
    if (carpetArea) queryParams.append("carpetArea", carpetArea);

    const response = await fetch();
    // `${BASE_URL}/newLaunch-projects?${queryParams.toString()}`
    // `https://admin.kalsiestate.com/public/api/newLaunch-projects?city_id=${cityid}`

    const data = await response.json();

    return data.properties;
  } catch (error) {
    console.error("Error fetching new launch projects data:", error);
  }
};

const Devloperlist = () => {
  // const builderTitle = location.state?.builderTitle;

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

  const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const [projectData, setProjectData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [developerDetails, setDeveloperDetails] = useState({});
  const location = useLocation();
  const [projectsPerPage] = useState(10);
  const { cityId } = useContext(CityIdContext);
  const navigate = useNavigate();
  const [storedCityId, setStoredCityId] = useState(
    localStorage.getItem("cityId")
  );

  let developerProjects = location.state.projects;
  let developerTitle = location.state.projetstite;

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cityId") {
        setStoredCityId(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const [sortOption, setSortOption] = useState("Default");

  // const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpen = (project) => {
    setOpen(true);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchNewLaunchProjects(
  //       selectedCity,
  //       selectedPriceRange,
  //       selectedUnitSize,
  //       selectedCarpetArea,
  //       storedCityId
  //     );
  //     setProjectData(data);
  //   };

  //   fetchData();
  // }, [selectedCity, selectedPriceRange, selectedUnitSize, selectedCarpetArea]);

  // const handleSearch = (e) => {
  //   setSearchQuery(e.target.value);
  // };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange(e.target.value);
  };

  const handleUnitSizeChange = (e) => {
    setSelectedUnitSize(e.target.value);
  };

  const handleCarpetAreaChange = (e) => {
    setSelectedCarpetArea(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearch = (string, results) => {
    setSearchQuery(string);
  };

  const handleOnSelect = (item) => {
    setSearchQuery(item.name);
  };

  // Filter project data based on search query and selected filters
  const filteredProjects = developerProjects?.filter((project) => {
    // City match (unchanged)
    const cityMatch =
      selectedCity === "" ||
      (project.address &&
        project.address.toLowerCase().includes(selectedCity.toLowerCase()));

    // Price range match (improved)
    const priceRangeMatch = (() => {
      if (selectedPriceRange === "") return true;

      const [minPrice, maxPrice] = selectedPriceRange
        .split("-")
        .map((price) => {
          if (price.includes("Lac")) {
            return parseFloat(price) * 100000; // Convert Lac to actual number
          } else if (price.includes("+")) {
            return Infinity; // For ranges like "100+ Lac"
          }
          return parseFloat(price) * 100000;
        });

      const projectPrice = parseFloat(project.price);
      return projectPrice >= minPrice && projectPrice < maxPrice;
    })();

    // Unit size match (unchanged)
    const unitSizeMatch =
      selectedUnitSize === "" || project.unit_sizes?.includes(selectedUnitSize);

    // Carpet area match (unchanged)
    const carpetAreaMatch =
      selectedCarpetArea === "" ||
      (project.carpet_area &&
        project?.carpet_area.includes(selectedCarpetArea));

    // Search match (unchanged)
    const searchMatch =
      searchQuery === "" ||
      (project.title &&
        project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.developer_name &&
        project.developer_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    return (
      cityMatch &&
      priceRangeMatch &&
      unitSizeMatch &&
      carpetAreaMatch &&
      searchMatch
    );
  });

  // Calculate total number of projects found
  const totalProjectsFound = filteredProjects?.length;

  // Calculate the number of projects for each developer
  const developerCounts = {};
  filteredProjects?.forEach((project) => {
    const developer = project.developer_name;
    if (developerCounts[developer]) {
      developerCounts[developer]++;
    } else {
      developerCounts[developer] = 1;
    }
  });

  // Choose a single developer to display (for example, the first one)
  const chosenDeveloper = Object.keys(developerCounts)[0];
  const projectsByChosenDeveloper = developerCounts[chosenDeveloper];

  // Prepare the output string for the heading
  const heading = `${chosenDeveloper} Group ${projectsByChosenDeveloper} Projects Found`;

  // Sort projects based on selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortOption === "Price Low to High") {
      return (
        parseFloat(a.price.split(" ")[0]) - parseFloat(b.price.split(" ")[0])
      );
    } else if (sortOption === "Price High to Low") {
      return (
        parseFloat(b.price.split(" ")[0]) - parseFloat(a.price.split(" ")[0])
      );
    } else if (sortOption === "Newest to Oldest") {
      return b.id - a.id;
    } else if (sortOption === "Oldest to Newest") {
      return a.id - b.id;
    }
    return 0;
  });

  // Calculate the index of the first and last project to display on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

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

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  // Render project list
  const renderProjectList = filteredProjects?.map((project) => (
    <div key={project.id} className="row bg-row-list property-card">
      <div className="col-lg-4 p-0" style={{ overflow: "hidden" }}>
        <img
          onClick={() =>
            navigate(`/property-detail/${project.id}/${slugify(project.title)}`)
          }
          style={{ cursor: "pointer" }}
          src={project.banner || "/assets/images/default-img.jpg"}
          alt="Project Banner property-banner"
          className="project-list-image property-banner"
        />
      </div>
      <div className="col-lg-8 bg-hover-card property-card-container">
        <div className="card project-list-card property-info">
          {project.rera_no && project.rera_no.trim() !== "" && (
            <h6
              className="Project-title price-rera-mobile"
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
          <ul className="location-list-project-list">
            <li
              className="loction-list-pr property-builder-name"
              style={{ color: "black" }}
            >
              <img
                src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                alt="img"
                className="map-location-icon"
              />
              <span style={{ color: "#787878", paddingRight: "2px" }}>At</span>
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
                    : "/assets/images/default-icon.svg" // Default icon in case no match
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
              <span className="property-bhk">{project.unit_size}</span>
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
            <li className="project-list-icons">
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
              {project.unit_size}
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
              <button className="kss-btn-info">
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

  // Render the heading based on search and filtering criteria
  const renderHeading = () => {
    const developerTitle = location.state?.builderTitle; // Accessing builderTitle from the passed state

    const title = " Projects"; // Define your title here
    const projectType = 1; // Define your projectType here

    const baseHeading = `Property In ${cities[selectedCity - 1] || cities[0]}`;

    const dynamicHeading = `${
      projectType === 1
        ? " Projects"
        : projectType === 2
        ? "Commercial"
        : "Plots"
    } ${selectedCity ? ` in ${cities[selectedCity - 1]}` : ""} ${
      selectedPriceRange ? ` under ${selectedPriceRange}` : ""
    } ${selectedUnitSize ? ` with ${selectedUnitSize}` : ""} ${
      selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""
    } ${
      searchQuery ? ` matching "${searchQuery}"` : ""
    } - ${totalProjectsFound} results found`;

    return (
      <div className="heading-section web-section-property-heading">
        <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center  page-title ">
          {developerTitle}
          {title}
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
    <div className="project-list-section mt-5">
      <div className="project-fillter-bg filters-bg">
        <div className="container ">
          <div className="row">
            <div className="col-md-4">
              <ReactSearchAutocomplete
                className="fillter-search-box"
                items={developerProjects.map((project) => ({
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
              Property By Top Builder{" "}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div className="short-list-section">
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
          <a
            className="project-list-link properties-mapper"
            style={{ cursor: "pointer" }}
          >
            {renderProjectList}
          </a>
          {/* Render pagination */}
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
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5; // Change this value to adjust the number of page numbers to show

    // Render the first few page numbers
    for (let i = 1; i <= Math.min(maxPageNumbersToShow, totalPages); i++) {
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

    // If there are more pages to show, render the ellipsis (...) and the last page number
    if (totalPages > maxPageNumbersToShow) {
      pageNumbers.push(
        <button key="ellipsis" className="pagination-btn" disabled>
          ...
        </button>
      );

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
          alt="arrow"
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
          alt="arrow"
          className="arrow-pagination"
        />
      </button>
    </div>
  );
};

export default Devloperlist;
