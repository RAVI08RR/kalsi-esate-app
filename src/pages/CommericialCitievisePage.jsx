import React from "react";
import Header from "../components/Header";
import ResidentailprojectlistingComponent from "../components/ResidentailprojectlistingComponent";

const CommericialCitievisePage = ({ cityName,cities }) => {
  return (
    <>
      <Header showBg={true} cityName={cityName}  cities={cities}/>
      <ResidentailprojectlistingComponent
        projectType={2}
        title="Commercial"
        cityName={cityName}
      />
    </>
  );
};

export default CommericialCitievisePage;
