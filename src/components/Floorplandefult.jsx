// import React, { useState } from "react";
// import { Modal, Box, IconButton } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import VideopopupEquiry from "./VideopopupEquiry"; // Make sure to import your form component
// import "./FloorplanDefault.css";
// import zIndex from "@mui/material/styles/zIndex";

// const FloorplanDefault = ({ propertyid, addressTitle }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedResult, setSelectedResult] = useState({});
//   console.log("florplandataresult", addressTitle);
//   const handleOpen = (result) => {
//     setSelectedResult(result);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSubmit = (data) => {
//     // Handle form submission logic here
//     console.log("Form data:", data);
//     handleClose();
//   };

//   const floorPlans = [
//     { title: "2 BHK", imgSrc: "/assets/images/Floor-Plan.png" },
//     { title: "3 BHK", imgSrc: "/assets/images/Floor-Plan.png" },
//     { title: "3-4 BHK", imgSrc: "/assets/images/Floor-Plan.png" },
//   ];

//   return (
//     <div className="container mt-4">
//       {/* <div className="row mb-4">
//         <div className="col text-left">
//           <button className="btn btn-outline-dark custom-btn">
//             Site & Floor Plan
//           </button>
//         </div>
//       </div> */}
//       <div className="row">
//         {floorPlans.map((plan, index) => (
//           <div className="col-lg-4 mb-4" key={index}>
//             <div className="floorplan-card">
//               <div className="overlay-equiery-btn-section">
//                 <button
//                   className="enquire-btn"
//                   onClick={() => handleOpen(plan)}
//                 >
//                   ENQUIRE NOW
//                 </button>
//               </div>
//               <img
//                 src={plan.imgSrc}
//                 alt={plan.title}
//                 className="img-fluid blur-floor-plan-img"
//               />
//               <div className="floorplan-title">{plan.title}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* <div className="row">
//         <div className="col text-left">
//           <button
//             className="btn btn-outline-dark custom-btn"
//             onClick={() => handleOpen()}
//           >
//             Request For More Floor Plans
//           </button>
//         </div>
//       </div> */}

//       <Modal
//         className="video-pop-box-content-detail bg-transparent"
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
//         <Box className="video-pop-box-content-box-detail" sx={{ ...style }}>
//           <IconButton
//             className="btn-dwonload-brochure-detail"
//             aria-label="close"
//             onClick={handleClose}
//             style={{ marginBottom: "10px" }}
//           >
//             <CloseIcon className="icon-close-btn-Brochure-detail video-popup-close-btn" />
//           </IconButton>

//           <VideopopupEquiry
//             title="Floor Plan Request"
//             addressTitle={addressTitle}
//             propertyiddata={propertyid || selectedResult.property_id || ""}
//             onSubmit={handleSubmit}
//           />
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default FloorplanDefault;

// // Add the necessary styles for the Modal
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   zIndex: "9999",
//   p: 4,
// };

import React, { useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VideopopupEquiry from "./VideopopupEquiry"; // Import your form component
import "./FloorplanDefault.css";

const FloorplanDefault = ({
  propertyid,
  addressTitle,
  no_floor_plan = [],
  floorplanUnit,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState({});

  const handleOpen = (result) => {
    setSelectedResult(result);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data) => {
   
    handleClose();
  };

  // Determine image source based on floor plan title
  const getImageSrc = (title) => {
    switch (title) {
      case "2BHK":
        return "/assets/images/Floor-Plan-2BHK.png";
      case "3BHK":
        return "/assets/images/Floor-Plan-3BHK.png";
      case "4BHK":
        return "/assets/images/Floor-Plan-4BHK.png";
      default:
        return "/assets/images/Floor-Plan-Default.png"; // Default image
    }
  };

  // Use `no_floor_plan` data to map to images
  const floorPlans = no_floor_plan.map((title) => ({
    title,
    imgSrc: getImageSrc(title),
  }));

  return (
    <div className="container mt-4">
      <div className="row">
        {floorplanUnit?.map((plan, index) => (
          <div className="col-lg-4 mb-4" key={index}>
            <div className="floorplan-card">
              <div className="overlay-equiery-btn-section">
                <button
                  className="enquire-btn"
                  onClick={() => handleOpen(plan)}
                >
                  ENQUIRE NOW
                </button>
              </div>
              <img
                src="/assets/images/Floor-Plan.png"
                alt={plan}
                className="img-fluid blur-floor-plan-img"
              />
              <div className="floorplan-title">{plan}</div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        className="video-pop-box-content-detail bg-transparent"
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
            title="Floor Plan Request"
            addressTitle={addressTitle}
            propertyiddata={propertyid || selectedResult.property_id || ""}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default FloorplanDefault;

// Add the necessary styles for the Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  zIndex: "9999",
  p: 4,
};
