import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import InputPeripheral from "../../components/InputPeripheral";
import OutputPeripheral from "../../components/OutputPeripheral";

export default function DeviceScreen({ navigation, route }) {
  const { deviceId } = route.params;
  const [isConnected, setIsConnected] = useState(false);
  const [inputPeripherals, setInputPeripherals] = useState([]);
  const [outputPeripherals, setOutputPeripherals] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const deviceRef = ref(database, `devices/${deviceId}/status`);
    onValue(deviceRef, (snapshot) => {
      setIsConnected(snapshot.val() === "CONNECTED");
    });
  }, []);

  useEffect(() => {
    const deviceRef = ref(database, `devices/${deviceId}/_peripherals`);
    onValue(deviceRef, (snapshot) => {
      console.log(snapshot.val());
      const { input, output } = snapshot.val();
      setInputPeripherals(
        Object.entries(input).map(([key, peripheral]) => ({
          key,
          peripheral,
        }))
      );
      setOutputPeripherals(
        Object.entries(output).map(([key, peripheral]) => ({
          key,
          peripheral,
        }))
      );
    });
  }, []);

  return (
    <View>
      <Text>Device {deviceId} details</Text>
      <Text>isConnected: {isConnected ? "Yep" : "Nope"}</Text>
      <View>
        <Text>Input peripherals: </Text>
        {inputPeripherals.map(({ key, peripheral }) => (
          <InputPeripheral
            key={key}
            deviceId={deviceId}
            peripheral={peripheral}
          />
        ))}
      </View>
      <View>
        <Text>Output peripherals: </Text>
        {outputPeripherals.map(({ key, peripheral }) => (
          <OutputPeripheral
            key={key}
            deviceId={deviceId}
            peripheral={peripheral}
          />
        ))}
      </View>
    </View>
  );
}
