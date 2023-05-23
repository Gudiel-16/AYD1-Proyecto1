import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";

import theme from "assets/theme/theme.js";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

if (localStorage.getItem('tipousuario_codigo')) {
  if (localStorage.getItem('tipousuario_codigo') == 1) { // rol habitante administrador
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin/index" render={(props) => <AdminLayout {...props} />} />
            <Route exact path="/admin/registro" render={(props) => <AdminLayout {...props} />} />
            <Route exact path="/admin/user-profile" render={(props) => <AdminLayout {...props} />} />
            <Route exact path="/admin/administrar-usuario" render={(props) => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/index" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>,
      document.querySelector("#root")
    );
  } else if (localStorage.getItem('tipousuario_codigo') == 2) { // rol trabajador municipal
    ReactDOM.render(
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <BrowserRouter>
          <Switch>
            <Route exact path="/admin/reportes" render={(props) => <AdminLayout {...props} />} />
            <Route exact path="/admin/user-profile" render={(props) => <AdminLayout {...props} />} />
            <Redirect from="/" to="/admin/reportes" />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>,
      document.querySelector("#root")
    );
  }
}else{
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth" />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>,
    document.querySelector("#root")
  );
}
