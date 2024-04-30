import React, { useState, useEffect } from "react";
import PopupHeader from "./PopupHeader";
import { Button } from "@mui/material";
const Header = () => {
  const [scroll, setScroll] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scroll) {
        setScroll(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scroll]);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-transpernet fixed-top ${
        scroll ? "scroll-background" : "#0C0C0C"
      }`}
      id="home-header"
    >
      <div className="container">
        <a className="navbar-brand" href="#">
          <img
            src="/assets/images/Logo-main.svg"
            className="logo-main"
            alt="Logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav  mb-2 mb-lg-0 ml-5">
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
            <li className="nav-item dropdown">
              <button type="button" className="contact-us-btn">
                Enquire us
              </button>
            </li>
          </ul>
          <ul className="menu-toggle-btn">
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
    </nav>
  );
};

export default Header;
