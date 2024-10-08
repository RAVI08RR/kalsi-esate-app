import React from "react";
import Header from "../components/Header";
import Residentialprojectspage from "./Residentialprojectspage";
import ResidentailprojectlistingComponent from "../components/ResidentailprojectlistingComponent";

const Residentailpagecitiesvise = ({cities}) => {
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <ResidentailprojectlistingComponent projectType={1} title="Residential" />
    </>
  );
};

export default Residentailpagecitiesvise;
