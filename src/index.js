import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import { SignIn, SignUp } from "./Authentication";
import { BrowserRouter, Route } from "react-router-dom";
//import { LoadScript } from "@react-google-maps/api";

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/app" component={App} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
// <LoadScript
//id="script-loader"
//googleMapsApiKey="AIzaSyAHiCSDftOEJQjbdTQiXuU2UMNFROlaB-c"
//>
// </LoadScript>
