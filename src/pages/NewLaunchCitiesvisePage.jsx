import React from "react";
import Header from "../components/Header";
import NewlaunchCityPage from "../components/NewlaunchCityPage";
import ScrollToTop from "../components/ScrollToTop";

const NewLaunchCitiesvisePage = ({cities}) => {
  return (
    <>
      <ScrollToTop />
      <Header showBg={true} cities={cities}/>
      <NewlaunchCityPage />
    </>
  );
};

export default NewLaunchCitiesvisePage;
