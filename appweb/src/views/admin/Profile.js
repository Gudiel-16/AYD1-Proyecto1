import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Container from "@material-ui/core/Container";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { Apiurl } from './../../services/apirest';
// @material-ui/icons components
import LocationOn from "@material-ui/icons/LocationOn";
import School from "@material-ui/icons/School";
import Lock from "@material-ui/icons/Lock";
import IconButton from '@material-ui/core/IconButton';
import Swal from 'sweetalert2'
import './perfil.css';

// core components
import UserHeader from "components/Headers/UserHeader.js";

import componentStyles from "assets/theme/views/admin/profile.js";
import boxShadows from "assets/theme/box-shadow.js";

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from "@material-ui/core/InputAdornment";
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

const useStyles = makeStyles(componentStyles);

function Profile() {
  const [values, setValues] = React.useState({
    password: '',
    nombre: '',
    dpi: '',
    showPassword: false,
  });


  const handleChange_ = (prop) => (event) => {
    if(document.getElementById("nombre").value == "" || document.getElementById("dpi").value == "" || document.getElementById("password").value == ""){
      document.getElementById("editarUser").style.display = "none";
    }else{
      document.getElementById("editarUser").style.display = "initial";
    }
    setValues({ ...values, [prop]: event.target.value });
  };


  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();
  const theme = useTheme();

  const getMsg = async () => {
    try {
      let url = Apiurl + "/obtenerUsuario/" + localStorage.getItem("nombreusuario");
      const datos = await axios.get(url);
      setValues({ ...values, password: datos.data.usuario[0].contrasenia, nombre: datos.data.usuario[0].nombre, dpi: datos.data.usuario[0].dpi });
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getMsg();
  }, []);


  function editarUsuario() {
    try {
      let form = {
        nombreUsuario: localStorage.getItem("nombreusuario"),
        dpi: document.getElementById("dpi").value,
        nombre: document.getElementById("nombre").value,
        contrasenia: document.getElementById("password").value,
        tipousuario_codigo: localStorage.getItem("tipousuario_codigo")
      };
      let url = Apiurl + "/editarUsuario/" + localStorage.getItem("nombreusuario");
      axios.post(url, form)
        .then(response => {
          notificacionSatisfactorio("Tus datos han sido editados correctamente.");
          localStorage.removeItem("nombre");
          localStorage.setItem("nombre",document.getElementById("nombre").value)
          getMsg();
        }).catch(error => {
          console.log(error);
        });
    }
    catch (err) {
      console.log(err);
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

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container
        maxWidth={false}
        component={Box}
        marginTop="-14rem"
        classes={{ root: classes.containerRoot }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            xl={8}
            component={Box}
            marginBottom="3rem"
            classes={{ root: classes.gridItemRoot + " " + classes.order2 }}
          >
            <Card
              classes={{
                root: classes.cardRoot + " " + classes.cardRootSecondary,
              }}
            >
              <CardHeader
                subheader={
                  <Grid
                    container
                    component={Box}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Grid item xs="auto">
                      <Box
                        component={Typography}
                        variant="h3"
                        marginBottom="0!important"
                      >
                        Mi cuenta
                      </Box>
                    </Grid>
                    <Grid item xs="auto">
                      <Box
                        justifyContent="flex-end"
                        display="flex"
                        flexWrap="wrap"
                      >
                        {/*<Button
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Settings
                        </Button>*/}
                      </Box>
                    </Grid>
                  </Grid>
                }
                classes={{ root: classes.cardHeaderRoot }}
              ></CardHeader>
              <CardContent>
                <Box
                  component={Typography}
                  variant="h6"
                  color={theme.palette.gray[600] + "!important"}
                  paddingTop=".25rem"
                  paddingBottom=".25rem"
                  fontSize=".75rem!important"
                  letterSpacing=".04em"
                  marginBottom="1.5rem!important"
                  classes={{ root: classes.typographyRootH6 }}
                >
                  Información de Usuario
                </Box>
                <div className={classes.plLg4}>
                  <Grid container>
                    <Grid item xs={12} lg={6}>
                      <FormGroup>
                        <FormLabel>Nombre</FormLabel>
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
                        <FormLabel className="colorNone">-</FormLabel>
                        <FormControl
                          variant="filled"
                          component={Box}
                          width="100%"
                          marginBottom="1rem!important"
                        >
                          <Box textAlign="center" marginTop="0.2rem" >
                            <Button color="primary" variant="contained" id="editarUser" onClick={editarUsuario}>
                              Editar Información personal
                            </Button>
                          </Box>
                        </FormControl>
                      </FormGroup>
                    </Grid>
                  </Grid>
                </div>

              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            xl={4}
            component={Box}
            marginBottom="3rem!important"
            classes={{ root: classes.order1 + " " + classes.marginBottomXl0 }}
          >
            <Card classes={{ root: classes.cardRoot }}>
              <Box component={Grid} container justifyContent="center">
                <Grid item xs={12} lg={3}>
                  <Box position="relative">
                    <Box
                      component="img"
                      src={
                        require("assets/img/theme/perfil.jpg").default
                      }
                      alt="..."
                      maxWidth="180px"
                      borderRadius="50%"
                      position="absolute"
                      left="50%"
                      boxShadow={boxShadows.boxShadow + "!important"}
                      className={classes.profileImage}
                    />
                  </Box>
                </Grid>
              </Box>
              <Box
                component={CardHeader}
                border="0!important"
                textAlign="center"
                paddingBottom="0!important"
                paddingTop="8rem!important"
                classes={{ root: classes.cardHeaderRootProfile }}
                subheader={
                  <Box display="flex" justifyContent="space-between">
                    {/*<Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootInfo }}
                    >
                      Connect
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      classes={{ root: classes.buttonRootDark }}
                    >
                      Message
                    </Button>*/}
                  </Box>
                }
              ></Box>
              <Box
                component={CardContent}
                classes={{ root: classes.ptMd4 }}
                paddingTop="0!important"
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      padding="0rem 0"
                      justifyContent="center"
                      display="flex"
                      className={classes.mtMd5}
                    >
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding="0rem"
                      >
                      </Box>
                      <Box
                        textAlign="center"
                        marginRight="1rem"
                        padding=".968rem"
                      >
                      </Box>
                      <Box textAlign="center" padding=".0rem">
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
                <Box textAlign="center">
                  <Typography variant="h3">
                    {values.nombre}
                  </Typography>
                  <Box
                    component={Typography}
                    variant="h5"
                    fontWeight="300!important"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Box
                      component={LocationOn}
                      width="1.25rem!important"
                      height="1.25rem!important"
                    ></Box>
                    Mixco, Guatemala
                  </Box>
                  <Box
                    component={Typography}
                    variant="h5"
                    marginTop="3rem!important"
                  >
                    {localStorage.getItem('tipousuario_codigo') == 1 ? "Administrador" : "Empleado Municipal"}
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="1rem"
                  >
                    <Box
                      component={School}
                      width="1.25rem!important"
                      height="1.25rem!important"
                      marginRight=".5rem"
                    ></Box>
                    Trabajador de la Municipalidad de Mixco
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Profile;
