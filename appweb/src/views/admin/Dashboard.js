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
//import Tooltip from "@material-ui/core/Tooltip";

// core components
import Header from "components/Headers/Header.js";

import componentStyles from "assets/theme/views/admin/icons.js";
import componentStyles_ from "assets/theme/components/button.js";

const useStyles = makeStyles(componentStyles);
const useStyles_ = makeStyles(componentStyles_);

const Dashboard = () => {

  const [state, setState] = React.useState({});
  const [msg, setMsg] = useState([]);
  const [img, setImg] = useState([]);

  const classes = useStyles();
  const classes_ = useStyles_();
  const theme = useTheme();

  const buttonSuccessClasses = {
    root: classes_.buttonContainedSuccess,
  };

  const buttonWarningClasses = {
    root: classes_.buttonContainedWarning,
  };

  const getMsg = async () => {
    try {
      let url = Apiurl + "/reportes";
      await axios.get(url).then(data => {
        const result = [];
        const result_ = [];
        data.data.reportes.forEach(item => {
          if (item.usuario_nombreusuario == "usuarioTest") {

          } else if (item.usuario_nombreusuario == "usuarioEmpTester") {

          } else {
            if (item.resuelto == 0 && item.encargado === null) { // no muestra botones de "en seguimiento por" - "resuelto por"

            } else if (item.resuelto == 1 && item.encargado != null) { // no muestra boton de "en seguimiento por"

            } else if (item.resuelto == 2 && item.encargado != null) { // no muestra boton de "resuelto por"

            }
            //if (item.resuelto != "2") {
            var activarRes = "";
            if (item.encargado === null) {
              //result_["a" + item.codigo] = false;
              //activarRes = item.codigo + "|no|" + item.usuario_nombreusuario; //activa el boton de resolver
            } else if (item.encargado != null && item.encargado == localStorage.getItem("nombreusuario")) {
              result_["a" + item.codigo] = true;
              activarRes = item.codigo + "|si|" + item.usuario_nombreusuario;
            } else {
              result_["a" + item.codigo] = true;
              activarRes = item.codigo + "|no|" + item.usuario_nombreusuario;
            }
            var nombreReporte = "";
            if (item.tiporeporte_codigo == 1) {
              nombreReporte = "Baches en las calles";
            } else if (item.tiporeporte_codigo == 2) {
              nombreReporte = "Actos de delincuencia";
            } else if (item.tiporeporte_codigo == 3) {
              nombreReporte = "Alumbrado público";
            } else { // 4
              nombreReporte = "Falta de agua";
            }
            var reporteCompleto = item.codigo + "|" + item.tiporeporte_codigo + "|" + item.usuario_nombreusuario + "|" + item.fecha + "|" + item.hora + "|" + item.descripcion + "|" + item.zona;
            result[item.codigo] = [item.usuario_nombreusuario, nombreReporte, item.fecha, item.hora, item.resuelto + "|" + item.encargado + "|" + item.codigo, reporteCompleto, item.resuelto + "|" + item.encargado + "|" + item.codigo];
            //}
          }
        });
        setState(result_)
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
      timer: 4000,
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
      name: 'Tipo de reporte',
      options: {
        filter: true
      }
    },
    {
      name: 'Fecha de reporte',
      options: {
        filter: true
      }
    },
    {
      name: 'Hora de reporte',
      options: {
        filter: true
      }
    },
    {
      name: 'En seguimiento por',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <FormGroup row>
            <FormControlLabel
              control={ // value = Resuelto|encargado
                String(value).split("|")[0] != 1 ? <div></div> :

                  <Chip
                    avatar={<Avatar>{((String(value).split("|")[1]).charAt(0)).toUpperCase()}</Avatar>}
                    label={String(value).split("|")[1]}
                    clickable
                    variant="contained"
                    classes={buttonWarningClasses}
                    color="primary"
                    className="colors_"
                    id={String(value).split("|")[2]}
                    onDelete={() => handleClickVerQuien(String(value).split("|")[1], String(value).split("|")[2])}
                    onClick={() => handleClickVerQuien(String(value).split("|")[1], String(value).split("|")[2])}
                    deleteIcon={<DoneIcon />}
                  />

              }
            />
          </FormGroup>
        )
      }
    },
    {
      name: 'Visualización',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <FormGroup row>
            <Button color="primary" variant="contained" className="vrc" onClick={() => verReporteCompleto(value)}>
              Ver reporte completo
            </Button>
          </FormGroup>
        )
      }
    },
    {
      name: 'Resuelto por',
      options: {
        filter: false,
        customBodyRender: (value) => (
          <FormGroup row>
            <FormControlLabel
              control={ // value = Resuelto|encargado
                String(value).split("|")[0] != 2 ? <div></div> :

                  <Chip
                    avatar={<Avatar>{((String(value).split("|")[1]).charAt(0)).toUpperCase()}</Avatar>}
                    label={String(value).split("|")[1]}
                    variant="contained"
                    classes={buttonSuccessClasses}
                    color="primary"
                    className="colors"
                    id={String(value).split("|")[2]}
                    onDelete={() => handleClickVerQuien_(String(value).split("|")[1], String(value).split("|")[2])}
                    onClick={() => handleClickVerQuien_(String(value).split("|")[1], String(value).split("|")[2])}
                    deleteIcon={<DoneIcon />}
                  />

              }
            />
          </FormGroup>
        )
      }
    },
  ];

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
    </>
  );
};

export default Dashboard;
