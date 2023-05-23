import React, { useState } from "react";
// react component that copies the given text inside your clipboard
//import { CopyToClipboard } from "react-copy-to-clipboard";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
// @material-ui/icons components
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import InputAdornment from "@material-ui/core/InputAdornment";
import FaceIcon from '@material-ui/icons/Face';
import Lock from "@material-ui/icons/Lock";
import IconButton from '@material-ui/core/IconButton';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import './registro.css';
import shake from './../auth/Shake';
import axios from 'axios';
import { Apiurl } from './../../services/apirest';
import Swal from 'sweetalert2'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
//import DeleteIcon from '@material-ui/icons/Delete';

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/icons.js";

function validar() {
    var inputNombre = document.getElementById("nombreCompleto").value;
    var inputUser = document.getElementById("username").value;
    var inputDpi = document.getElementById("dpi").value;
    var inputPass = document.getElementById("password").value;

    var contenedorNombreCompleto = document.getElementById("contenedorNombreCompleto");
    var contenedorNombreCompleto_ = contenedorNombreCompleto.getElementsByClassName("MuiInputBase-root");

    var contenedorUsername = document.getElementById("contenedorUsername");
    var contenedorUsername_ = contenedorUsername.getElementsByClassName("MuiInputBase-root");

    var contenedorDpi = document.getElementById("contenedorDpi");
    var contenedorDpi_ = contenedorDpi.getElementsByClassName("MuiInputBase-root");

    var contenedorRol = document.getElementById("contenedorRol");
    var contenedorRol_ = contenedorRol.getElementsByClassName("MuiInputBase-root");

    var contenedorPass = document.getElementById("contenedorPass");
    var contenedorPass_ = contenedorPass.getElementsByClassName("MuiInputBase-root");

    if (inputNombre == "") {
        contenedorNombreCompleto_[0].classList.add('bordeCampoVacio');
        document.getElementById("notificacionNombreCompleto").style.display = "block";
        shake(contenedorNombreCompleto, 2, true); // efecto temblor 2 al tener campo vacio
    }
    if (inputUser == "") {
        contenedorUsername_[0].classList.add('bordeCampoVacio');
        document.getElementById("notificacionNombreUsusario").style.display = "block";
        shake(contenedorUsername, 2, true); // efecto temblor 2 al tener campo vacio
    }
    if (inputDpi == "") {
        contenedorDpi_[0].classList.add('bordeCampoVacio');
        document.getElementById("notificacionDpi").style.display = "block";
        shake(contenedorDpi, 2, true); // efecto temblor 2 al tener campo vacio
    }
    if (miROl == "") {
        contenedorRol_[0].classList.add('bordeCampoVacio');
        document.getElementById("notificacionRol").style.display = "block";
        shake(contenedorRol, 2, true); // efecto temblor 2 al tener campo vacio
    }
    if (inputPass == "") {
        contenedorPass_[0].classList.add('bordeCampoVacio');
        document.getElementById("notificacionPass").style.display = "block";
        shake(contenedorPass, 2, true); // efecto temblor 2 al tener campo vacio
    }

    if (inputNombre != "" && inputUser != "" && inputDpi != "" && miROl != "" && inputPass != "") {
        let form = {
            "nombreUsuario": inputUser,
            "dpi": inputDpi,
            "nombre": inputNombre,
            "contrasenia": inputPass,
            "tipousuario_codigo": miROl
        };
        let url = Apiurl + "/registrarUsuario";
        axios.post(url, form)
            .then(response => {
                if (response.data == "Usuario Registrado") {
                    document.getElementById("limpieza").style.display = "block";
                    notificacionSatisfactorio("Usuario registrado correctamente!");
                }
            }).catch(error => {
                if (error.response) {
                    if (error.response.data == "Usuario Existente" && error.response.status == 500) { // el usuario ya existe
                        contenedorUsername_[0].classList.add('bordeCampoIncorrecto');
                        shake(contenedorUsername);
                        document.getElementById("notificacionNombreUsuarioExistente").style.display = "block";
                    }
                } else { // otros errores
                    console.log("Error", error.message)
                }
            });
    }

}

const notificacionSatisfactorio = (str) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: str
    })
}

function ocultarAlertaVacioNC() {
    document.getElementById("notificacionNombreCompleto").style.display = "none";
}

function ocultarAlertaVacioU() {
    document.getElementById("notificacionNombreUsusario").style.display = "none";
    document.getElementById("notificacionNombreUsuarioExistente").style.display = "none";
}

function ocultarAlertaVacioDpi() {
    document.getElementById("notificacionDpi").style.display = "none";
}

function ocultarAlertaVacioRol() {
    document.getElementById("notificacionRol").style.display = "none";
}

function ocultarAlertaVacioPass() {
    document.getElementById("notificacionPass").style.display = "none";
}

var miROl = "";

const useStyles = makeStyles(componentStyles);

const Registro = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [copiedText, setCopiedText] = useState();
    const [rol, setRol] = React.useState('');

    const handleChange = (event) => {
        miROl = event.target.value;
        setRol(event.target.value);
        mostrarLimpieza();
    };

    const handleChangeNC = (event) => {
        mostrarLimpieza();
    };

    const handleChangeNU = (event) => {
        mostrarLimpieza();
    };

    const handleChangeDpi = (event) => {
        mostrarLimpieza();
    };

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    function ocultarLimpieza() {
        var inputNombre = document.getElementById("nombreCompleto").value;
        var inputUser = document.getElementById("username").value;
        var inputDpi = document.getElementById("dpi").value;
        var inputPass = document.getElementById("password").value;
        if (inputNombre == "" && inputUser == "" && inputDpi == "" && miROl == "" && inputPass == "") {
            document.getElementById("limpieza").style.display = "none";
        }
    }

    function mostrarLimpieza() {
        document.getElementById("limpieza").style.display = "block";
        ocultarLimpieza();
    }

    const handleChange_ = (prop) => (event) => {
        mostrarLimpieza();
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const limpiar = () => {
        document.getElementById("nombreCompleto").value = "";
        document.getElementById("username").value = "";
        document.getElementById("dpi").value = "";
        setRol("");
        miROl = "";
        values.password = "";
        setValues({ ...values, showPassword: false });
        ocultarAlertaVacioNC();
        ocultarAlertaVacioU();
        ocultarAlertaVacioDpi();
        ocultarAlertaVacioRol();
        ocultarAlertaVacioPass();
        var contenedorNombreCompleto = document.getElementById("contenedorNombreCompleto");
        var contenedorNombreCompleto_ = contenedorNombreCompleto.getElementsByClassName("MuiInputBase-root");
        contenedorNombreCompleto_[0].classList.remove('bordeCampoVacio');
        var contenedorUsername = document.getElementById("contenedorUsername");
        var contenedorUsername_ = contenedorUsername.getElementsByClassName("MuiInputBase-root");
        contenedorUsername_[0].classList.remove('bordeCampoVacio');
        contenedorUsername_[0].classList.remove('bordeCampoIncorrecto');
        var contenedorDpi = document.getElementById("contenedorDpi");
        var contenedorDpi_ = contenedorDpi.getElementsByClassName("MuiInputBase-root");
        contenedorDpi_[0].classList.remove('bordeCampoVacio');
        var contenedorRol = document.getElementById("contenedorRol");
        var contenedorRol_ = contenedorRol.getElementsByClassName("MuiInputBase-root");
        contenedorRol_[0].classList.remove('bordeCampoVacio');
        var contenedorPass = document.getElementById("contenedorPass");
        var contenedorPass_ = contenedorPass.getElementsByClassName("MuiInputBase-root");
        contenedorPass_[0].classList.remove('bordeCampoVacio');
        document.getElementById("limpieza").style.display = "none";
    }

    return (
        <>
            <Header />
            {/* Page content */}
            <Container
                maxWidth={false}
                component={Box}
                marginTop="-6rem"
                classes={{ root: classes.containerRoot }}

            >
                <Grid item xs={12} lg={6} md={8} id="containerId">
                    <Card classes={{ root: classes.cardRoot }}>
                        <CardHeader
                            className={classes.cardHeader}
                            /*title="Registra usuarios"*/
                            title={
                                <Box>
                                    Registra usuarios
                                    <Button color="default" variant="contained" onClick={limpiar} id="limpieza" >
                                        Limpiar campos
                                    </Button>
                                </Box>
                            }
                            titleTypographyProps={{
                                component: Box,
                                marginBottom: "0 !important",
                                variant: "h3",
                            }}
                        >

                        </CardHeader>
                        <CardContent classes={{ root: classes.cardContent }} id="campoOne">
                            <Box
                                color={theme.palette.gray[600]}
                                id="textTitleId"
                            >
                                <Box fontSize="80%" fontWeight="400" component="small">
                                    Como administrador puedes crear nuevos usuarios con rol administrador o empleado municipal.
                                </Box>
                            </Box>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="80%"
                                marginBottom="0.75rem !important"
                                id="contenedorNombreCompleto"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Nombre completo"
                                    id="nombreCompleto"
                                    onFocus={ocultarAlertaVacioNC}
                                    onChange={handleChangeNC}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <AssignmentIndIcon />
                                        </InputAdornment>
                                    }
                                />
                                <span className="nombreCompletoVacio" id="notificacionNombreCompleto">Dejaste el campo Nombre completo vacio.</span>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="80%"
                                marginBottom="0.75rem !important"
                                id="contenedorUsername"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Nombre de usuario"
                                    id="username"
                                    onFocus={ocultarAlertaVacioU}
                                    onChange={handleChangeNU}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <FaceIcon />
                                        </InputAdornment>
                                    }
                                />
                                <span className="nombreCompletoVacio" id="notificacionNombreUsusario">Dejaste el campo Nombre de usuario vacio.</span>
                                <span className="nombreExistente" id="notificacionNombreUsuarioExistente">Nombre se usuario ya registrado. Por favor trata con otro.</span>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="80%"
                                marginBottom="0.75rem !important"
                                id="contenedorDpi"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    type="text"
                                    placeholder="DPI"
                                    id="dpi"
                                    onFocus={ocultarAlertaVacioDpi}
                                    onChange={handleChangeDpi}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <PermIdentityIcon />
                                        </InputAdornment>
                                    }
                                />
                                <span className="nombreCompletoVacio" id="notificacionDpi">Dejaste el campo dpi vacio.</span>
                            </FormControl>
                            <FormControl
                                id="contenedorRol"
                                variant="filled"
                                component={Box}
                                width="80%"
                                marginBottom="0.75rem !important">
                                <InputLabel id="demo-simple-select-outlined-label"></InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="rol"
                                    value={rol}
                                    onChange={handleChange}
                                    onFocus={ocultarAlertaVacioRol}
                                    displayEmpty
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <BusinessCenterIcon /> <span id="spanRol">Tipo de usuario (rol)</span>
                                        </InputAdornment>
                                    }
                                >
                                    <MenuItem value="" disabled>
                                        <em>Selecciona acá</em>
                                    </MenuItem>
                                    <MenuItem value={1}>Administrador</MenuItem>
                                    <MenuItem value={2}>Empleado Municipal</MenuItem>
                                </Select>
                                <span className="nombreCompletoVacio" id="notificacionRol">Selecciona el tipo de rol.</span>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="80%"
                                marginBottom="0.75rem !important"
                                id="contenedorPass"
                            >
                                <FilledInput
                                    autoComplete="off"
                                    placeholder="Contraseña"
                                    id="password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange_('password')}
                                    onFocus={ocultarAlertaVacioPass}
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Lock />
                                        </InputAdornment>
                                    }
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                                <span className="nombreCompletoVacio" id="notificacionPass">No has colocado una contraseña.</span>
                            </FormControl>


                            <Box textAlign="center" marginTop="0.2rem" >
                                <Button color="primary" variant="contained" onClick={validar}>
                                    Crear cuenta
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Container>
        </>
    );
};

export default Registro;
