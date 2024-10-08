import React from "react";
import Header from "../components/Header";
import HotProjectsListcomponent from "../components/HotProjectsListcomponent";

const Hotprojectspage = ({cities}) => {
  return (
    <div className="hot-project-section mt-5 mb-5">
      <Header showBg={true} cities={cities}/>
      <HotProjectsListcomponent title="Hot Projects" />
    </div>
  );
};

export default Hotprojectspage;
