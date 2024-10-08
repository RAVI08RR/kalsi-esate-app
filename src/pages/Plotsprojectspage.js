import React from "react";
import Header from "../components/Header";
import ProjectsComponent from "../components/ProjectsComponent";

const Plotsprojectspage = ({cities}) => {
  return (
    <div className="residential-projects-section mt-5 mb-5">
      <Header showBg={true} cities={cities}/>
      <ProjectsComponent projectType={3} title="Plots" />;
    </div>
  );
};

export default Plotsprojectspage;
