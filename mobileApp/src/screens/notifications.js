import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import axios from 'axios';

class NotificationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: []
        }

    }


    async componentDidMount() {

        await axios.get(`http://192.168.1.8:3000/mensajes/${this.props.user}`)
            .then(res => {
                this.setState({ notifications: res.data.mensajes })
            }).catch(() => {
                this.setState({ notifications: [] })
            })
    }


    render() {

        return (

            <ScrollView style={styles.scrollView}>

                <View style={styles.card} >
                    <View>
                        <View style={styles.cardHeader}>
                            <View style={styles.row}>
                                <View >
                                    <Icon reverse name='users' type='font-awesome-5' color='#9acd32' solid={true} />
                                </View>
                                <View>
                                    <Text style={styles.cardTittle}>
                                        Municipalidad
                                    </Text>
                                    <Text style={styles.cardDate}>
                                        {"10-15-2021"} {" "} {"10:15"}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardBody}>
                        <View style={styles.cardDescription}>
                            <Text style={styles.textDescription}>
                                Gracias por la denuncia. Nos hemos hecho cargo.
                            </Text>
                        </View>
                    </View>
                </View>

                {
                    this.state.notifications.map((noti, i) => {

                        return (

                            <View style={styles.card} >
                                <View>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.row}>
                                            <View >
                                                <Icon reverse name='users' type='font-awesome-5' color='#9acd32' solid={true} />
                                            </View>
                                            <View>
                                                <Text style={styles.cardTittle}>
                                                    Municipalidad
                                                </Text>
                                                <Text style={styles.cardDate}>
                                                    {noti.fecha} {" "} {noti.hora}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.cardBody}>
                                    <View style={styles.cardDescription}>
                                        <Text style={styles.textDescription}>
                                            {noti.cuerpo}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                        )

                    })
                }

            </ScrollView>

        )
    }

}


export default NotificationScreen;


const styles = StyleSheet.create({
    scrollView: {
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#191a1a"
    },
    card: {
        backgroundColor: "#191a1a",
        marginBottom: 15,
        borderRadius: 10,
        paddingBottom: 5
    },
    cardHeader: {
        flex: 8,
        alignItems: "center",
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 5
    },
    cardTag: {
        flex: 3,
        padding: 3,
        borderRadius: 10
    },
    cardTagText: {
        flex: 4,
        color: "antiquewhite",
        fontSize: 15,
        textAlign: "center"
    },
    cardBody: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardDate: {
        flex: 5,
        color: "antiquewhite",
        fontSize: 10,
        fontStyle: "italic",
        padding: 10
    },
    cardTittle: {
        flex: 5,
        color: "antiquewhite",
        fontSize: 20,
    },
    cardDescription: {
        padding: 3
    },
    textDescription: {
        color: "antiquewhite",
        fontSize: 15,
    },
    cardInfo: {
        borderRadius: 5,
        maxHeight: 25,
        margin: 5
    },
    textInfo: {
        color: "antiquewhite",
        fontSize: 13,
        textAlign: "center"
    },
    cardFooter: {
        flex: 1,
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    }



})