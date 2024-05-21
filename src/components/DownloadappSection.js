import React from "react";
import { TypeAnimation } from "react-type-animation";

const DownloadappSection = () => {
  return (
    <div className="download-app-section mt-5 mb-5">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="slider-heading">
              Get Kalsi Estate's App:{" "}
              <span style={{ color: "#C08735" }}>
                <TypeAnimation
                  sequence={[
                    "Find",
                    500,
                    "Find Properties Fast!", //  Continuing previous Text
                    500,
                    "Find Properties Fast!",
                    500,
                    "",
                    500,
                    "",
                    500,
                    "",
                    500,
                  ]}
                  style={{ color: "#C08735" }}
                  repeat={Infinity}
                />
                {/* Find Properties Fast! */}
              </span>
            </h2>
            <p className="text-center">
              Explore properties, view listings, schedule visits, and connect
              <br />
              with agents on Kalsi Estate's iOS and Android mobile apps.
            </p>

            <div className="app-store-container">
              <a
                data-aos-delay="1000"
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                href="#"
                className="play-store-btn-link animate__lightSpeedInRight"
              >
                <button className="play-store-btn">
                  <img
                    src="/assets/images/play-store.svg"
                    className="play-store-icon"
                  />
                  Google Play
                </button>
              </a>
              <a
                data-aos="fade-left"
                data-aos-offset="300"
                data-aos-delay="1000"
                data-aos-easing="ease-in-sine"
                href="#"
                className="app-store-btn-link mr-2 animate__lightSpeedInRight"
              >
                <button className="play-store-btn">
                  <img
                    src="/assets/images/app-store.svg"
                    className="play-store-icon"
                  />
                  Apple Store
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadappSection;
