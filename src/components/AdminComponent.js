import React from "react";
import Sidebar from "./Sidebar";
import Watchlist from "./Watchlist";
import "./AdminComponent.css";
import Header from "./Header";

const AdminComponent = () => {
  return (
    <div className="admin-container mt-5">
      <Header showBg={true} />
      <Sidebar />
      <Watchlist />
    </div>
  );
};

export default AdminComponent;
