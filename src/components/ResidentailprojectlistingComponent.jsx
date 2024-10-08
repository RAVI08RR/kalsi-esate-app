import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListpagesExpertform from "./ListpagesExpertform";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

// Static filter options
const cities = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Hyderabad", "Pune"];

const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK", "Duplex", "Penthouse"];
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

const BASE_URL =
  "https://admin.kalsiestate.com/public/api/properties-by-project";

// let cityid = localStorage.getItem("cityId");
const ResidentailprojectlistingComponent = ({ projectType, title }) => {
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

  const location = useLocation();
  const { cityName } = location.state || {};
  console.log("cityName", cityName);

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

  const [projectData, setProjectData] = useState([]);
  const [filteredprojectData, setFilteredProjectData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState();
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("Default");
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchItems, setSearchItems] = useState([]);

  const handleOpen = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProject(null);
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

  const fetchProjects = async (
    projectType,
    city,
    priceRange,
    unitSize,
    carpetArea
  ) => {
    console.log("Fetching projects data");
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("project_type", projectType);
      queryParams.append("city_id", 1);
      if (priceRange) queryParams.append("priceRange", priceRange);
      if (unitSize) queryParams.append("unitSize", unitSize);
      if (carpetArea) queryParams.append("carpetArea", carpetArea);

      const response = await fetch(
        `https://admin.kalsiestate.com/public/api/properties-by-project?city_id=${cityIdN}&project_type=${projectType}`
      );
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Projects data:", data);
      return data.data || [];
    } catch (error) {
      console.error("Error fetching projects data:", error);
      return [];
    }
  };

  let { cityIdN } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetchProjects(
        projectType,
        selectedCity,
        selectedPriceRange,
        selectedUnitSize,
        selectedCarpetArea,
        cityIdN
      );
      setProjectData(projects);
      setFilteredProjectData(projects);

      // Create search items from project data
      const items = projects.map((project) => ({
        id: project.id,
        name: project.title,
      }));
      setSearchItems(items);
    };

    fetchData();
  }, [
    projectType,
    selectedCity,
    selectedPriceRange,
    selectedUnitSize,
    selectedCarpetArea,
    cityIdN,
  ]);

  const handleOnSearch = (string, results) => {
    setSearchQuery(string);
  };

  const handleOnSelect = (item) => {
    setSearchQuery(item.name);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);
  };

  // useEffect(() => {
  //   const filtered = projectData.filter((project) => {
  //     const title = project.title ? project.title.toLowerCase() : "";
  //     const developerName = project.developer_name
  //       ? project.developer_name.toLowerCase()
  //       : "";
  //     return title.includes(searchQuery) || developerName.includes(searchQuery);
  //   });

  //   setFilteredProjectData(filtered);
  // }, [searchQuery]);

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
    setCurrentPage(pageNumber);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const parsePriceRange = (priceRange) => {
    if (!priceRange) return [0, Infinity];
    const match = priceRange.match(/(\d+)-(\d+)/);
    if (match) {
      const [_, minPrice, maxPrice] = match.map(Number);
      return [minPrice * 100000, maxPrice * 100000];
    }
    if (priceRange.includes("100+")) return [10000000, Infinity];
    return [0, Infinity];
  };

  const parseCarpetAreaRange = (carpetArea) => {
    if (!carpetArea) return [0, Infinity];
    const match = carpetArea.match(/(\d+)-(\d+)/);
    if (match) {
      const [_, minArea, maxArea] = match.map(Number);
      return [minArea, maxArea];
    }
    if (carpetArea.includes("1200+")) return [1200, Infinity];
    return [0, Infinity];
  };

  const filteredProjects = filteredprojectData.filter((project) => {
    const cityMatch = selectedCity === "" || project.city_id === selectedCity;

    // Check if price is invalid (empty or "- Lac")
    const projectPriceStr = project.price?.toLowerCase?.() || "";
    if (
      projectPriceStr === "call for price" ||
      projectPriceStr === "- lac" ||
      !project.price
    ) {
      return false; // Exclude projects with invalid price
    }

    // Continue price range check for valid prices
    const [minPrice, maxPrice] = parsePriceRange(selectedPriceRange);
    const projectPrice = parseFloat(project.price) || 0;
    const priceRangeMatch =
      projectPrice >= minPrice && projectPrice <= maxPrice;

    const [minArea, maxArea] = parseCarpetAreaRange(selectedCarpetArea);
    const projectArea = parseFloat(project.carpet_area) || 0;
    const carpetAreaMatch = projectArea >= minArea && projectArea <= maxArea;

    // Handle unit size check for both arrays and strings
    let unitSizeMatch = false;
    if (Array.isArray(project.unit_sizes)) {
      // If unit_sizes is an array, use .some() to check for a match
      unitSizeMatch =
        selectedUnitSize === "" ||
        project.unit_sizes.some((unitSize) => {
          const projectBhk = parseInt(unitSize);
          const selectedBhk = parseInt(selectedUnitSize);
          return (
            !isNaN(projectBhk) &&
            !isNaN(selectedBhk) &&
            (projectBhk === selectedBhk || projectBhk > selectedBhk)
          );
        });
    } else if (typeof project.unit_sizes === "string") {
      // If unit_sizes is a string, directly parse and compare
      const projectBhk = parseInt(project.unit_sizes);
      const selectedBhk = parseInt(selectedUnitSize);
      unitSizeMatch =
        selectedUnitSize === "" ||
        (!isNaN(projectBhk) &&
          !isNaN(selectedBhk) &&
          (projectBhk === selectedBhk || projectBhk > selectedBhk));
    }

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

  // const filteredProjects = filteredprojectData.filter((project) => {
  //   const cityMatch = selectedCity === "" || project.city_id === selectedCity;
  //   const priceRangeMatch =
  //     selectedPriceRange === "" || project.price === selectedPriceRange;
  //   const unitSizeMatch =
  //     selectedUnitSize === "" || project.unit_sizes.includes(selectedUnitSize);
  //   const carpetAreaMatch =
  //     selectedCarpetArea === "" ||
  //     project.carpet_area.includes(selectedCarpetArea);

  //   const searchMatch =
  //     searchQuery === "" ||
  //     (project.title &&
  //       project.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
  //     (project.developer_name &&
  //       project.developer_name
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase()));

  //   return (
  //     cityMatch &&
  //     priceRangeMatch &&
  //     unitSizeMatch &&
  //     carpetAreaMatch &&
  //     searchMatch
  //   );
  // });

  const totalProjectsFound = filteredProjects.length;
  const developerCounts = {};
  filteredProjects.forEach((project) => {
    const developer = project.developer_name;
    if (developerCounts[developer]) {
      developerCounts[developer]++;
    } else {
      developerCounts[developer] = 1;
    }
  });

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

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = sortedProjects.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);
  console.log("currentProjects[0", currentProjects[0]);
  const renderProjectList = () => {
    return currentProjects.map((project) => (
      <div key={project.id} className="row bg-row-list property-card">
        <div className="col-lg-4 p-0" style={{ overflow: "hidden" }}>
          <img
            onClick={() =>
              navigate(
                `/property-detail/${project.id}/${slugify(project.title)}`
              )
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
                onClick={() =>
                  navigate(
                    `/property-detail/${project.id}/${slugify(project.title)}`
                  )
                }
                className="Project-title price-rera-mobile"
                style={{ color: "#C08735", cursor: "pointer" }}
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
            <h2
              className="property-title"
              onClick={() =>
                navigate(
                  `/property-detail/${project.id}/${slugify(project.title)}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              {project.title}
            </h2>
            <ul
              className="location-list-project-list"
              onClick={() =>
                navigate(
                  `/property-detail/${project.id}/${slugify(project.title)}`
                )
              }
              style={{ cursor: "pointer" }}
            >
              <li
                className="loction-list-pr property-address"
                style={{ color: "black" }}
              >
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                  alt="img"
                  className="map-location-icon"
                />
                <span style={{ color: "#787878", paddingRight: "2px" }}>
                  At
                </span>
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
                  <h6
                    className="Project-title property-rera-id property-rera-id"
                    style={{ color: "#C08735", marginTop: "16px" }}
                  >
                    RERA ID: {project?.rera_no}
                  </h6>
                </li>
              )}
            </ul>
            <div className="property-info-container">
              <div
                className="info-box"
                style={{
                  width:
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial "
                      ? "48%"
                      : "32.5",
                }}
              >
                <img
                  src={
                    project.project_name === "Residential "
                      ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                      : project.project_name === "Plots"
                      ? "/assets/images/Plot.svg"
                      : project.project_name === "Commercial "
                      ? "/assets/images/Commercial.svg"
                      : "/assets/images/default-icon.svg" // Default icon in case no match
                  }
                  className="amenties-icons"
                />
                <span className="property-type-1">{project.project_name}</span>
              </div>
              <div
                className="info-box"
                style={{
                  display:
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial "
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
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial "
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
                style={{ cursor: "pointer" }}
                onClick={() => handleOpen(project)}
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
                    `/property-detail/${project.id}/${slugify(project.title)}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <img
                  src={
                    project.project_name === "Residential "
                      ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                      : project.project_name === "Plots"
                      ? "/assets/images/Plot.svg"
                      : project.project_name === "Commercial "
                      ? "/assets/images/Commercial.svg"
                      : "/assets/images/default-icon.svg" // Default icon in case no match
                  }
                  className="amenties-icons"
                />
                {project.project_name}
              </li>
              <li
                onClick={() =>
                  navigate(
                    `/property-detail/${project.id}/${slugify(project.title)}`
                  )
                }
                className="project-list-icons"
                style={{
                  display:
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial "
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
                    `/property-detail/${project.id}/${slugify(project.title)}`
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
  };

  const renderHeading = () => {
    const baseHeading = `Property In ${cities[selectedCity - 1] || cities[0]}`;

    const dynamicHeading = `${
      projectType === 1
        ? "Residential"
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
        {/* <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title"> */}
        {projectType === 3 ? (
          <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
            {title} in {cityName}
          </h2>
        ) : (
          <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
            {title} Properties in {cityName}
          </h2>
        )}
        {/* Other components or content */}
        {/* </h2> */}
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
        <div className="container">
          <div className="row"></div>
          <div className="row mt-3">
            {/* <div className="col-md-2">
              <div className="mp-box-city-state">
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                  className="city-map-icon-project"
                  alt="map icon"
                />
                <select
                  value={selectedCity}
                  onChange={handleCityChange}
                  className="form-control"
                >
                  <option value="">City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={index + 1}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}
            <div className="col-md-4">
              <ReactSearchAutocomplete
                className="fillter-search-box"
                // items={searchItems}
                items={projectData.map((project) => ({
                  id: project.id,
                  name: project.title,
                }))}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                placeholder="Search Project, Locality or Builder"
              />
            </div>

            <div className="col-md-6 filters-mobile">
              <div className="row">
                {projectType !== 2 && (
                  <div className="col-md-4">
                    <select
                      value={selectedUnitSize}
                      onChange={handleUnitSizeChange}
                      className="form-control"
                    >
                      <option value="">Unit Size</option>
                      {unitSizes.map((size, index) => (
                        <option key={index} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
                <div className="col-md-4">
                  <select
                    value={selectedCarpetArea}
                    onChange={handleCarpetAreaChange}
                    className="form-control"
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
                    className="form-control"
                  >
                    <option value="">Price Range</option>
                    {priceRanges.map((range, index) => (
                      <option key={index} value={range}>
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
        <div className="container">
          <Breadcrumb className="menu-breadcrumb-items">
            <Breadcrumb.Item className="breadcrumb-link" href="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" href="#">
              Property In {cities[selectedCity - 1]}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" active>
              {projectType === 1
                ? "Residential"
                : projectType === 2
                ? "Commercial"
                : "Plots"}
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
          <div className="properties-mapper">{renderProjectList()}</div>
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
              addressTitle={selectedProject.title}
              propertyiddata={selectedProject.id}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
};

// Pagination component
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

export default ResidentailprojectlistingComponent;
