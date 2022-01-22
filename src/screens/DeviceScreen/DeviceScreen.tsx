import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "native-base";
import { useRoute } from "@react-navigation/native";

import { listenOnDeviceStatus, listenOnPeripherals } from "../../api/methods";
import { DeviceStatus, PeripheralItem, Peripherals } from "../../api/types";

import { peripheralComponentMap } from "./DeviceScreen.helpers";
import { ScreenProps } from "./DeviceScreen.types";

const DeviceScreen: FunctionComponent = () => {
  const {
    params: { deviceId },
  } = useRoute<ScreenProps["route"]>();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [peripherals, setPeripherals] = useState<PeripheralItem[]>([]);

  useEffect(() => {
    const unsubscribe = listenOnDeviceStatus(deviceId, (value): void => {
      setIsConnected(value === DeviceStatus.CONNECTED);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = listenOnPeripherals(deviceId, (value): void => {
      setPeripherals(value);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Device {deviceId} details</Text>
      <Text>isConnected: {isConnected ? "Yep" : "Nope"}</Text>
      <View>
        {peripherals.map(({ key, name, type }) => {
          const Component = peripheralComponentMap[name];
          if (!Component)
            return <Text>No peripheral name supported: {name}</Text>;
          return (
            <Component key={key} deviceId={deviceId} name={name} type={type} />
          );
        })}
      </View>
    </View>
  );
};

export default DeviceScreen;
