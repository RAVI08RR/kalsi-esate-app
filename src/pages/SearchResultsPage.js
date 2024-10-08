import React from "react";
import SearchResultComponent from "../components/SerachResultcomponet";
import Header from "../components/Header";

const SearchResultsPage = ({cities}) => {
  return (
    <div className="search-resultpage-section">
      <Header showBg={true} cities={cities}/>

      <SearchResultComponent />
    </div>
  );
};

export default SearchResultsPage;
