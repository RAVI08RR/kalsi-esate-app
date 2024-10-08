import React from "react";
import Header from "../components/Header";
import AboutUscomponent from "../components/AboutUscomponent";

const Aboutuspage = ({cities}) => {
  return (
    <>
      <Header showBg={true} cities={cities}/>
      <AboutUscomponent />
    </>
  );
};

export default Aboutuspage;
