import axios from "axios";

const host = "http://192.168.1.8:3000";

export const login = async (user, pass) => {
    
    let response;

    await axios.post(`${host}/login`, { nombreUsuario:user, contrasenia:pass })
    .then(res => {
        response = res.data;
    })
    .catch(err => {
        response = false;
    });
    
    return response;
}