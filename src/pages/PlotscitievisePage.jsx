import React from "react";
import Header from "../components/Header";
import ResidentailprojectlistingComponent from "../components/ResidentailprojectlistingComponent";

const PlotscitievisePage = ({cities}) => {
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <ResidentailprojectlistingComponent projectType={3} title="Plots" />
    </>
  );
};

export default PlotscitievisePage;
