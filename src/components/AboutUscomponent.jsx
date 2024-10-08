import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";
import Missionvissioncomponent from "./Missionvissioncomponent";
import FeaturesComponent from "./FeaturesComponent";
import Bgfeturesimg from "../Features.png";
const AboutUscomponent = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "About us", active: true },
  ];
  return (
    <>
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent items={breadcrumbItems} headingText="ABOUT US" />
      </div>
      <div className="about-us-section kss-bg-orange">
        <div className="container">
          <div className="row kss-align-item-center">
            <div className="col-lg-6">
              <div
                data-aos="fade-right"
                data-aos-easing="linear"
                data-aos-duration="3000"
                className="about-descriptions kss-bg-orange"
              >
                <h2 className="kss-fs-44 kss-fw-400 kss-family-red-hat-d text-white">
                  Welcome to Kalsi Estate, your trusted real estate partner in
                  vibrant Mumbai!
                </h2>
                <p className="kss-fs-16  kss-family-red-hat-d text-white">
                  We're not just another consultancy; we're here to turn your
                  property dreams into reality. Whether it's a cozy home, a chic
                  flat, or a stylish apartment you're after, count on us to make
                  it happen within your budget and preferences.
                </p>
              </div>
            </div>

            <div className="col-lg-6">
              <img
                data-aos="fade-left"
                data-aos-easing="linear"
                data-aos-duration="3000"
                src="assets/images/about-us-images/about-us-left.png"
                alt=""
                className="about-us-left"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mission">
        <Missionvissioncomponent />
      </div>

      <div
        className="feturesAbout-bg-section"
        style={{
          backgroundImage: `url(${Bgfeturesimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <FeaturesComponent />
      </div>

      <div className="container mt-5 mb-5 ml-2 mr-2 ">
        <div
          className="row p-0 m-2 kss-align-item-center"
          style={{ backgroundColor: "#F7F7F7" }}
        >
          <div className="col-lg-6 p-0">
            <img
              src="/assets/images/about-us-images/adv.png"
              alt="img"
              className="img-adv h-100 w-100"
            />
          </div>
          <div className="col-lg-6">
            <div className="adv-content">
              <h2>
                <span className="kss-text-orange">At Kalsi Estate,</span>
                <br />
                we're more than just property advisors
              </h2>
              <p>
                we're your trusted companions on the journey to finding your
                perfect space in the bustling heart of Mumbai.
              </p>

              <button type="submit" class="btn btn-primary submit-btn-contact">
                <a
                  href="/contact-us"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  {" "}
                  Send Enquiry
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUscomponent;
