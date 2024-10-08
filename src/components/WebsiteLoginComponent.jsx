import React, { useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { notification } from "antd";
import { loginUser, registerUser } from "../apis/callbacks"; // Update the import path
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const WebsiteLoginComponent = ({ onSuccess,cities }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    phone_number: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [formType, setFormType] = useState("login");
  const [validationErrors, setValidationErrors] = useState({});

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoginInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignupInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to log in the user
      const authToken = await loginUser(loginData);

      // Display success notification
      notification.success({
        message: "Login successful!",
      });

      // Store the auth token in localStorage
      localStorage.setItem("authToken", authToken);

      // Optionally, execute any additional success actions
      if (onSuccess && typeof onSuccess === "function") {
        onSuccess(authToken); // Pass the authToken if needed
      }

      // Navigate to the homepage after a slight delay
      setTimeout(() => {
        navigate("/"); // Replace '/' with your homepage path if different
      }, 500); // Adjust delay as needed (500ms is just an example)
    } catch (error) {
      // Display error notification
      notification.error({
        message: "Login failed. Please check your credentials.",
      });

      // Log the error to the console
      console.error("Login failed", error);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const errors = {};
    if (signupData.password !== signupData.confirm_password) {
      errors.confirm_password = "Passwords do not match";
    }
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const authToken = await registerUser({
        username: signupData.username,
        phone_number: signupData.phone_number,
        email: signupData.email,
        password: signupData.password,
      });
      notification.success({
        message: "Signup successful! Please log in.",
      });
      setFormType("login");
    } catch (error) {
      notification.error({
        message: "Signup failed. Please check your details.",
      });
      console.error("Signup failed", error);
    }
  };

  const switchToSignup = (e) => {
    e.preventDefault();
    setFormType("signup");
    setValidationErrors({});
  };

  const switchToLogin = (e) => {
    e.preventDefault();
    setFormType("login");
    setValidationErrors({});
  };

  return (
    <>
      <Header showBg={true} cities={cities}/>

      <div className="signup-section">
        <div className="container py-5 mt-5 ">
          <div className="row">
            <div className="col-lg-6 p-0">
              <img
                src="/assets/images/login-img.png"
                alt="img"
                className="w-100 h-100"
              />
            </div>
            <div className="col-lg-6 p-0">
              {formType === "login" ? (
                <form
                  className="form-control signup-form-controller"
                  onSubmit={handleLoginSubmit}
                >
                  <h2>Login</h2>
                  <div className="input-container">
                    <TextField
                      type="text"
                      name="phone_number"
                      label="Enter Phone Number"
                      value={loginData.phone_number}
                      onChange={handleLoginInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.phone_number}
                      helperText={validationErrors.phone_number}
                      InputProps={{
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
                  </div>
                  <div className="input-container">
                    <TextField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="PASSWORD"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.password}
                      helperText={validationErrors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword}>
                              {showPassword ? (
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
                  </div>
                  <div className="input-container">
                    <button type="submit" className="signup-button">
                      Login
                    </button>
                  </div>
                  <div className="input-container">
                    <p className="login-link">
                      Don't have an account?
                      <a
                        href="/"
                        onClick={switchToSignup}
                        style={{ paddingLeft: "10px" }}
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </form>
              ) : (
                <form
                  className="form-control signup-form-controller"
                  onSubmit={handleSignupSubmit}
                >
                  <h2>Sign Up</h2>
                  <div className="input-container">
                    <TextField
                      type="text"
                      name="username"
                      label="Enter Full Name"
                      value={signupData.username}
                      onChange={handleSignupInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.username}
                      helperText={validationErrors.username}
                      InputProps={{
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
                  </div>
                  <div className="input-container">
                    <TextField
                      type="text"
                      name="phone_number"
                      label="Enter Phone Number"
                      value={signupData.phone_number}
                      onChange={handleSignupInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.phone_number}
                      helperText={validationErrors.phone_number}
                      InputProps={{
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
                  </div>
                  <div className="input-container">
                    <TextField
                      type="email"
                      name="email"
                      label="Enter Email"
                      value={signupData.email}
                      onChange={handleSignupInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.email}
                      helperText={validationErrors.email}
                      InputProps={{
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
                  </div>
                  <div className="input-container">
                    <TextField
                      type={showPassword ? "text" : "password"}
                      name="password"
                      label="PASSWORD"
                      value={signupData.password}
                      onChange={handleSignupInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.password}
                      helperText={validationErrors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword}>
                              {showPassword ? (
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
                  </div>
                  <div className="input-container">
                    <TextField
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      label="CONFIRM PASSWORD"
                      value={signupData.confirm_password}
                      onChange={handleSignupInputChange}
                      className="signup-input"
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      error={!!validationErrors.confirm_password}
                      helperText={validationErrors.confirm_password}
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
                  </div>
                  <div className="input-container">
                    <button type="submit" className="signup-button">
                      Sign Up
                    </button>
                  </div>
                  <div className="input-container">
                    <p className="login-link">
                      Already have an account?
                      <a
                        href="/"
                        onClick={switchToLogin}
                        style={{ paddingLeft: "10px" }}
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebsiteLoginComponent;
