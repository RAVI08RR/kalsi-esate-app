import React, { useRef, useEffect, useState } from "react";
import StyledMap from "./StyledMap";
import ExpertForm from "./ExpertForm";
import Projectplanslider from "./Projectplanslider";
import EcosystemComponents from "./EcosystemComponents";
import LatestVideoComponents from "./LatestVideopopupComponent";
import EMICalculatorForm from "./EMICalculatorForm";
import RelatedProjectsComponents from "../components/RelatedProjectsComponents";
import ScrollToTop from "./ScrollToTop";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FloorplanDefault from "./Floorplandefult";
import HeartCheckbox from "./HeartCheckbox";
import Sharecomponent from "./Sharecomponent";
import { BASE_URL } from "../apis/constatnts";
import { Helmet } from "react-helmet";
import DownloadBroucherForm from "./DownloadBroucherForm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

const PropertycontentComponents = ({
  setSlides,
  setShowPdf,
  downloadbrocherdata,
}) => {
  const [showPdf, setShowPdfdownload] = useState(false); // Manage showPdf state within the component

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const locationRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [displayText, setDisplayText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { propertyid } = useParams();
  const propertyUrl = window.location.href;

  const formatReraNo = (reraNo, maxLength = 10) => {
    if (!reraNo) return "";
    return reraNo.length > maxLength
      ? `${reraNo.substring(0, maxLength)}...`
      : reraNo;
  };

  useEffect(() => {
    if (location.state?.scrollToSection) {
      locationRef.current.scrollIntoView({ behavior: "smooth" });
      navigate("#", { replace: true });
    }
  }, [location, navigate]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/property/${propertyid}`);
        let data = await response.json();
        setData(data?.data);

        if (data?.data?.pdf_brochure) {
          setShowPdfdownload(true); // Update local state
          setShowPdf(true); // Update external state if required
        } else {
          setShowPdfdownload(false); // Update local state
          setShowPdf(false); // Update external state if required
        }
        setDisplayText(
          data?.data?.about_project.split("\r\n").slice(0, 3).join("\r\n") +
            "..."
        );
        setSlides(data?.data?.gallery_images);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [propertyid, setSlides]);

  const extractMapUrl = (iframeString) => {
    const srcMatch = iframeString.match(/src="([^"]+)"/);
    return srcMatch ? srcMatch[1] : "";
  };

  useEffect(() => {
    if (data?.about_project) {
      const words = data.about_project.split(" ");
      let truncatedText = words.slice(0, 40).join(" ");
      if (words.length > 60) {
        truncatedText += "...";
      }
      setDisplayText(truncatedText);
    }
  }, [data]);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setDisplayText(data?.about_project);
    } else {
      const words = data?.about_project.split(" ");
      let truncatedText = words.slice(0, 60).join(" ");
      if (words.length > 20) {
        truncatedText += "...";
      }
      setDisplayText(truncatedText);
    }
  };

  const formatUnitSizes = (unitSizes) => {
    if (Array.isArray(unitSizes) && unitSizes.length > 0) {
      return unitSizes.join(", ");
    }
    return ""; // Default value if unit_sizes is not available or empty
  };

  const formatPrice = (price) => {
    if (!price || price === 0) {
      // Return null if price is null, undefined, or 0
      return null;
    }

    if (price >= 10000000) {
      // 10,000,000 rupees and above should be in crores
      return `${(price / 10000000).toFixed(2)} Cr`;
    } else {
      // Below 10,000,000 rupees should be in lacs
      return `${(price / 100000).toFixed(2)} Lac`;
    }
  };

  // Assuming data.price.from and data.price.to are in the current unit
  const formattedFromPrice = data && formatPrice(data?.price?.from);
  const formattedToPrice = data && formatPrice(data?.price?.to);

  // Create the formatted price range string
  let priceRange = "";

  // If both prices are null or empty, show "Call for price"
  if (!formattedFromPrice && !formattedToPrice) {
    priceRange = "Call for price";
  }
  // If only the from price is available
  else if (formattedFromPrice && !formattedToPrice) {
    priceRange = formattedFromPrice;
  }
  // If only the to price is available
  else if (!formattedFromPrice && formattedToPrice) {
    priceRange = formattedToPrice;
  }
  // If both prices are available
  else {
    priceRange = `${formattedFromPrice} - ${formattedToPrice}`;
  }

  console.log(priceRange);

  // Output: "1.8 - 3.1 Cr"

  // const formatPrice = (price) => {
  //   // Slice the first two digits, convert to a number, then divide by 10
  //   const formattedPrice = (parseInt(price?.slice(0, 2)) / 10).toFixed(1);
  //   return formattedPrice;
  // };

  // // Assuming data.price.from and data.price.to are in the current unit
  // const formattedFromPrice = data && formatPrice(data?.price.from);
  // const formattedToPrice = data && formatPrice(data?.price.to);

  // // Create the formatted price range string
  // const priceRange = `${formattedFromPrice} - ${formattedToPrice} Cr`;

  // console.log(priceRange);
  // Output: "1.8 - 3.1 Cr"

  // Assuming data.price.from and data.pri

  return (
    <>
      <ScrollToTop />

      {data && (
        <Helmet>
          <title>{data.title || "Property Title"}</title>
          <meta property="og:title" content={data.title || "Property Title"} />
          <meta
            property="og:description"
            content={data.description || "Property description goes here."}
          />
          <meta
            property="og:image"
            content={
              data.gallery_images
                ? data.gallery_images[0]
                : "URL to the feature image"
            }
          />
          <meta property="og:url" content={propertyUrl} />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data.title || "Property Title"} />
          <meta
            name="twitter:description"
            content={data.description || "Property description goes here."}
          />
          <meta
            name="twitter:image"
            content={
              data.gallery_images
                ? data.gallery_images[0]
                : "URL to the feature image"
            }
          />
          <meta name="twitter:url" content={propertyUrl} />
        </Helmet>
      )}

      <div className="Propertycontent-section">
        <div className="container project-content-section-container">
          <div className="project-content-section">
            <div id="property-details" ref={locationRef}>
              <div className="about-project">
                <h6 className="Preview-title">
                  {/* {data && data.price.from}Cr-{data && data.price.to}Cr */}
                  {formattedFromPrice && formattedToPrice
                    ? `${formattedFromPrice} - ${formattedToPrice}`
                    : "Call for price"}
                </h6>

                <div className="flot-left">
                  <HeartCheckbox propertyId={propertyid} />

                  <div className="share-btn">
                    <Sharecomponent featureImageUrl={data?.gallery_images} />
                  </div>
                </div>

                <h2>{data && data.title}</h2>
                <ul className="p-0">
                  <li className="loction-list">
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                      alt="img"
                      className="map-location-icon"
                    />
                    {data && data.address}
                  </li>
                </ul>
                {data?.rera_no && data?.rera_no.trim() !== "" && (
                  <ul className="pt-1 p-0">
                    <li className="Preview-title" style={{ listStyle: "none" }}>
                      RERA ID : {data?.rera_no}
                    </li>
                  </ul>
                )}
                <div className="property-boxes about-reviews">
                  {data?.unit_size && (
                    <div className="property-boxes-list">
                      <img
                        src="/assets/images/Property-details-images/an-1.svg"
                        className="property-boxes-img property-aminities"
                        alt="img"
                      />
                      <h6>
                        Unit Size
                        <br />
                        <span>{formatUnitSizes(data.unit_size)} BHK Flats</span>
                      </h6>
                    </div>
                  )}

                  <div className="property-boxes-list">
                    <img
                      src="/assets/images/Property-details-images/an-2.svg"
                      className="property-boxes-img property-aminities"
                      alt="img"
                    />
                    <h6>
                      Carpet Area
                      <br />
                      <span>
                        {data && data.carpet_area.from} -{" "}
                        {data && data.carpet_area.to} SQFT
                      </span>
                    </h6>
                  </div>
                  <div className="property-boxes-list">
                    <img
                      src="/assets/images/Property-details-images/an-3.svg"
                      className="property-boxes-img property-aminities"
                      alt="img"
                    />
                    <h6>
                      Possession <br />
                      <span>{data && data.possession}</span>
                    </h6>
                  </div>

                  {/* <div className="property-boxes-list">
                    <img
                      src="/assets/images/Property-details-images/an-1.svg"
                      className="property-boxes-img property-aminities"
                      alt="img"
                    />
                    <h6>
                      Project Type
                      <br />
                      <span className="rera-id-name">{data?.project_type}</span>
                    </h6>
                  </div> */}

                  <div className="property-boxes-list">
                    <img
                      src={
                        data?.project_type === "Residential"
                          ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                          : "/assets/images/Property-details-images/an-1.svg"
                      }
                      className="property-boxes-img property-aminities"
                      alt={
                        data?.project_type === "Commercial"
                          ? "Commercial Project Icon"
                          : "Other Project Icon"
                      }
                    />
                    <h6>
                      Project Type
                      <br />
                      <span className="rera-id-name">{data?.project_type}</span>
                    </h6>
                  </div>
                </div>

                {showPdf && (
                  <button
                    className="download-btn-mobile-btn w-100"
                    onClick={handleOpen}
                  >
                    Download Brochure
                  </button>
                )}

                <Modal
                  className="video-pop-box-content"
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box className="video-pop-box-content-box" sx={style}>
                    <IconButton
                      className="btn-dwonload-brochure"
                      aria-label="close"
                      onClick={handleClose}
                      style={{ marginBottom: "10px" }}
                    >
                      <CloseIcon className="icon-close-btn-Brochure" />
                    </IconButton>
                    <DownloadBroucherForm
                      DownloadBroucherFormid={propertyid}
                      onClose={handleClose}
                    />
                  </Box>
                </Modal>
                <h2 className="Project-title mt-5 pb-2">About Project</h2>
                <p className="project-description">
                  {displayText}
                  <span onClick={toggleDescription} className="read-more-link">
                    {isExpanded ? " Read less" : " Read more"}
                  </span>
                </p>
              </div>
              <div
                className="about-project indoor-container custom-p"
                id="Amenities"
                ref={locationRef}
              >
                {/* Conditional rendering for Indoor Amenities */}
                {data?.amenities_indoor && data.amenities_indoor.length > 0 && (
                  <>
                    <h2 className="Project-title pb-2">Amenities - Indoor</h2>
                    <div className="property-boxes-outindoor-boxes">
                      {data.amenities_indoor.map((amenity, idx) => (
                        <div
                          className="property-boxes-list-indoor-amenities"
                          key={idx}
                        >
                          <img
                            src={amenity.icon}
                            className="property-boxes-img indoor-outdoor-icons"
                            alt="img"
                          />
                          <h6>{amenity.feature}</h6>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Conditional rendering for Outdoor Amenities */}
                {data?.amenities_outdoor &&
                  data.amenities_outdoor.length > 0 && (
                    <>
                      <h2 className="Project-title mt-5 pb-2 Outdoor-title">
                        Amenities - Outdoor
                      </h2>
                      <div className="property-boxes-indoor-boxes">
                        {data.amenities_outdoor.map((amenity, idx) => (
                          <div
                            className="property-boxes-list-indoor-amenities"
                            key={idx}
                          >
                            <img
                              src={amenity.icon}
                              className="property-boxes-img indoor-outdoor-icons"
                              alt="img"
                            />
                            <h6>{amenity.feature}</h6>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </div>
            {data?.latitude && data?.longitude && (
              <div
                className="property-map mt-5 custom-p"
                id="location"
                ref={locationRef}
              >
                <div className="map-box">
                  <h2 className="Project-title pb-2 pt-2">Map</h2>
                  <StyledMap
                    latitude={data.latitude}
                    longitude={data.longitude}
                    zoom={14}
                    markerLabel={data.title}
                    height={400}
                    errorMessage="Map not available"
                    apiKey="AIzaSyCF46BL8RTxp77pZ3r3MtvEd0NuTuRmXW8"
                  />
                </div>
              </div>
            )}

            <div>
              {data &&
                (data.uploaded_floor_plan_images?.length > 0 ||
                  data.no_floor_plan?.length > 0) && (
                  <div
                    className="menu-section-scroll"
                    id="floor-plan"
                    ref={locationRef}
                  >
                    <div className="Floorplan-section mt-5 custom-p">
                      <h2 className="Project-title pb-2 pt-2">Floor plan</h2>

                      {data.uploaded_floor_plan_images &&
                      data.uploaded_floor_plan_images.length > 0 ? (
                        <Projectplanslider
                          images={data.uploaded_floor_plan_images}
                        />
                      ) : (
                        <FloorplanDefault floorplanUnit={data.no_floor_plan} />
                      )}
                    </div>
                  </div>
                )}
            </div>

            <div
              className="menu-section-scroll"
              id="eco-system"
              ref={locationRef}
            ></div>
            {data && data.eco_system && data.eco_system.length > 0 && (
              <div
                className="ecosystem-continer-section custom-p"
                id="eco-system"
                ref={locationRef}
              >
                <h2 className="Project-title pb-2 pt-2">Eco System</h2>
                <EcosystemComponents eco_system={data.eco_system} />
              </div>
            )}
            {data && data.video && data.video.length > 0 && (
              <div
                className="latest-video-container"
                id="Latest-video"
                ref={locationRef}
              >
                <h2 className="Project-title pb-2 pt-2">Latest Video</h2>
                <LatestVideoComponents
                  videourl={data.video}
                  selectedResult={data}
                  propertyid={propertyid}
                />
              </div>
            )}

            <div className="emi-calculator-container custom-p">
              <EMICalculatorForm classname="emi-calculator-container" />
            </div>
          </div>
          <div
            // className="mb-2"
            style={{ paddingBottom: "1.5rem", marginBottom: "1.5rem" }}
            id="talk-to-expert"
            ref={locationRef}
          ></div>
          <div
            className="project-sidebar"
            // id="talk-to-expert"
            ref={locationRef}
          >
            {data && (
              <ExpertForm
                addressTitle={data?.title}
                propertyiddata={propertyid}
              />
            )}
          </div>
        </div>
      </div>
      <RelatedProjectsComponents propertyid={propertyid} />
    </>
  );
};

export default PropertycontentComponents;
