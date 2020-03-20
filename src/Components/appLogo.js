import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logout from "./logout";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

function AppLogo({ setLoggedIn }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h3" className={classes.title}>
            UTILIZE
          </Typography>
          <Logout setLoggedIn={setLoggedIn} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default AppLogo;
