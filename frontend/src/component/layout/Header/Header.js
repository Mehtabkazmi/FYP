import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/cover.jpg";

const options = {
  burgerColorHover: "#910073",
  logo,
  logoWidth: "16vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#7BC705",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#910073",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#7BC705",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "#910073",
  searchIconColor: "#910073",
  cartIconColor: "#910073",
  profileIconColorHover: "#7BC705",
  searchIconColorHover: "#7BC705",
  cartIconColorHover: "#7BC705",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
