import React from "react";
import LuxeryHomesslider from "./LuxeryHomesslider";
import VerticalSlider from "./VerticalSlider";
import FullPageVerticalSlider from "./FullPageVerticalSlider";
import Topprojectsslider from "./Topprojectsslider";
import OurupcomingLaunch from "./OurupcomingLaunch";
import Topbrandpartners from "./Topbrandpartners";
import ProjectReviewslider from "./ProjectReviewslider";
import PropertyInformation from "./PropertyInformation";

const Home = () => {
  const slides = [
    {
      bgImage: "/assets/images/banner-1.png",
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: ["New York", "Los Angeles", "Chicago", "Houston"],
    },
    {
      bgImage: "/assets/images/banner-2.png",
      title: "Start Your Home Journey Today.",
      description:
        "With The Most Complete Source Of Homes For Sale & Properties Near You.",
      cities: ["San Francisco", "Seattle", "Miami", "Boston"],
    },
    // Add more slide objects as needed
  ];

  return (
    <div>
      <FullPageVerticalSlider slides={slides} />
      <LuxeryHomesslider />
      <Topprojectsslider />
      <OurupcomingLaunch />
      <Topbrandpartners />
      <ProjectReviewslider />
      <PropertyInformation />
    </div>
  );
};

export default Home;
