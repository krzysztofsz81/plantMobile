import "react-native-gesture-handler";
import "./src/firebase/config";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  DeviceScreen,
} from "./src/screens";
import { RootStackParamList } from "./types";

// import { decode, encode } from "base-64";
// if (!global.btoa) global.btoa = encode;
// if (!global.atob) global.atob = decode;

const RootStack = createStackNavigator<RootStackParamList>();

export default function App() {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="Home">
        <RootStack.Screen name="Home" component={HomeScreen} />
        <RootStack.Screen name="Device" component={DeviceScreen} />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Registration" component={RegistrationScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
