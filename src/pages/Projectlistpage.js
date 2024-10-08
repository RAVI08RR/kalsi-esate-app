import React, { useContext } from "react";
import ProjectlistComponent from "../components/ProjectlistComponent";
import Header from "../components/Header";
import { CityIdContext, CityNameContext } from "../App";
import "../responsive.css";

const Projectlistpage = ({cities}) => {
  const { city } = useContext(CityNameContext);
   console.log("current selected city", cities);
  let cityName = localStorage.getItem("cityName");

  return (
    <div className="project-list-main-section">
      <Header showBg={true} cityName={cityName} cities={cities}/>
      {/* <Header  /> */}

      <ProjectlistComponent />
    </div>
  );
};

export default Projectlistpage;
