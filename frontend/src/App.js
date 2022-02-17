import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import Header1 from "./component/layout/Header/Header1.js";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ManagerDashboard from "./component/Manager/Dashboard.js";
import ChefDashboard from "./component/Chef/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import managerProductList from "./component/Manager/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import managerOrderList from "./component/Manager/OrderList";
import chefOrderList from "./component/Chef/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import ProcessChefOrder from "./component/Chef/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import managerProductReviews from "./component/Manager/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

const App = ({history}) => {
  
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <>
      <BrowserRouter>
        <Header /> 
        {isAuthenticated && <UserOptions user={user} />}

        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/product/:id" component={ProductDetails} />
          <Route exact path="/products" component={Products} />
          <Route path="/products/:keyword" component={Products} />

          <Route exact path="/search" component={Search} />

          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />

          <ProtectedRoute exact path="/account" component={Profile} />

          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

          <ProtectedRoute
            exact
            path="/password/update"
            component={UpdatePassword}
          />

          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route exact path="/password/reset/:token" component={ResetPassword} />

          <Route exact path="/login" component={LoginSignUp} />

          <Route exact path="/cart" component={Cart} />

          <ProtectedRoute exact path="/shipping" component={Shipping} />

          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />

          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/admin/products"
            isAdmin={true}
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/product/new"
            isAdmin={true}
            component={NewProduct}
          />

          <ProtectedRoute
            exact
            path="/admin/product/:id"
            isAdmin={true}
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/orders"
            isAdmin={true}
            component={OrderList}
          />

          <ProtectedRoute
            exact
            path="/admin/order/:id"
            isAdmin={true}
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            isAdmin={true}
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path="/admin/user/:id"
            isAdmin={true}
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path="/admin/reviews"
            isAdmin={true}
            component={ProductReviews}
          />
          <ProtectedRoute
            isManager={true}
            exact
            path="/manager/dashboard"
            component={ManagerDashboard}
          />
          <ProtectedRoute
            exact
            path="/manager/products"
            isManager={true}
            component={managerProductList}
          />
          <ProtectedRoute
            exact
            path="/manager/orders"
            isManager={true}
            component={managerOrderList}
          />

          <ProtectedRoute
            exact
            path="/manager/reviews"
            isManager={true}
            component={managerProductReviews}
          />
          <ProtectedRoute
            isChef={true}
            exact
            path="/chef/dashboard"
            component={ChefDashboard}
          />
          <ProtectedRoute
            exact
            path="/chef/orders"
            isChef={true}
            component={chefOrderList}
          />
          <ProtectedRoute
            exact
            path="/chef/order/:id"
            isChef={true}
            component={ProcessChefOrder}
          />
          <Route
            component={
              window.location.pathname === "/process/payment" ? null : NotFound
            }
          />
        </Switch>
          
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
