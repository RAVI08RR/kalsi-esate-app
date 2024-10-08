// import React, { useEffect, useState } from "react";
// import { videoequiryform } from "../apis/callbacks";
// import Dialog from "@mui/material/Dialog";
// import SuccessMessagePopup from "../components/SuccessMessagePopup";

// const VideopopupEquiry = ({
//   propertyiddata,
//   addressTitle,
//   onSubmit,
//   title,
// }) => {
//   const [formData, setFormData] = useState({
//     property_id: propertyiddata,
//     name: "",
//     phone: "",
//     email: "",
//   });

//   useEffect(() => {
//     if (propertyiddata) {
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         property_id: propertyiddata,
//       }));
//     }
//   }, [propertyiddata]);

//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await videoequiryform(formData);
//       if (response.success) {
//         setShowSuccessPopup(true);
//         onSubmit(formData); // Notify parent component of successful submission
//       } else {
//         console.error(
//           "Form submission errors:",
//           response.errors || response.error
//         );
//       }
//     } catch (error) {
//       console.error("Error posting contact data:", error);
//     }
//   };

//   const handleClosePopup = () => {
//     setShowSuccessPopup(false);
//   };

//   return (
//     <div className="expert-form-container details-equiry-form">
//       <h2 className="text-center">{title}</h2>
//       <div className="expert-image">
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
//           className="input-details-equiry-form"
//           required
//         />
//         <input
//           type="text"
//           name="phone"
//           placeholder="PHONE"
//           value={formData.phone}
//           onChange={handleChange}
//           className="input-details-equiry-form"
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="EMAIL"
//           value={formData.email}
//           className="input-details-equiry-form"
//           onChange={handleChange}
//           required
//         />
//         <button type="submit" style={{ textTransform: "uppercase" }}>
//           Submit
//         </button>
//       </form>

//       <Dialog
//         open={showSuccessPopup}
//         onClose={handleClosePopup}
//         style={{ borderRadius: "0px" }}
//       >
//         <SuccessMessagePopup
//           open={showSuccessPopup}
//           onClose={handleClosePopup}
//           title="Thank you for your submission"
//           message="We will review it and get back to you shortly."
//           closeButtonText="Close"
//         />
//       </Dialog>
//     </div>
//   );
// };

// export default VideopopupEquiry;

import React, { useEffect, useState } from "react";
import { videoequiryform } from "../apis/callbacks";
import { florplanequiry } from "../apis/callbacks"; // Import the second API function
import Dialog from "@mui/material/Dialog";
import SuccessMessagePopup from "../components/SuccessMessagePopup";

const VideopopupEquiry = ({
  propertyiddata,
  addressTitle,
  onSubmit,
  title,
}) => {
  const [formData, setFormData] = useState({
    property_id: propertyiddata,
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (propertyiddata) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        property_id: propertyiddata,
      }));
    }
  }, [propertyiddata]);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const videoResponse = await videoequiryform(formData);
      const floorPlanResponse = await florplanequiry(formData);

      if (videoResponse.success && floorPlanResponse.success) {
        setShowSuccessPopup(true);
        onSubmit(formData); // Notify parent component of successful submission
      } else {
        console.error(
          "Form submission errors:",
          videoResponse.errors || videoResponse.error,
          floorPlanResponse.errors || floorPlanResponse.error
        );
      }
    } catch (error) {
      console.error("Error posting contact data:", error);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="expert-form-container details-equiry-form">
      <h2 className="text-center">{title}</h2>
      <div className="expert-image">
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
          className="input-details-equiry-form"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="PHONE"
          value={formData.phone}
          onChange={handleChange}
          className="input-details-equiry-form"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="EMAIL"
          value={formData.email}
          className="input-details-equiry-form"
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ textTransform: "uppercase" }}>
          Submit
        </button>
      </form>

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

export default VideopopupEquiry;
