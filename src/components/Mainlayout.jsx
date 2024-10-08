import React, { useState } from "react";
import { Box } from "@mui/material";
import {
  FavoriteContent,
  ProfileContent,
  LogoutContent,
  Changepasswordcontent,
} from "./FavoriteContent";
import SidebarTabslist from "./SidebarTabslist";
import Header from "./Header";

const MainLayout = ({cities}) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (newValue) => {
    setCurrentTab(newValue);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 0:
        return <FavoriteContent />;
      case 1:
        return <ProfileContent />;
      case 2:
        return <Changepasswordcontent />;
      case 3:
        return <LogoutContent />;
      default:
        return <div>No content</div>;
    }
  };

  return (
    <>
      <Header showBg={true} cities={cities}/>
      <Box sx={{ display: "flex" }} className="main-section-admin-container">
        <SidebarTabslist onTabChange={handleTabChange} />
        <Box component="main" sx={{ flexGrow: 1, p: 0 }}>
          {renderContent()}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
