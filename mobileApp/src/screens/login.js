import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Toast from 'react-native-easy-toast';
import { login } from '../services/login';


const LoginScreen = ({ navigation }) => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const toastRef = useRef(null);

    const hanldeLogin = () => {
        if (user !== "" && pass !== "") {
            login(user, pass)
                .then(res => {
                    if (res === false) {
                        toastRef.current.show("Credenciales incorrectas");
                    } else {
                        toastRef.current.show("Credenciales correctas");
                        navigation.navigate("Screen", { screen:"reports", user:user, idTipoUsuario:4 })
                    }
                })
                .catch(err => {
                    console.log(err);
                    toastRef.current.show("Ocurrio un error al iniciar sesion");
                })
        } else {
            toastRef.current.show("Debe ingresar un alias y contraseña");
        }
    }

    return (
        <View
            style={style.container}
        >
            <Text
                style={style.title}
            >Bienvenido</Text>

            <Text
                style={style.description}
            >Inicie sesion para utilizar la aplicacion</Text>

            <View
                style={style.inputContainer}
            >
                <Text
                    style={style.inputLabel}
                >Usuario</Text>
                <TextInput
                    style={style.input}
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        setUser(text);
                    }}
                ></TextInput>
            </View>

            <View
                style={style.inputContainer}
            >
                <Text
                    style={style.inputLabel}
                    autoCapitalize="none"
                >Contraseña</Text>
                <TextInput
                    style={style.input}
                    onChangeText={(text) => {
                        setPass(text);
                    }}
                ></TextInput>
            </View>

            <TouchableOpacity
                style={style.button}
                onPress={hanldeLogin}
            >
                <Text
                    style={style.textButton}
                >Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={style.registerButton}
                onPress={() => { navigation.navigate("RegisterScreen", {}); }}
            >
                <Text
                    style={style.textRegisterButton}
                >¿Aun no tienes una cuenta? Haz click aqui!</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={style.registerButton}
                onPress={() => { navigation.navigate("Screen", { user:"anonimo", idTipoUsuario: 4, screen: "newReport" }) }}
            >
                <Text
                    style={style.textRegisterButton}
                > Hacer reporte </Text>
            </TouchableOpacity>

            <Toast ref={toastRef}></Toast>
        </View>
    );
}

export default LoginScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        backgroundColor:"#111212"
    },
    description: {
        color: "#fff"
    },
    title: {
        fontSize: 34,
        color: "#fff",
        marginBottom: 20
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#04BF68",
        borderRadius: 5,
        width: 300,
        color: "#fff",
        paddingLeft: 5,
        paddingRight: 5
    },
    inputLabel: {
        color: "#038C5A"
    },
    button: {
        alignItems: 'center',
        padding: 5,
        fontSize: 24,
        backgroundColor: "#04BF68",
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 10
    },
    textButton: {
        fontSize: 24,
        color: "#fff"
    },
    registerButton: {
        alignItems: 'center',
        padding: 5,
        fontSize: 15,
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    textRegisterButton: {
        fontSize: 15,
        color: "#4169e1"
    }
})