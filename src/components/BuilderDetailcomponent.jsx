import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { BASE_URL } from "../apis/constatnts";
import ScrollToTop from "./ScrollToTop";

const BuilderDetailComponent = () => {
  const { id } = useParams();
  const [developerDetails, setDeveloperDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Top Builder", href: "/top-builder", active: false },
    { label: "Builder Details", active: true },
  ];

  useEffect(() => {
    
    const fetchDeveloperDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/developer-details/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch developer details");
        }
        const data = await response.json();
       
        setDeveloperDetails(data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "An unexpected error occurred");
        setLoading(false);
      }
    };

    fetchDeveloperDetails();
  }, [id]);

  useEffect(() => {
    if (developerDetails) {
      
    }
  }, [developerDetails]);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
  }

  if (!developerDetails) {
    return <div className="text-center mt-5">No details available.</div>;
  }

  return (
    <>
      <ScrollToTop />
      <div className="container mt-2 pb-0">
        <BreadcrumbComponent items={breadcrumbItems} />
        <div className="row justify-content-center">
          <div className="col-lg-12 text-center mb-4">
            <img
              src={developerDetails.image || "/path/to/default-image.jpg"}
              className="icons-builders"
              alt={developerDetails.developer || "Developer"}
            />
          </div>
          <div className="col-lg-12">
            <div className="card builder-detail-card">
              <h2>{developerDetails.developer}</h2>
              <p>{developerDetails.description}</p>
              <button
                className="view-project-btn-detail"
                type="button"
                style={{
                  width: "15rem",
                  height: "45px",
                  fontSize: "14.5px",
                  margin: "auto",
                }}
                onClick={() =>
                  navigate(`/properties-by-developer/${id}`, {
                    state: {
                      projects: developerDetails?.projects,
                      builderTitle: developerDetails?.developer, // Correctly passing the builderTitle
                    },
                  })
                }
              >
                VIEW PROPERTIES
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderDetailComponent;
