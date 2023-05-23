import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavBar from './navBar';
import Formulario from '../screens/form';
import ReportScreen from '../screens/reports';
import NotificationScreen from '../screens/notifications';

const Screen = ({ navigation, route }) => {

    return (

        <View style={styles.container}>

            {
                !route.params.anonimo &&

                <NavBar navigation={navigation} ></NavBar>

            }

            <View style={styles.bodyContainer}>

                    {
                        route.params.screen === "reports" &&

                        <ReportScreen key={2} navigation={navigation} user={route.params.user} ></ReportScreen>
                    }
                    {
                        route.params.screen === "newReport" &&

                        <Formulario key={3} navigation={navigation} user={route.params.user} idTipoUsuario={route.params.idTipoUsuario} ></Formulario>
                    }
                    {
                        route.params.screen === "notifications" &&

                        <NotificationScreen key={3} navigation={navigation} user={route.params.user} > </NotificationScreen>
                    }
                    
            </View>

        </View>

    );
}

export default Screen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#111212"
    },
    bodyContainer: {
        flex: 8,
        width: "100%",
        marginTop:15
    }
})