import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";
import Header1 from "../Header/Header1";

const Contact = ({history}) => {
  return (
    <>
        <Header1 history={ history }/> 
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:mehtabkazmi5@gmail.com">
        <Button>Contact: mehtabkazmi5@gmail.com</Button>
      </a>
      </div>
      </>
  );
};

export default Contact;
