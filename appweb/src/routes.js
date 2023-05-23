// core components
import Dashboard from "views/admin/Dashboard.js";
import Login from "views/auth/Login.js";
import Registro from "views/admin/Registro";
import Reportes from "views/admin/Reportes";
import Profile from "views/admin/Profile.js";
import AdminUsers from "views/admin/AdminUsers";
// @material-ui/icons components
import Dns from "@material-ui/icons/Dns";
import FlashOn from "@material-ui/icons/FlashOn";
import FormatListBulleted from "@material-ui/icons/FormatListBulleted";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import Person from "@material-ui/icons/Person";
import Tv from "@material-ui/icons/Tv";
import VpnKey from "@material-ui/icons/VpnKey";
import ReportProblemRoundedIcon from '@material-ui/icons/ReportProblemRounded';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

if (localStorage.getItem('tipousuario_codigo') == 1) { // administrador
  var routes = [
    {
      path: "/index",
      name: "Reportes",
      icon: Tv,
      iconColor: "Primary",
      component: Dashboard,
      layout: "/admin",
    },
    {
      path: "/registro",
      name: "Registro de usuarios",
      icon: PersonAddIcon,
      iconColor: "Warning",
      component: Registro,
      layout: "/admin",
    },
    {
      path: "/administrar-usuario",
      name: "Administrar usuarios",
      icon: FormatListBulleted,
      iconColor: "Error",
      component: AdminUsers,
      layout: "/admin",
    },
    {
      path: "/user-profile",
      name: "Mi perfil",
      icon: Person,
      iconColor: "WarningLight",
      component: Profile,
      layout: "/admin",
    },
    {
      divider: true,
    },
    {
      title: "Documentación",
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Manual%20Tecnico.pdf",
      name: "Manual técnico",
      icon: FlashOn,
    },
    {
      href:
        "",
      name: "Manual de usuario",
      icon: DynamicFeedIcon,
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Documentaci%C3%B3n.pdf",
      name: "Documentación incluida",
      icon: Dns,
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Reporte%20de%20pruebas.pdf",
      name: "Reporte de pruebas",
      icon: DoneOutlineIcon,
    },
  ];
}else if (localStorage.getItem('tipousuario_codigo') == 2){ // travajador municipal
  var routes = [
    {
      path: "/reportes",
      name: "Reportes de habitantes",
      icon: ReportProblemRoundedIcon,
      iconColor: "Primary",
      component: Reportes,
      layout: "/admin",
    },
    {
      path: "/user-profile",
      name: "Mi perfil",
      icon: Person,
      iconColor: "WarningLight",
      component: Profile,
      layout: "/admin",
    },
    {
      divider: true,
    },
    {
      title: "Documentación",
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Manual%20Tecnico.pdf",
      name: "Manual técnico",
      icon: FlashOn,
    },
    {
      href:
        "",
      name: "Manual de usuario",
      icon: DynamicFeedIcon,
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Documentaci%C3%B3n.pdf",
      name: "Documentación incluida",
      icon: Dns,
    },
    {
      href:
        "https://github.com/erickace/AYD1_Proyecto1_7/blob/develop/documentacion/Reporte%20de%20pruebas.pdf",
      name: "Reporte de pruebas",
      icon: DoneOutlineIcon,
    },
  ];
}else{ // no logueado
  var routes = [
    {
      path: "/login",
      name: "Login",
      icon: VpnKey,
      iconColor: "Info",
      component: Login,
      layout: "/auth",
    },
  ];
}


export default routes;
