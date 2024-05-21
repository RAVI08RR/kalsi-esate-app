import React from "react";
import StyledMap from "./StyledMap";
import ExpertForm from "./ExpertForm";
import Projectplanslider from "./Projectplanslider";

const PropertycontentComponents = () => {
  return (
    <div className="Propertycontent-section">
      <div className="project-content-section-container">
        <div className=" project-content-section">
          <div className="about-project">
            <h6 className="Preview-title">Price 1.88 Cr-3.1 Cr</h6>
            <h2>Rajapushpa Eterna at Nanakramguda, Hyderabad</h2>
            <ul class="p-0">
              <li class="loction-list">
                <img
                  src="/assets/images/map-icon.svg"
                  alt="img"
                  class="map-location-icon"
                />
                At Nanakramguda, Telangana, India, Mumbai
              </li>
            </ul>

            <div className="property-boxes about-reviews">
              <div className="property-boxes-list">
                <img
                  src="/assets/images/Property-details-images/1bhk.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>
                  Unit Size
                  <br />
                  <span>1,2 BHK Flats</span>
                </h6>
              </div>
              <div className="property-boxes-list">
                <img
                  src="/assets/images/Property-details-images/carpet-area.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>
                  Carpet Area
                  <br />
                  <span>325-495 SQFT </span>
                </h6>
              </div>

              <div className="property-boxes-list">
                <img
                  src="/assets/images/Property-details-images/possession.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>
                  Possession <br />
                  <span>2025</span>
                </h6>
              </div>

              <div className="property-boxes-list">
                <img
                  src="/assets/images/Property-details-images/wallet-icon.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>
                  Rera
                  <br />
                  <span>PS0975778585</span>
                </h6>
              </div>
            </div>

            <h2 className="Project-title mt-5 pb-2">About Project</h2>
            <p className="project-description">
              Presenting a new legacy of SETHIA INFRASTRUCTURE ­ SETHIA AASHRAY.
              Set in a pleasant neighbourhood in the heart of Mumbai suburbs, a
              high­rise 23 storied tower with smart designs to maximize space.
              As a bonus Sethia Aashray will have furnished apartments by the
              best interior brand ­ U&Us, A Godrej Venture.
            </p>
            <p className="project-description">
              Beautifully designed apartments with tremendous care for our
              customer needs, be it smart spaces, incredible amenities or
              effortless connectivity all at a tremendously affordable price.
              More... 23 Floors High­Rise Tower 1 BHK & a Few Studio Apartments
              Furnished by U & Us­ A Godrej Venture Smart Spacious Design
              Amenities Grand Entrance Lobby Swimming Pool with Deck and Kids
              Pool Children's Play Area Fully-equipped Party Lawn Reflexology
              Path Fitness Center Landscaped Gardens Read less
            </p>
          </div>
          <div className="about-project indoor-container mt-2">
            <h2 className="Project-title pb-2">Amenities - Indoor</h2>

            <div className="property-boxes-outindoor-boxes">
              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/24.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>24/7 Concierge</h6>
              </div>
              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Wellness.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Wellness</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Housekeeping.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Housekeeping</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Personal.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Personal Trainers</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Residential.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Residential Manager</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Parking.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Valet Parking</h6>
              </div>
            </div>

            {/* our door amenites */}
            <h2 className="Project-title mt-5 pb-2">Amenities - Outdoor</h2>
            <div className="property-boxes-indoor-boxes">
              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/24.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>24/7 Concierge</h6>
              </div>
              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Wellness.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Wellness</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Housekeeping.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Housekeeping</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Personal.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Personal Trainers</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Residential.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Residential Manager</h6>
              </div>

              <div className="property-boxes-list-indoor-amenities">
                <img
                  src="/assets/images/Property-details-images/Parking.svg"
                  className="property-boxes-img"
                  alt="img"
                />
                <h6>Valet Parking</h6>
              </div>
            </div>
          </div>

          <div className="property-map mt-5">
            <div className="map-box">
              <h2 className=" Project-title pb-2 pt-2"> Map</h2>
              <StyledMap />
            </div>
          </div>
          <div className="Floorplan-section mt-5">
            <h2 className=" Project-title pb-2 pt-2"> Floor plan</h2>
            <Projectplanslider />
          </div>
        </div>
        <div className="project-sidebar">
          <ExpertForm />
        </div>
      </div>
    </div>
  );
};

export default PropertycontentComponents;
