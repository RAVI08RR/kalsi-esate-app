import React, { useState, useEffect } from "react";
import PopupHeader from "./PopupHeader";
import { Button } from "@mui/material";
import PopupmenuMobile from "./PopupmenuMobile";

const InnerpageHeader = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupMobileOpen, setisPopupMobileOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handlemobileOpenPopup = () => {
    setisPopupMobileOpen(true);
  };

  const handleCloseMobilePopup = () => {
    setisPopupMobileOpen(false);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-transpernet fixed-top"
      style={{ background: "#0C0C0C" }}
      //   id="home-header"
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="/assets/images/Logo-main.svg"
            className="logo-main"
            alt="Logo"
          />
        </a>
        <button className="navbar-toggler" type="button">
          <button
            type="submit"
            className="menu-popup"
            onClick={handlemobileOpenPopup}
          >
            <img
              src="assets/images/menu-icon.svg"
              className="menu-icon-toggle"
              alt="img"
            />
          </button>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                New Launch
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Projects
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Residential
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Commercial
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Plots
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hot Projects
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button type="button" className="contact-us-btn">
                Enquire us
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="menu-popup"
                onClick={handleOpenPopup}
              >
                <img
                  src="assets/images/menu-icon.svg"
                  className="menu-icon-toggle"
                  alt="img"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
      <PopupHeader open={isPopupOpen} onClose={handleClosePopup} />
      <PopupmenuMobile
        open={isPopupMobileOpen}
        onClose={handleCloseMobilePopup}
      />
    </nav>
  );
};

export default InnerpageHeader;
