import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  root: {
    paddingLeft: (theme.spacing(9) + 1),
    display: "block",
    flex: 1,
    flexGrow: "1",
    alignItems: "stretch",
    flexDirection: "column",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
    },
  },
  content: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  footer: {
    width: "100%",
    height: "60px",
    display: "flex",
    justifyContent: "flex-end",
    borderTop: "0.5px rgba(0,0,0,0.3) solid",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export default function Main(props) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <div className={classes.toolbar} />
      <div style={{ flex: 1, minHeight: "100vh" }}>
        <main className={classes.content}>
          <div
            style={{
              // display: "flex",
              position:"relative",
              display:"block",
              // flexDirection: "column",
              // justifyItems: "stretch",
            }}
          >
            {props.children}
          </div>
        </main>
      </div>
      <footer className={classes.footer}>
            <p>
              Copyright © 2020 <a href="/">PHUC THINH CO., LTD</a>. All rights
              reserved.
            </p>
          </footer>
      {/* </div> */}
    </div>
  );
}
