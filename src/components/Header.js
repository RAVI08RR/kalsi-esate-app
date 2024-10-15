import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PopupHeader from "./PopupHeader";
import PopupmenuMobile from "./PopupmenuMobile";
import { CityIdContext, CityNameContext } from "../App";
import { allcitiesprojects } from "../apis/callbacks";
import { useMediaQuery } from "react-responsive";

const Header = ({ showBg, cityName, cities }) => {
  const { city } = useContext(CityNameContext);
  const { storeCityId } = useContext(CityIdContext);
  const { cityId } = useContext(CityIdContext);
  const [scroll, setScroll] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupMobileOpen, setisPopupMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [storedCityName, setStoredCityName] = useState(
    localStorage.getItem("cityName")
  );
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  // const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const token = localStorage.getItem("authToken");

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const isActive = (path) => window.location.pathname === path;

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    handleMenuClose();
    navigate("/login");
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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "cityName") {
        setStoredCityName(event.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     try {
  //       const citylist = await allcitiesprojects();
  //       setCities(citylist.locations);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };
  //   fetchCities();
  // }, []);

  const handleCityChange = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const newCity = selectedOption.value;
    const cityId = selectedOption.getAttribute("data-id");
    storeCityId(cityId);
    localStorage.setItem("cityName", newCity);
    localStorage.setItem("cityId", cityId);
    window.location.reload();
    setStoredCityName(newCity);
  };

  const getToggleSrcAndClass = (scroll, currentPath, isMobile) => {
    if (currentPath === "/") {
      const toggleSrc = scroll
        ? "/assets/images/Mobile-menu-white.svg" // Logo on scroll
        : isMobile
        ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/mobile-menu-icon.svg" // Mobile logo
        : "https://d3v1h55v8tucsz.cloudfront.net/assets/images/menu-icon.svg"; // Default logo

      const toggleClass = ` ${scroll ? "scrolled-logo" : ""}`;

      return { toggleSrc, toggleClass };
    } else {
      const toggleSrc = isMobile
        ? "/assets/images/Mobile-menu-white.svg" // Mobile logo
        : "https://d3v1h55v8tucsz.cloudfront.net/data/menu-icon.svg"; // Default logo

      const toggleClass = "toggle-icon-menu";

      return { toggleSrc, toggleClass };
    }
  };

  const { toggleSrc, toggleClass } = getToggleSrcAndClass(
    scroll,
    currentPath,
    isMobile
  );

  const getLogoSrcAndClass = (scroll, currentPath, isMobile) => {
    if (currentPath === "/") {
      // On the homepage
      const logoSrc = scroll
        ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/Logo-main.svg" // Logo on scroll (could be white or with different styling)
        : isMobile
        ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/mobile-logo.svg" // Mobile logo
        : "https://d3v1h55v8tucsz.cloudfront.net/data/Logo-main.svg"; // Default logo

      const logoClass = `logo-main ${scroll ? "scrolled-logo" : ""}`;

      return { logoSrc, logoClass };
    } else {
      // On other pages
      const logoSrc = isMobile
        ? "https://d3v1h55v8tucsz.cloudfront.net/assets/images/Logo-main.svg" // Mobile logo
        : "https://d3v1h55v8tucsz.cloudfront.net/assets/images/Logo-main.svg"; // Default logo

      const logoClass = "logo-main";

      return { logoSrc, logoClass };
    }
  };

  const { logoSrc, logoClass } = getLogoSrcAndClass(
    scroll,
    currentPath,
    isMobile
  );

  // for toggle icon

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-transpernet fixed-top ${
        scroll ? "scroll-background" : "#0C0C0C"
      }`}
      id="home-header"
      style={{ background: showBg && "#0C0C0C" }}
    >
      <div className="container p-2">
        <a className="navbar-brand" href="/">
          <img
            // src="/assets/images/Logo-main.svg"
            // className="logo-main"
            // alt="Logo"
            // src={
            //   isMobile
            //     ? "/assets/images/mobile-logo.svg" // Mobile logo
            //     : "/assets/images/Logo-main.svg" // Web logo
            // }
            // className={`logo-main ${
            //   scroll && currentPath === "/" ? "scrolled-logo" : ""
            // }`}

            src={logoSrc}
            className={logoClass}
            alt="Logo"
            loading="lazy"
            // src={
            //   scroll && currentPath === "/"
            //     ? "/assets/images/Logo-main.svg" // Scroll logo
            //     : isMobile
            //     ? "/assets/images/mobile-logo.svg" // Mobile logo
            //     : "/assets/images/Logo-main.svg" // Web logo
            // }
            // className={`logo-main ${scroll ? "scrolled-logo" : ""}`}
            // alt="Logo"
          />
        </a>
        <ul className="navbar-nav">
          {currentPath !== "/" && (
            <li className="nav-item">
              <select
                className="header-select"
                value={storedCityName || ""}
                onChange={handleCityChange}
              >
                {storedCityName && (
                  <option value={storedCityName}>{storedCityName}</option>
                )}
                {cities
                  .filter((i) => i?.location !== storedCityName)
                  .map((i, index) => (
                    <option key={index} value={i?.location} data-id={i?.id}>
                      {i?.location}
                    </option>
                  ))}
              </select>
            </li>
          )}
        </ul>
        <button className="navbar-toggler" type="button">
          <button
            type="submit"
            className="menu-popup"
            onClick={handlemobileOpenPopup}
          >
            <img
              src={toggleSrc}
              className={`menu-icon-toggle ${toggleClass}`}
              alt="menu-icon"
              loading="lazy"
            />
            {/* <img
              // src="/assets/images/menu-icon.svg"
              src={
                isMobile
                  ? "/assets/images/mobile-menu-icon.svg" // Mobile logo
                  : "/assets/images/menu-icon.svg" // Web logo
              }
              className="menu-icon-toggle {logoClass}"
              alt="img"
            /> */}
          </button>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav m-auto">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  isActive("/new-launch") ? "active" : ""
                }`}
                aria-current="page"
                href="/new-launch"
              >
                New Launch
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  isActive("/residential-projects") ||
                  isActive("/commercial-projects") ||
                  isActive("/plots")
                    ? "active"
                    : ""
                }`}
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
                  <a
                    className={`dropdown-item ${
                      isActive("/residential-projects") ? "active" : ""
                    }`}
                    href="/residential-projects"
                  >
                    Residential
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      isActive("/commercial-projects") ? "active" : ""
                    }`}
                    href="/commercial-Projects"
                  >
                    Commercial
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      isActive("/plots") ? "active" : ""
                    }`}
                    href="/plots"
                  >
                    Plots
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  isActive("/hot-projects") ? "active" : ""
                }`}
                aria-current="page"
                href="/hot-projects"
              >
                Hot Projects
              </a>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <button type="button" className="contact-us-btn">
                <a
                  className=""
                  style={{ textDecoration: "none", color: "white" }}
                  href="/contact-us"
                >
                  {" "}
                  Enquire us
                </a>
              </button>
            </li>
            <li>
              <button
                type="submit"
                className="menu-popup"
                onClick={handleOpenPopup}
              >
                <img
                  src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/menu-icon.svg"
                  className="menu-icon-toggle"
                  alt="img"
                  loading="lazy"
                />
              </button>
            </li>
            <li className="nav-item">
              <Button
                aria-controls="profile-menu"
                aria-haspopup="true"
                onClick={handleMenuClick}
              >
                {token ? (
                  <>
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/expert-profile.png"
                      className="profile-icon-login"
                      alt="User Profile"
                      loading="lazy"
                    />
                    <span className="user text-white nav-link">My Account</span>
                  </>
                ) : (
                  <>
                    <img
                      src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/Profile.svg"
                      className="profile-icon"
                      alt="Default Profile"
                      loading="lazy"
                    />
                    <span className="user text-white nav-link">
                      Login or Register
                    </span>
                  </>
                )}
              </Button>
              <Menu
                id="profile-menu"
                style={{ borderRadius: "0px" }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {token ? (
                  <>
                    <MenuItem
                      onClick={handleMenuClose}
                      component={Link}
                      to="/admin"
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleMenuClose}
                      component={Link}
                      to="/admin"
                    >
                      My Favorite
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </>
                ) : (
                  <MenuItem
                    onClick={handleMenuClose}
                    component={Link}
                    to="/login"
                  >
                    Login or Signup
                  </MenuItem>
                )}
              </Menu>
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

export default Header;
