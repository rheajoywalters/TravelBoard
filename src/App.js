import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import MenuIcon from "@material-ui/icons/Menu";
import { Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import Countdown from "./Countdown";
import WorldMap from "./WorldMap";
import AddPlace from "./AddPlace";
import ToGo from "./ToGo";
import Gone from "./Gone";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Place from "./Place";

export function App(props) {
  const [drawer_open, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dialog_open, setDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(u => {
      if (u) {
        setUser(u);
      } else {
        props.history.push("/");
      }
    });

    return unsubscribe;
  }, [props.history]);

  if (!user) {
    return <div />;
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        props.history.push("/");
      })
      .catch(error => {
        alert(error.message);
      });
  };

  return (
    <div>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => {
              setDrawerOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Button
            variant="h6"
            color="inherit"
            style={{ flexGrow: 1, marginLeft: "30px" }}
            to="/app/"
            component={Link}
          >
            Travel Board
          </Button>
          <Typography color="inherit" style={{ marginRight: "30px" }}>
            Hi {user.email}!
          </Typography>
          <Button color="inherit" onClick={handleSignOut}>
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        open={drawer_open}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <List component="nav">
          <ListItem
            button
            to="/app/Places_To_Go/"
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Places To Go" />
          </ListItem>
          <ListItem
            button
            to="/app/Places_I've_Gone/"
            component={Link}
            onClick={() => {
              setDrawerOpen(false);
            }}
          >
            <ListItemText primary="Places I've Gone" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              setDialogOpen(true);
            }}
          >
            <ListItemText primary="Add a Location" />
          </ListItem>
        </List>
      </Drawer>
      <AddPlace
        user={user}
        open={dialog_open}
        onClose={() => {
          setDialogOpen(false);
          setDrawerOpen(false);
        }}
      />
      <Route
        exact
        path="/app/Places_To_Go/"
        render={() => {
          return <ToGo user={user} />;
        }}
      />
      <Route
        exact
        path={"/app/Places_I've_Gone/:place_id"}
        render={routeProps => {
          return <Place {...routeProps} type={"gone"} user={user} />;
        }}
      />
      <Route
        exact
        path={"/app/Places_To_Go/:place_id"}
        render={routeProps => {
          return <Place {...routeProps} type={"togo"} user={user} />;
        }}
      />
      <Route
        exact
        path="/app/Places_I've_Gone/"
        render={() => {
          return <Gone user={user} />;
        }}
      />
      <Route
        exact
        path="/app/"
        render={() => {
          return (
            <div>
              <Countdown user={user} />
              <WorldMap />
            </div>
          );
        }}
      />
    </div>
  );
}
