import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import MetaData from "../layout/MetaData";
import "../Admin/productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  getManagerProduct,
} from "../../actions/productAction";
import SideBar from "./Sidebar";

const ProductList = () => {
  const dispatch = useDispatch();


  const { error, products } = useSelector((state) => state.products);

  useEffect(() => {

    dispatch(getManagerProduct());
  }, [dispatch, alert, error]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Manager`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1> 

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
