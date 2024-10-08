import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";

import { BASE_URL } from "../apis/constatnts";

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const toggleShowCurrentPassword = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!passwordData.current_password)
      formErrors.current_password = "Current password is required";
    if (!passwordData.new_password)
      formErrors.new_password = "New password is required";
    if (passwordData.new_password.length < 8)
      formErrors.new_password = "Password must be at least 8 characters long";
    if (passwordData.confirm_password !== passwordData.new_password)
      formErrors.confirm_password = "Passwords do not match";
    return formErrors;
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const token = localStorage.getItem("authToken"); // Ensure the correct token key is used

      if (!token) {
        notification.error({
          message: "Error",
          description: "Auth token is missing",
        });
        return;
      }

      const response = await fetch(`${BASE_URL}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          current_password: passwordData.current_password,
          new_password: passwordData.new_password,
          new_password_confirmation: passwordData.confirm_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        let errorMessage = "Failed to change password";
        if (response.status === 401) {
          errorMessage = "Current password is incorrect";
        } else if (response.status === 400) {
          errorMessage = "Invalid data provided";
        }
        notification.error({
          message: "Error",
          description: errorMessage,
        });
        console.error("Error response:", errorData);
        return;
      }

      const data = await response.json();
      
      notification.success({
        message: "Success",
        description: "Password changed successfully",
      });
      navigate("/login"); // Redirect to login page after password change
    } catch (error) {
      console.error("Change password failed", error);
      notification.error({
        message: "Error",
        description: "An error occurred while changing the password",
      });
    }
  };

  return (
    <div className="signup-section change-password-section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 p-0">
            <form
              className="form-control signup-form-controller"
              onSubmit={handleChangePasswordSubmit}
            >
              <h2>Change Password</h2>
              {/* {Object.keys(errors).length > 0 && (
                <div
                  className="error-message"
                  style={{ color: "red", marginBottom: "10px" }}
                >
                  {Object.values(errors).map((msg, index) => (
                    <div key={index}>{msg}</div>
                  ))}
                </div>
              )} */}

              <div className="input-container">
                <TextField
                  type={showCurrentPassword ? "text" : "password"}
                  name="current_password"
                  label="Current Password"
                  value={passwordData.current_password}
                  onChange={handleInputChange}
                  className="change-password-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowCurrentPassword}>
                          {showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 0,
                    },
                  }}
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
                {errors.current_password && (
                  <div className="error-message" style={{ color: "red" }}>
                    {errors.current_password}
                  </div>
                )}
              </div>
              <div className="input-container">
                <TextField
                  type={showPassword ? "text" : "password"}
                  name="new_password"
                  label="New Password"
                  value={passwordData.new_password}
                  onChange={handleInputChange}
                  className="change-password-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowPassword}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 0,
                    },
                  }}
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
                {errors.new_password && (
                  <div className="error-message" style={{ color: "red" }}>
                    {errors.new_password}
                  </div>
                )}
              </div>
              <div className="input-container">
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm_password"
                  label="Confirm New Password"
                  value={passwordData.confirm_password}
                  onChange={handleInputChange}
                  className="change-password-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={toggleShowConfirmPassword}>
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: {
                      borderRadius: 0,
                    },
                  }}
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
                {errors.confirm_password && (
                  <div className="error-message" style={{ color: "red" }}>
                    {errors.confirm_password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="signup-button mt-2 change-password-button"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
