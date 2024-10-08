import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { ReactComponent as FavoriteIcon } from "./icons/favrate-icon.svg";
import { ReactComponent as PersonIcon } from "./icons/Profile.svg";
import { ReactComponent as LogoutIcon } from "./icons/share-circle-line.svg";
import { ReactComponent as LockIcon } from "./icons/lockpassscreen.svg";

const SidebarTabslist = ({ onTabChange }) => {
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    onTabChange(newValue); // Notify parent component of tab change
  };

  return (
    <Box
      className="sidebar-list-section"
      sx={{
        borderRight: 0,
        borderColor: "divider",
        width: "200px",
        bgcolor: "black",
        marginTop: "3rem",
      }}
    >
      <Tabs
        className="tabs-btn text-white mt-5 tabs-container-mb"
        value={tabValue}
        onChange={handleTabChange}
        orientation="vertical"
        variant="scrollable"
        aria-label="sidebar tabs"
        sx={{
          "@media (max-width:600px)": {
            flexDirection: "row", // Horizontal layout for mobile
            overflowX: "auto",
            borderBottom: "1px solid gray",
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      >
        <Tab
          className="tabs-items text-white"
          icon={<FavoriteIcon />}
          iconPosition="start"
          label="My Favorite"
        />
        <Tab
          className="tabs-items text-white"
          icon={<PersonIcon />}
          iconPosition="start"
          label="Profile"
        />
        <Tab
          className="tabs-items text-white"
          icon={<LockIcon />}
          iconPosition="start"
          label="Change Password"
        />

        <Tab
          className="tabs-items text-white"
          icon={<LogoutIcon />}
          iconPosition="start"
          label="Logout"
        />
      </Tabs>
    </Box>
  );
};

export default SidebarTabslist;

// import React from "react";
// import { Tabs, Tab, Box } from "@mui/material";
// import { ReactComponent as FavoriteIcon } from "./icons/favrate-icon.svg";
// import { ReactComponent as PersonIcon } from "./icons/Profile.svg";
// import { ReactComponent as LogoutIcon } from "./icons/share-circle-line.svg";

// const SidebarTabslist = ({ onTabChange }) => {
//   const [tabValue, setTabValue] = React.useState(0);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     onTabChange(newValue); // Notify parent component of tab change
//   };

//   return (
//     <Box
//       className="sidebar-list-section"
//       sx={{
//         borderRight: 0,
//         borderColor: "divider",
//         width: "100%",
//         maxWidth: "200px", // Set max width for larger screens
//         bgcolor: "black",
//         marginTop: "3rem",
//         display: "flex",
//         flexDirection: "column",
//         "@media (max-width:600px)": {
//           flexDirection: "column", // Keep vertical layout on mobile
//         },
//       }}
//     >
//       <Tabs
//         className="tabs-btn text-white mt-5"
//         value={tabValue}
//         onChange={handleTabChange}
//         orientation="horizontal" // Ensure horizontal orientation
//         variant="scrollable"
//         aria-label="sidebar tabs"
//         sx={{
//           "@media (max-width:600px)": {
//             flexDirection: "row", // Horizontal layout for mobile
//             overflowX: "auto",
//             borderBottom: "1px solid gray",
//             display: "flex",
//             justifyContent: "space-between",
//           },
//         }}
//       >
//         <Tab
//           className="tabs-items text-white"
//           icon={<FavoriteIcon />}
//           iconPosition="start"
//           label="My Favorite"
//         />
//         <Tab
//           className="tabs-items text-white"
//           icon={<PersonIcon />}
//           iconPosition="start"
//           label="Profile"
//         />
//         <Tab
//           className="tabs-items text-white"
//           icon={<LogoutIcon />}
//           iconPosition="start"
//           label="Logout"
//         />
//       </Tabs>
//     </Box>
//   );
// };

// export default SidebarTabslist;
