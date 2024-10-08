import React from "react";

const FeaturesComponent = () => {
  return (
    <>
      <div className="container pt-5 pb-5 p-2">
        <h2 className="text-center text-white  mb-4 ">Features</h2>
        <div className="row">
          <div className="col-md-3">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-delay="300"
              className="card text-center feature-card"
            >
              <div className="card-body">
                <img
                  src="assets/images/about-us-images/ab-f-1.svg"
                  alt="img"
                  className="icon-f-ab"
                />
                <h5 className="card-title pt-2 ">Personalized Assistance</h5>
                <p className="card-text">
                  Say goodbye to cookie-cutter solutions! We take the time to
                  understand your needs and budget, crafting tailored
                  recommendations just for you.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-delay="600"
              className="card text-center feature-card"
            >
              <div className="card-body">
                <img
                  src="assets/images/about-us-images/ab-f-2.svg"
                  alt="img"
                  className="icon-f-ab"
                />
                <h5 className="card-title">Exclusive Partnerships</h5>
                <p className="card-text">
                  With top builders and developers in our network, we bring you
                  a diverse range of projects, including luxurious flats backed
                  by RERA certification.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-delay="800"
              className="card text-center feature-card"
            >
              <div className="card-body">
                <img
                  src="assets/images/about-us-images/ab-f-3.svg"
                  alt="img"
                  className="icon-f-ab"
                />
                <h5 className="card-title">Mumbai Insights</h5>
                <p className="card-text">
                  Stay ahead of the curve with our insider knowledge on Mumbai's
                  developing landscape, covering everything from infrastructure
                  projects to educational institutions.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              data-aos-delay="1000"
              className="card text-center feature-card"
            >
              <div className="card-body">
                <img
                  src="assets/images/about-us-images/ab-f-4.svg"
                  alt="img"
                  className="icon-f-ab"
                />
                <h5 className="card-title">Stellar Support</h5>
                <p className="card-text">
                  Our dedication doesn't end at the sale; we're committed to
                  providing ongoing support and guidance to ensure your utmost
                  satisfaction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturesComponent;
