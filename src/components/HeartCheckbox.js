// import React, { useState } from "react";
// import { Checkbox, Modal, Box, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import CloseIcon from "@mui/icons-material/Close";
// import LoginPagecomponent from "./LoginPagecomponent"; // Adjust the path as needed

// const style = {
//   position: "absolute",
//   top: "50.9%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "75%",
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: "none",
//   p: 0,
// };

// const HeartCheckbox = ({ propertyId }) => {
//   const [checked, setChecked] = useState(false);
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const authToken = localStorage.getItem("authToken");

//   const handleChange = async (event) => {
//     if (event.target.checked) {
//       if (authToken) {
//         await handleFavorite();
//       } else {
//         setOpen(true);
//       }
//     } else {
//       setChecked(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setChecked(false);
//   };

//   const handleFavorite = async () => {
//     if (authToken && propertyId) {
//       try {
//         const response = await fetch(
//           `https://admin.kalsiestate.com/public/api/property/${propertyId}/favorite`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${authToken}`,
//             },
//             body: JSON.stringify({
//               favorite: 1,
//             }),
//           }
//         );

//         if (response.ok) {
//           setChecked(true);
//           const data = await response.json();
//           console.log("Property favorited successfully", data);
//         } else {
//           console.error("Failed to favorite property", response);
//         }
//       } catch (error) {
//         console.error("Error favoriting property", error.message);
//       }
//     } else {
//       console.error("Auth token or property ID is missing");
//     }
//   };

//   return (
//     <>
//       <Checkbox
//         className="watchlist-fav"
//         checked={checked}
//         onChange={handleChange}
//         icon={<FavoriteBorder />}
//         checkedIcon={<Favorite />}
//         sx={{
//           color: "#cd842f",
//           "&.Mui-checked": {
//             color: "#cd842f",
//           },
//         }}
//       />

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//         className="sign-up"
//         BackdropProps={{
//           sx: {
//             backgroundColor: "rgb(0 0 0 / 67%) !important",
//           },
//         }}
//       >
//         <Box sx={style}>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <LoginPagecomponent onSuccess={handleFavorite} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default HeartCheckbox;

// import React, { useState } from "react";
// import { Checkbox, Modal, Box, IconButton } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
// import Favorite from "@mui/icons-material/Favorite";
// import CloseIcon from "@mui/icons-material/Close";
// import LoginPagecomponent from "./LoginPagecomponent"; // Adjust the path as needed

// const style = {
//   position: "absolute",
//   top: "50.9%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "75%",
//   bgcolor: "background.paper",
//   border: "none",
//   boxShadow: "none",
//   p: 0,
// };

// const HeartCheckbox = ({ propertyId }) => {
//   const [checked, setChecked] = useState(false);
//   const [open, setOpen] = useState(false);
//   const authToken = localStorage.getItem("authToken");

//   const handleChange = async (event) => {
//     if (event.target.checked) {
//       if (authToken) {
//         await handleFavorite();
//       } else {
//         setOpen(true);
//       }
//     } else {
//       setChecked(false);
//     }
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setChecked(false);
//   };

//   const handleFavorite = async () => {
//     if (authToken && propertyId) {
//       try {
//         const response = await fetch(
//           `https://admin.kalsiestate.com/public/api/property/${propertyId}/favorite`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Accept: "application/json",
//               Authorization: `Bearer ${authToken}`,
//             },
//             body: JSON.stringify({
//               favorite: 1,
//             }),
//           }
//         );

//         if (response.ok) {
//           setChecked(true);
//           const data = await response.json();
//           console.log("Property favorited successfully", data);
//         } else {
//           console.error("Failed to favorite property", response);
//         }
//       } catch (error) {
//         console.error("Error favoriting property", error.message);
//       }
//     } else {
//       console.error("Auth token or property ID is missing");
//     }
//   };

//   const handleLoginSuccess = () => {
//     setChecked(true); // Fill the check icon
//     setOpen(false); // Close the modal
//     handleFavorite(); // Ensure the property is favorited
//     setTimeout(() => {
//       window.location.reload(); // Reload the same page
//     }, 500); // Adjust the delay as needed (500ms = 0.5s)
//   };

//   return (
//     <>
//       <Checkbox
//         className="watchlist-fav"
//         checked={checked}
//         onChange={handleChange}
//         icon={<FavoriteBorder />}
//         checkedIcon={<Favorite />}
//         sx={{
//           color: "#cd842f",
//           "&.Mui-checked": {
//             color: "#cd842f",
//           },
//         }}
//       />

//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-title"
//         aria-describedby="modal-description"
//         className="sign-up"
//         BackdropProps={{
//           sx: {
//             backgroundColor: "rgb(0 0 0 / 67%) !important",
//           },
//         }}
//       >
//         <Box sx={style}>
//           <IconButton
//             aria-label="close"
//             onClick={handleClose}
//             sx={{
//               position: "absolute",
//               right: 8,
//               top: 8,
//               color: (theme) => theme.palette.grey[500],
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//           <LoginPagecomponent onSuccess={handleLoginSuccess} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default HeartCheckbox;
import React, { useState, useEffect } from "react";
import { Checkbox, Modal, Box, IconButton } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import LoginPagecomponent from "./LoginPagecomponent"; // Adjust the path as needed
import { BASE_URL } from "../apis/constatnts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  border: "none",
  boxShadow: "none",
  p: 0,
};

const HeartCheckbox = ({ propertyId }) => {
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    // Update the authToken state whenever it changes in localStorage
    const handleStorageChange = () => {
      setAuthToken(localStorage.getItem("authToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleChange = async (event) => {
    const authToken = localStorage.getItem("authToken");

    if (event.target.checked) {
      if (authToken) {
       
        await handleFavorite(propertyId, authToken);
      } else {
        setOpen(true);
      }
    } else {
      setChecked(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setChecked(false);
  };

  const handleFavorite = async (propertyId, token) => {
    
    if (!token) {
      console.error("Auth token is missing");
      return;
    }

    if (!propertyId) {
      console.error("Property ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/property/${propertyId}/favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            favorite: 1,
          }),
        }
      );

      if (response.ok) {
        setChecked(true);
        const data = await response.json();
        
      } else {
        const errorResponse = await response.text();
        console.error("Failed to favorite property", errorResponse);
        if (errorResponse.includes("Unauthenticated")) {
          console.error("The provided token might be invalid or expired.");
        }
      }
    } catch (error) {
      console.error("Error favoriting property", error);
    }
  };

  const handleLoginSuccess = async () => {
    const token = localStorage.getItem("authToken");
   

    if (token) {
      setChecked(true);
      setOpen(false);
      await handleFavorite(token);
    } else {
      console.error("Auth token is missing after login");
    }
  };

  return (
    <>
      <Checkbox
        className="watchlist-fav"
        checked={checked}
        onChange={handleChange}
        icon={<FavoriteBorder />}
        checkedIcon={<Favorite />}
        sx={{
          color: "#cd842f",
          "&.Mui-checked": {
            color: "#cd842f",
          },
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="sign-up"
        BackdropProps={{
          sx: {
            backgroundColor: "rgb(0 0 0 / 67%) !important",
          },
        }}
      >
        <Box sx={style}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <LoginPagecomponent onSuccess={handleLoginSuccess} />
        </Box>
      </Modal>
    </>
  );
};

export default HeartCheckbox;
