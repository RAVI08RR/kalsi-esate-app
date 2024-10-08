import React from "react";
import BuilderDetailcomponent from "../components/BuilderDetailcomponent";
import Header from "../components/Header";

const BuilderDetailpage = ({cities}) => {
  return (
    <div className="builder-section">
      <Header showBg={true} cities={cities}/>
      <BuilderDetailcomponent />
    </div>
  );
};

export default BuilderDetailpage;
