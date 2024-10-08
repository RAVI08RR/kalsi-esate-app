// import React from "react";
// import "./AdminComponent.css";
// import BreadcrumbComponent from "./BreadcrumbComponent";
// import { useLocation, useNavigate } from "react-router-dom";

// const WatchlistItem = ({ item }) => {
//   // Placeholder for default values if data is missing
//   const defaultImage = "/assets/images/review-left-slide-3.png";
//   const defaultBuilder = "Unknown Builder";
//   const defaultConfiguration = "N/A";
//   const defaultArea = item.carpet_area || "N/A";
//   const navigate = useNavigate();

//   const slugify = (text) => {
//     return text
//       .toString()
//       .toLowerCase()
//       .replace(/\s+/g, "-")
//       .replace(/[^\w\-]+/g, "")
//       .replace(/\-\-+/g, "-")
//       .replace(/^-+/, "")
//       .replace(/-+$/, "");
//   };

//   return (
//     <>
//       <div className="container">
//         <div className="watchlist-list-section">
//           <div
//             className="row bg-row-list"
//             style={{ boxShadow: "4px -10px 27px -19px rgba(0,0,0,0.1)" }}
//           >
//             <div className="col-lg-4 p-0" style={{ overflow: "hidden" }}>
//               <img
//                 src={item.banner || defaultImage}
//                 alt={item.title}
//                 className="project-list-image"
//               />
//             </div>
//             <div className="col-lg-8 bg-hover-card">
//               <div className="card project-list-card">
//                 <h6
//                   className="Project-title"
//                   style={{ color: "rgb(192, 135, 53)" }}
//                 >
//                   RERA ID: {item.rera_no || "N/A"}
//                 </h6>
//                 <span className="badge-button bgprice-range-transperent">
//                   {item.price_from || "N/A"} - {item.price_to || "N/A"}
//                 </span>
//                 <h2>{item.title}</h2>
//                 <ul className="location-list-project-list">
//                   <li className="loction-list-pr" style={{ color: "black" }}>
//                     <img
//                       src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
//                       alt="img"
//                       className="map-location-icon"
//                     />
//                     <span
//                       style={{ color: "rgb(120, 120, 120)", paddingRight: 2 }}
//                     >
//                       At
//                     </span>
//                     {item.location || "N/A"}
//                   </li>
//                   <li className="loction-list-pr group-builder mt-2">
//                     <span
//                       style={{ color: "rgb(120, 120, 120)", paddingRight: 10 }}
//                     >
//                       By
//                     </span>
//                     {item.builder_name || defaultBuilder}
//                   </li>
//                 </ul>
//                 <ul className="features-list pl-0">
//                   <li className="project-list-icons">
//                     <img
//                       src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
//                       className="amenties-icons"
//                     />
//                     {item.project_type || "N/A"}
//                   </li>
//                   <li className="project-list-icons">
//                     <img
//                       src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
//                       className="amenties-icons"
//                     />
//                     {item.unit_size || defaultConfiguration}
//                   </li>
//                   <li className="project-list-icons">
//                     <img
//                       src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
//                       className="amenties-icons"
//                     />
//                     {defaultArea}
//                   </li>
//                   <li className="view-btn-list">
//                     <button
//                       className="kss-btn"
//                       style={{ cursor: "pointer" }}
//                       onClick={() =>
//                         navigate(
//                           `/property-detail/${
//                             item.id || slugify(item.title)
//                           }/${slugify(item.title)}`
//                         )
//                       }
//                     >
//                       View Details
//                     </button>
//                   </li>
//                   <li className="view-btn-list">
//                     <button
//                       className="delete-btn"
//                       style={{ cursor: "pointer" }}
//                     >
//                       <img
//                         src="/assets/images/delete-icon.svg"
//                         alt="img "
//                         className="info-img"
//                       />
//                       <span className="bg-color-theme"> Unfavourite</span>
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default WatchlistItem;

import React, { useState } from "react";
import { Modal, Box, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../apis/constatnts"; // Adjust the import path as needed

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "none",
  p: 4,
};

const WatchlistItem = ({ item, onRemoveFavorite }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const navigate = useNavigate();

  const handleUnfavoriteClick = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirmUnfavorite = async () => {
    setIsRemoving(true);
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch(`${BASE_URL}/property/${item.id}/favorite`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorite: 0,
        }),
      });

      if (response.ok) {
        console.log("Property unfavorited successfully");
        onRemoveFavorite(item.id); // Trigger the callback to update the parent component
      } else {
        console.error("Failed to unfavorite property", response);
      }
    } catch (error) {
      console.error("Error unfavoriting property", error);
    } finally {
      setIsRemoving(false);
      setOpenConfirmation(false);
    }
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  return (
    <>
      <div className="container">
        <div className="watchlist-list-section">
          <div
            className="row bg-row-list"
            style={{ boxShadow: "4px -10px 27px -19px rgba(0,0,0,0.1)" }}
          >
            <div className="col-lg-4 p-0" style={{ overflow: "hidden" }}>
              <img
                src={item.banner || "/assets/images/review-left-slide-3.png"}
                alt={item.title}
                className="project-list-image"
              />
            </div>
            <div className="col-lg-8 bg-hover-card">
              <div className="card project-list-card">
                <h6
                  className="Project-title"
                  style={{ color: "rgb(192, 135, 53)" }}
                >
                  RERA ID: {item.rera_no || "N/A"}
                </h6>
                <span className="badge-button bgprice-range-transperent">
                  {item.price_from || "N/A"} - {item.price_to || "N/A"}
                </span>
                <h2>{item.title}</h2>
                <ul className="location-list-project-list">
                  <li className="loction-list-pr" style={{ color: "black" }}>
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/map-icon.svg"
                      alt="img"
                      className="map-location-icon"
                    />
                    <span
                      style={{ color: "rgb(120, 120, 120)", paddingRight: 2 }}
                    >
                      At
                    </span>
                    {item.location || "N/A"}
                  </li>
                  <li className="loction-list-pr group-builder mt-2">
                    <span
                      style={{ color: "rgb(120, 120, 120)", paddingRight: 10 }}
                    >
                      By
                    </span>
                    {item.builder_name || "Unknown Builder"}
                  </li>
                </ul>
                <ul className="features-list pl-0">
                  {/* <li className="project-list-icons">
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                      className="amenties-icons"
                    />
                    {item.project_type || "N/A"}
                  </li> */}

                  <li className="project-list-icons">
                    <img
                      src={
                        item.project_type && item.project_type === "Commercial"
                          ? "/assets/images/Building.svg"
                          : "https://d3v1h55v8tucsz.cloudfront.net/assets/images/home-icon.svg"
                      }
                      className="amenties-icons"
                      alt={
                        item.project_type && item.project_type === "Commercial"
                          ? "Building Icon"
                          : "Home Icon"
                      }
                    />
                    {item.project_type}
                  </li>
                  <li className="project-list-icons">
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bed.svg"
                      className="amenties-icons"
                    />
                    {item.unit_size || "N/A"}
                  </li>
                  <li className="project-list-icons">
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/bath.svg"
                      className="amenties-icons"
                    />
                    {item.carpet_area || "N/A"}
                  </li>
                  <li className="view-btn-list">
                    <button
                      className="kss-btn"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/property-detail/${
                            item.id || slugify(item.title)
                          }/${slugify(item.title)}`
                        )
                      }
                    >
                      View Details
                    </button>
                  </li>
                  <li className="view-btn-list">
                    <button
                      className="delete-btn"
                      style={{ cursor: "pointer" }}
                      onClick={handleUnfavoriteClick}
                      disabled={isRemoving}
                    >
                      <img
                        src="/assets/images/delete-icon.svg"
                        alt="img"
                        className="info-img"
                      />
                      <span className="bg-color-theme">
                        {isRemoving ? "Removing..." : "Unfavourite"}
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Modal
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        BackdropProps={{
          sx: {
            backgroundColor: "rgb(0 0 0 / 67%) !important",
          },
        }}
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleCloseConfirmation}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <h6 className="text-center">
            Are you sure you want to unfavorite this property?
          </h6>
          <div className="text-center unfav-bts-section">
            <Button
              className="contact-us-btn"
              variant="contained"
              color="primary"
              onClick={handleConfirmUnfavorite}
              disabled={isRemoving}
              style={{ borderRadius: "0px" }}
            >
              Yes, Remove
            </Button>
            <Button
              style={{ borderRadius: "0px", marginLeft: "0rem" }}
              className="contact-us-btn mr-2 mdr-0"
              variant="outlined"
              color="secondary"
              onClick={handleCloseConfirmation}
              disabled={isRemoving}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default WatchlistItem;
