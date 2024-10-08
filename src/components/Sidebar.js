import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-item active">
        <Link to="#" className="text-white">
          <img
            src="/assets/images/favrate-icon.svg"
            className="icon-admin-menu"
            alt="Watchlist Icon"
          />
          My Favorite
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/profile" className="text-white">
          <img
            src="/assets/images/Profile.svg"
            className="icon-admin-menu"
            alt="Profile Icon"
          />
          Profile
        </Link>
      </div>
      <div className="sidebar-item">
        <Link to="/login" className="text-white">
          <img
            src="/assets/images/share-circle-line.svg"
            className="icon-admin-menu"
            alt="Logout Icon"
          />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
