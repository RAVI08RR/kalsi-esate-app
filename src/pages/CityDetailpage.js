import React from "react";
import Header from "../components/Header";
import CityDetailComponent from "../components/CityDetailComponent";
import ScrollToTop from "../components/ScrollToTop";

const CityDetailpage = ({cities}) => {
  return (
    <>
      <ScrollToTop />
      <div className="city-detail-section">
        <Header showBg={true} cities={cities}/>
        <CityDetailComponent />
      </div>
    </>
  );
};

export default CityDetailpage;
