// import React, { useState } from "react";

// const ExpertForm = ({ addressTitle }) => {
//   console.log("addressTitle", addressTitle);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     requiredLoan: "yes",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission logic here
//     console.log(formData);
//   };

//   return (
//     <div className="expert-form-container">
//       <h2>Talk to Expert</h2>
//       <div className="expert-image">
//         {/* Replace with your expert image */}
//         <img src="/assets/images/expert-profile.png" alt="Expert" />
//       </div>
//       <p>{addressTitle}</p>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="name"
//           placeholder="NAME"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="PHONE"
//           value={formData.phone}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="EMAIL"
//           value={formData.email}
//           onChange={handleChange}
//         />
// <div className="required-loan">
//   <h6>REQUIRED LOAN</h6>
//   <div>
//     <div className="checkbox-wrapper">
//       <input id="terms-checkbox-37" name="checkbox" type="checkbox" />
//       <label className="terms-label" htmlFor="terms-checkbox-37">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 200 200"
//           className="checkbox-svg"
//         >
//           <mask fill="white" id="path-1-inside-1_476_5-37">
//             <rect height="200" width="200"></rect>
//           </mask>
//           <rect
//             mask="url(#path-1-inside-1_476_5-37)"
//             strokeWidth="40"
//             className="checkbox-box"
//             height="200"
//             width="200"
//           ></rect>
//           <path
//             strokeWidth="15"
//             d="M52 111.018L76.9867 136L149 64"
//             className="checkbox-tick"
//           ></path>
//         </svg>
//         <span className="label-text">YES</span>
//       </label>

//       <input id="terms-checkbox-38" name="checkbox" type="checkbox" />
//       <label className="terms-label" htmlFor="terms-checkbox-38">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 200 200"
//           className="checkbox-svg"
//         >
//           <mask fill="white" id="path-1-inside-1_476_5-37">
//             <rect height="200" width="200"></rect>
//           </mask>
//           <rect
//             mask="url(#path-1-inside-1_476_5-37)"
//             strokeWidth="40"
//             className="checkbox-box"
//             height="200"
//             width="200"
//           ></rect>
//           <path
//             strokeWidth="15"
//             d="M52 111.018L76.9867 136L149 64"
//             className="checkbox-tick"
//           ></path>
//         </svg>
//         <span className="label-text">No</span>
//       </label>
//     </div>
//           </div>
//         </div>
//         <button type="submit">GET CALL BACK</button>
//       </form>
//     </div>
//   );
// };

// export default ExpertForm;

import React, { useEffect, useState } from "react";
import { talktoexpertData } from "../apis/callbacks";
import Dialog from "@mui/material/Dialog";
import SuccessMessagePopup from "../components/SuccessMessagePopup"; // Adjust the path as needed

const ExpertForm = ({ addressTitle, propertyiddata }) => {
 
  const [formData, setFormData] = useState({
    property_id: propertyiddata,
    name: "",
    phone: "",
    email: "",
    required_loan: "1", // Default to "yes"
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      property_id: propertyiddata,
    }));
  }, [propertyiddata]);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.id === "terms-checkbox-37" ? "1" : "2";
    setFormData({ ...formData, required_loan: value });

    // Uncheck the other checkbox
    const otherCheckbox =
      e.target.id === "terms-checkbox-37"
        ? "terms-checkbox-38"
        : "terms-checkbox-37";
    document.getElementById(otherCheckbox).checked = false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await talktoexpertData(formData);
    if (response.success) {
      // Show success popup
      setShowSuccessPopup(true);
    } else {
      // Handle errors during form submission
      console.error(
        "Form submission errors:",
        response.errors || response.error
      );
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="expert-form-container">
      <h2>Talk to Expert</h2>
      <div className="expert-image">
        {/* Replace with your expert image */}
        <img src="/assets/images/expert-profile.png" alt="Expert" />
      </div>
      <p>{addressTitle}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="NAME"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="PHONE"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="required-loan">
          <h6>REQUIRED LOAN</h6>
          <div>
            <div className="checkbox-wrapper">
              <input
                id="terms-checkbox-37"
                name="required_loan"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={formData.required_loan === "1"}
                required
              />
              <label className="terms-label" htmlFor="terms-checkbox-37">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  className="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height="200" width="200"></rect>
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    strokeWidth="40"
                    className="checkbox-box"
                    height="200"
                    width="200"
                  ></rect>
                  <path
                    strokeWidth="15"
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  ></path>
                </svg>
                <span className="label-text">YES</span>
              </label>

              <input
                id="terms-checkbox-38"
                name="required_loan"
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={formData.required_loan === "2"}
              />
              <label className="terms-label" htmlFor="terms-checkbox-38">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 200 200"
                  className="checkbox-svg"
                >
                  <mask fill="white" id="path-1-inside-1_476_5-37">
                    <rect height="200" width="200"></rect>
                  </mask>
                  <rect
                    mask="url(#path-1-inside-1_476_5-37)"
                    strokeWidth="40"
                    className="checkbox-box"
                    height="200"
                    width="200"
                  ></rect>
                  <path
                    strokeWidth="15"
                    d="M52 111.018L76.9867 136L149 64"
                    className="checkbox-tick"
                  ></path>
                </svg>
                <span className="label-text">No</span>
              </label>
            </div>
          </div>
        </div>
        <button type="submit" onSubmit={() => handleSubmit()}>
          GET CALL BACK
        </button>
      </form>

      {/* Success Message Popup */}
      <Dialog
        open={showSuccessPopup}
        onClose={handleClosePopup}
        style={{ borderRadius: "0px" }}
      >
        <SuccessMessagePopup
          open={showSuccessPopup}
          onClose={handleClosePopup}
          title="Thank you for your submission"
          message="We will review it and get back to you shortly."
          closeButtonText="Close"
        />
      </Dialog>
    </div>
  );
};

export default ExpertForm;
