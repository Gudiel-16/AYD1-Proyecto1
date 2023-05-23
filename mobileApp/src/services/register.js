import axios from "axios";
import { Alert } from "react-native";

const host = "http://192.168.1.8:3000";


export const register = async (user, name, pass, dpi, navigation) => {

    let response;

    await axios.post(`${host}/registrarUsuario`, { nombreUsuario:user, dpi:dpi+"", nombre:name, contrasenia:pass, tipousuario_codigo:4 })
    .then(res => {
        Alert.alert('Usuario registrado con exito. Sera redirigido al login.');
        response = true;
    })
    .catch(err => {
        Alert.alert('El usuario ingresado no está disponible.');
        response = false;
    });

    return response;
}