import React from "react";
import Header from "../components/Header";

// import NewGalleryComponent from "../components/NewGalleryComponent";
import Gallery from "../components/Gallery";
import PropertycontentComponents from "../components/PropertycontentComponents";

const PropertyDetailpage = () => {
  return (
    <div>
      <Header showBg={true} />
      <Gallery />
      <PropertycontentComponents />
    </div>
  );
};

export default PropertyDetailpage;
