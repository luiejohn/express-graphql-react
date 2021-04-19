import React from "react";
import svgIcon from "../../assets/icon/sprite.svg";

import "./empty.css";

const Empty = () => {
  return (
    <div className="empty__cont">
      <svg className="empty__icon">
        <use xlinkHref={`${svgIcon}#icon-wondering2`}></use>
      </svg>
      No Results Found
    </div>
  );
};

export default Empty;
