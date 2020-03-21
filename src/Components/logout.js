/* global gapi */
import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";

function Logout({ setLoggedIn }) {
  let history = useHistory();
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      setLoggedIn(false);
      history.push("/");
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
