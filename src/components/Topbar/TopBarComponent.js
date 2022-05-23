import "./TopBarComponent.css";
import TopBarAccount from "./TopBarAccount";
import React from "react";

const TopBarComponent = () => {
  return <div className="top-bar">
  <div className=""><h1>LOGO</h1></div>
  <div className="" style={{fontSize: "3rem", paddingLeft: "150px"}}>M E S</div>
  <div className="" style={{width:"20%"}}><TopBarAccount /></div>
  </div>;
};

export default TopBarComponent;
