import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./HomeLaon.css";
import HomeLoanSliderComponents from "./HomeLoanSliderComponents";
import EMIcalculatorFrom from "./EMICalculatorForm";
import GetinTouchForm from "./GetinTouchForm";
import Talkexpertimg from "./icons/expert-talk.png";
import Homeloantypecomponents from "./Homeloantypecomponents";
// import Homeloantypecomponents from "./Homeloantypecomponents";
const HomeloanComponents = () => {
  return (
    <>
      <div className="container mt-5">
        <Breadcrumb
          className="menu-breadcrumb-items "
          style={{ marginTop: "6rem" }}
        >
          <Breadcrumb.Item className="breadcrumb-link" href="/">
            Home
          </Breadcrumb.Item>

          <Breadcrumb.Item className="breadcrumb-link" active>
            Loans
          </Breadcrumb.Item>
        </Breadcrumb>

        <h2
          className="text-center slider-heading "
          style={{ color: "#C08735", padding: "0px" }}
        >
          Loans
        </h2>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="200"
        className="container-fluid p-0  mt-0"
      >
        <div className="row g-0 loan-row">
          <div className="col-lg-6 ">
            <img
              src="/assets/images/home-loan-left.png"
              className="img-fluid"
              alt="City Skyline"
            />
          </div>

          <div className="col-lg-6" style={{ backgroundColor: "#C08735" }}>
            <div className="loan-descriptions">
              <h2 className="text-white">Home Loan</h2>
              <p className="text-white">
                Welcome to our Home Loan page! As a leading real estate portal,
                we proudly showcase properties from top vendors and builders,
                helping clients find their dream homes. To further assist you in
                your journey, we’ve created this dedicated page to provide
                essential information on home loan services available in the
                market. Whether you're a first-time buyer or looking to upgrade,
                we've got you covered with the details you need.
              </p>
              <p className="text-white">
                Explore the information here, and you’ll find it easier than
                ever to secure a home loan that fulfills your dream of owning
                the perfect property. We're here to support you every step of
                the way, making your property journey as smooth and informed as
                possible!
              </p>

              {/* <button type="button" className="view-detail-btn bgwhite">
                View Details
              </button> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <h2 className="text-center mt-5"> Home Loan Offered By</h2>
        <HomeLoanSliderComponents />
      </div>

      <div className="container emi-cal-bg">
        <div className="row">
          <EMIcalculatorFrom classname="emi-cal-bg-home-loan" />
        </div>
      </div>

      <div className="container talk-expert p-0">
        <GetinTouchForm
          title="Talk to Expert"
          discription="Expert Solutions for Every Project"
          buttonText="Send Enquiry"
          imageUrl={Talkexpertimg}
          classname="submit-btn-contact expertbtn"
        />
      </div>

      <div className="get-home-loan-type">
        <Homeloantypecomponents />
      </div>
    </>
  );
};

export default HomeloanComponents;
