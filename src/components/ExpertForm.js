import React, { useState } from "react";

const ExpertForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    requiredLoan: "yes",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="expert-form-container">
      <h2>Talk to Expert</h2>
      <div className="expert-image">
        {/* Replace with your expert image */}
        <img src="/assets/images/expert-profile.png" alt="Expert" />
      </div>
      <p>Rajapushpa Eterna at Nanakramguda, Hyderabad</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="NAME"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="PHONE"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="required-loan">
          <h6>REQUIRED LOAN</h6>
          <div>
            <div className="checkbox-wrapper">
              <input id="terms-checkbox-37" name="checkbox" type="checkbox" />
              <label className="terms-label" for="terms-checkbox-37">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  class="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height="200" width="200"></rect>
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    stroke-width="40"
                    className="checkbox-box"
                    height="200"
                    width="200"
                  ></rect>
                  <path
                    stroke-width="15"
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  ></path>
                </svg>
                <span className="label-text">YES</span>
              </label>

              <input id="terms-checkbox-38" name="checkbox" type="checkbox" />
              <label className="terms-label" for="terms-checkbox-38">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  class="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height="200" width="200"></rect>
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    stroke-width="40"
                    className="checkbox-box"
                    height="200"
                    width="200"
                  ></rect>
                  <path
                    stroke-width="15"
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  ></path>
                </svg>
                <span className="label-text">No</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit">GET CALL BACK</button>
      </form>
    </div>
  );
};

export default ExpertForm;
