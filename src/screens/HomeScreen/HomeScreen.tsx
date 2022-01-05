import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { listenOnDevicesList } from "../../api/methods";
import { DeviceItem } from "../../api/types";

import { ScreenProps } from "./HomeScreen.types";
import styles from "./HomeScreen.styles";

const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const [devices, setDevices] = useState<DeviceItem[]>([]);

  useEffect(() => {
    const unsubscribe = listenOnDevicesList((value) => {
      setDevices(value);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Devices list</Text>
      <View style={styles.devicesContainer}>
        {devices.map(({ key, name }) => (
          <Button
            key={key}
            onPress={() => navigation.navigate("Device", { deviceId: name })}
            title={name}
          />
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
