import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";
import Flash from 'react-reveal/Flash';

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Flash><Rating {...options} /></Flash>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
