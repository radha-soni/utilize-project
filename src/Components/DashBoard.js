import React from "react";
import Orders from "./OrderDetails";
import AppLogo from "./appLogo";
import BusinessOwnerDetails from "./BusinessOwnerDetails";
import ExampleWrapper from "./test";
import "./dashboard.css";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

function DashBoard({ loggedIn, setLoggedIn, userProfile }) {
  return (
    <div className="dashboard-container">
      <AppLogo loggedIn={loggedIn} setLoggedIn={setLoggedIn} />

      <BusinessOwnerDetails userProfile={userProfile} />
      <ExampleWrapper />
    </div>
  );
}
export default DashBoard;
