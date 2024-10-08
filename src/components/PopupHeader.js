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
import { a } from "react-router-dom";
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
          <buthrefn
            className="close-btn"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <img
              src="/assets/images/cross-icon.svg"
              alt="img"
              className="popup-close-menu-icon"
            />
          </buthrefn>
        </li>
      </ul>

      {/* <IconButhrefn
        className="close-btn"
        onClick={onClose}
        aria-label="Close drawer"
      >
        x
      </IconButhrefn> */}

      <ul className="menu-container">
        <a className="text-black-nav" href="/">
          <li className="nav-link-btn">Home</li>
        </a>

        <a className="text-black-nav" href="/about-us">
          <li className="nav-link-btn ">About us</li>
        </a>
        <a className="text-black-nav" href="/home-loan">
          <li className="nav-link-btn">Loans</li>
        </a>

        <a className="text-black-nav" href="/hrefp-builder">
          <li className="nav-link-btn">Top Builders</li>
        </a>

        <a className="text-black-nav" href="/blog-list">
          <li className="nav-link-btn">News and Blogs</li>
        </a>

        <a className="text-black-nav contact-btn" href="/contact-us">
          <li className="contact-list">Contact</li>
        </a>
      </ul>

      <div className="contact-menu">
        <ul className="contact-menu">
          <li className="social-icons">
            <img
              src="/assets/images/footer-images/Facebook.svg"
              className="header-socail-icons"
              alt="img"
            />
          </li>
          <li className="social-icons">
            <img
              src="/assets/images/footer-images/instagram.svg"
              alt="Facebook"
              className="header-socail-icons"
            />
          </li>

          <li className="social-icons">
            <img
              src="/assets/images/footer-images/twiteer.svg"
              alt="Facebook"
              className="header-socail-icons"
            />
          </li>

          <li className="social-icons">
            <img
              src="/assets/images/footer-images/youtube.svg"
              className="header-socail-icons"
              alt="img"
            />
          </li>
        </ul>
      </div>
    </Drawer>
  );
};

export default PopupHeader;
