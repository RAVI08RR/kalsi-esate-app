import React, { useState, useEffect } from "react";
import Newsletercomponet from "./Newsletercomponet";
import { allcitiesprojects } from "../apis/callbacks";
import { useNavigate } from "react-router-dom";

const Footer = ({ cities }) => {
  const navigate = useNavigate();
  // const [cities, setCities] = useState([]);

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

  const handleNavigation = (url, state) => {
    // Navigate to the new page with the given state
    navigate(url, { state });

    // Perform actions after navigation
    setTimeout(() => {
      // Scroll to the top smoothly
      // window.location.reload();
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Reload the page after scrolling is initiated
    }, 40); // Adjust this timeout as needed
  };

  return (
    <footer className="text-white py-5 footer-bg-img">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 footer-menu-border">
            <h5 className="footer-menu-head">New Launch Properties</h5>
            <ul className="list-unstyled">
              {cities.map((city) => (
                <li key={city.id}>
                  <a
                    target="_blank"
                    onClick={() =>
                      handleNavigation(`/new-launchs/${city.id}`, {
                        cityId: city.id,
                        cityName: city.location,
                      })
                    }
                    className="text-white footer-nav-links"
                  >
                    New Launch in {city.location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 footer-menu-border">
            <h5 className="footer-menu-head">Residential Properties</h5>
            <ul className="list-unstyled">
              {cities.map((city, idx) => (
                <li key={idx}>
                  <a
                    onClick={() =>
                      handleNavigation(
                        `/residential-projects-list/${city.id}`,
                        {
                          cityId: city.id,
                          cityName: city.location,
                        }
                      )
                    }
                    className="text-white footer-nav-links"
                  >
                    Residential Properties in {city.location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 footer-menu-border">
            <h5 className="footer-menu-head">Commercial Properties</h5>
            <ul className="list-unstyled">
              {cities.map((city) => (
                <li key={city.id}>
                  <a
                    onClick={() =>
                      handleNavigation(`/commercial-projects-list/${city.id}`, {
                        cityId: city.id,
                        cityName: city.location,
                      })
                    }
                    className="text-white footer-nav-links"
                  >
                    Commercial Properties in {city.location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 footer-menu-border last-list">
            <h5 className="footer-menu-head">Plots FOR SALE</h5>
            <ul className="list-unstyled">
              {cities.map((city) => (
                <li key={city.id}>
                  <a
                    onClick={() =>
                      handleNavigation(`/plots-projects-list/${city.id}`, {
                        cityId: city.id,
                        cityName: city.location,
                      })
                    }
                    className="text-white footer-nav-links"
                  >
                    Plots in {city.location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-4 logo-box-footer">
            <a href="#" className="navbar-brand">
              <img
                src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/Logo-main.svg"
                alt="Kalsi Estate Logo"
                className="img-logo-footer"
                width="200"
                height="35.103px"
              />
            </a>
            <div>
              <Newsletercomponet />
            </div>
          </div>
          <div className="col-lg-2">
            <h5 className="footer-menu-head">PROPERTIES IN INDIA</h5>
            <ul className="list-unstyled">
              {cities.map((city) => (
                <li className="footer-properties" key={city.id}>
                  <a
                    className="text-white footer-nav-links"
                    // href="/city-detail/delhi/2"

                    onClick={() =>
                      handleNavigation(
                        `/city-detail/${city.location}/${city.id}`,
                        {
                          state: { cityId: city.id, cityName: city.location },
                        }
                      )
                    }
                  >
                    {city.location}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-2">
            <h5 className="footer-menu-head">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="footer-properties">
                <a className="text-white footer-nav-links" href="/about-us">
                  About us
                </a>
              </li>
              <li className="footer-properties">
                <a className="text-white footer-nav-links" href="/home-loan">
                  Loan
                </a>
              </li>
              <li className="footer-properties">
                <a className="text-white footer-nav-links" href="/contact-us">
                  Contact us
                </a>
              </li>

              <li className="footer-properties">
                <a
                  className="text-white footer-nav-links"
                  href="/terms-condition"
                >
                  Terms and Conditions
                </a>
              </li>
              <li className="footer-properties">
                <a className="text-white footer-nav-links" href="/Desclaimer">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="footer-menu-head">GET IN TOUCH</h5>
            <ul className="list-unstyled footer-get-in-touch">
              <li>
                <a className="text-white footer-nav-links" href="/contact-us">
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/pin.svg"
                    className="footer-socails-links-icons"
                  />
                  2/A,702, Dheeraj Upvan II, W.E. Highway,
                  <br className="br-none-md"></br>
                  <span className="footer-address-sec">
                    {" "}
                    Borivali(E), Mumbai-400046
                  </span>
                </a>
              </li>

              <li>
                <a
                  className="text-white footer-nav-links"
                  href="mailto:info@kalsiestate.com"
                >
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/email.svg"
                    className="footer-socails-links-icons"
                  />
                  info@kalsiestate.com
                </a>
              </li>

              <li>
                <a
                  className="text-white footer-nav-links"
                  href="tel:+917400138561"
                >
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/phone.svg"
                    className="footer-socails-links-icons"
                  />
                  +91 7400138561
                </a>
              </li>
            </ul>
            <div className="mt-3 footer-socail-icons-container">
              <button className="btn-social-icons">
                <a
                  target="_blank"
                  href="https://www.youtube.com/channel/UCU1XfOJ-U_XeePncXMT4EIg"
                  className="social-icons-footer"
                >
                  <img
                    target="_blank"
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/youtube.svg"
                    alt="Facebook"
                    className="social-icons-footer-img"
                  />
                </a>
              </button>
              <button className="btn-social-icons">
                <a
                  target="_blank"
                  href="https://www.facebook.com/kalsiestate21"
                  className="social-icons-footer"
                >
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/Facebook.svg"
                    alt="Facebook"
                    className="social-icons-footer-img"
                  />
                </a>
              </button>

              <button className="btn-social-icons">
                <a
                  target="_blank"
                  href="https://www.instagram.com/kalsiestate/"
                  className="social-icons-footer"
                >
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/instagram.svg"
                    alt="Facebook"
                    className="social-icons-footer-img"
                  />
                </a>
              </button>

              <button className="btn-social-icons">
                <a
                  target="_blank"
                  href="https://x.com/kalsiestate"
                  className="social-icons-footer"
                >
                  <img
                    src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/twiteer.svg"
                    alt="Facebook"
                    className="social-icons-footer-img"
                  />
                </a>
              </button>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-md-12">
            <div className="copy-right-section">
              <p className="text-center">
                Kalsiestate &copy; 2024. All Rights Reserved..
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
