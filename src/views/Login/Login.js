import React from "react";
import { Text, View, TouchableHighlight } from "react-native";

const Login = ({ navigation }) => (
  <View>
    <Text>Hola Login</Text>
    <TouchableHighlight onPress={() => navigation.navigate("ContactList")}>
      <Text>Acceder</Text>
    </TouchableHighlight>
  </View>
);

export default Login;
