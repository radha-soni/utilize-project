import React from "react";
import Orders from "./OrderDetails";
import AppLogo from "./appLogo";
import BusinessOwnerDetails from "./BusinessOwnerDetails";
import "./dashboard.css";

function DashBoard({ loggedIn, setLoggedIn, userProfile }) {
  return (
    <div className="dashboard-container">
      <AppLogo loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <BusinessOwnerDetails userProfile={userProfile} />
      <Orders />
    </div>
  );
}
export default DashBoard;
