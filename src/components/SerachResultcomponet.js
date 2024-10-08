// import React, {
//   useEffect,
//   useState,
//   useCallback,
//   useContext,
//   useRef,
// } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import ListpagesExpertform from "./ListpagesExpertform";
// import Pagination from "./Pagination";
// import { BASE_URL } from "../apis/constatnts";
// import { ReactSearchAutocomplete } from "react-search-autocomplete";
// import { searchProjects } from "../apis/callbacks";
// import { CityIdContext } from "../App";

// const SearchResultComponent = () => {
//   const [showPrice, setShowPrice] = useState(true);
//   const autocompleteRef = useRef(null);
//   const elementRef = useRef(null);
//   useEffect(() => {
//     const element = elementRef.current;
//     if (element) {
//       console.log("element", element);
//       element.dispatchEvent(new Event("click"));
//     }
//   }, []);
//   const formatPriceRange = (priceRange) => {
//     if (!priceRange) return "Call For Price";

//     // Extract the min and max prices from the price range string
//     const match = priceRange.match(/(\d+)-(\d+) Lac/);

//     if (!match) return "Call For Price";

//     const [_, minPrice, maxPrice] = match;

//     // Function to format individual prices
//     const formatPrice = (price) => {
//       const numberPrice = parseFloat(price);

//       if (numberPrice >= 10000000) {
//         // Format for Crores with 1 or 2 decimal places
//         const crores = numberPrice / 10000000;
//         return crores.toFixed(crores >= 10 ? 1 : 2) + " Cr";
//       } else {
//         // Format for Lacs with 1 or 2 decimal places
//         const lacs = numberPrice / 100000;
//         return lacs.toFixed(lacs >= 10 ? 1 : 2) + " Lac";
//       }
//     };

//     return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
//   };
//   function shortenStringBeforeComma(str) {
//     // Get the part before the first comma
//     const firstPart = str.split(",")[0];
//     // Slice the string to the desired number of characters and add ellipsis
//     return firstPart.slice(0, 15) + "...";
//   }
//   const location = useLocation();
//   const { cityId, useCityId } = useContext(CityIdContext); // Access cityId from context

//   const navigate = useNavigate();
//   const [searchResults, setSearchResults] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCity, setSelectedCity] = useState("");
//   const [searchQuery, setSearchQuery] = useState(location.state?.query);
//   const [selectedUnitSize, setSelectedUnitSize] = useState("");
//   const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");
//   const [sortOption, setSortOption] = useState("Default");
//   const [isLoading, setIsLoading] = useState(true);
//   const [open, setOpen] = useState(false);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   useEffect(() => {
//     if (searchQuery.length === 0) {
//       setShowSuggestions(false);
//     }
//   }, [searchQuery]);
//   console.log("result data", location);
//   const resultsPerPage = 10;
//   const cities = [
//     "Mumbai",
//     "Delhi",
//     "Bangalore",
//     "Pune",
//     "Kolkata",
//     "Hyderabad",
//   ];
//   const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "+5 BHK"];
//   const carpetAreas = [
//     "200-400 sqft",
//     "400-600 sqft",
//     "600-800 sqft",
//     "800-1000 sqft",
//     "1000-1200 sqft",
//     "1200+ sqft",
//   ];
//   const priceRanges = [
//     "0-20 Lac",
//     "20-40 Lac",
//     "40-60 Lac",
//     "60-80 Lac",
//     "80-100 Lac",
//     "100+ Lac",
//   ];
//   const DEFAULT_SEARCH_QUERY = "property";

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 800,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     padding: "0px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "flex-end",
//   };

//   useEffect(() => {
//     if (location.state?.results?.data) {
//       setSearchResults(location.state.results.data);
//       setIsLoading(false);
//     } else {
//       fetchSearchResults();
//     }
//   }, [location.state]);

//   const fetchSearchResults = async () => {
//     let city_id = localStorage.getItem("cityId");
//     setIsLoading(true);
//     try {
//       const query = searchQuery.trim() || DEFAULT_SEARCH_QUERY;
//       const response = await fetch(
//         `${BASE_URL}/search?city_id=${city_id}&query=${encodeURIComponent(
//           query
//         )}`
//       );
//       console.log("search result placeholder", query);
//       const data = await response.json();
//       if (data.status === 200) {
//         setSearchResults(data.data);
//       } else {
//         console.error("Error fetching search results:", data.message);
//         setSearchResults([]);
//       }
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//       setSearchResults([]);
//     }
//     setIsLoading(false);
//   };

//   const handleSearchSubmit = async (event) => {
//     event.preventDefault();
//     console.log("Search Query datataba:", searchQuery);

//     if (searchQuery.trim() !== "") {
//       try {
//         const results = await searchProjects(searchQuery);

//         if (results) {
//           setSearchResults(results.data);
//           console.log("Search Results:", results);
//           navigate("/search-result", {
//             state: { results: results.data, query: searchQuery },
//           });
//         } else {
//           console.log("No results found");
//           // You might want to show a message to the user or handle this case differently
//         }
//       } catch (error) {
//         console.error("Error searching projects:", error);
//         // Handle the error, maybe show an error message to the user
//       }
//     }
//   };

//   const handleOpen = (result) => {
//     setSelectedResult(result);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedResult(null);
//   };

//   const handleCityChange = (event) => setSelectedCity(event.target.value);
//   const handleUnitSizeChange = (event) =>
//     setSelectedUnitSize(event.target.value);
//   const handleCarpetAreaChange = (event) =>
//     setSelectedCarpetArea(event.target.value);
//   const handlePriceRangeChange = (event) =>
//     setSelectedPriceRange(event.target.value);
//   const handleSortOptionChange = (event) => setSortOption(event.target.value);

//   const applyFilters = (results) => {
//     let filteredResults = results;

//     if (selectedCity) {
//       filteredResults = filteredResults.filter(
//         (result) => result.location === selectedCity
//       );
//     }

//     if (selectedUnitSize) {
//       filteredResults = filteredResults.filter((result) =>
//         result.unit_sizes.includes(selectedUnitSize)
//       );
//     }

//     if (selectedCarpetArea) {
//       const [min, max] = selectedCarpetArea
//         .split("-")
//         .map((value) => parseInt(value));
//       filteredResults = filteredResults.filter((result) => {
//         const [resultMin, resultMax] = result.carpet_area
//           .split("-")
//           .map((value) => parseInt(value));
//         return resultMin >= min && (resultMax <= max || isNaN(max));
//       });
//     }

//     if (selectedPriceRange) {
//       const [min, max] = selectedPriceRange
//         .split("-")
//         .map((value) => parseInt(value.replace(/[^\d]/g, "")));
//       filteredResults = filteredResults.filter((result) => {
//         const [resultMin, resultMax] = result.price
//           .split("-")
//           .map((value) => parseInt(value.replace(/[^\d]/g, "")));
//         return resultMin >= min && (resultMax <= max || isNaN(max));
//       });
//     }

//     switch (sortOption) {
//       case "Price Low to High":
//         filteredResults.sort((a, b) => {
//           const aPrice = parseInt(a.price.split("-")[0].replace(/[^\d]/g, ""));
//           const bPrice = parseInt(b.price.split("-")[0].replace(/[^\d]/g, ""));
//           return aPrice - bPrice;
//         });
//         break;
//       case "Price High to Low":
//         filteredResults.sort((a, b) => {
//           const aPrice = parseInt(a.price.split("-")[0].replace(/[^\d]/g, ""));
//           const bPrice = parseInt(b.price.split("-")[0].replace(/[^\d]/g, ""));
//           return bPrice - aPrice;
//         });
//         break;
//       default:
//         break;
//     }

//     return filteredResults;
//   };

//   const filteredResults = applyFilters(searchResults);

//   const indexOfLastResult = currentPage * resultsPerPage;
//   const indexOfFirstResult = indexOfLastResult - resultsPerPage;
//   const currentResults = filteredResults.slice(
//     indexOfFirstResult,
//     indexOfLastResult
//   );
//   console.log("currentResults", currentResults);

//   const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

//   const handlePageChange = useCallback((pageNumber) => {
//     console.log("handlePageChange called with:", pageNumber);
//     window.scrollTo({ top: 0, behavior: "smooth" });

//     setCurrentPage(pageNumber);
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

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

//   // Prepare data for ReactSearchAutocomplete
//   const searchItems = filteredResults.map((result) => ({
//     id: result.id,
//     name: result.title,
//   }));

//   const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
//     const pageSetSize = 5;
//     const halfSet = Math.floor(pageSetSize / 2);

//     let startPage = Math.max(currentPage - halfSet, 1);
//     let endPage = Math.min(startPage + pageSetSize - 1, totalPages);

//     if (endPage - startPage + 1 < pageSetSize) {
//       startPage = Math.max(endPage - pageSetSize + 1, 1);
//     }

//     const renderPageNumbers = () => {
//       const pageNumbers = [];

//       if (startPage > 1) {
//         pageNumbers.push(
//           <button
//             key={1}
//             className="pagination-btn"
//             onClick={() => handlePageChange(1)}
//           >
//             1
//           </button>
//         );
//         if (startPage > 2) {
//           pageNumbers.push(
//             <button key="ellipsis-start" className="pagination-btn" disabled>
//               ...
//             </button>
//           );
//         }
//       }

//       for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(
//           <button
//             key={i}
//             className={`pagination-btn ${i === currentPage ? "active" : ""}`}
//             onClick={() => handlePageChange(i)}
//           >
//             {i}
//           </button>
//         );
//       }

//       if (endPage < totalPages) {
//         if (endPage < totalPages - 1) {
//           pageNumbers.push(
//             <button key="ellipsis-end" className="pagination-btn" disabled>
//               ...
//             </button>
//           );
//         }
//         pageNumbers.push(
//           <button
//             key={totalPages}
//             className={`pagination-btn ${
//               totalPages === currentPage ? "active" : ""
//             }`}
//             onClick={() => handlePageChange(totalPages)}
//           >
//             {totalPages}
//           </button>
//         );
//       }

//       return pageNumbers;
//     };

//     return (
//       <div className="pagination">
//         <button
//           className="pagination-btn"
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           <img
//             src="/assets/images/chevron-left.svg"
//             alt="arrow"
//             className="arrow-pagination"
//           />
//         </button>
//         {renderPageNumbers()}
//         <button
//           className="pagination-btn"
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           <img
//             src="/assets/images/chevron-right.svg"
//             alt="arrow"
//             className="arrow-pagination"
//           />
//         </button>
//       </div>
//     );
//   };

//   const handleSearch = (string) => {
//     setSearchQuery(string);
//     setShowSuggestions(string.length > 0);
//   };

//   const handleSelect = (item) => {
//     setSearchQuery(item.name);
//     setShowSuggestions(false);
//   };
//   console.log("currentResults", currentResults);

//   return (
//     <div className="serachresult-section">
//       <div className="project-list-section search-result-section">
//         <div className="project-fillter-bg filters-bg">
//           <div className="container">
//             <div className="row">
//               {/* <div className="col-md-2">
//                 <div className="mp-box-city-state">
//                   <img
//                     src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                     className="city-map-icon-project"
//                     alt="map icon"
//                   />
//                   <select
//                     value={selectedCity}
//                     onChange={handleCityChange}
//                     className="form-control"
//                   >
//                     <option value="">City</option>
//                     {cities.map((city, index) => (
//                       <option key={index} value={city}>
//                         {city}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div> */}
//               <div className="col-md-4">
//                 <form onSubmit={handleSearch}>
//                   <input
//                     type="text"
//                     placeholder="Search Project, Locality or Builder"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="form-control"
//                   />

//                   <button type="submit" style={{ display: "none" }}></button>
//                 </form>
//               </div>
//               <div className="col-md-6 filters-mobile">
//                 <div className="row">
//                   <div className="col-md-4">
//                     <select
//                       value={selectedUnitSize}
//                       onChange={handleUnitSizeChange}
//                       className="form-control"
//                     >
//                       <option value="">Unit Size</option>
//                       {unitSizes.map((size, index) => (
//                         <option key={index} value={size}>
//                           {size}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <select
//                       value={selectedCarpetArea}
//                       onChange={handleCarpetAreaChange}
//                       className="form-control"
//                     >
//                       <option value="">Carpet Area</option>
//                       {carpetAreas.map((area, index) => (
//                         <option key={index} value={area}>
//                           {area}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-4">
//                     <select
//                       value={selectedPriceRange}
//                       onChange={handlePriceRangeChange}
//                       className="form-control"
//                     >
//                       <option value="">Price Range</option>
//                       {priceRanges.map((range, index) => (
//                         <option key={index} value={range}>
//                           {range}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="container filters-container">
//                 <div className="col-md-4 filter-select-size">
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
//                 <div className="col-md-4 filter-select-carpet">
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
//                 <div className="col-md-4 filter-select-price">
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
//           </div>
//         </div>
//         <div className="project-list-bg">
//           <div className="container" ref={elementRef}>
//             {filteredResults.length > 0 ? (
//               <>
//                 <div className="short-list-section mt-2 pb-2 properties-sorter">
//                   <label>Sort By:</label>
//                   <select
//                     value={sortOption}
//                     onChange={handleSortOptionChange}
//                     className="form-control shortling-list-select"
//                   >
//                     <option value="Default">Default</option>
//                     <option value="Price Low to High">Price Low to High</option>
//                     <option value="Price High to Low">Price High to Low</option>
//                   </select>
//                 </div>
//                 <div className="properties-mapper">
//                   {currentResults.map((project) => (
//                     <div
//                       key={project.id}
//                       className="row bg-row-list property-card"
//                     >
//                       <div
//                         className="col-lg-4 p-0"
//                         style={{ overflow: "hidden" }}
//                       >
//                         <img
//                           onClick={() =>
//                             navigate(
//                               `/property-detail/${project.id}/${slugify(
//                                 project.title
//                               )}`
//                             )
//                           }
//                           style={{ cursor: "pointer" }}
//                           src={
//                             project.banner || "/assets/images/default-img.jpg"
//                           }
//                           alt="Project Banner property-banner"
//                           className="project-list-image property-banner"
//                         />
//                       </div>
//                       <div className="col-lg-8 bg-hover-card property-card-container">
//                         <div className="card project-list-card property-info">
//                           <h6
//                             className="Project-title price-rera-mobile"
//                             style={{ color: "#C08735" }}
//                           >
//                             RERA ID: {project.rera_no}
//                           </h6>
//                           <span className="badge-button bgprice-range-transperent price-rera-mobile">
//                             {formatPriceRange(project.price)}
//                           </span>
//                           <div className="priceing-section-mb">
//                             <div className="price-rera">
//                               <h6
//                                 className="Preview-title "
//                                 style={{ alignItems: "flex-start" }}
//                               >
//                                 {formatPriceRange(project.price)}
//                               </h6>
//                             </div>
//                           </div>
//                           <h2 className="property-title">{project.title}</h2>
//                           <ul className="location-list-project-list">
//                             <li
//                               className="loction-list-pr property-builder-name"
//                               style={{ color: "black" }}
//                             >
//                               <img
//                                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                                 alt="img"
//                                 className="map-location-icon"
//                               />
//                               <span
//                                 style={{
//                                   color: "#787878",
//                                   paddingRight: "2px",
//                                 }}
//                               >
//                                 At
//                               </span>
//                               {project.address}
//                             </li>
//                             <li className="loction-list-pr group-builder  mt-2 property-builder-name">
//                               {" "}
//                               <span
//                                 style={{
//                                   color: "#787878",
//                                   paddingRight: "10px",
//                                 }}
//                               >
//                                 {" "}
//                                 By
//                               </span>
//                               {project.developer_name} group{" "}
//                             </li>

//                             <li className="loction-list-pr property-address mb-mobile-rera-list">
//                               {" "}
//                               <h6
//                                 className="Project-title property-rera-id property-rera-id"
//                                 style={{ color: "#C08735", marginTop: "16px" }}
//                               >
//                                 RERA ID: {project.rera_no}
//                               </h6>
//                             </li>
//                           </ul>
//                           <div className="property-info-container">
//                             <div
//                               className="info-box"
//                               style={{
//                                 width:
//                                   project.project_type == "Plots" ||
//                                   project.project_type == "Commercial"
//                                     ? "48%"
//                                     : "32.5",
//                               }}
//                             >
//                               <img
//                                 src={
//                                   project.project_type === "Residential "
//                                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                                     : project.project_type === "Plots"
//                                     ? "/assets/images/Plot.svg"
//                                     : project.project_type === "Commercial"
//                                     ? "/assets/images/Commercial.svg"
//                                     : "/assets/images/default-icon.svg" // Default icon in case no match
//                                 }
//                                 className="amenties-icons"
//                               />
//                               <span className="property-type-1">
//                                 {project.project_type}
//                               </span>
//                             </div>
//                             <div
//                               className="info-box"
//                               style={{
//                                 display:
//                                   project.project_type == "Plots" ||
//                                   project.project_type == "Commercial"
//                                     ? "none"
//                                     : "flex",
//                               }}
//                             >
//                               <img
//                                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
//                                 className="amenties-icons"
//                               />
//                               <span className="property-bhk">
//                                 {project.unit_sizes}
//                               </span>
//                             </div>
//                             <div
//                               className="info-box"
//                               style={{
//                                 width:
//                                   project.project_type == "Plots" ||
//                                   project.project_type == "Commercial"
//                                     ? "48%"
//                                     : "32.5",
//                               }}
//                             >
//                               <img
//                                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
//                                 className="amenties-icons"
//                               />
//                               <span className="property-carpet-area">
//                                 {project.carpet_area}
//                               </span>
//                             </div>
//                           </div>
//                           <div className="buttons-container">
//                             <button
//                               className="details-btn"
//                               onClick={() =>
//                                 navigate(
//                                   `/property-detail/${project.id}/${slugify(
//                                     project.title
//                                   )}`
//                                 )
//                               }
//                               style={{ cursor: "pointer" }}
//                             >
//                               {" "}
//                               View Details
//                             </button>
//                             <button
//                               className="details-btn expert-btn"
//                               onClick={() => handleOpen(project)}
//                               style={{ cursor: "pointer" }}
//                             >
//                               {" "}
//                               <img
//                                 src="/assets/images/info-mark.svg"
//                                 alt="img "
//                                 className="info-img"
//                                 style={{ marginRight: "10px" }}
//                               />
//                               Talk to Expert
//                             </button>

//                             {/* <button className="details-btn">
//                             <img
//                               src="/assets/images/info-mark.svg"
//                               alt="img "
//                               className="info-img"
//                             />
//                           <span className="bg-color-theme" style={{color:"white"}}> Talk to Expert</span>
//                           </button> */}
//                             {/* </li> */}
//                           </div>

//                           <ul className="features-list pl-0 property-info-mobile">
//                             <li className="project-list-icons">
//                               <img
//                                 src={
//                                   project.project_type === "Residential "
//                                     ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                                     : project.project_type === "Plots"
//                                     ? "/assets/images/Plot.svg"
//                                     : project.project_type === "Commercial"
//                                     ? "/assets/images/Commercial.svg"
//                                     : null // Default icon in case no match
//                                 }
//                                 className="amenties-icons"
//                               />
//                               {project.project_type}
//                             </li>
//                             <li
//                               className="project-list-icons"
//                               style={{
//                                 display:
//                                   project.project_type == "Plots" ||
//                                   project.project_type == "Commercial "
//                                     ? "none"
//                                     : "flex",
//                               }}
//                             >
//                               <img
//                                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
//                                 className="amenties-icons"
//                               />
//                               {project.unit_sizes}
//                             </li>
//                             <li className="project-list-icons">
//                               <img
//                                 src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
//                                 className="amenties-icons"
//                               />
//                               {project.carpet_area}
//                             </li>

//                             <li className="view-btn-list">
//                               <button
//                                 className="kss-btn"
//                                 onClick={() =>
//                                   navigate(
//                                     `/property-detail/${project.id}/${slugify(
//                                       project.title
//                                     )}`
//                                   )
//                                 }
//                                 style={{ cursor: "pointer" }}
//                               >
//                                 {" "}
//                                 View Details
//                               </button>
//                             </li>
//                             <li
//                               className="view-btn-list-talk-expert"
//                               style={{ cursor: "pointer" }}
//                               onClick={() => handleOpen(project)}
//                             >
//                               <button className="kss-btn-info">
//                                 <img
//                                   src="/assets/images/info-mark.svg"
//                                   alt="img "
//                                   className="info-img"
//                                 />
//                               </button>
//                               <span className="bg-color-theme">
//                                 {" "}
//                                 Talk to Expert
//                               </span>
//                             </li>
//                           </ul>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <Pagination
//                   currentPage={currentPage}
//                   totalPages={totalPages}
//                   handlePageChange={handlePageChange}
//                 />
//               </>
//             ) : (
//               <div className="no-results-message">
//                 <h3 className="text-center">No search results found</h3>
//               </div>
//             )}
//           </div>
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
//         style={{ backgroundColor: "#000000b5" }}
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
//           {selectedResult && (
//             <ListpagesExpertform
//               addressTitle={selectedResult.title}
//               propertyiddata={selectedResult.id}
//             />
//           )}
//         </Box>
//       </Modal>
//     </div>
//   );
// };
// export default SearchResultComponent;

import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import ListpagesExpertform from "./ListpagesExpertform";
import Pagination from "./Pagination";
import { BASE_URL } from "../apis/constatnts";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { searchProjects } from "../apis/callbacks";
import { CityIdContext } from "../App";

const SearchResultComponent = () => {
  const [showPrice, setShowPrice] = useState(true);
  const autocompleteRef = useRef(null);
  const elementRef = useRef(null);
  useEffect(() => {
    const element = elementRef.current;
    if (element) {
      console.log("element", element);
      element.dispatchEvent(new Event("click"));
    }
  }, []);
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
  const { cityId, useCityId } = useContext(CityIdContext); // Access cityId from context

  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState(location.state?.query);
  const [selectedUnitSize, setSelectedUnitSize] = useState("");
  const [selectedCarpetArea, setSelectedCarpetArea] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [sortOption, setSortOption] = useState("Default");
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  console.log("result data", location);
  const resultsPerPage = 10;
  const cities = [
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Pune",
    "Kolkata",
    "Hyderabad",
  ];
  const unitSizes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "+5 BHK"];
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
  const DEFAULT_SEARCH_QUERY = "property";

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
      setSearchResults(location.state.results.data);
      setIsLoading(false);
    } else {
      fetchSearchResults();
    }
  }, [location.state]);
  let totalNoOfProjects;

  useEffect(() => {
    if (searchQuery === "") {
      fetchSearchResults();
    }
  }, [searchQuery]);

  const fetchSearchResults = async () => {
    let city_id = localStorage.getItem("cityId");
    setIsLoading(true);
    try {
      let response;
      if (searchQuery.trim() === "") {
        response = await fetch(
          `https://admin.kalsiestate.com/public/api/properties/by-city/${city_id}`
        );
      } else {
        const query = searchQuery.trim() || DEFAULT_SEARCH_QUERY;
        response = await fetch(
          `${BASE_URL}/search?city_id=${city_id}&query=${encodeURIComponent(
            query
          )}`
        );
      }
      const data = await response.json();
      if (data.status === 200) {
        setSearchResults(data.data);
      } else {
        console.error("Error fetching search results:", data.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
    setIsLoading(false);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      try {
        const results = await searchProjects(searchQuery);
        if (results) {
          setSearchResults(results.data);
          navigate("/search-result", {
            state: { results: results.data, query: searchQuery },
          });
        } else {
          console.log("No results found");
          setSearchResults([]);
        }
      } catch (error) {
        console.error("Error searching projects:", error);
      }
    }
  };

  const handleOpen = (result) => {
    setSelectedResult(result);
    setOpen(true);
  };
  // const handleSearch = (query) => {
  //   console.log("Search triggered with query:", query);
  //   // Add your search handling logic here
  // };

  const handleClose = () => {
    setOpen(false);
    setSelectedResult(null);
  };

  const handleCityChange = (event) => setSelectedCity(event.target.value);
  const handleUnitSizeChange = (event) =>
    setSelectedUnitSize(event.target.value);
  const handleCarpetAreaChange = (event) =>
    setSelectedCarpetArea(event.target.value);
  const handlePriceRangeChange = (event) =>
    setSelectedPriceRange(event.target.value);
  const handleSortOptionChange = (event) => setSortOption(event.target.value);

  const applyFilters = (results) => {
    let filteredResults = results;

    if (selectedCity) {
      filteredResults = filteredResults.filter(
        (result) => result.location === selectedCity
      );
    }

    if (selectedUnitSize) {
      filteredResults = filteredResults.filter((result) =>
        result.unit_sizes.includes(selectedUnitSize)
      );
    }

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
    totalNoOfProjects = filteredResults.length;
    return filteredResults;
  };

  const filteredResults = applyFilters(searchResults);

  console.log("filteredResults", totalNoOfProjects);

  const renderHeading = () => {
    const title = localStorage.getItem("cityName");

    const baseHeading = `Property In ${cities[selectedCity - 1] || cities[0]}`;

    const dynamicHeading = `
          ${selectedPriceRange ? ` under ${selectedPriceRange}` : ""} ${
      selectedUnitSize ? ` with ${selectedUnitSize}` : ""
    } ${selectedCarpetArea ? ` and ${selectedCarpetArea}` : ""} ${
      searchQuery ? ` matching "${searchQuery}"` : ""
    } - ${totalNoOfProjects} results found`;

    return (
      <div className="heading-section web-section-property-heading">
        {dynamicHeading && (
          <h6
            className="property-result-text text-center search-result-section-text mt-5"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            {title} Properties {dynamicHeading}
          </h6>
        )}
      </div>
    );
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredResults.slice(
    indexOfFirstResult,
    indexOfLastResult
  );
  console.log("currentResults", currentResults);

  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);

  const handlePageChange = useCallback((pageNumber) => {
    console.log("handlePageChange called with:", pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });

    setCurrentPage(pageNumber);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
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

  // Prepare data for ReactSearchAutocomplete
  const searchItems = filteredResults.map((result) => ({
    id: result.id,
    name: result.title,
  }));

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

  const handleSearch = (string) => {
    setSearchQuery(string);
    setShowSuggestions(string.length > 0);
  };

  //   const handleSelect = (item) => {
  //     setSearchQuery(item.name);
  //     setShowSuggestions(false);
  //   };

  const handleSelect = (item) => {
    // Set the search query to the selected item
    setSearchQuery(item.name);

    // Reorder the search results with the selected item at the top
    const reorderedResults = searchResults.filter(
      (result) => result.id !== item.id
    );
    const selectedResult = searchResults.find(
      (result) => result.id === item.id
    );

    if (selectedResult) {
      setSearchResults([selectedResult]);
      totalNoOfProjects = 1;
    }

    // Hide suggestions
    setShowSuggestions(false);
  };

  console.log("currentResults", currentResults);

  return (
    <div className="serachresult-section">
      <div className="project-list-section search-result-section">
        <div className="project-fillter-bg filters-bg">
          <div className="container">
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
                    ref={autocompleteRef}
                    autoFocus={false}
                    className="fillter-search-box "
                    items={filteredResults.map((result) => ({
                      id: result.id,
                      name: result.title,
                    }))}
                    onSearch={(string) => setSearchQuery(string)} // Update searchQuery on search
                    onSelect={handleSelect} // Update searchQuery on select
                    placeholder={
                      searchQuery || "Search Project, Locality or Builder"
                    } // Default placeholder
                    inputSearchString={searchQuery}
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
                  <div className="col-md-4">
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
          <div className="container" ref={elementRef}>
            {filteredResults.length > 0 ? (
              <>
                <div className="result">
                  <div className="short-list-section mt-2 pb-2 properties-sorter">
                    <label>Sort By:</label>
                    <select
                      value={sortOption}
                      onChange={handleSortOptionChange}
                      className="form-control shortling-list-select"
                    >
                      <option value="Default">Default</option>
                      <option value="Price Low to High">
                        Price Low to High
                      </option>
                      <option value="Price High to Low">
                        Price High to Low
                      </option>
                    </select>
                  </div>
                  {renderHeading()}
                </div>

                <div className="properties-mapper">
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
                          src={
                            project.banner || "/assets/images/default-img.jpg"
                          }
                          alt="Project Banner property-banner"
                          className="project-list-image property-banner"
                        />
                      </div>
                      <div className="col-lg-8 bg-hover-card property-card-container">
                        <div className="card project-list-card property-info">
                          <h6
                            className="Project-title price-rera-mobile"
                            style={{ color: "#C08735" }}
                          >
                            RERA ID: {project.rera_no}
                          </h6>
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
                              <span
                                style={{
                                  color: "#787878",
                                  paddingRight: "2px",
                                }}
                              >
                                At
                              </span>
                              {project.address}
                            </li>
                            <li className="loction-list-pr group-builder  mt-2 property-builder-name">
                              {" "}
                              <span
                                style={{
                                  color: "#787878",
                                  paddingRight: "10px",
                                }}
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
                  handlePageChange={handlePageChange}
                />
              </>
            ) : (
              <div className="no-results-message">
                <h3 className="text-center">No search results found</h3>
              </div>
            )}
          </div>
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

export default SearchResultComponent;
