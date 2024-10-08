import React from "react";
import Header from "../components/Header";
import ProjectsComponent from "../components/ProjectsComponent";

const Residentialprojectspage = ({cities}) => {
  return (
    <div className="residential-projects-section mt-5 mb-5">
      <Header showBg={true} cities={cities}/>
      <ProjectsComponent projectType={1} title="Residential" />;
    </div>
  );
};

export default Residentialprojectspage;
