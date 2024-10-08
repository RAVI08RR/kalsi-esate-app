import React from "react";
import { Typography, Box } from "@mui/material";
import Watchlist from "./Watchlist";
import LoginPagecomponent from "./LoginPagecomponent";
import ChangePasswordpage from "./ChangePasswordpage";
import UpdateProfile from "./UpdateProfile";
import WebsiteLoginComponent from "./WebsiteLoginComponent";

export const FavoriteContent = () => (
  <Box className="mt-5 dashbord-content">
    <Typography
      variant="h4"
      className="pt-5 pl-2 text-center kss-primary-bg kss-fs-40 mt-0 mb-2 text-center "
    >
      My Favorites
    </Typography>
    <Watchlist />
  </Box>
);

export const ProfileContent = () => (
  <Box className="p-5 mt-5 dashbord-content">
    {/* <Typography variant="h4">Profile</Typography> */}
    <UpdateProfile />
  </Box>
);
export const Changepasswordcontent = () => (
  <Box className="p-5 mt-5 dashbord-content">
    {/* <Typography variant="h4">Logout</Typography>
    <Typography>Are you sure you want to logout?</Typography> */}
    <ChangePasswordpage />
  </Box>
);

export const LogoutContent = () => (
  <Box className="p-5 mt-5 dashbord-content">
    {/* <Typography variant="h4">Logout</Typography>
    <Typography>Are you sure you want to logout?</Typography> */}
    <WebsiteLoginComponent />
  </Box>
);
