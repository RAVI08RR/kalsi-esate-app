import React, { useState } from "react";
import { BASE_URL } from "../apis/constatnts";

const Newsletercomponet = () => {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const payload = {
    email: email,
  };

  const submitNewsLetter = async () => {
    setIsLoading(true);
    setSuccessMessage("");

    try {
      const response = await fetch(`${BASE_URL}/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      let data = await response.json();

      if (data?.status === 401) {
        alert(data?.errors?.email[0]);
        setEmail("");
      } else if (data?.status === 200) {
        setEmail("");
        setSuccessMessage(
          "You have successfully subscribed to our newsletter!"
        );
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <h5 className="footer-menu-head">NEWSLETTER SIGNUP</h5>
        <div className="input-group footer-newsleter-section">
          <img
            src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/footer-email-icon.svg"
            className="newsletter-email-icon"
            alt=""
          />
          <input
            type="email"
            className="form-control newsletter-input"
            placeholder="Enter your email address"
            value={email}
            onChange={handleEmailChange}
          />
          <button
            className="btn btn-primary bg-transperent arrow-btn"
            onClick={submitNewsLetter}
            disabled={isLoading}
          >
            <img
              src="https://d3v1h55v8tucsz.cloudfront.net/assets/images/footer-images/send-arrow.svg"
              className="newsletter-arrow-btn-icon"
              alt="img"
            />
          </button>
        </div>
        {successMessage && (
          <div className="success-message" style={{ color: "#c08835" }}>
            {successMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default Newsletercomponet;
