import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";

const PopupmenuMobile = ({ open, onClose }) => {
  const [openMenu, setOpenMenu] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Drawer
      className="popup-menu-drawer"
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{ width: 300 }} // Adjust the width value as needed
    >
      <ul className="menu-header">
        <li className="menu-border-list">
          <p className="menu-before-border"></p> menu{" "}
        </li>
        <li>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <img src="/assets/images/cross-icon.svg" />
          </button>
        </li>
      </ul>

      {/* <IconButton
        className="close-btn"
        onClick={onClose}
        aria-label="Close drawer"
      >
        x
      </IconButton> */}

      <ul className="menu-container">
        <a className="text-black-nav" href="/">
          <li className="nav-link-btn">Home</li>
        </a>

        <a className="text-black-nav" href="/new-launch">
          <li className="nav-link-btn">New Launch</li>
        </a>

        <a className="text-black-nav" href="/residential-projects">
          <li className="nav-link-btn ">Residential</li>
        </a>

        <a className="text-black-nav" href="/commercial-Projects">
          <li className="nav-link-btn ">Commercial</li>
        </a>
        <a className="text-black-nav" href="/plots">
          <li className="nav-link-btn ">Plots</li>
        </a>

        <a className="text-black-nav" href="/hot-projects">
          <li className="nav-link-btn "> Hot Projects</li>
        </a>

        <a className="text-black-nav" href="/top-builder">
          <li className="nav-link-btn ">Top Builders</li>
        </a>
        <a className="text-black-nav" href="/about-us">
          <li className="nav-link-btn "> About Us</li>
        </a>

        <a className="text-black-nav" href="/blog-list">
          <li className="nav-link-btn "> News and Blogs</li>
        </a>

        <a className="text-black-nav" href="/home-loan">
          <li className="nav-link-btn">Loans</li>
        </a>
        <a className="text-black-nav contact-btn" href="/contact-us">
          <li className="contact-list">Contact us</li>
        </a>
      </ul>

      <div className="contact-menu">
        <ul className="contact-menu">
          <li className="social-icons"> </li>
          <li className="social-icons"> </li>
        </ul>
      </div>
    </Drawer>
  );
};

export default PopupmenuMobile;
