import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const options = {
  burgerColorHover: "#ffad08",
  logo,
  logoWidth: "16vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#243f14",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "#243f14 ",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#ffad08 ",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "#243f14 ",
  searchIconColor: "#243f14 ",
  cartIconColor: "#243f14 ",
  profileIconColorHover: "#ffad08 ",
  searchIconColorHover: "#ffad08 ",
  cartIconColorHover: "#ffad08 ",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return (
    <>
      <ReactNavbar {...options} />
      </>
  )};

export default Header;
