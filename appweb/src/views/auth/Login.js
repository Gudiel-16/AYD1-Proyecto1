import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons components
import PersonIcon from '@material-ui/icons/Person';
import Lock from "@material-ui/icons/Lock";
import shake from './Shake';
import axios from 'axios';
import { Apiurl } from './../../services/apirest';
import "./styleLogin.css"

// core components
import componentStyles from "assets/theme/views/auth/login.js";

const useStyles = makeStyles(componentStyles);

function validar() {
  var inputUser = document.getElementById("usuario").value;
  var inputPass = document.getElementById("password").value;

  var passwordContenedor = document.getElementById("passwordContenedor");
  var passwordContenedor_ = passwordContenedor.getElementsByClassName("MuiInputBase-root");

  var usuarioContenedor = document.getElementById("usuarioContenedor");
  var usuarioContenedor_ = usuarioContenedor.getElementsByClassName("MuiInputBase-root");

  if (inputUser == "") {
    usuarioContenedor_[0].classList.add('bordeCampoVacio');
    document.getElementById("notificacionUsuarioVacio").style.display = "block";
    shake(usuarioContenedor, 2, true); // efecto temblor 2 al tener campo vacio
  }

  if (inputPass == "") {
    passwordContenedor_[0].classList.add('bordeCampoVacio');
    document.getElementById("notificacionPassVacio").style.display = "block";
    shake(passwordContenedor, 2, true); // efecto temblor 2 al tener campo vacio
  }


  if (inputUser != "" && inputPass != "") {
    let form = { "nombreUsuario": inputUser, "contrasenia": inputPass };
    let url = Apiurl + "/login";
    axios.post(url, form)
      .then(response => {
        if (response.data.tipousuario_codigo == 1) {
          localStorage.setItem("nombreusuario", response.data.nombreusuario);
          localStorage.setItem("nombre", response.data.nombre);
          localStorage.setItem("tipousuario_codigo", response.data.tipousuario_codigo);
          window.location.href = '/admin/index';
        } else if (response.data.tipousuario_codigo == 2) {
          localStorage.setItem("nombreusuario", response.data.nombreusuario);
          localStorage.setItem("nombre", response.data.nombre);
          localStorage.setItem("tipousuario_codigo", response.data.tipousuario_codigo);
          window.location.href = '/admin/icons';
        } else if (response.data.tipousuario_codigo == 4) {
          usuarioContenedor_[0].classList.add('bordeCampoIncorrecto');
          shake(usuarioContenedor);
          passwordContenedor_[0].classList.add('bordeCampoIncorrecto');
          shake(passwordContenedor);
          document.getElementById("contDatosIncorrectosUser").style.display = "block";
        } else {
          usuarioContenedor_[0].classList.add('bordeCampoIncorrecto');
          shake(usuarioContenedor);
          passwordContenedor_[0].classList.add('bordeCampoIncorrecto');
          shake(passwordContenedor);
          document.getElementById("contDatosIncorrectos").style.display = "block";
        }
      }).catch(error => {
        if (error.response) {
          //console.log(error.response.data); //console.log(error.response.status); //console.log(error.response.headers);
          if (error.response.data == false && error.response.status == 500) { // no existe el usuario
            usuarioContenedor_[0].classList.add('bordeCampoIncorrecto');
            shake(usuarioContenedor);
            passwordContenedor_[0].classList.add('bordeCampoIncorrecto');
            shake(passwordContenedor);
            document.getElementById("contDatosIncorrectos").style.display = "block";
          }
        } else { // otros errores
          console.log("Error", error.message)
        }
      });
  }
}

function ocultarAlertaVacioUsuario() {
  document.getElementById("notificacionUsuarioVacio").style.display = "none";
  document.getElementById("contDatosIncorrectos").style.display = "none";
  document.getElementById("contDatosIncorrectosUser").style.display = "none";
}

function ocultarAlertaVacioPass() {
  document.getElementById("notificacionPassVacio").style.display = "none";
  document.getElementById("contDatosIncorrectos").style.display = "none";
  document.getElementById("contDatosIncorrectosUser").style.display = "none";
}

function Login() {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <Grid item xs={12} lg={5} md={7}>
        <Card classes={{ root: classes.cardRoot }}>
          <CardContent classes={{ root: classes.cardContent }}>
            <Box
              color={theme.palette.gray[600]}
              textAlign="center"
              marginBottom="1rem"
              fontSize="1rem"
            >
              <Box fontSize="80%" fontWeight="400" component="small">
                Inicia sesión con tus credenciales
              </Box>
            </Box>
            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
              id="usuarioContenedor"
            >
              <FilledInput
                autoComplete="off"
                type="text"
                placeholder="Nombre de usuario"
                id="usuario"
                onFocus={ocultarAlertaVacioUsuario}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                }
              />
              <span id="notificacionUsuarioVacio">Colocá tu nombre de usuario</span>
            </FormControl>

            <FormControl
              variant="filled"
              component={Box}
              width="100%"
              marginBottom="1rem!important"
              id="passwordContenedor"
            >
              <FilledInput
                autoComplete="off"
                type="password"
                placeholder="Contraseña"
                id="password"
                onFocus={ocultarAlertaVacioPass}
                startAdornment={
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                }
              />
              <span id="notificacionPassVacio">Colocá tu contraseña</span>
            </FormControl>
            <div id="contDatosIncorrectos">
              <span id="datosIncorrectos">Datos incorrectos, vuelva a intentarlo. Si el error persiste comunicarse con el administrador.</span>
            </div>
            <div id="contDatosIncorrectosUser">
              <span id="datosIncorrectosUser">Tu rol es habitante de Mixco, por favor accede desde la app movil. Si el error persiste comunicarse con el administrador.</span>
            </div>
            <Box textAlign="center" marginTop="1.5rem" marginBottom="1.5rem">
              <Button color="primary" variant="contained" onClick={validar}>
                Entrar
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default Login;
