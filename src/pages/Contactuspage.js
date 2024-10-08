import React from "react";
import Header from "../components/Header";
import Contactuscomponent from "../components/Contactuscomponent";

const Contactuspage = ({cities}) => {
  return (
    <div>
      <Header showBg={true} cities={cities}/>
      <Contactuscomponent />
    </div>
  );
};

export default Contactuspage;
