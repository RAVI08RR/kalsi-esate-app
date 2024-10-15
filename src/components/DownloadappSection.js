import React from "react";

const DownloadappSection = () => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="3000"
      className="download-app-section mt-5 mb-5"
    >
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="slider-heading">
              Get Kalsi Estate's App: <br className="br-none" />
              <span style={{ color: "#C08735" }}>
                Find Properties Fast!
                {/* Find Properties Fast! */}
              </span>
            </h2>
            <p className="text-center">
              Explore properties, view listings, schedule visits, and connect
              with agents on Kalsi Estate's iOS and Android mobile apps.
            </p>

            <div
              className="app-store-container"
              data-aos="fade-up"
              data-aos-duration="3000"
            >
              <a
                href="#"
                className="play-store-btn-link animate__lightSpeedInRight"
              >
                <button className="play-store-btn">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/play-store.svg"
                    className="play-store-icon"
                    width="100%"
                    height="100%"
                    loading="lazy"
                  />
                  Google Play
                </button>
              </a>
              <a
                href="#"
                className="app-store-btn-link mr-2 animate__lightSpeedInRight"
              >
                <button className="play-store-btn">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/app-store.svg"
                    className="play-store-icon"
                    width="100%"
                    height="100%"
                    loading="lazy"
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
