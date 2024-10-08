// import React, { useEffect, useRef, useState } from "react";
// import ReactPlayer from "react-player";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { videoequiryform } from "../apis/callbacks";
// import VideopopupEquiry from "./VideopopupEquiry";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

// const LatestVideopopupComponent = ({
//   videourl,
//   selectedResult = {},
//   propertyid,
// }) => {
//   console.log("selectedResultdata", selectedResult);
//   const [open, setOpen] = useState(false);
//   const [videoPlaying, setVideoPlaying] = useState(false);
//   const [videoAvailable, setVideoAvailable] = useState(true);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     console.log("Component mounted. selectedResult:", selectedResult);
//   }, [selectedResult]);

//   const handleOpen = () => {
//     console.log("handleOpen called");
//     setOpen(true);
//   };

//   const handleSubmit = async (formData) => {
//     console.log("handleSubmit called with formData:", formData);
//     try {
//       const response = await videoequiryform(formData);
//       if (response.success) {
//         console.log("Form submission successful");
//         handleClose(); // Close the popup
//         handlePlay(); // Play the video
//       } else {
//         console.error(
//           "Form submission errors:",
//           response.errors || response.error
//         );
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleClose = () => {
//     console.log("handleClose called");
//     setOpen(false);
//   };

//   const handlePlay = () => {
//     console.log("handlePlay called");
//     setVideoPlaying(true);
//     if (playerRef.current) {
//       if (videourl.includes("youtube.com") || videourl.includes("youtu.be")) {
//         playerRef.current.getInternalPlayer().playVideo();
//       } else if (videourl.endsWith(".mp4")) {
//         playerRef.current.play();
//       }
//     }
//   };

//   const getVideoType = (url) => {
//     if (url.endsWith(".mp4")) {
//       return "video/mp4";
//     } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
//       return "youtube";
//     } else {
//       return null;
//     }
//   };

//   if (!videourl) {
//     console.log("Video URL is not available");
//     return <div className="error-message">Video is not available</div>;
//   }

//   const videoType = getVideoType(videourl);
//   console.log("Video type:", videoType);

//   return (
//     <div>
//       <div className="bg-video-popup">
//         <div className="video-container" style={{ position: "relative" }}>
//           {videoType === "video/mp4" ? (
//             <video
//               ref={playerRef}
//               src={videourl}
//               className="video-mp4-container"
//               width="100%"
//               height="100%"
//               controls
//               autoPlay={videoPlaying}
//               onEnded={() => setVideoPlaying(false)}
//               onError={() => {
//                 console.error("Error loading MP4 video");
//                 setVideoAvailable(false);
//               }}
//             />
//           ) : videoType === "youtube" ? (
//             <ReactPlayer
//               ref={playerRef}
//               url={videourl}
//               className="video-yt-container"
//               width="100%"
//               height="100%"
//               playing={videoPlaying}
//               onReady={() => console.log("YouTube player is ready")}
//               onError={(e) => {
//                 console.error("Error loading YouTube video", e);
//                 setVideoAvailable(false);
//               }}
//               onEnded={() => setVideoPlaying(false)}
//               config={{
//                 youtube: {
//                   playerVars: { controls: 0 },
//                 },
//               }}
//             />
//           ) : (
//             <div className="error-message">Video format not supported</div>
//           )}
//           {!videoPlaying && videoAvailable && (
//             <button
//               style={{
//                 backgroundColor: "transparent",
//                 border: "none",
//                 cursor: "pointer",
//                 position: "absolute",
//                 top: "50%",
//                 left: "50%",
//                 transform: "translate(-50%, -50%)",
//                 zIndex: 10,
//               }}
//               onClick={handleOpen}
//             >
//               <img
//                 src="/assets/images/Property-details-images/video-btn.svg"
//                 alt="Play"
//                 className="video-popup-btn"
//               />
//             </button>
//           )}
//         </div>
//       </div>
//       <Modal
//         className="video-pop-box-content-detail "
//         open={open}
//         BackdropProps={{
//           sx: {
//             backgroundColor: "rgb(0 0 0 / 0%)",
//           },
//           onClick: (event) => {
//             event.stopPropagation();
//           },
//         }}
//         style={{ backgroundColor: "#000000b5" }}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//       >
//         <Box className="video-pop-box-content-box-detail" sx={style}>
//           <IconButton
//             className="btn-dwonload-brochure-detail"
//             aria-label="close"
//             onClick={handleClose}
//             style={{ marginBottom: "10px" }}
//           >
//             <CloseIcon className="icon-close-btn-Brochure-detail video-popup-close-btn" />
//           </IconButton>

//           <VideopopupEquiry
//             title="Submit and Watch Video"
//             addressTitle={selectedResult.title}
//             propertyiddata={propertyid || selectedResult.property_id || ""}
//             onSubmit={handleSubmit}
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default LatestVideopopupComponent;
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { videoequiryform } from "../apis/callbacks";
import VideopopupEquiry from "./VideopopupEquiry";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LatestVideopopupComponent = ({
  videourl,
  selectedResult = {},
  propertyid,
}) => {
  const [open, setOpen] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoAvailable, setVideoAvailable] = useState(true);
  const playerRef = useRef(null);

  useEffect(() => {
    // console.log("Component mounted. selectedResult:", selectedResult);
  }, [selectedResult]);

  const handleOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
    // console.log("handleOpen called");
    setOpen(true);
  };

  const handleSubmit = async (formData) => {
    // console.log("handleSubmit called with formData:", formData);
    try {
      const response = await videoequiryform(formData);
      if (response.success) {
        // console.log("Form submission successful");
        handleClose();
        handlePlay();
      } else {
        console.error(
          "Form submission errors:",
          response.errors || response.error
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleClose = () => {
    // console.log("handleClose called");
    setOpen(false);
  };

  const handlePlay = () => {
    // console.log("handlePlay called");
    setVideoPlaying(true);
    if (playerRef.current) {
      if (videourl.includes("youtube.com") || videourl.includes("youtu.be")) {
        playerRef.current.getInternalPlayer().playVideo();
      } else if (videourl.endsWith(".mp4")) {
        playerRef.current.play();
      }
    }
  };

  const getVideoType = (url) => {
    if (url.endsWith(".mp4")) {
      return "video/mp4";
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    } else {
      return null;
    }
  };

  if (!videourl) {
    console.log("Video URL is not available");
    return <div className="error-message">Video is not available</div>;
  }

  const videoType = getVideoType(videourl);
  console.log("Video type:", videoType);

  return (
    <div>
      <div className="bg-video-popup" onClick={handleOpen}>
        <div
          className="video-container"
          style={{ position: "relative", cursor: "pointer" }}
        >
          {videoType === "video/mp4" ? (
            <video
              ref={playerRef}
              src={videourl}
              className="video-mp4-container"
              width="100%"
              height="100%"
              controls={false}
              autoPlay={false}
              onEnded={() => setVideoPlaying(false)}
              onError={() => {
                console.error("Error loading MP4 video");
                setVideoAvailable(false);
              }}
            />
          ) : videoType === "youtube" ? (
            <ReactPlayer
              ref={playerRef}
              url={videourl}
              className="video-yt-container"
              width="100%"
              height="100%"
              playing={false}
              onReady={() => console.log("YouTube player is ready")}
              onError={(e) => {
                console.error("Error loading YouTube video", e);
                setVideoAvailable(false);
              }}
              onEnded={() => setVideoPlaying(false)}
              config={{
                youtube: {
                  playerVars: { controls: 0, rel: 0, showinfo: 0 },
                },
              }}
            />
          ) : (
            <div className="error-message">Video format not supported</div>
          )}
          {!videoPlaying && videoAvailable && (
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                width: "100%",
                height: "100%",
                zIndex: 99999999999,
              }}
            >
              <img
                src="/assets/images/Property-details-images/video-btn.svg"
                alt="Play"
                className="video-popup-btn"
              />
            </button>
          )}
        </div>
      </div>
      <Modal
        className="video-pop-box-content-detail"
        open={open}
        BackdropProps={{
          sx: {
            backgroundColor: "rgb(0 0 0 / 0%)",
          },
          onClick: (event) => {
            event.stopPropagation();
          },
        }}
        style={{ backgroundColor: "#000000b5" }}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="video-pop-box-content-box-detail" sx={style}>
          <IconButton
            className="btn-dwonload-brochure-detail"
            aria-label="close"
            onClick={handleClose}
            style={{ marginBottom: "10px" }}
          >
            <CloseIcon className="icon-close-btn-Brochure-detail video-popup-close-btn" />
          </IconButton>

          <VideopopupEquiry
            title="Submit and Watch Video"
            addressTitle={selectedResult.title}
            propertyiddata={propertyid || selectedResult.property_id || ""}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default LatestVideopopupComponent;
