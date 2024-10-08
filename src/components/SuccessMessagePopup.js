import React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";

const SuccessMessagePopup = ({
  title,
  message,
  closeButtonText,
  onClose,
  showCloseButton = true,
}) => {
  return (
    <div className="popup-success-box">
      <DialogTitle>
        <CheckCircleOutlineIcon
          className="img-sucess-contact"
          color="success"
        />
      </DialogTitle>
      <DialogContent className="popup-content-contact-success">
        <h2 className="kss-fs-24">{title}</h2>
        <DialogContentText className="contact-s-dis-m">
          {message}
        </DialogContentText>
        {showCloseButton && (
          <Button
            onClick={onClose}
            color="primary"
            className="close-btn-contact-s"
            autoFocus
          >
            {closeButtonText}
          </Button>
        )}
      </DialogContent>
    </div>
  );
};

export default SuccessMessagePopup;
