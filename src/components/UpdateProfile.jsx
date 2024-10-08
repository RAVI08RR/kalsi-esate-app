import React, { useState, useEffect } from "react";
import { TextField, Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    phone_number: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      notification.error({
        message: "Error",
        description: "You need to be logged in to update your profile.",
      });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const validateInputs = () => {
    const errors = {};
    if (!profileData.username) errors.username = "Username is required.";
    if (!profileData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = "Email is invalid.";
    }
    if (!profileData.phone_number)
      errors.phone_number = "Phone number is required.";
    return errors;
  };

  const handleUpdateProfileSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setIsLoading(true);
    setValidationErrors({});

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("Authentication token not found");
      }

      const response = await fetch(
        "https://admin.kalsiestate.com/public/api/profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          notification.error({
            message: "Error",
            description: errorData.message || "Failed to update profile",
          });
        } else {
          const errorText = await response.text();
          notification.error({
            message: "Error",
            description:
              "Failed to update profile. Please check the console for more details.",
          });
        }
        throw new Error("Failed to update profile");
      }

      const data =
        contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

      notification.success({
        message: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.message || "Update profile failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="update-profile-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 p-0">
            <form
              className="form-control signup-form-controller"
              onSubmit={handleUpdateProfileSubmit}
            >
              <h2>Update Profile</h2>

              <div className="input-container">
                <TextField
                  type="text"
                  name="username"
                  label="Username"
                  value={profileData.username}
                  onChange={handleInputChange}
                  className="update-profile-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!validationErrors.username}
                  helperText={validationErrors.username}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#c3925a",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                        borderRadius: 0,
                      },
                      "&:hover fieldset": {
                        borderColor: "#c3925a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c3925a",
                      },
                    },
                  }}
                />
              </div>
              <div className="input-container">
                <TextField
                  type="email"
                  name="email"
                  label="Email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  className="update-profile-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#c3925a",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                        borderRadius: 0,
                      },
                      "&:hover fieldset": {
                        borderColor: "#c3925a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c3925a",
                      },
                    },
                  }}
                />
              </div>
              <div className="input-container">
                <TextField
                  type="text"
                  name="phone_number"
                  label="Phone Number"
                  value={profileData.phone_number}
                  onChange={handleInputChange}
                  className="update-profile-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  error={!!validationErrors.phone_number}
                  helperText={validationErrors.phone_number}
                  InputLabelProps={{
                    sx: {
                      "&.Mui-focused": {
                        color: "#c3925a",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#ccc",
                        borderRadius: 0,
                      },
                      "&:hover fieldset": {
                        borderColor: "#c3925a",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#c3925a",
                      },
                    },
                  }}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                className="signup-button mt-2"
                sx={{
                  backgroundColor: "#c08735",
                  borderRadius: 0,
                  "&:hover": {
                    backgroundColor: "#c08735",
                  },
                  padding: "10px",
                  fontFamily: "Nexa-Medium",
                }}
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
