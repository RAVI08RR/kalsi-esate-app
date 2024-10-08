import React, { useState, useEffect, useContext } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
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

const BASE_URL =
  "https://admin.kalsiestate.com/public/api/properties-by-project";

let cityid = localStorage.getItem("cityId");
const ProjectsComponent = ({ projectType, title }) => {
  const formatPriceRange = (priceRange) => {
    if (!priceRange) return "Call For price";

    // Extract the min and max prices from the price range string
    const match = priceRange.match(/(\d+)-(\d+) Lac/);

    if (!match) return "Call For price";

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
    try {
      const queryParams = new URLSearchParams();
      queryParams.append("project_type", projectType);
      queryParams.append("city_id", 1);
      if (priceRange) queryParams.append("priceRange", priceRange);
      if (unitSize) queryParams.append("unitSize", unitSize);
      if (carpetArea) queryParams.append("carpetArea", carpetArea);

      const response = await fetch(
        `https://admin.kalsiestate.com/public/api/properties-by-project?city_id=${cityid}&project_type=${projectType}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data.data || [];
    } catch (error) {
      console.error("Error fetching projects data:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetchProjects(
        projectType,
        selectedCity,
        selectedPriceRange,
        selectedUnitSize,
        selectedCarpetArea
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
  ]);

  const handleOnSearch = (string, results) => {
    setSearchQuery(string);
  };

  const handleOnSelect = (item) => {
    // navigate(`/property-detail/${item.id}/${slugify(item.name)}`);
    setSearchQuery(item.name);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchQuery(term);
  };

  // useEffect(() => {
  //   const filtered = projectData?.filter((project) => {
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

  // const filteredProjects = filteredprojectData.filter((project) => {
  //   const cityMatch = selectedCity === "" || project.city_id === selectedCity;

  //   const [minPrice, maxPrice] = parsePriceRange(selectedPriceRange);
  //   const projectPrice = parseFloat(project.price) || 0;
  //   const priceRangeMatch =
  //     projectPrice >= minPrice && projectPrice <= maxPrice;

  //   const [minArea, maxArea] = parseCarpetAreaRange(selectedCarpetArea);
  //   const projectArea = parseFloat(project.carpet_area) || 0;
  //   const carpetAreaMatch = projectArea >= minArea && projectArea <= maxArea;

  //   const unitSizeMatch =
  //     selectedUnitSize === "" || project.unit_sizes.includes(selectedUnitSize);

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

  const totalProjectsFound = filteredProjects.length;

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

  const renderProjectList = () => {
    return currentProjects.map((project) => (
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
            alt="Project Banner property-banner"
            className="project-list-image property-banner"
          />
        </div>
        <div className="col-lg-8 bg-hover-card property-card-container">
          <div className="card project-list-card property-info property-price-range">
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
            <div
              className="priceing-section-mb"
              onClick={() =>
                navigate(
                  `/property-detail/${project.id}/${slugify(project.title)}`
                )
              }
              style={{ cursor: "pointer" }}
            >
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
              onClick={() =>
                navigate(
                  `/property-detail/${project.id}/${slugify(project.title)}`
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
                  alt="Map Icon"
                  className="map-location-icon"
                />
                <span style={{ color: "#787878", paddingRight: "2px" }}>
                  At
                </span>
                {project.address}
              </li>
              <li className="loction-list-pr group-builder mt-2 property-builder-name">
                <span style={{ color: "#787878", paddingRight: "10px" }}>
                  By
                </span>
                {project.developer_name} group
              </li>

              {project.rera_no && project.rera_no.trim() !== "" && (
                <li
                  className="loction-list-pr property-address mb-mobile-rera-list"
                  onClick={() =>
                    navigate(
                      `/property-detail/${project.id}/${slugify(project.title)}`
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
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
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial"
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
                      : project.project_name === "Commercial"
                      ? "/assets/images/Commercial.svg"
                      : "/assets/images/default-icon.svg" // Default icon in case no match
                  }
                  className="amenties-icons"
                />
                <span className="property-type-1">{project.project_name}</span>
              </div>
              <div
                onClick={() =>
                  navigate(
                    `/property-detail/${project.id}/${slugify(project.title)}`
                  )
                }
                className="info-box"
                style={{
                  display:
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial"
                      ? "none"
                      : "flex",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                  className="amenties-icons"
                />
                <span className="property-bhk">{project.unit_sizes}</span>
              </div>
              <div
                onClick={() =>
                  navigate(
                    `/property-detail/${project.id}/${slugify(project.title)}`
                  )
                }
                className="info-box"
                style={{
                  width:
                    project.project_name == "Plots" ||
                    project.project_name == "Commercial"
                      ? "48%"
                      : "32.5",
                  cursor: "pointer",
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
              {/* <li className="project-list-icons">
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                  className="amenties-icons"
                  alt="Home Icon"
                />
                {project.project_name}
              </li> */}

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
                      : project.project_name === "Commercial"
                      ? "/assets/images/Commercial.svg"
                      : "/assets/images/default-icon.svg" // Default icon in case no match
                  }
                  className="amenties-icons"
                />
                {project.project_name.trim()}
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
                  alt="Bed Icon"
                />
                {project.unit_sizes || "-"}
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
                  alt="Bath Icon"
                />
                {project.carpet_area || "-"}
              </li>

              <li className="view-btn-list">
                <button
                  className="kss-btn"
                  onClick={() =>
                    navigate(
                      `/property-detail/${project.id}/${slugify(project.title)}`
                    )
                  }
                >
                  View Details
                </button>
              </li>
              <li
                className="view-btn-list-talk-expert"
                onClick={() => handleOpen(project)}
                style={{ cursor: "pointer" }}
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
        <h2 className="kss-primary-bg kss-fs-40 mt-0 mb-2 text-center page-title">
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
    <div className="project-list-section">
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
                items={projectData.map((project) => ({
                  id: project.id,
                  name: project.title,
                }))}
                className="fillter-search-box"
                // items={searchItems}
                onSearch={handleOnSearch}
                onSelect={handleOnSelect}
                placeholder="Search Project, Locality or Builder"
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
                    {unitSizes.map((size, index) => (
                      <option key={index} value={size}>
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
            <div
              className="container filters-container"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              {/* <div className="col-md-4 filter-select-size">
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
              </div> */}
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
  const currentSet = Math.ceil(currentPage / pageSetSize);
  const startPage = (currentSet - 1) * pageSetSize + 1;
  const endPage = Math.min(startPage + pageSetSize - 1, totalPages);

  const renderPageNumbers = () => {
    const pageNumbers = [];

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

  const handlePrevSet = () => {
    const newPage = Math.max(startPage - 1, 1);
    handlePageChange(newPage);
  };

  const handleNextSet = () => {
    const newPage = Math.min(endPage + 1, totalPages);
    handlePageChange(newPage);
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevSet}
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
        onClick={handleNextSet}
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

export default ProjectsComponent;
