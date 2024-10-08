import React, { useState } from "react";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Signupcomponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="signup-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 p-0">
            <img
              src="/assets/images/login-img.png"
              alt="img"
              className="w-100 h-100"
            />
          </div>

          <div className="col-lg-6 p-0">
            <form className="form-control signup-form-controller">
              <h2>Sign Up</h2>
              <div className="input-container">
                <TextField
                  type="text"
                  name="name"
                  label="NAME"
                  className="signup-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
                  name="phone"
                  label="PHONE"
                  className="signup-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
                  label="EMAIL"
                  className="signup-input"
                  fullWidth
                  variant="outlined"
                  margin="normal"
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
                  className="signup-input"
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
              </div>
              <div className="input-container">
                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirm-password"
                  label="CONFIRM PASSWORD"
                  className="signup-input"
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
              </div>
              <button type="submit" className="signup-button mt-2">
                SIGNUP
              </button>
              <p className="login-link">
                Already Have Account <a href="/login">Login?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupcomponent;
