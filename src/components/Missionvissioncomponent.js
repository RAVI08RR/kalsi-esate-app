import React from "react";
import "./MissionVision.css";

const Missionvissioncomponent = () => {
  return (
    <div className="container mt-5 ">
      <div className="row text-center">
        <div className="col-md-6 mb-4">
          <div
            data-aos="fade-right"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="card mission-card h-100 border-0"
          >
            <div className="icon-box-about">
              <div className="icon mb-3">
                <img
                  src="/assets/images/about-us-images/Mission.svg"
                  alt="Vision Icon"
                />
              </div>
              <div className="content-mission-vission">
                <h2 className="card-title text-left">Mission</h2>
                <p className="card-text text-left">
                  At Kalsi Estate, our mission is simple yet powerful: to
                  empower you on your property journey. We strive to provide
                  personalized guidance and expert assistance, ensuring that
                  each step towards your dream property is seamless and
                  rewarding.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div
            data-aos="fade-left"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="card  mission-card h-100 border-0"
          >
            <div className="icon-box-about">
              <div className="icon mb-3">
                <img
                  src="/assets/images/about-us-images/Vision.svg"
                  alt="Vision Icon"
                />
              </div>
              <div className="content-mission-vission">
                <h2 className="card-title text-left">Vision</h2>
                <p className="card-text text-left">
                  In Mumbai's bustling real estate scene, we envision ourselves
                  as the go-to hub for reliable and exceptional property
                  solutions. Our aim? To redefine your property journey by
                  offering a curated selection of projects from renowned
                  developers, ensuring every client finds their perfect match
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missionvissioncomponent;
