// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import CloseIcon from "@mui/icons-material/Close";
// import IconButton from "@mui/material/IconButton";
// import LatestVideoComponentspopup from "./LatestVideoComponentspopup";
// // Import SVG images
// import propertyDetailsIcon from "./icons/sb-1.svg";
// import brochuresIcon from "./icons/sb-2.svg";
// import locationIcon from "./icons/sb-3.svg";
// import floorPlanIcon from "./icons/sb-f.svg";
// import siteLayoutsIcon from "./icons/sb-4.svg";
// import siteLetetestvideoIcon from "./icons/sb-6.svg";
// import ExpertForm from "./ExpertForm";
// import DownloadBroucherForm from "./DownloadBroucherForm";
// import { Padding } from "@mui/icons-material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 800,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   Padding: "0px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-end",
// };

// const InnerpageHeader = ({
//   locationRef,
//   propertyid,
//   downloadbrocherdata,
//   data,
// }) => {
//   console.log("pdf button data check", data);
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState(null);
//   const navbarRef = useRef(null);
//   const [isSticky, setIsSticky] = useState(false);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" });
//       setActiveSection(sectionId); // Update active section on click
//     }
//   };

//   const menuItems = [
//     {
//       icon: propertyDetailsIcon,
//       label: "Property Details",
//       onClick: () => scrollToSection("property-details"),
//       id: "property-details",
//     },
//     {
//       icon: brochuresIcon,
//       label: "Amenities",
//       onClick: () => scrollToSection("Amenities"),
//       id: "Amenities",
//     },
//     {
//       icon: locationIcon,
//       label: "Map",
//       onClick: () => scrollToSection("location"),
//       id: "location",
//     },
//     {
//       icon: floorPlanIcon,
//       label: "Floor Plan",
//       onClick: () => scrollToSection("floor-plan"),
//       id: "floor-plan",
//     },
//     {
//       icon: siteLayoutsIcon,
//       label: "Eco System",
//       onClick: () => scrollToSection("eco-system"),
//       id: "eco-system",
//     },
//     {
//       icon: siteLetetestvideoIcon,
//       label: "Latest Video",
//       onClick: () => scrollToSection("Latest-video"),
//       id: "Latest-video",
//     },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       const navbar = navbarRef.current;
//       if (navbar) {
//         setIsSticky(window.scrollY > navbar.offsetTop);
//       }
//     };

//     const sectionObserver = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveSection(entry.target.id);
//           }
//         });
//       },
//       { threshold: 0.6 }
//     );

//     const sections = document.querySelectorAll("section");
//     sections.forEach((section) => sectionObserver.observe(section));

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       sections.forEach((section) => sectionObserver.unobserve(section));
//     };
//   }, []);

//   return (
//     <nav
//       ref={navbarRef}
//       className="navbar navbar-expand-lg navbar-transpernet submenu-nav-header"
//       style={{
//         background: "rgb(255 255 255)",
//         position: isSticky ? "fixed" : "relative",
//         top: isSticky ? 0 : "-43px",
//         boxShadow: isSticky ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
//         zIndex: isSticky ? 99999 : "auto",
//         width: "100%",
//         padding: "0px",
//         transition: "top 0.3s ease-in-out",
//       }}
//     >
//       <div className="sub-menu-header">
//         <ul>
//           {menuItems.map((item, index) => (
//             <li
//               key={index}
//               className={`menu-item ${
//                 activeSection === item.id ? "active" : ""
//               }`}
//             >
//               <button onClick={item.onClick} className="menu-link">
//                 <img src={item.icon} alt={item.label} className="icon" />
//                 <span className="label">{item.label}</span>
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="container-btn-submenu">
//         <button
//           className="sub-menu-expert-btn"
//           onClick={scrollToSection("tak-expert")}
//         >
//           Talk to Expert
//           <img
//             src="/assets/images/Contact-Info.svg"
//             className="info-icon-menu"
//           />
//         </button>
//         {downloadbrocherdata && (
//           <button
//             className="sub-menu-download-brochure-btn"
//             onClick={handleOpen}
//           >
//             Download Brochure
//           </button>
//         )}

//         <Modal
//           className="video-pop-box-content"
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box className="video-pop-box-content-box" sx={style}>
//             <IconButton
//               className="btn-dwonload-brochure"
//               aria-label="close"
//               onClick={handleClose}
//               style={{ marginBottom: "10px" }}
//             >
//               <CloseIcon className="icon-close-btn-Brochure" />
//             </IconButton>
//             <DownloadBroucherForm DownloadBroucherFormid={propertyid} />
//           </Box>
//         </Modal>
//       </div>
//     </nav>
//   );
// };

// export default InnerpageHeader;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import DownloadBroucherForm from "./DownloadBroucherForm";
import propertyDetailsIcon from "./icons/sb-1.svg";
import brochuresIcon from "./icons/sb-2.svg";
import locationIcon from "./icons/sb-3.svg";
import floorPlanIcon from "./icons/sb-f.svg";
import siteLayoutsIcon from "./icons/sb-4.svg";
import siteLetetestvideoIcon from "./icons/sb-6.svg";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: "0px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
};

const InnerpageHeader = ({
  locationRef,
  propertyid,
  downloadbrocherdata,
  data,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeSection, setActiveSection] = useState(null);
  const navbarRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  const menuItems = [
    {
      icon: propertyDetailsIcon,
      label: "Property Details",
      onClick: () => scrollToSection("property-details"),
      id: "property-details",
    },
    {
      icon: brochuresIcon,
      label: "Amenities",
      onClick: () => scrollToSection("Amenities"),
      id: "Amenities",
    },
    {
      icon: locationIcon,
      label: "Map",
      onClick: () => scrollToSection("location"),
      id: "location",
    },
    {
      icon: floorPlanIcon,
      label: "Floor Plan",
      onClick: () => scrollToSection("floor-plan"),
      id: "floor-plan",
    },
    {
      icon: siteLayoutsIcon,
      label: "Eco System",
      onClick: () => scrollToSection("eco-system"),
      id: "eco-system",
    },
    {
      icon: siteLetetestvideoIcon,
      label: "Latest Video",
      onClick: () => scrollToSection("Latest-video"),
      id: "Latest-video",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const navbar = navbarRef.current;
      if (navbar) {
        setIsSticky(window.scrollY > navbar.offsetTop);
      }
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = document.querySelectorAll("section");
    sections.forEach((section) => sectionObserver.observe(section));

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => sectionObserver.unobserve(section));
    };
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="navbar navbar-expand-lg navbar-transpernet submenu-nav-header"
      style={{
        background: "rgb(255 255 255)",
        position: isSticky ? "fixed" : "relative",
        top: isSticky ? 0 : "-43px",
        boxShadow: isSticky ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
        zIndex: isSticky ? 99999 : "auto",
        width: "100%",
        padding: "0px",
        transition: "top 0.3s ease-in-out",
      }}
    >
      <div className="sub-menu-header">
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`menu-item ${
                activeSection === item.id ? "active" : ""
              }`}
            >
              <button onClick={item.onClick} className="menu-link">
                <img src={item.icon} alt={item.label} className="icon" />
                <span className="label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-btn-submenu">
        <button
          className="sub-menu-expert-btn"
          onClick={() => scrollToSection("talk-to-expert")}
        >
          Talk to Expert
          <img
            src="/assets/images/Contact-Info.svg"
            className="info-icon-menu"
          />
        </button>
        {downloadbrocherdata && (
          <button
            className="sub-menu-download-brochure-btn"
            onClick={handleOpen}
          >
            Download Brochure
          </button>
        )}

        <Modal
          className="video-pop-box-content"
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="video-pop-box-content-box" sx={style}>
            <IconButton
              className="btn-dwonload-brochure"
              aria-label="close"
              onClick={handleClose}
              style={{ marginBottom: "10px" }}
            >
              <CloseIcon className="icon-close-btn-Brochure" />
            </IconButton>
            <DownloadBroucherForm
              DownloadBroucherFormid={propertyid}
              onClose={handleClose}
            />
          </Box>
        </Modal>
      </div>
    </nav>
  );
};

export default InnerpageHeader;
