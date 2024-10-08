import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../apis/constatnts";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const BuilderlistComponent = () => {
  const [builders, setBuilders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [filteredBuilders, setFilteredBuilders] = useState([]);
  const [expandedBuilder, setExpandedBuilder] = useState(null); // State to track expanded descriptions
  const itemsPerPage = 6;

  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Top Builders", active: true },
  ];

  const truncateDescription = (text) => {
    const words = text?.split(" ");
    return words?.length > 20 ? words.slice(0, 20).join(" ") + "..." : text;
  };

  useEffect(() => {
    const fetchBuilders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/builders`);
        const data = await response.json();
        if (Array.isArray(data.data)) {
          const formattedBuilders = data.data.map((builder) => ({
            id: builder.id,
            name: builder.title, // Ensure name is used for search
            title: builder.title, // Title for display
            description: builder.description,
            image: builder.image,
            projects: builder.projects, // Assuming projects are available in builder data
          }));
          setBuilders(formattedBuilders);
          setFilteredBuilders(formattedBuilders); // Initially display all builders
        } else {
          setError("Unexpected response format.");
        }
      } catch (error) {
        setError("Failed to fetch builder data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBuilders();
  }, []);

  const handleOnSearch = (query) => {
    if (query.length === 0) {
      setFilteredBuilders(builders);
    } else {
      const filtered = builders.filter((builder) =>
        builder.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBuilders(filtered);
    }
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleOnSelect = (item) => {
    setFilteredBuilders([item]); // Show only the selected builder
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastBuilder = currentPage * itemsPerPage;
  const indexOfFirstBuilder = indexOfLastBuilder - itemsPerPage;
  const currentBuilders = filteredBuilders.slice(
    indexOfFirstBuilder,
    indexOfLastBuilder
  );
  const totalPages = Math.ceil(filteredBuilders.length / itemsPerPage);

  const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const handlePrev = () => {
      if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPageNumbersToShow = 5;

      for (let i = 1; i <= Math.min(maxPageNumbersToShow, totalPages); i++) {
        pageNumbers.push(
          <button
            key={i}
            className={`pagination-btn ${i === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }

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
            onClick={() => onPageChange(totalPages)}
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
          onClick={handlePrev}
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
          onClick={handleNext}
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

  return (
    <div className="project-list-section">
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent
          items={breadcrumbItems}
          headingText="Top Builders"
        />
      </div>
      <div className="container">
        <div className="col-lg-4 m-auto">
          <ReactSearchAutocomplete
            className="fillter-search-box"
            items={builders}
            fuseOptions={{ keys: ["name"] }}
            resultStringKeyName="name"
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            placeholder="Search builders..."
            styling={{
              zIndex: 2,
              color: "black",
              backgroundColor: "#fff",
              hoverBackgroundColor: "#f0f0f0",
              borderRadius: "0px",
            }}
            maxResults={2}
          />
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <div className="result-count m-auto text-center mt-2">
              {filteredBuilders.length} result
              {filteredBuilders.length === 1 ? "" : "s"} found
            </div>
            {currentBuilders.length > 0 ? (
              currentBuilders.map((builder) => (
                <div key={builder.id} className="col-lg-12 mb-4">
                  <div className="row bg-row-list h-100">
                    <div className="col-lg-4" style={{ overflow: "hidden" }}>
                      <img
                        src={builder.image}
                        alt={builder.title}
                        className="builder-list-image"
                      />
                    </div>
                    <div className="col-lg-8">
                      <div className="card project-list-card">
                        <div className="builder-des">
                          <h3>{builder.title}</h3>
                          <p>
                            {expandedBuilder === builder.id
                              ? builder.description
                              : truncateDescription(builder.description)}
                          </p>
                          <div className="d-flex" style={{ gap: "20px" }}>
                            {/* <button
                              className="view-details-btn"
                              type="button"
                              style={{
                                width: "15rem",
                                height: "45px",
                                fontSize: "14px",
                                backgroundColor: "#c08835",
                                color: "white",
                                border: "none",
                                fontWeight: "400",
                                fontFamily: "Nexa-Medium",
                              }}
                              onClick={() =>
                                navigate(
                                  `/properties-by-developer/${builder.id}`,
                                  {
                                    state: {
                                      projects: builder.projects,
                                    },
                                  }
                                )
                              }
                            >
                              View Properties
                            </button> */}
                            <button
                              className="view-details-btn"
                              type="button"
                              style={{
                                width: "15rem",
                                height: "45px",
                                fontSize: "14px",
                                backgroundColor: "#c08835",
                                color: "white",
                                border: "none",
                                fontWeight: "400",
                                fontFamily: "Nexa-Medium",
                              }}
                              onClick={() =>
                                navigate(`/builder-details/${builder.id}`)
                              }
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No builders found.</div>
            )}
          </>
        )}
      </div>
      {totalPages > 1 && (
        <div className="container">
          <div className="d-flex justify-content-center mt-4">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderlistComponent;
