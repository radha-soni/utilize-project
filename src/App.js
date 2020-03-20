import React, { useState } from "react";
import Login from "./Components/login";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import DashBoard from "./Components/DashBoard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState();

  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Login
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            setUserProfile={setUserProfile}
          />
        </Route>

        {loggedIn ? (
          <Route path="/utilize">
            <DashBoard
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              userProfile={userProfile}
            />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
      </Router>
    </div>
  );
}

export default App;
