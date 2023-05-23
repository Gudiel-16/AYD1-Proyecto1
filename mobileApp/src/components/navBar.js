import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { Icon } from 'react-native-elements/dist/icons/Icon';

const NavBar = ({ navigation, route }) => {

    return (

            <View style={styles.navBarContainer}>

                <View style={{ padding: 5, flex: 1 }}>

                    <View style={styles.row}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Screen",{screen:"notifications"}) }
                            style={[
                                styles.navBarItem, styles.buttonOpen
                            ]}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }} >
                                <Icon reverse name='bell' type='font-awesome-5' color='#21466c' solid={true} />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Screen",{screen:"reports"}) }
                            style={[
                                styles.navBarItem, styles.buttonClose
                            ]}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }} >
                                <Icon reverse name='flag' type='font-awesome-5' color='#21466c' solid={true} />
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate("Screen",{screen:"newReport"}) }
                            style={[
                                styles.navBarItem, styles.buttonOpen
                            ]}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }} >
                                <Icon reverse name='exclamation-triangle' type='font-awesome-5' color='#21466c' solid={true} />
                            </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            onPress={() => navigation.navigate("LoginScreen",{}) }
                            style={[
                                styles.navBarItem, styles.buttonOpen
                            ]}
                        >
                            <Text style={{ textAlign: "center", color: "#fff" }} >
                                <Icon reverse name='sign-out-alt' type='font-awesome-5' color='#21466c' solid={true} />
                            </Text>
                        </TouchableOpacity>

                    </View>

                </View>

                <View style={styles.row}>
                    <View style={{ backgroundColor: "#fff", height: 1, flex:1 }}>
                    </View>
                    <View style={{ backgroundColor: "#fff", height: 1, flex:1 }}>
                    </View>
                    <View style={{ backgroundColor: "#fff", height: 1, flex:1 }}>
                    </View>
                    <View style={{ backgroundColor: "#fff", height: 1, flex:1 }}>
                    </View>
                </View>
                

            </View>
    );
}

export default NavBar;

const styles = StyleSheet.create({
    navBarContainer: {
        backgroundColor: "#21466c",
        flex: 1,
        width: "100%"
    },
    navBarItem: {
        paddingTop: "5%",
        paddingHorizontal: 8,
        flex:1
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    }
})