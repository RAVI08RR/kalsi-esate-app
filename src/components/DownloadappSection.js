import React from "react";

const DownloadappSection = () => {
  return (
    <div className="download-app-section mt-5 mb-5">
      <div className="container ">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2 className="slider-heading">
              Get Kalsi Estate's App:{" "}
              <span style={{ color: "#C08735" }}>Find Properties Fast!</span>
            </h2>
            <p className="text-center">
              Explore properties, view listings, schedule visits, and connect
              <br />
              with agents on Kalsi Estate's iOS and Android mobile apps.
            </p>

            <div className="app-store-container">
              <a href="#" className="play-store-btn-link">
                <button className="play-store-btn">
                  <img
                    src="/assets/images/play-store.svg"
                    className="play-store-icon"
                  />
                  Google Play
                </button>
              </a>
              <a href="#" className="app-store-btn-link mr-2">
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
