import React, { useEffect, useState } from "react";
// react component that copies the given text inside your clipboard
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import { Apiurl } from './../../services/apirest';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Switch from '@material-ui/core/Switch';
import MUIDataTable from 'mui-datatables';
import Button from "@material-ui/core/Button";
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import Swal from 'sweetalert2'
import "./reporteAdmin.css";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Clear from "@material-ui/icons/Clear";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Lock from "@material-ui/icons/Lock";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Notifications from "@material-ui/icons/Notifications";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/icons.js";
import componentStyles_ from "assets/theme/components/button.js";
import componentStyles__ from "assets/theme/components/dialog.js";

const useStyles = makeStyles(componentStyles);
const useStyles_ = makeStyles(componentStyles_);
const useStyles__ = makeStyles(componentStyles__);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const AdminUsers = () => {

    const [state, setState] = React.useState({});
    const [msg, setMsg] = useState([]);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openEliminar, setOpenEliminar] = React.useState(false);

    const [values, setValues] = React.useState({
        password: '',
        nombre: '',
        dpi: '',
        usuario: '',
        rol: '',
    });

    const handleClickOpenEliminar = (value) => {
        document.getElementById("insertar").innerHTML = value.split("|")[0];
        document.getElementById("insertarNombre").innerHTML = value.split("|")[1];
        setOpenEliminar(true);
    };

    const handleCloseEliminar = () => {
        setOpenEliminar(false);
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange_ = (prop) => (event) => {
        if (document.getElementById("nombre").value == "" || document.getElementById("dpi").value == "" || document.getElementById("password").value == "") {
            document.getElementById("editarUser").style.display = "none";
        } else {
            document.getElementById("editarUser").style.display = "initial";
        }
        setValues({ ...values, [prop]: event.target.value });
    };

    const classes = useStyles();
    const classes_ = useStyles_();
    const classes__ = useStyles__();
    const theme = useTheme();

    const dialogClasses = {
        paper: classes__.dialogNotification,
    };

    const handleClickOpenEdit = (value) => {
        var user_ = value.split("|")[0];
        var nombreCompleto_ = value.split("|")[1];
        var dpi_ = value.split("|")[2];
        var pass_ = value.split("|")[3];
        var rol_ = value.split("|")[4];
        setValues({ ...values, password: pass_, nombre: nombreCompleto_, dpi: dpi_, usuario: user_, rol: rol_ });
        setOpenEdit(true);
    };

    function editarUsuario() {
        let form = {
            dpi: document.getElementById("dpi").value,
            nombre: document.getElementById("nombre").value,
            contrasenia: document.getElementById("password").value,
            tipousuario_codigo: document.getElementById("rol").value
        };
        let url = Apiurl + "/editarUsuario/" + document.getElementById("usuario").value;
        axios.post(url, form)
            .then(response => {
                notificacionSatisfactorio("Usuario editado correctamente.");
                getMsg();
                handleCloseEdit();
            }).catch(error => {
                console.log(error);
            });
    }

    function eliminarUsuario() {
        var user = document.getElementById("insertar").innerHTML;
        let url = Apiurl + "/eliminarUsuario/" + user;
        axios.delete(url)
            .then(response => {
                notificacionSatisfactorio("Usuario eliminado correctamente.");
                getMsg();
                handleCloseEliminar();
                // eliminar todos los reportes asociados al usuario
                eliminarReportes(user);
            }).catch(error => {
                console.log(error);
            });
    }

    function eliminarReportes(user) {
        let url = Apiurl + "/reportes"
        axios.get(url)
            .then(data => {
                data.data.reportes.forEach(item => {
                    if (item.encargado == user) {
                        let url_ = Apiurl + "/eliminarReporte/" + item.codigo;
                        axios.delete(url_).then(data => { }).catch(error => {
                            console.log(error);
                        });
                    }
                });
            }).catch(error => {
                console.log(error);
            });
    }

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const buttonSuccessClasses = {
        root: classes_.buttonContainedSuccess,
    };

    const buttonWarningClasses = {
        root: classes_.buttonContainedWarning,
    };

    const buttonInfoClasses = {
        root: classes_.buttonContainedInfo,
    };

    const buttonErrorClasses = {
        root: classes_.buttonOutlineError,
    };

    const getMsg = async () => {
        try {
            let url = Apiurl + "/obtenerUsuarios";
            await axios.get(url).then(data => {
                console.log(data);
                const result = [];
                const result_ = [];
                var contador = 0;
                data.data.reportes.forEach(item => {
                    if (item.nombreusuario == "anonimo") { }
                    else if (item.nombreusuario == "usuarioTest") { }
                    else if (item.nombreusuario == "usuarioEmpTester") { }
                    else {
                        result[contador] = [item.nombreusuario, item.nombre, item.dpi, cambiarPass(item.contrasenia), item.tipousuario_codigo, item.nombreusuario + "|" + item.nombre + "|" + item.dpi + "|" + item.contrasenia + "|" + item.tipousuario_codigo];
                        contador++;
                    }
                });
                console.log(result);
                //setState(result_)
                setMsg(result);
            });
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMsg();
    }, []);

    function cambiarPass(str) {
        var cadena = "";
        for (var i = 0; i < str.length; i++) {
            cadena += "*";
        }
        return cadena;
    }

    function handleClickVerQuien(s, s_) {
        var elemento = document.getElementById(s_);
        elemento.blur();
        Swal.fire({
            icon: 'info',
            title: 'Aún esta en resolución...',
            html: 'El reporte lo a tomado el empelado municipal <b>' + s + ' </b>para darle seguimiento al mismo.'
        });
    }

    function handleClickVerQuien_(s, s_) {
        var elemento = document.getElementById(s_);
        elemento.blur();
        Swal.fire({
            icon: 'success',
            title: 'Ya fue resuelto',
            html: 'El reporte fue resuelto por el empelado municipal <b>' + s + '.'
        });

    }

    const notificacionSatisfactorio = (str) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
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

    const columns = [
        {
            name: 'Nombre de usuario',
            options: {
                filter: true
            }
        },
        {
            name: 'Nombre completo',
            options: {
                filter: true
            }
        },
        {
            name: 'Dpi',
            options: {
                filter: true
            }
        },
        {
            name: 'Contraseña',
            options: {
                filter: true
            }
        },
        {
            name: 'Rol',
            options: {
                filter: true,
                customBodyRender: (value) => (
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                getTag(value)
                            }
                        />
                    </FormGroup>
                )
            }
        },
        {
            name: 'Acciones',
            options: {
                filter: false,
                customBodyRender: (value) => (
                    <FormGroup row>
                        {/*<Button color="primary" variant="contained" className="vrc" onClick={() => verReporteCompleto(value)}>
                            Ver reporte completo
                        </Button>*/}
                        <Button variant="outlined" size="small" className="Espacing" onClick={() => handleClickOpenEdit(value)}>Editar</Button>
                        <Button variant="outlined" size="small" classes={buttonErrorClasses} onClick={() => handleClickOpenEliminar(value)}>
                            Eliminar
                        </Button>
                    </FormGroup>
                )
            }
        },
    ];

    function getTag(valor) {
        if (valor == 1) {
            return <Chip
                avatar={<Avatar>AS</Avatar>}
                label="Administrado Del Sistema"
                variant="contained"
                classes={buttonSuccessClasses}
                color="primary"
                className="colors_"
                deleteIcon={<DoneIcon />}
            />;
        } else if (valor == 2) {
            return <Chip
                avatar={<Avatar>EM</Avatar>}
                label="Empledo Municipal"
                variant="contained"
                classes={buttonWarningClasses}
                color="primary"
                className="colors_"
                deleteIcon={<DoneIcon />}
            />;
        } else {
            return <Chip
                avatar={<Avatar>HM</Avatar>}
                label="Habitante de Mixco"
                variant="contained"
                classes={buttonInfoClasses}
                color="primary"
                className="colors_"
                deleteIcon={<DoneIcon />}
            />;
        }

    }

    function verify(c, n) {
        Swal.fire({
            title: 'Estas seguro que quieres dar por resuelto el reporte?',
            showCancelButton: true,
            confirmButtonText: `Si, dar por resuelto`,
            cancelButtonText: `Cancelar`,
            html: 'Esta es una acción permanente.'
        }).then((result) => {
            if (result.isConfirmed) {
                let form = {
                    "nuevoEstado": 2,
                    "encargado": localStorage.getItem("nombreusuario")
                };
                let url = Apiurl + "/actualizarReporte" + "/" + c;
                axios.put(url, form)
                    .then(response => {
                        if (response.data == "Reporte actualizado") {
                            if (n.toLowerCase() == "anonimo") {
                                notificacionSatisfactorio("Problema resuelto.");
                            } else {
                                notificacionSatisfactorio("Problema resuelto. Mensaje enviado a app web a " + n + ".");
                            }
                            getMsg();
                        }
                    }).catch(error => {
                        console.log(error);
                    });
            }
        })
    }

    async function verReporteCompleto(datos) {
        var corte = datos.split("|");
        var idReporte = corte[0]; // id para traer las imagenes
        var idTipoDeReporte = corte[1];
        var nombreReporte = "";
        if (idTipoDeReporte == "1") {
            nombreReporte = "Baches en las calles";
        } else if (idTipoDeReporte == "2") {
            nombreReporte = "Actos de delincuencia";
        } else if (idTipoDeReporte == "3") {
            nombreReporte = "Alumbrado público";
        } else {
            nombreReporte = "Falta de agua";
        }
        var username = corte[2];
        var fecha = corte[3];
        var hora = corte[4];
        var descripcion = corte[5];
        var zona = corte[6];
        var htmlBody = '<div class="contenedorRepText"> Nombre de usuario que reporta: <span class="repTxt">' + username + ' </span><br/>';
        htmlBody += 'Fecha en que se noto el inconveniente: <span class="repTxt">' + fecha + ' </span><br/>';
        htmlBody += 'Hora en que se noto el inconveniente: <span class="repTxt">' + hora + ' </span><br/>';
        htmlBody += 'Zona en que ocurrio el inconveniente: <span class="repTxt">' + zona + ' </span><br/>';
        htmlBody += '<p><b>Problema, inconveniente o queja reportada:</b></p>';
        htmlBody += '<p align="justify">' + descripcion + '</p></div>';

        let url = Apiurl + "/fotos/" + idReporte;
        let mydata = await axios.get(url);
        let archivos = mydata.data.archivos;
        var imgEncabezado = '<img width="128" class="reporte" peros="' + datos + '"';
        var imgPie = ' />';
        var imgHtml = '';
        htmlBody += '<p><b>Fotografías adjuntadas que evidencian el problema</b></p>';
        if (archivos.length > 0) {
            for (var i = 0; i < archivos.length; i++) {
                imgHtml += imgEncabezado + ' src="data:image/png;base64,' + archivos[i].img + '" ' + imgPie;
            }
            htmlBody += '<div>' + imgHtml + '</div>';
        } else {
            htmlBody += '<p>No se adjuntaron fotografías</p>';
        }


        Swal.fire({
            title: nombreReporte,
            width: 700,
            padding: '3em',
            closeOnClickOutside: false,
            html: htmlBody,
            background: '#fff url(https://image.freepik.com/foto-gratis/textura-papel-ligero-fondo_105034-732.jpg)',
        })
        var elements = document.getElementsByClassName("reporte");
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('click', imageVer, false);
        }
    }

    function imageVer(e) {
        var cadena = e.target.attributes.peros.textContent;
        Swal.fire({
            width: 700,
            html: '<img width="100%" class="report_" src="' + e.srcElement.currentSrc + '"  />'
        }).then((result) => {
            //console.log(result);
            if (result.isDismissed) {
                verReporteCompleto(cadena);
            }
            if (result.isConfirmed) {
                verReporteCompleto(cadena);
            }
        })
        document.getElementById("swal2-html-container").style.padding = "0px";
    }

    function version(a) {
        return state["a" + a];
    }

    const handleChange = async (event) => {
        var code = event.target.name;
        var codigo = code.substr(1);
        //console.log(codigo);
        setState({ ...state, [event.target.name]: event.target.checked });
        let form = {
            "nuevoEstado": 1,
            "encargado": localStorage.getItem("nombreusuario")
        };
        let url = Apiurl + "/actualizarReporte" + "/" + codigo;
        await axios.put(url, form)
            .then(response => {
                //console.log(response); //data: "Reporte actualizado"
                if (response.data == "Reporte actualizado") {
                    notificacionSatisfactorio("Te haz asignado el reporte para darle solucion al inconveniente.");
                    getMsg();
                }
            }).catch(error => {
                console.log(error);
            });
    }
    const options = {
        filterType: 'dropdown',
        responsive: 'stacked',
        print: true,
        rowsPerPage: 15,
        page: 0,
        selectableRows: false
    };

    function d(asd) {
        var newArray = [];
        for (var i = 0; i < asd.length; i++) {
            if (asd[i] === undefined) {

            } else {
                newArray.push(asd[i]);
            }
        }
        //console.log(newArray);
        return newArray;
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
                <Grid container component={Box} marginBottom="39px">
                    <Grid item xs={12}>
                        <Card classes={{ root: classes.cardRoot }}>
                            <CardHeader
                                className={classes.cardHeader}
                                title="Quejas e inconvenientes notificadas por los habitantes del municipio de Mixco"
                                titleTypographyProps={{
                                    component: Box,
                                    marginBottom: "0!important",
                                    variant: "h3",
                                }}
                            ></CardHeader>
                            <CardContent>


                                <MUIDataTable
                                    title="Reportes realizados por habitantes del municipio de Mixco a travez de la la app móvil."
                                    data={d(msg)}
                                    columns={columns}
                                    options={options}
                                />


                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Dialog
                open={openEdit}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes__.dialogHeader}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes__.dialogTitle}
                    >
                        Editar usuario
                    </Typography>
                    <IconButton onClick={handleCloseEdit}>
                        <Clear />
                    </IconButton>
                </div>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <FormGroup>
                                <FormLabel>Nombre Completo</FormLabel>
                                <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="100%"
                                    marginBottom="1rem!important"
                                >

                                    <FilledInput
                                        autoComplete="off"
                                        type="text"
                                        placeholder="Nombre completo"
                                        id="nombre"
                                        value={values.nombre}
                                        onChange={handleChange_('nombre')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <AssignmentIndIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormGroup>
                                <FormLabel>DPI</FormLabel>
                                <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="100%"
                                    marginBottom="1rem!important"
                                >
                                    <FilledInput
                                        autoComplete="off"
                                        type="text"
                                        placeholder="DPI"
                                        id="dpi"
                                        value={values.dpi}
                                        onChange={handleChange_('dpi')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} lg={6}>
                            <FormGroup>
                                <FormLabel>Contraseña</FormLabel>
                                <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="100%"
                                    marginBottom="1rem!important"
                                >
                                    <FilledInput
                                        autoComplete="off"
                                        placeholder="Contraseña"
                                        id="password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange_('password')}
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
                                </FormControl>
                            </FormGroup>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <FormGroup>
                                <FormLabel>UserName</FormLabel>
                                <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="100%"
                                    marginBottom="1rem!important"
                                >
                                    <FilledInput
                                        disabled={true}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="usuario"
                                        id="usuario"
                                        value={values.usuario}
                                        onChange={handleChange_('usuario')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>
                    </Grid>

                    <Grid container className="typeOcultar">
                        <Grid item xs={12} lg={6}>
                            <FormGroup>
                                <FormLabel>Rol</FormLabel>
                                <FormControl
                                    variant="filled"
                                    component={Box}
                                    width="100%"
                                    marginBottom="1rem!important"
                                >
                                    <FilledInput
                                        disabled={true}
                                        autoComplete="off"
                                        type="text"
                                        placeholder="rol"
                                        id="rol"
                                        value={values.rol}
                                        onChange={handleChange_('rol')}
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <PermIdentityIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </FormGroup>
                        </Grid>
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button id="editarUser" onClick={editarUsuario} color="primary" variant="contained">
                        Guardar cambios
                    </Button>
                    <Button
                        component={Box}
                        onClick={handleCloseEdit}
                        color="primary"
                        marginLeft="auto!important"
                    >
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openEliminar}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseEliminar}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                classes={dialogClasses}
                id="MiModalEliminar"
            >
                <div className={classes__.dialogHeader}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes__.dialogTitle}
                    >
                        Eliminar Usuario
                    </Typography>
                    <IconButton onClick={handleCloseEliminar}>
                        <Box component={Clear} color={theme.palette.white.main} />
                    </IconButton>
                </div>
                <DialogContent>
                    <Box textAlign="center" paddingTop="1rem" paddingBottom="1rem">
                        <Box
                            component={Notifications}
                            width="3em!important"
                            height="3em!important"
                        ></Box>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes__.dialogHeading}
                        >
                            ¡DEBE LEER ESTO!
                        </Typography>
                        <Typography variant="body2" component="p">
                            Esta es una acción permanente, todas las acciones que el usuario <span id="insertar"> </span> con nombre <span id="insertarNombre"></span> haya realizado con anterioridad se eliminaran permanentemente.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={eliminarUsuario} color="secondary" variant="contained">
                        Ok, adelante
                    </Button>
                    <Button
                        component={Box}
                        onClick={handleCloseEliminar}
                        color="secondary"
                        marginLeft="auto!important"
                    >
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminUsers;
