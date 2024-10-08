import React, { useEffect, useState, useRef, useContext } from "react";
import LuxeryHomesslider from "./LuxeryHomesslider";
import FullPageVerticalSlider from "./FullPageVerticalSlider";
import Topprojectsslider from "./Topprojectsslider";
import OurupcomingLaunch from "./OurupcomingLaunch";
import Topbrandpartners from "./Topbrandpartners";
import ProjectReviewslider from "./ProjectReviewslider";
import PropertyInformation from "./PropertyInformation";
import TestimonialSlider from "./TestimonialSlider";
import Newsblogs from "./Newsblogs";
import GetinTouchForm from "./GetinTouchForm";
import DownloadappSection from "./DownloadappSection";
import Contactimg from "./icons/contact-us-img.webp";
import MobileTopProjectsslider from "./MobileTopProjectsslider";
import { useMediaQuery } from "react-responsive";
import MobileSearchComponent from "./MobileSearchComponent";
import MobileNewsblog from "./MobileNewsblog";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, topUpcomingProjects } from "../apis/callbacks";
import { CityIdContext } from "../App";

const Home = ({ storeCityName, apiData, cities }) => {
  const { cityId } = useContext(CityIdContext);

  const [selectedCity, setSelectedCity] = useState("");
  const [data, setData] = useState();
  const [dataTopproject, setTopproject] = useState();
  const locationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const store = (name) => {
    console.log("city name =====>>>>", name);
    storeCityName(name);
  };

  useEffect(() => {
    const fetchingData = async () => {
      try {
        const data = await fetchData(cityId);
        setData(data);
      } catch (error) {
        console.error("Error fetching upcoming projects:", error);
      }
    };
    const facthingTop = async () => {
      try {
        const dataTopproject = await topUpcomingProjects(cityId);
        setTopproject(dataTopproject.properties);
      } catch (error) {
        console.error("Error fetching upcoming projects:", error);
      }
    };

    if (cityId) {
      fetchingData();
      facthingTop();
    }
  }, [cityId]);

  console.log("top projects data", dataTopproject);
  useEffect(() => {
    if (location.state?.scrollToSection) {
      locationRef.current.scrollIntoView({ behavior: "smooth" });
      navigate("#", { replace: true });
    }
  }, [location, navigate]);

  // useEffect(() => {
  //   console.log("Updated data state:", data);
  // }, [data]);

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
        <LuxeryHomesslider />
        {isMobile ? (
          <MobileTopProjectsslider
            selectedCity={selectedCity}
            topdata={dataTopproject}
          />
        ) : (
          <Topprojectsslider
            selectedCity={selectedCity}
            topdata={dataTopproject}
          />
        )}
        <OurupcomingLaunch upcommingdata={data?.new_launch} />
        <Topbrandpartners />
        <ProjectReviewslider highlighteddata={data?.highlighted} />
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
