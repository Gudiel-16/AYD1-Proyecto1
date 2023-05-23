import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';

import axios from 'axios';

class Photo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }

    }


    async componentDidMount() {

        await axios.get(`http://192.168.1.8:3000/fotos/${codigoReporte}`)
            .then(res => {
                this.setState({ photos: res.data.fotos }, () => { console.log(res.data.fotos) })
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
                                            onPress={()=>{Alert.alert('hola')}}
                                            style={ styles.button }
                                        >
                                            <Text style={{ textAlign: "center", color: "#faebd7" }} >Ver fotografias</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        })
                    }


                    {
                        this.state.photos!=="" &&

                        <View style={[styles.photoPanel]} >
                            <Text>sdhaksjdhaksd</Text>
                        </View>

                    }

                </ScrollView>

            );
        }
    }

}


export default Photo;