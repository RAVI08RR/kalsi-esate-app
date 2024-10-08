import React from "react";
import ReactPlayer from "react-player";

const LatestVideoComponentspopup = ({ url }) => {
  return (
    <div>
      <div className="video-container">
        <ReactPlayer
          url={url}
          className="video-yt-container"
          controls
          width="100%"
          height="100%"
        />
        {/* <iframe
          className="yt-player"
          width="560"
          height="315"
          src="https://www.youtube.com/embed/-04J_XPL2G4?controls=0&modestbranding=1&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe> */}
      </div>
    </div>
  );
};

export default LatestVideoComponentspopup;
