import React from "react";
import Header from "../components/Header";
import Devloperlist from "../components/Devloperlist";

const BuilderlistingPage = ({cities}) => {
  return (
    <>
      <Header showBg={true} cities={cities} />
      <Devloperlist />
    </>
  );
};

export default BuilderlistingPage;
