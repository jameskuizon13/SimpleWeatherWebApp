import * as React from "react";
import { StyleSheet, SafeAreaView, Button, View } from "react-native";
import Auth from "../../utils/Auth";

export default function Login(props: any) {
  const onLogin = async () => {
    const response = await Auth.login();
    if (response) {
      props.navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button color={"black"} title={"Login"} onPress={() => onLogin()} />
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
});
