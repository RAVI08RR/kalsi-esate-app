import React, { useState } from "react";
import "./Newpreloader.css";

const Newpreloader = () => {
  const [isFilled, setIsFilled] = useState(false);

  const toggleFill = () => {
    setIsFilled(!isFilled);
  };

  return (
    <div>
      <div id="background"></div>
      <div
        id="logocontainer"
        onClick={toggleFill}
        style={{
          backgroundColor: isFilled ? "#3ebffa" : "transparent",
        }}
      >
        <div id="pelogo">
          <img
            src="/assets/images/preloader-logo.svg"
            alt="Logo"
            className="preloader-logo"
          />
        </div>
        <div
          className="loader"
          style={{
            left: "1vh",
            top: "0",
            height: "1vh",
            width: "0",
            animation: "slide1 1s linear forwards infinite",
          }}
        ></div>
        <div
          className="loader"
          style={{
            right: "0",
            top: "1vh",
            width: "1vh",
            height: "0",
            animation: "slide2 1s linear forwards infinite",
            animationDelay: "0.5s",
          }}
        ></div>
        <div
          className="loader"
          style={{
            right: "1vh",
            bottom: "0",
            height: "1vh",
            width: "0",
            animation: "slide3 1s linear forwards infinite",
          }}
        ></div>
        <div
          className="loader"
          style={{
            left: "0",
            bottom: "1vh",
            width: "1vh",
            height: "0",
            animation: "slide4 1s linear forwards infinite",
            animationDelay: "0.5s",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Newpreloader;
