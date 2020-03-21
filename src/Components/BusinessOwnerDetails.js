import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles({
  root: {
    width: 350,
    height: "91vh",
    marginTop: "65px",
    textAlign: "center"
  },

  title: {
    fontSize: 18,
    margin: "auto",
    padding: 10,
    color: "textSecondary",
    fontWeight: 600
  },

  avatar: {
    width: 140,
    height: 140,
    margin: "auto",
    fontSize: "50px",
    background: "#3f51b5"
  }
});

function BusinessOwnerDetails({ userProfile }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        {userProfile && (
          <div>
            <Avatar aria-label="recipe" className={classes.avatar}>
              {userProfile.Ad.charAt(0).toUpperCase()}
            </Avatar>
            <Typography className={classes.title} gutterBottom>
              {userProfile.Ad}
            </Typography>
            <Typography className={classes.title}>{userProfile.zu}</Typography>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default BusinessOwnerDetails;
