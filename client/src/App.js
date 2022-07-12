import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { theme } from "./themes/theme";
import Routes from "./routes";
import axios from "axios";
import { OnboardingProvider } from "./Context/OnboardingContext";

axios.interceptors.request.use(async function (config) {
  const token = await localStorage.getItem("messenger-token");
  config.headers["x-access-token"] = token;

  return config;
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <OnboardingProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </OnboardingProvider>
    </MuiThemeProvider>
  );
}

export default App;
