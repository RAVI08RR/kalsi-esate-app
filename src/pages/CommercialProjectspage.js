import React from "react";
import Header from "../components/Header";
// import ProjectsComponent from "../components/ProjectsComponent";
import CommercialPropertyListing from "../components/CommercialPropertyListing";

const CommercialProjectspage = ({cities}) => {
  return (
    <div className="residential-projects-section mt-5 mb-5">
      <Header showBg={true} cities={cities}/>
      <CommercialPropertyListing projectType={2} title="Commercial" />
    </div>
  );
};

export default CommercialProjectspage;
