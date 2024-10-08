import React from "react";
import BreadcrumbComponent from "./BreadcrumbComponent";

import ContactusForm from "./ContactusForm";
import StyledMap from "./StyledMap";
const Contactuscomponent = () => {
  const breadcrumbItems = [
    { label: "Home", href: "/", active: false },
    { label: "Contact us", active: true },
  ];
  return (
    <div>
      <div className="container mt-5 pb-2">
        <BreadcrumbComponent items={breadcrumbItems} headingText="CONTACT US" />
      </div>
      <div className="conatct-us-section mb-5 ">
        <div className="container">
          <div
            className="row kss-align-item-center"
            style={{ backgroundColor: "#f7f7f7" }}
          >
            <div className="col-lg-6">
              <ContactusForm />
            </div>

            <div className="col-lg-6 p-0">
              <img
                src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/conatct-us-right.webp"
                alt="img"
                className="contact-us-img w-100 h-100"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container  md-p-10 lg-p-0">
        <div className="row">
          <div className="col-lg-4">
            <div className="card info-contact-card">
              <a href="tel:+917400138561">
                <ul className="contact-info-list">
                  <li className="conatct-info-items">
                    <img
                      src="/assets/images/footer-images/phone.svg"
                      className="contact-socails-links-icons"
                    />
                    Phone{" "}
                  </li>
                  <span>+91 7400138561</span>
                </ul>
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card info-contact-card">
              <a
                className="list-contact-link"
                href="mailto:info@kalsiestate.com"
              >
                <ul className="contact-info-list">
                  <li className="conatct-info-items">
                    <img
                      src="/assets/images/email-c-icon.svg"
                      className="contact-socails-links-icons"
                    />
                    Email
                  </li>
                  <span>info@kalsiestate.com</span>
                </ul>
              </a>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card info-contact-card">
              <a className="list-contact-link" href="">
                <ul className="contact-info-list">
                  <li className="conatct-info-items">
                    <img
                      src="/assets/images/map-c.svg"
                      className="contact-socails-links-icons"
                    />
                    Location
                  </li>
                  <span>
                    2/A,702, Dheeraj Upvan II, W.E. Highway,
                    <br className="mb-br-none"></br>
                    Borivali(E), Mumbai-400046
                  </span>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container p-0 mb-5">
        <StyledMap
          latitude={19.23496}
          longitude={72.85976}
          zoom={12}
          height={550}
          apiKey="AIzaSyCF46BL8RTxp77pZ3r3MtvEd0NuTuRmXW8"
        />
      </div>
    </div>
  );
};

export default Contactuscomponent;
