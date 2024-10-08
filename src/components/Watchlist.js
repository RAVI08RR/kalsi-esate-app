import React, { useEffect, useState } from "react";
import WatchlistItem from "./WatchlistItem";
import Pagination from "./Pagination";
import "./AdminComponent.css";
import BreadcrumbComponent from "./BreadcrumbComponent";
import { BASE_URL } from "../apis/constatnts";

const ITEMS_PER_PAGE = 3; // Number of items per page

const Watchlist = () => {
  const [watchlistData, setWatchlistData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const authToken = localStorage.getItem("authToken");

  const fetchWatchlistData = async () => {
    if (!authToken) {
      console.error("Auth token is missing");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/favorite-properties?page=${currentPage}&limit=${ITEMS_PER_PAGE}`, // Include limit and page number in request
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setWatchlistData(data.data); // Assuming 'data' field contains the array of watchlist items
        setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE)); // Calculate total pages
      } else {
        console.error("Failed to fetch watchlist data", response);
      }
    } catch (error) {
      console.error("Error fetching watchlist data", error);
    }
  };

  useEffect(() => {
    fetchWatchlistData();
  }, [authToken, currentPage]); // Re-fetch data when currentPage changes

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleRemoveFavorite = (propertyId) => {
    fetchWatchlistData(); // Re-fetch the data after a property is removed
  };

  return (
    <>
      <div className="watchlist">
        {watchlistData.map((item) => (
          <WatchlistItem
            key={item.id}
            item={item}
            onRemoveFavorite={handleRemoveFavorite}
          />
        ))}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange} // Pass the correct prop name
        />
      </div>
    </>
  );
};

export default Watchlist;
