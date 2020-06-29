import React, { useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import { getOr } from "lodash/fp";

export default function Weather({ route, navigation }: any) {
  const [currentTempInF, setCurrentTempInF] = useState(0);
  const { params } = route;
  const { latitude, longitude } = params;
  useEffect(() => {
    //
    async function anyNameFunction() {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=0ada7178af5882a9eda5ca6461ef961e`
        );
        const responseJson = await response.json();
        setCurrentTempInF(getOr(0, "main.temp", responseJson));
      } catch (error) {
        console.error(error);
      }
    }
    anyNameFunction();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={styles.textStyle}
        >{`Current Weather of coordinates (latitude: ${latitude} and longitude: ${longitude}):`}</Text>
        <Text style={styles.textStyle}>{`${currentTempInF} F`}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
