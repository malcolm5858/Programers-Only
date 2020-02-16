import React, { useState } from "react";
import SideMenu from "../Components/SideMenu";
import { Grid, makeStyles } from "@material-ui/core";
import CodeViewer from "../Components/CodeViewer";
import Bio from "../Components/Bio";
import { Button } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  }
}));

function getImage(base) {
  var image = new Image();
  image.src = "data:image/png;base64,${base}";
  return image;
}

function MainPage({ match, location }) {
  const [UserData, setUserData] = useState([]);

  const {
    params: { userId }
  } = match;
  React.useEffect(() => {
    fetch("/findUser").then(response =>
      response.json().then(data => {
        setUserData(data);
      })
    );
  });

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideMenu Name={UserData.name} />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ width: "100%", overflowX: "auto" }}>
        <CodeViewer img={getImage(UserData.img)} />
        <div
          style={{ width: "100%", overflowX: "hidden", textAlign: "center" }}>
          <Button
            onClick={async () => {
              const data = { value: true, id: UserData.id };
              const response = await fetch("/yesNo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });

              response.json().then(data => {
                window.location.assign("/{data.id}");
              });
            }}>
            Yes
          </Button>
          <span></span>
          <Button
            onClick={async () => {
              const data = { value: false, id: UserData.id };
              const response = await fetch("/yesNo", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
              });

              response.json().then(data => {
                window.location.assign("/{data.id}");
              });
            }}>
            No
          </Button>
        </div>
        <Bio text={UserData.Bio} />
      </Grid>
    </div>
  );
}

export default MainPage;
