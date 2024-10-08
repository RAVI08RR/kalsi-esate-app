import React from "react";
import Header from "../components/Header";
import HomeloanComponents from "../components/HomeloanComponents";

const HomeLoanpage = ({cities}) => {
  return (
    <div>
      <Header showBg={true} cities={cities}/>
      <HomeloanComponents />
    </div>
  );
};

export default HomeLoanpage;
