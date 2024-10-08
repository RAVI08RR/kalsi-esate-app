import React, { useState, useEffect } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

// Static filter options
const cities = [
  { name: "Mumbai", id: 1 },
  { name: "Delhi", id: 2 },
  { name: "Bangalore", id: 3 },
  { name: "Chennai", id: 4 },
  { name: "Hyderabad", id: 5 },
  { name: "Pune", id: 6 },
];
const priceRanges = [
  "< 50 Lakh",
  "50 Lakh - 1 Crore",
  "1 Crore - 2 Crore",
  "> 2 Crore",
];
const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const carpetAreas = [
  "< 500 sqft",
  "500 - 1000 sqft",
  "1000 - 1500 sqft",
  "> 1500 sqft",
];

const BASE_URL =
  "https://w3mantra.com/kalsi_admin/public/api/properties/search-by-city";

export const fetchNewLaunchProjects = async (
  city,
  priceRange,
  unitSize,
  carpetArea
) => {
  console.log("Fetching new launch projects data");
  try {
    const cityId = city ? cities.find((c) => c.name === city)?.id : 1;
    const queryParams = new URLSearchParams();
    queryParams.append("city_id", cityId);
    queryParams.append("project_type", 1);
    // Add more query parameters as needed

    const response = await fetch(`${BASE_URL}?${queryParams.toString()}`);
    const data = await response.json();
    console.log("New launch projects data", data);
    return data.properties || [];
  } catch (error) {
    console.error("Error fetching new launch projects data:", error);
    return [];
  }
};

const Testnewluanchprojects = () => {
  const [projectData, setProjectData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [sortOption, setSortOption] = useState("Default");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchNewLaunchProjects(
        selectedCity,
        selectedPriceRange,
        selectedUnitSize,
        selectedCarpetArea
      );
      setProjectData(data);
    };

    fetchData();
  }, [selectedCity, selectedPriceRange, selectedUnitSize, selectedCarpetArea]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

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
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter project data based on search query and selected filters
  const filteredProjects = projectData.filter((project) => {
    // Check if project.address is not null or undefined before calling toLowerCase()
    const cityMatch =
      selectedCity === "" ||
      (project.address &&
        project.address.toLowerCase().includes(selectedCity.toLowerCase()));

    // Implement actual logic for price range filtering
    const priceRangeMatch = selectedPriceRange === "" || true; // Placeholder, implement actual logic

    const unitSizeMatch =
      selectedUnitSize === "" || project.unit_sizes.includes(selectedUnitSize);

    const carpetAreaMatch =
      selectedCarpetArea === "" ||
      (project.carpet_area && project.carpet_area.includes(selectedCarpetArea));

    // Check if project.title and project.developer_name are not null or undefined before calling toLowerCase()
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
  const totalProjectsFound = filteredProjects.length;

  // Calculate the number of projects for each developer
  const developerCounts = {};
  filteredProjects.forEach((project) => {
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

  // Calculate the total number of pages
  const totalPages = Math.ceil(sortedProjects.length / projectsPerPage);

  // Render project list
  const renderProjectList = currentProjects.map((project) => (
    <div key={project.id} className="row bg-row-list">
      <div className="col-lg-4 p-0" style={{ overflow: "hidden" }}>
        <img src={project.banner} alt="img" className="project-list-image" />
      </div>
      <div className="col-lg-8 bg-hover-card">
        <div className="card project-list-card">
          <h6 className="Project-title" style={{ color: "#C08735" }}>
            RERA ID: {project.rera_no}
          </h6>
          <span className="badge-button bgprice-range-transperent">
            {project.price}
          </span>
          <h2 className="">{project.title}</h2>
          <ul className="location-list-project-list">
            <li className="loction-list-pr " style={{ color: "black" }}>
              <img
                src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                alt="img"
                className="map-location-icon"
              />
              <span style={{ color: "#787878", paddingRight: "2px" }}>At</span>
              {project.address}
            </li>
            <li className="loction-list-pr group-builder  mt-2">
              {" "}
              <span style={{ color: "#787878", paddingRight: "10px" }}>
                {" "}
                By
              </span>
              {project.developer_name} group{" "}
            </li>
          </ul>
          <ul className="features-list pl-0">
            <li className="project-list-icons">
              <img
                src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                className="amenties-icons"
              />
              {project.project_type}
            </li>
            <li className="project-list-icons">
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
              <button className="kss-btn">View Details</button>
            </li>
            <li>
              <button className="kss-btn-info">
                <img
                  src="/assets/images/info-mark.svg"
                  alt="img "
                  className="info-img"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  ));

  // Render the heading based on search and filtering criteria
  const renderHeading = () => {
    const title = "New Launch Projects"; // Define your title here
    const projectType = 1; // Define your projectType here

    const baseHeading = `Property In ${
      cities.find((city) => city.name === selectedCity)?.name || cities[0].name
    }`;

    const dynamicHeading = `${
      projectType === 1
        ? "New Launch Projects"
        : projectType === 2
        ? "Commercial"
        : "Plots"
    } ${
      selectedCity
        ? ` in ${cities.find((city) => city.name === selectedCity)?.name}`
        : ""
    } ${selectedPriceRange ? ` under ${selectedPriceRange}` : ""} ${
      selectedUnitSize ? ` with ${selectedUnitSize}` : ""
    } ${selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""} ${
      searchQuery ? ` matching "${searchQuery}"` : ""
    } - ${totalProjectsFound} results found`;

    return (
      <div className="heading-section mt-5">
        <h2 className="kss-primary-bg kss-fs-40 mt-2 mb-2 text-center">
          {title}
        </h2>
        {dynamicHeading && (
          <h6
            className="property-result-text text-right"
            style={{ textAlign: "end" }}
          >
            {dynamicHeading}
          </h6>
        )}
      </div>
    );
  };

  return (
    <div className="project-list-section mt-5">
      <div className="project-fillter-bg">
        <div className="container ">
          <div className="row">
            <div className="col-md-2">
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
                  {cities.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                placeholder="Search Project, Locality or Builder"
                value={searchQuery}
                onChange={handleSearch}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-3">
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
                <div className="col-md-3">
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
                <div className="col-md-3">
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
      </div>
      <div className="project-list-bg">
        <div className="container ">
          <Breadcrumb className="menu-breadcrumb-items">
            <Breadcrumb.Item className="breadcrumb-link" href="/">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" href="#">
              Property {cities.find((city) => city.name === selectedCity)?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-link" active>
              New Launch
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
          {renderProjectList}
          {/* Render pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      </div>
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

export default Testnewluanchprojects;
