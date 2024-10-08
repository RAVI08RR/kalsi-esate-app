import React, { useState } from "react";
import Header from "../components/Header";

// import NewGalleryComponent from "../components/NewGalleryComponent";
import Gallery from "../components/Gallery";
import PropertycontentComponents from "../components/PropertycontentComponents";
import InnerpageHeader from "../components/InnerpageHeader";
import { useLocation, useParams } from "react-router-dom";

const PropertyDetailpage = ({cities}) => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };
  const [activeSection, setActiveSection] = useState(null);

  const location = useLocation();
  console.log("location", location);
  // let propertyid = location?.state?.id;
  const { propertyid } = useParams();
  const [data, setData] = useState();
  const [showPdf, setShowPdf] = useState(false);
  console.log("params id", propertyid);
  return (
    <div className="property-bg-color">
      <Header showBg={true} cities={cities}/>
      <Gallery data={data} />
      <InnerpageHeader
        propertyid={propertyid}
        downloadbrocherdata={showPdf}
        data={data}
      />
      <PropertycontentComponents
        propertyid={propertyid}
        setShowPdf={setShowPdf}
        setSlides={setData}
      />
      <div className="talk-to-expert">
        <button
          className="w-100 talk-to-expert-btn-fixed"
          onClick={() => scrollToSection("talk-to-expert")}
          style={{ cursor: "pointer" }}
        >
          talk to expert
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailpage;
