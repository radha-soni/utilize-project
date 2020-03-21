import React from "react";
import AppLogo from "./AppLogo";
import BusinessOwnerDetails from "./BusinessOwnerDetails";
import Orders from "./Orders";
import "../App.css";

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
