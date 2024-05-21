import React from "react";

const StyledMap = () => {
  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe
          className="gmap_iframe"
          width="100%"
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
          src="https://maps.google.com/maps?width=754.296&amp;height=400&amp;hl=en&amp;q=Rajapushpa%20Eterna%20at%20Nanakramguda,%20Hyderabad&amp;t=k&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        ></iframe>
        <a href="https://embedgooglemap.xyz/">google maps iframe</a>
      </div>
      <style>
        {`
          .mapouter {
            position: relative;
            text-align: right;
            width: 100%;
            height: 400px;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none !important;
            width: 100%;
            height: 400px;
          }
          .gmap_iframe {
            height: 400px !important;
          }
        `}
      </style>
    </div>
  );
};

export default StyledMap;
