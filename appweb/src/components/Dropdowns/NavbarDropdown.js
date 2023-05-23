import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
// @material-ui/icons components
import DirectionsRun from "@material-ui/icons/DirectionsRun";
import Person from "@material-ui/icons/Person";

// core components
import componentStyles from "assets/theme/components/navbar-dropdown.js";

const useStyles = makeStyles(componentStyles);

function logout() {
  localStorage.removeItem("nombreusuario");
  localStorage.removeItem("tipousuario_codigo");
  localStorage.removeItem("nombre");
  window.location.href = '/auth';
}

function perfil() {
  window.location.href = '/admin/user-profile';
}

export default function NavbarDropdown() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Typography
        variant="h6"
        component="h6"
        classes={{ root: classes.menuTitle }}
      >
        Bienvenido! {localStorage.getItem("nombreusuario")}
      </Typography>
      <a onClick={perfil} >
        <Box
          display="flex!important"
          alignItems="center!important"
          component={MenuItem}
          onClick={handleMenuClose}
        >
          <Box
            component={Person}
            width="1.25rem!important"
            height="1.25rem!important"
            marginRight="1rem"
          />
          <span>Mi perfil</span>
        </Box>
      </a>
      <Divider component="div" classes={{ root: classes.dividerRoot }} />
      <a onClick={logout} >
        <Box
          display="flex!important"
          alignItems="center!important"
          component={MenuItem}
          onClick={handleMenuClose}
        >
          <Box
            component={DirectionsRun}
            width="1.25rem!important"
            height="1.25rem!important"
            marginRight="1rem"
          />
          <span>Salir</span>
        </Box>
      </a>
    </Menu>
  );

  return (
    <>
      <Button
        edge="end"
        aria-label="account of current user"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
        classes={{
          label: classes.buttonLabel,
          root: classes.buttonRoot,
        }}
      >
        <Avatar
          alt="..."
          src={require("assets/img/theme/team-4-800x800.jpg").default}
          classes={{
            root: classes.avatarRoot,
          }}
        />
        <Hidden smDown>{localStorage.getItem("nombreusuario")}</Hidden>
        <br />
        <Hidden smDown>{localStorage.getItem("tipousuario_codigo") == "1" ? "Administrador" : "Empleado Municipal"}</Hidden>
      </Button>
      {renderMenu}
    </>
  );
}
