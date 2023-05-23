import axios from "axios";

const host = "http://192.168.1.8:3000";

export const getReports = async () => {

    let response = [];

    axios.get(`http://192.168.1.8:3000/reportes`)
        .then(res => {
            response = res.data;
        }).catch(() => {
            response = [];
        })

    return response;
}