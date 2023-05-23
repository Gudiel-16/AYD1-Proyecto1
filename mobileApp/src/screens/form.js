import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";

import axios from 'axios';

import DropDownPicker from 'react-native-dropdown-picker';
DropDownPicker.setTheme("DARK");

import * as ImagePicker from 'expo-image-picker';


class Formulario extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: true,
      zona: -1,
      descripcion: "",
      fotografia: "",
      open: false,
      value: null,
      items: [
        { label: 'Baches', value: 1 },
        { label: 'Actividad delictiva', value: 2 },
        { label: 'Alumbrado público', value: 3 },
        { label: 'Servicio de agua', value: 4 }
      ],
      image: null
    };

    this.setValue = this.setValue.bind(this);
    this.sendReport = this.sendReport.bind(this);
    this.openImagePickerAsync = this.openImagePickerAsync.bind(this);
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  async setValue(callback) {
    await this.setState(state => ({
      value: callback(state.value)
    }));
  }

  async openImagePickerAsync() {

    let permission = await ImagePicker.requestCameraPermissionsAsync();

    if (permission.granted === false) {
      alert('Necesita aceptar los permisos para subir imagenes.')
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({ base64: true, MediaTypeOptions: "image", quality: 0.2 });

    if (!pickerResult.cancelled) {
      this.setState({ image: pickerResult.base64 });
    }

  }

  async sendReport() {

    const host = "http://192.168.1.8:3000";

    if (this.state.zona === -1 || this.state.descripcion === "" || this.state.value === null) {
      Alert.alert('Llene todos los campos')
    }
    else {

      let f = new Date();
      let fecha = f.getFullYear() + "/" + f.getMonth() + "/" + f.getDate();

      let g = new Date();
      let hora = g.getHours() + ":" + g.getMinutes();

      if (this.state.image !== "") {

        await axios.post(`${host}/agregarReporte`,
          {
            tiporeporte_codigo: this.state.value,
            usuario_nombreusuario: this.props.user,
            fecha: fecha,
            hora: hora,
            resuelto: 0,
            encargado: null,
            descripcion: this.state.descripcion,
            zona: parseInt(this.state.zona),
            fotografia: [
              {
              "contenido1":this.state.image
              },
              {
                "contenido2":this.state.image
              }
            ]
          }
          )
          .then(res => {
            Alert.alert('Reporte enviado exitosamente.')
            this.props.navigation.navigate("Screen", { screen: "reports" })

          })
          .catch(err => {
            console.log(err);
            Alert.alert('Reporte no enviado.')
          });

      }
      else {

        await axios.post(`${host}/agregarReporte`,
          {
            tiporeporte_codigo: this.state.value,
            usuario_nombreusuario: this.props.user,
            fecha: fecha,
            hora: hora,
            resuelto: 0,
            encargado: null,
            descripcion: this.state.descripcion,
            zona: parseInt(this.state.zona),
            fotografia: {

            }
          })
          .then(res => {
            Alert.alert('Reporte enviado exitosamente.')
            this.props.navigation.navigate("Screen", { screen: "reports" })

          })
          .catch(err => {
            console.log(err);
            Alert.alert('Reporte no enviado.')
          });

      }

    }



  }

  render() {

    const { modalVisible } = this.state;

    return (

      <View style={{ alignItems: "center", marginBottom: 3 }}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            /*if(this.props.user==="anonimo"){
              this.setModalVisible(!modalVisible);
              navigation.goBack();
            }else{
              console.log(this.props)
            }
            */
            navigation.goBack();
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>

              <Text style={{ fontSize: 20, color: "#fff" }} > REPORTAR </Text>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Zona</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onChangeText={(number) => {
                    this.setState({ zona: number })
                  }}
                ></TextInput>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Descripcion</Text>
                <TextInput
                  maxLength={400}
                  multiline={true}
                  style={styles.input}
                  onChangeText={(text) => {
                    this.setState({ descripcion: text })
                  }}
                ></TextInput>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Tipo de denuncia</Text>
                <DropDownPicker
                  style={{ width: 300 }}
                  open={this.state.open}
                  value={this.state.value}
                  items={this.state.items}
                  maxHeight={100}
                  placeholder={"Seleccione el tipo de denuncia"}
                  setOpen={() => { this.setState({ open: !this.state.open }) }}
                  setValue={this.setValue}
                  setItems={(items) => { this.setState({ items: items }) }}
                />

              </View>

              <TouchableOpacity
                onPress={this.openImagePickerAsync}
                style={[
                  styles.button, { backgroundColor: "#21466c", marginTop: 10, width: 300 }, styles.borderButton
                ]}
              >
                <Text style={{ textAlign: "center", color: "#fff" }} >Seleccionar fotografia</Text>
              </TouchableOpacity>

              <View style={{ padding: 10, flex: 1 }}>

                <View style={styles.row}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Screen", { screen: "reports" })}
                    style={[
                      styles.button, styles.borderLeftButton, styles.buttonClose
                    ]}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }} >Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={this.sendReport}
                    style={[
                      styles.button, styles.borderRightButton, styles.buttonOpen
                    ]}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }} >Reportar</Text>
                  </TouchableOpacity>
                </View>

              </View>


            </View>
          </View>

        </Modal>

      </View >
    );
  }
}




const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "#191a1a",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "95%"
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 6,
    width: "50%"
  },
  borderButton: {
    borderRadius: 5
  },
  borderLeftButton: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  borderRightButton: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5
  },
  buttonOpen: {
    backgroundColor: "#9acd32",
  },
  buttonClose: {
    backgroundColor: "#b22222",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  inputContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 5,
    width: 300,
    color: "#fff",
    paddingLeft: 5,
    paddingRight: 5
  },
  picker: {
    backgroundColor: "white"
  },
  inputLabel: {
    color: "white",
    fontSize: 20
  },
  buttonAlign: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

export default Formulario;
