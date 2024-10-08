// import React, { useState } from "react";
// import { postContactUsData } from "../apis/callbacks";
// import {
//   Dialog,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Button,
// } from "@mui/material";
// import SuccessMessagePopup from "./SuccessMessagePopup"; // Import the SuccessPopup component

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import "./GetinTouchForm.css"; // Import the CSS file

// const GetinTouchForm = ({
//   title,
//   description,
//   buttonText,
//   imageUrl,
//   classname,
// }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     message: "",
//     city_id: "2",
//   });

//   const [responseMessage, setResponseMessage] = useState("");
//   const [errors, setErrors] = useState({});
//   const [open, setOpen] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setResponseMessage("");
//     setErrors({});

//     const result = await postContactUsData(formData);
//     if (result.success) {
//       setResponseMessage("Thank you for contacting us!");
//       setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
//       setOpen(true); // Open the success popup
//     } else {
//       setErrors(result.errors || {});
//       if (result.error) {
//         setResponseMessage(result.error);
//       }
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <div
//       data-aos="fade-up"
//       data-aos-duration="2000"
//       data-aos-delay="200"
//       className="container-fluid p-0 mt-5"
//     >
//       <div className="row g-0">
//         <div className="col-lg-6 bg-contact-form">
//           <div className="form-container">
//             <h2 className="text-white">{title}</h2>
//             <p className="text-white">{description}</p>
//             <form className="mt-2 get-in-touch-form" onSubmit={handleSubmit}>
//               <div className="floating-label-group">
//                 <input
//                   type="text"
//                   name="name"
//                   className="form-control input-get-in-touch"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label className="floating-label">Your Name</label>
//                 {errors.name && <p className="error">{errors.name[0]}</p>}
//               </div>
//               <div className="floating-label-group">
//                 <input
//                   type="email"
//                   name="email"
//                   className="form-control input-get-in-touch"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label className="floating-label">Your Email</label>
//                 {errors.email && <p className="error">{errors.email[0]}</p>}
//               </div>
//               <div className="floating-label-group">
//                 <input
//                   type="text"
//                   name="phone"
//                   className="form-control input-get-in-touch"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//                 <label className="floating-label">Your Phone</label>
//                 {errors.phone && <p className="error">{errors.phone[0]}</p>}
//               </div>
//               <div className="floating-label-group">
//                 <textarea
//                   name="message"
//                   className="form-control input-get-in-touch"
//                   rows="3"
//                   value={formData.message}
//                   onChange={handleChange}
//                   required
//                 ></textarea>
//                 <label className="floating-label">Message</label>
//                 {errors.message && <p className="error">{errors.message[0]}</p>}
//               </div>
//               <button type="submit" className={`btn btn-primary ${classname}`}>
//                 {buttonText}
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="col-lg-6">
//           <img
//             src={imageUrl}
//             className="img-fluid md-img-none"
//             alt="City Skyline"
//           />
//         </div>
//       </div>

//       <Dialog style={{ borderRadius: "0px" }} open={open} onClose={handleClose}>
//         <SuccessMessagePopup
//           open={open}
//           onClose={handleClose}
//           title="Thank you for your submission"
//           message="We will review it and get back to you shortly."
//           closeButtonText="Close"
//         />
//       </Dialog>
//     </div>
//   );
// };

// export default GetinTouchForm;

import React, { useState } from "react";
import { postContactUsData } from "../apis/callbacks";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import SuccessMessagePopup from "./SuccessMessagePopup";
import { useMediaQuery } from "react-responsive";
import "./GetinTouchForm.css";

const GetinTouchForm = ({
  title,
  description,
  buttonText,
  imageUrl,
  classname,
}) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    city_id: "2",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrors({});

    const result = await postContactUsData(formData);
    if (result.success) {
      setResponseMessage("Thank you for contacting us!");
      setFormData({ name: "", phone: "", email: "", message: "" }); // Reset form
      setOpen(true); // Open the success popup
    } else {
      setErrors(result.errors || {});
      if (result.error) {
        setResponseMessage(result.error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container mb-2" id="contact-us"></div>
      <div
        data-aos="fade-up"
        data-aos-duration="2000"
        data-aos-delay="200"
        className="container-fluid p-0 mt-5 conatct-us-section-home"
      >
        <div className="row g-0">
          <div className="col-lg-6 bg-contact-form">
            <div className="form-container">
              <h2 className="text-white">{title}</h2>
              <p className="text-white">{description}</p>

              {isMobile ? (
                <form className="mt-2" onSubmit={handleSubmit} id="contact-us">
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control input-mb-contact-us"
                      placeholder="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0px" }}
                    />
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control input-mb-contact-us"
                      placeholder="Your Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ borderRadius: "0px" }}
                    />
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control input-mb-conatct-us"
                      placeholder="Your Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ borderRadius: "0px" }}
                      required
                    />
                    {errors.phone && <p className="error">{errors.phone[0]}</p>}
                  </div>
                  <div className="mb-2">
                    <textarea
                      className="form-control input-mb-conatct-us"
                      rows="3"
                      placeholder="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      style={{ borderRadius: "0px" }}
                      required
                    ></textarea>
                    {errors.message && (
                      <p className="error">{errors.message[0]}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary submit-btn-contact"
                  >
                    Send Enquiry
                  </button>
                </form>
              ) : (
                <form
                  className="mt-2 get-in-touch-form"
                  onSubmit={handleSubmit}
                >
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control input-get-in-touch"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Your Name</label>
                    {errors.name && <p className="error">{errors.name[0]}</p>}
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control input-get-in-touch"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Your Email</label>
                    {errors.email && <p className="error">{errors.email[0]}</p>}
                  </div>
                  <div className="floating-label-group">
                    <input
                      type="text"
                      name="phone"
                      className="form-control input-get-in-touch"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <label className="floating-label">Your Phone</label>
                    {errors.phone && <p className="error">{errors.phone[0]}</p>}
                  </div>
                  <div className="floating-label-group">
                    <textarea
                      name="message"
                      className="form-control input-get-in-touch"
                      rows="3"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <label className="floating-label">Message</label>
                    {errors.message && (
                      <p className="error">{errors.message[0]}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className={`btn btn-primary ${classname}`}
                  >
                    {buttonText}
                  </button>
                </form>
              )}
            </div>
          </div>
          {!isMobile && (
            <div className="col-lg-6">
              <img
                src={imageUrl}
                className="img-fluid md-img-none"
                alt="City Skyline"
                width="100%"
                loading="lazy"
                height="100%"
              />
            </div>
          )}
        </div>

        <Dialog
          style={{ borderRadius: "0px" }}
          open={open}
          onClose={handleClose}
        >
          <SuccessMessagePopup
            open={open}
            onClose={handleClose}
            title="Thank you for your submission"
            message="We will review it and get back to you shortly."
            closeButtonText="Close"
          />
        </Dialog>
      </div>
    </>
  );
};

export default GetinTouchForm;
