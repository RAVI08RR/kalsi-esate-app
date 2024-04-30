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

const PopupHeader = ({ open, onClose }) => {
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
            <img src="assets/images/cross-icon.svg" />
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

        <a className="text-black-nav" href="/experience">
          <li className="nav-link-btn ">About us</li>
        </a>
        <a className="text-black-nav" href="/partners">
          <li className="nav-link-btn">Loans</li>
        </a>

        <a className="text-black-nav contact-btn" href="/contact">
          <li className="contact-list">Contact</li>
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

export default PopupHeader;
