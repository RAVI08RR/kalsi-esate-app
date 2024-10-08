import React from "react";
import Header from "../components/Header";
import BuilderlistComponent from "../components/BuilderlistComponent";

const TopBuilderlistpage = ({cities}) => {
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <BuilderlistComponent />
    </>
  );
};

export default TopBuilderlistpage;
