/* global gapi */
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
// import "./logout.css";
function Logout({ setLoggedIn }) {
  let history = useHistory();
  function signOut() {
    console.log("sign out");
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      setLoggedIn(false);
      history.push("/");
      console.log("User signed out.");
    });
  }
  return (
    <div className="logout-container">
      <Button color="inherit" onClick={signOut}>
        Logout
      </Button>
    </div>
  );
}

export default Logout;
