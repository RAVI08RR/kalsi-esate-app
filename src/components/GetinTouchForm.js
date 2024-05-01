import React from "react";

const GetinTouchForm = () => {
  return (
    <div className="container-fluid p-0  mt-5">
      <div className="row g-0">
        <div className="col-lg-6 bg-contact-form">
          <div className="form-container">
            <h2 className="text-white">Get in touch</h2>
            <p className="text-white">Leave details for your project</p>
            <form className="mt-5">
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control input-get-in-touch"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-5">
                <input
                  type="email"
                  className="form-control input-get-in-touch"
                  placeholder="Your Email"
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  className="form-control input-get-in-touch"
                  placeholder="Your Phone"
                />
              </div>
              <div className="mb-5">
                <textarea
                  className="form-control input-get-in-touch"
                  rows="3"
                  placeholder="Message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn btn-primary submit-btn-contact "
              >
                Send Enquiry
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-6 ">
          <img
            src="/assets/images/contact-img.png"
            className="img-fluid"
            alt="City Skyline"
          />
        </div>
      </div>
    </div>
  );
};

export default GetinTouchForm;
