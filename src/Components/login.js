import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Login({ setLoggedIn, setUserProfile }) {
  let history = useHistory();

  useEffect(() => {
    const onSignIn = googleUser => {
      setLoggedIn(true);
      history.push("/utilize");
      var profile = googleUser.getBasicProfile();
      setUserProfile(profile);
    };

    window.gapi.signin2.render("google-signIn-button", {
      scope: "email",
      width: 350,
      height: 70,
      longtitle: true,
      theme: "dark",
      onsuccess: onSignIn
    });
  }, []);

  return <div id="google-signIn-button"></div>;
}

export default Login;
