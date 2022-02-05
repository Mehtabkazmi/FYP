import React from "react";
import "../Admin/sidebar.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="Hotel system" />
      </Link>
      <Link to="/chef/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="/chef/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;
