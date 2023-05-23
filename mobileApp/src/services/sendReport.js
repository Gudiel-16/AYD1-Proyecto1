import axios from "axios";

const host = "http://192.168.1.8:3000";

export const sendReport = async (user, name, pass) => {
    //const res = await axios.get(`${host}/Login/${alias}/${contra}`);
    
    return "Usuario: "+user+" Nombre: "+name+" Pass:"+pass;
    //if(res.data) return res.data;
    
    //return null;
}