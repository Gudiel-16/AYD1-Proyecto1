import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, BackHandler, Image, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import axios from 'axios';

class ReportScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            photos: []
        }

        this.showPhotos = this.showPhotos.bind(this);
    }

    backAction = () => {

        if (this.state.photos.length > 0) {

            this.props.navigation.navigate("Screen", { screnn: "reports", user: this.props.user })

        } else {
            Alert.alert("¿Esta seguro que quiere cerrar la aplicación?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        }

    };

    async componentDidMount() {

        await axios.get(`http://192.168.1.8:3000/reportesUsuario/${this.props.user}`)
            .then(res => {
                this.setState({ reports: res.data.reportes, photos: [1] }, () => { console.log(res.data.reportes) })
            }).catch(() => {
                this.setState({ reports: [], photos: [] })
            })

    }


    async showPhotos(codigoReporte) {

        await axios.get(`http://192.168.1.8:3000/fotos/${codigoReporte}`)
            .then(res => {
                //this.setState({ photos: res.data.fotos }, () => {  })
                if (res.data.archivos.length === 0) {
                    Alert.alert("No hay fotos adjutas a este reporte.")
                } else {
                    console.log(res.data.archivos)
                }
            }).catch(() => {
                Alert.alert("No hay fotos adjutas a este reporte.")
            })

    }


    render() {


        if (this.state.reports.length === 0) {

            return (
                <ScrollView alignItems="center">
                    <Text style={{ textAlign: "center", fontSize: 25, color: "white" }}>Loading...</Text>
                </ScrollView>
            )

        }
        else {

            if (this.state.photos.length === 0) {

                return (

                    <ScrollView style={styles.scrollView}>
                        {
                            this.state.reports.map((rep, i) => {
                                return (
                                    <View style={styles.card} key={i} >
                                        <View>
                                            <View style={styles.cardHeader}>
                                                <View style={styles.row}>
                                                    <Text style={styles.cardTittle}>
                                                        Reporte #{rep.codigo}
                                                    </Text>
                                                    {
                                                        rep.resuelto === "0" &&

                                                        <View style={[styles.cardTag, { backgroundColor: "#8b0000" }]}>
                                                            <Text style={styles.cardTagText} > En proceso </Text>
                                                        </View>

                                                    }
                                                    {
                                                        rep.resuelto === "1" &&

                                                        <View style={[styles.cardTag, { backgroundColor: "#6b8e23" }]}>
                                                            <Text style={styles.cardTagText} > Resuelto </Text>
                                                        </View>

                                                    }
                                                </View>
                                            </View>
                                            <View style={styles.cardDate}>
                                                <Text style={styles.cardDate}>
                                                    {rep.fecha} {" "} {rep.hora}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.cardBody}>
                                            <View style={styles.cardDescription}>
                                                <Text style={styles.textDescription}>
                                                    {rep.descripcion}
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.cardFooter, styles.row}>
                                            <View style={[styles.cardInfo, { backgroundColor: "#507d94", flex: 3 }]}>
                                                <Text style={styles.textInfo} > Zona {rep.zona} </Text>
                                            </View>
                                            <View style={[styles.cardInfo, { backgroundColor: "#cc9e2e", flex: 7 }]}>
                                                {
                                                    rep.tiporeporte_codigo === 1 &&

                                                    <Text style={[styles.textInfo, { color: "black" }]} > Baches </Text>
                                                }
                                                {
                                                    rep.tiporeporte_codigo === 2 &&

                                                    <Text style={[styles.textInfo, { color: "black" }]} > Actividad delictiva </Text>
                                                }
                                                {
                                                    rep.tiporeporte_codigo === 3 &&

                                                    <Text style={[styles.textInfo, { color: "black" }]} > Problema de luz </Text>
                                                }
                                                {
                                                    rep.tiporeporte_codigo === 4 &&

                                                    <Text style={[styles.textInfo, { color: "black" }]} > Problema de agua </Text>
                                                }
                                            </View>
                                        </View>
                                        <View>
                                            <TouchableOpacity
                                                onPress={() => { this.showPhotos(rep.codigo) }}
                                                style={styles.button}
                                            >
                                                <Text style={{ textAlign: "center", color: "#faebd7" }} >Ver fotografias</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )
                            })
                        }

                    </ScrollView>

                );

            }
            else {

                return (

                    <View>

                        <View style={{alignItems:"flex-end", marginEnd:10}}>
                        <Icon onPress={() => this.setState({ photos: [] })} name='window-close' type='font-awesome-5' color='#8b0000' solid={true} size={30} />
                        </View>

                        <ScrollView alignItems='center'>

                            <Image
                                style={{ backgroundColor: "white" }}
                                resizeMode="contain"
                                style={styles.image}
                                source={{ uri: 'https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg' }}
                            />

                        </ScrollView>


                    </View>

                )
            }

        }
    }

}


export default ReportScreen;


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
        paddingRight: 10
    },
    cardTag: {
        flex: 3,
        padding: 3,
        borderRadius: 10
    },
    cardTagText: {
        color: "#faebd7",
        fontSize: 15,
        textAlign: "center"
    },
    cardBody: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    cardDate: {
        color: "#faebd7",
        fontSize: 10,
        fontStyle: "italic",
        padding: 10
    },
    cardTittle: {
        flex: 8,
        color: "#faebd7",
        fontSize: 20,
    },
    cardDescription: {
        padding: 3
    },
    textDescription: {
        color: "#faebd7",
        fontSize: 15,
    },
    cardInfo: {
        borderRadius: 5,
        maxHeight: 25,
        margin: 5
    },
    textInfo: {
        color: "#faebd7",
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
    },
    button: {
        flex: 1,
        backgroundColor: "#002A49",
        borderRadius: 10
    },
    photoPanel: {
        backgroundColor: "#fff",
        height: 25
    },
    image: {
        height: (Dimensions.get('window').height - 500),
        width: (Dimensions.get('window').width),
        alignContent: "center",
        marginBottom: 5
    }


})
