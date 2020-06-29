import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Modal,
  Alert,
  View,
  TouchableHighlight,
} from "react-native";
import { get } from "lodash/fp";

export default function Home(props: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log({
        errorMessage: "Permission to access location was denied",
      });
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      setLatitude(get("coords.latitude", location));
      setLongitude(get("coords.longitude", location));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{`Latitude: ${latitude}`}</Text>
            <Text style={styles.modalText}>{`Longitude: ${longitude}`}</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={async () => {
          await getLocationAsync();
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Get Coordinates</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          props.navigation.navigate("Weather", { latitude, longitude });
        }}
      >
        <Text style={styles.textStyle}>Get Current Weather</Text>
      </TouchableHighlight>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "skyblue",
    borderRadius: 20,
    padding: 25,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
