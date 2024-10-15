import React, { useContext, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { CityIdContext } from "../App";
import {
  fetchData,
  topUpcomingProjects,
  tophighlightedprojects,
} from "../apis/callbacks";
import DownloadappSection from "./DownloadappSection";
import FullPageVerticalSlider from "./FullPageVerticalSlider";
import GetinTouchForm from "./GetinTouchForm";
import LuxeryHomesslider from "./LuxeryHomesslider";
import MobileNewsblog from "./MobileNewsblog";
import MobileSearchComponent from "./MobileSearchComponent";
import MobileTopProjectsslider from "./MobileTopProjectsslider";
import Newsblogs from "./Newsblogs";
import OurupcomingLaunch from "./OurupcomingLaunch";
import ProjectReviewslider from "./ProjectReviewslider";
import PropertyInformation from "./PropertyInformation";
import TestimonialSlider from "./TestimonialSlider";
import Topbrandpartners from "./Topbrandpartners";
import Topprojectsslider from "./Topprojectsslider";

const Home = ({ storeCityName, apiData, cities }) => {
  const { cityId } = useContext(CityIdContext);

  const [selectedCity, setSelectedCity] = useState("");
  const [topProjectsData, setTopProjectsData] = useState(null);
  const [upcomingProjectsData, setUpcomingProjectsData] = useState(null);
  const [highlightedProjectsData, setHighlightedProjectsData] = useState(null);
  const locationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const store = (name) => {
    console.log("city name =====>>>>", name);
    storeCityName(name);
  };

  // Fetch top projects, upcoming projects, and highlighted projects when cityId changes
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const topProjects = await fetchData(cityId);
        setTopProjectsData(topProjects);

        const upcomingProjects = await topUpcomingProjects(cityId);
        setUpcomingProjectsData(upcomingProjects.properties);

        const highlightedProjects = await tophighlightedprojects(cityId);
        setHighlightedProjectsData(highlightedProjects.properties);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    if (cityId) {
      fetchAllData();
    }
  }, [cityId]);

  console.log("Top Projects Data:", topProjectsData);
  console.log("Upcoming Projects Data:", upcomingProjectsData);
  console.log("Highlighted Projects Data:", highlightedProjectsData);

  // Scroll to section if location state has a scrollToSection flag
  useEffect(() => {
    if (location.state?.scrollToSection) {
      locationRef.current.scrollIntoView({ behavior: "smooth" });
      navigate("#", { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <div className="home-sections">
        {isMobile ? (
          <MobileSearchComponent
            storeCityName={storeCityName}
            store={store}
            cities={cities}
            setSelectedCity={setSelectedCity}
          />
        ) : (
          <FullPageVerticalSlider
            storeCityName={storeCityName}
            store={store}
            cities={cities}
            setSelectedCity={setSelectedCity}
          />
        )}
        <LuxeryHomesslider
          topProjectsData={topProjectsData?.properties || []}
        />
        {isMobile ? (
          <MobileTopProjectsslider
            selectedCity={selectedCity}
            topdata={topProjectsData?.properties || []}
          />
        ) : (
          <Topprojectsslider
            selectedCity={selectedCity}
            topdata={topProjectsData?.properties || []}
          />
        )}
        <OurupcomingLaunch upcommingdata={upcomingProjectsData} />
        <Topbrandpartners />
        <ProjectReviewslider highlighteddata={highlightedProjectsData} />
        <PropertyInformation />
        <TestimonialSlider />
        {isMobile ? (
          <MobileNewsblog title="News and Blogs" />
        ) : (
          <Newsblogs title="News and Blogs" />
        )}
        <GetinTouchForm
          id="contact-us"
          ref={locationRef}
          title="Contact Us"
          discription="Leave details for your project"
          buttonText="Submit"
          imageUrl="https://d3v1h55v8tucsz.cloudfront.net/static/media/contact-us-img.32f47fbd510795ee61eb.webp"
          classname="submit-btn-contact"
        />
        <DownloadappSection />
      </div>
    </>
  );
};

export default Home;
