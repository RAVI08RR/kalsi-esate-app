import React from "react";

const PropertyInformation = () => {
  return (
    <div className="property-information-section">
      <div className="container">
        <div className="row">
          <div
            data-aos-delay="1000"
            data-aos="fade-right"
            // data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="col-lg-6"
          >
            <img
              src="assets/images/property-img-left.png"
              className="property-img"
              alt="img"
            />
          </div>

          <div
            data-aos-delay="1000"
            data-aos="fade-left"
            // data-aos-offset="100"
            data-aos-easing="ease-in-sine"
            className="col-lg-6 pl-5"
          >
            <div className=" project-review-description">
              <h2>Here’s How You Can Get The Best Property in India Online</h2>
              <p>
                The first question that comes to the mind of people when they
                are planning to buy a property is: how will I get the best
                property in India online?" If you are one of them, then you must
                know that this is not a difficult task at all. You just have to
                follow certain tips given below:
              </p>
              <div className="crad-grid-container">
                <div className="card card-project-review">
                  <img
                    src="assets/images/1property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Since</h6>
                  <h2 className="years">2015</h2>
                </div>
                <div className="card card-project-review">
                  <img
                    src="assets/images/2property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Property Listing</h6>
                  <h2 className="years">20K +</h2>
                </div>

                <div className="card card-project-review">
                  <img
                    src="assets/images/3property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Real Estate Advisors</h6>
                  <h2 className="years">20K +</h2>
                </div>
                <div className="card card-project-review">
                  <img
                    src="assets/images/4property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Flats Pan-India</h6>
                  <h2 className="years">2000</h2>
                </div>
                <div className="card card-project-review">
                  <img
                    src="assets/images/5property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Branded Developers</h6>
                  <h2 className="years">1000 +</h2>
                </div>
                <div className="card card-project-review">
                  <img
                    src="assets/images/6property-icon.svg"
                    className="crad-review-icon"
                    alt="img"
                  />
                  <h6 className="since">Customer Satisfaction</h6>
                  <h2 className="years">95%</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInformation;
