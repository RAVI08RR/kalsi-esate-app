// src/components/Preloader.js
import React, { useState, useEffect } from "react";
import "./Preloader.css"; // Assuming you will create this CSS file for styling

const Preloader = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // Example simulation of loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prevPercentage) =>
        prevPercentage < 100 ? prevPercentage + 10 : 100
      );
    }, 50); // Adjust the interval time as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="preloader">
        <div className="preloader-bg"></div>
        <img
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/preloader-logo.svg"
          alt="Logo"
          className="preloader-logo"
        />
        <div className="loader-bar">
          <div className="loading-bar">
            <div
              className="loading-progress"
              style={{ width: `${loadingPercentage}%` }}
            ></div>
          </div>
          <div className="loading-percentage">{loadingPercentage}%</div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
