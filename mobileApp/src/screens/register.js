import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Toast from 'react-native-easy-toast';
import { register } from '../services/register';


const RegisterScreen = ({ navigation }) => {

    const [dpi, setDpi] = useState("");
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const [name, setName] = useState("");
    const toastRef = useRef(null);

    const handleRegister = () => {
        if (user === "" || pass === "" || name === "") {
            Alert.alert('Debe ingresar todos los datos para poder registrarse.')
        }
        else {
            register(user, name, pass, dpi).then((data) => {
                if(data===true){
                    navigation.navigate("LoginScreen", { })
                }
            });
        }
    }

    return (

        <View
            style={style.container}
        >

            <Text
                style={style.title}
            >Nueva cuenta</Text>

            <Text
                style={style.description}
            >Ingrese sus datos</Text>

            <View
                style={style.inputContainer}
            >
                <Text
                    style={style.inputLabel}
                >DPI</Text>
                <TextInput
                    keyboardType="numeric"
                    maxLength={13}
                    style={style.input}
                    onChangeText={(text) => {
                        setDpi(text);
                    }}
                ></TextInput>
            </View>

            <View
                style={style.inputContainer}
            >
                <Text
                    style={style.inputLabel}
                >Nombre</Text>
                <TextInput
                    style={style.input}
                    onChangeText={(text) => {
                        setName(text);
                    }}
                ></TextInput>
            </View>

            <View
                style={style.inputContainer}
            >
                <Text
                    style={style.inputLabel}
                >Nombre de usuario</Text>
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
                >Contraseña</Text>
                <TextInput
                    style={style.input}
                    autoCapitalize="none"
                    onChangeText={(text) => {
                        setPass(text);
                    }}
                ></TextInput>
            </View>

            <TouchableOpacity
                style={style.button}
                onPress={handleRegister}
            >
                <Text
                    style={style.textButton}
                >Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={style.backButton}
                onPress={() => { navigation.goBack(); }}
            >
                <Text
                    style={style.backText}
                >Si ya tienes una cuenta haz click aqui!</Text>
            </TouchableOpacity>

            <Toast ref={toastRef}></Toast>
        </View>
    );
}

export default RegisterScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 35,
        backgroundColor: '#111212'
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
        marginTop: 5,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#808000",
        borderRadius: 5,
        width: 300,
        color: "#fff",
        paddingLeft: 5,
        paddingRight: 5
    },
    inputLabel: {
        color: "#808000"
    },
    button: {
        alignItems: 'center',
        padding: 5,
        fontSize: 24,
        backgroundColor: "#808000",
        borderRadius: 5,
        paddingLeft: 20,
        paddingRight: 20
    },
    textButton: {
        fontSize: 24,
        color: "#fff"
    },
    backButton: {
        marginTop: 10,
        fontSize: 15
    },
    backText: {
        fontSize: 15,
        color: "#4169e1"
    }
})