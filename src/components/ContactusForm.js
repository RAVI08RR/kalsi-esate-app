import React, { useState } from "react";
import { message } from "antd"; // Import Ant Design's message component
import { postContactUsData } from "../apis/callbacks"; // Import the API function

const ContactusForm = ({ cityId }) => {
 // Check if cityId is being passed correctly

  // Initialize formData with city_id defaulting to cityId or "1"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    city_id: cityId ? `${cityId}` : "1", // Fallback to "1" if cityId is undefined
  });

  // Handle input changes and update formData state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure city_id is valid
    

    const result = await postContactUsData(formData);

    if (result.success) {
      message.success("Thank you for contacting us!");
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        city_id: cityId || "1", // Ensure city_id persists after reset
      });
    } else if (result.errors) {
      console.error("Form submission error:", result.errors);
      if (result.errors.city_id) {
        message.error(result.errors.city_id[1]); // Display city_id validation error from server
      } else {
        message.error("Error submitting form.");
      }
    } else {
      message.error(result.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="expert-form-container conatct-us-form">
      <p className="kss-text-orange text-uppercase kss-fw-700">
        Consult with our professionals
      </p>
      <h2 className="text-left text-black pt-2">Send your message to us</h2>

      <form className="contact-us-form-controller" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="NAME"
          className="contact-input"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          className="contact-input"
          placeholder="PHONE"
          value={formData.phone}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          className="contact-input"
          placeholder="EMAIL"
          value={formData.email}
          onChange={handleChange}
        />
        <textarea
          className="contact-input-text-area"
          rows="3"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button type="submit" className="w-100">
          SEND
        </button>
      </form>
    </div>
  );
};

export default ContactusForm;
