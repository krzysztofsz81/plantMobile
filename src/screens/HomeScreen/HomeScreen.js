import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";

export default function HomeScreen({ navigation }) {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const database = getDatabase();
    const devicesListRef = ref(database, "devices/_list");
    onValue(devicesListRef, (snapshot) => {
      setDevices(
        Object.entries(snapshot.val()).map(([key, deviceId]) => ({
          key,
          deviceId,
        }))
      );
    });
  }, []);

  return (
    <View>
      <Text>Devices list</Text>
      {devices.map(({ key, deviceId }) => (
        <Button
          key={key}
          onPress={() => navigation.navigate("Device", { deviceId })}
          title={deviceId}
        />
      ))}
    </View>
  );
}
