import React from "react";
import LuxeryHomesslider from "./LuxeryHomesslider";
// import VerticalSlider from ".././components/VerticalSlider/VerticalSlider";
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
import FullWidthSlider from "./FullWidthSlider";

const Home = () => {
  const slides = [
    {
      bgImage: "/assets/images/banner-1.png",
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
    {
      bgImage: "/assets/images/banner-2.png",
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: [
        "Mumbai",
        "Delhi",
        "Pune",
        "Kolkata",
        "Chennai",
        "Bangalore",
        "Ahmedabad",
        "Hyderabad",
      ],
    },
    // Add more slide objects as needed
  ];

  return (
    <div>
      <FullPageVerticalSlider />
      {/* <FullWidthSlider /> */}
      {/* <FullPageVerticalSlider /> */}
      <LuxeryHomesslider />
      <Topprojectsslider />
      <OurupcomingLaunch />
      <Topbrandpartners />
      <ProjectReviewslider />
      <PropertyInformation />
      <TestimonialSlider />
      <Newsblogs />
      <GetinTouchForm />
      <DownloadappSection />
    </div>
  );
};

export default Home;
