import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "../Admin/dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getManagerProduct } from "../../actions/productAction";
import { getAllManagerOrders } from "../../actions/orderAction.js";
import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getManagerProduct());
    dispatch(getAllManagerOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - manager Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/manager/products"> 
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/manager/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
