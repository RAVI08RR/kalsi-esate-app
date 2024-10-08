import React, { useState } from "react";
import { Button, Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShareIcon from "../share-icon.svg";

const Sharecomponent = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentUrl = window.location.href;

  const shareOnWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`,
      "_blank"
    );
  };

  return (
    <>
      <Button
        className="share-btn"
        onClick={handleOpen}
        startIcon={<img src={ShareIcon} className="share-icon" alt="Share" />}
      >
        <span className="share-name">Share</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="share-modal-title"
        className="share-page-container-popup"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 0,
            p: 4,
            borderRadius: 0,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography id="share-modal-title" variant="h6" component="h2">
              Share This Page
            </Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2 }}>
            <IconButton onClick={shareOnWhatsApp} color="success">
              <WhatsAppIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={shareOnFacebook} color="primary">
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton onClick={shareOnTwitter} color="info">
              <TwitterIcon fontSize="large" />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Sharecomponent;
