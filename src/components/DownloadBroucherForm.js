import React, { useState } from "react";
import { downloadBrochureData } from "../apis/callbacks";

const DownloadBroucherForm = ({ DownloadBroucherFormid, onClose }) => {
  const [formData, setFormData] = useState({
    property_id: DownloadBroucherFormid,
    name: "",
    phone: "",
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API to get the response
      const response = await downloadBrochureData(formData);
  

      // Correctly access the nested structure for the PDF URL
      if (
        response.success &&
        response.data &&
        response.data.data &&
        response.data.data.pdf_brochure
      ) {
        const pdfUrl = response.data.data.pdf_brochure;


        // Fetch the PDF file as a blob
        const pdfResponse = await fetch(pdfUrl);

        if (!pdfResponse.ok) {
          throw new Error("Failed to fetch PDF. Status: " + pdfResponse.status);
        }

        const pdfBlob = await pdfResponse.blob();

        // Create a temporary link element for the download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(pdfBlob);
        link.download = "brochure.pdf"; // Customize the filename here if needed
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

       
        alert("Brochure download started. Please check your downloads folder.");

        // Close the popup if onClose function is provided
        if (onClose) onClose();
      } else {
        console.error(
          "Unexpected response structure:",
          JSON.stringify(response, null, 2)
        );
        alert("Failed to initiate download. Please try again later.");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      console.error("Stack Trace:", error.stack);
      alert(
        `An error occurred while downloading the brochure. Please try again later.\n\nError details: ${error.message}`
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="expert-form-container download-Brochure bg-white">
      <h2 className="fs-20" style={{ fontSize: "20px", color: "black" }}>
        Download Brochure
      </h2>
      <p>Brochure Download: Explore our offerings effortlessly.</p>
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
        <input type="hidden" name="property_id" value={formData.property_id} />
        <button type="submit">Download Brochure</button>
      </form>
    </div>
  );
};

export default DownloadBroucherForm;
