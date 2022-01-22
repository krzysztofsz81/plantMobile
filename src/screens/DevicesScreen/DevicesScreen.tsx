import React, { FunctionComponent, useEffect, useState } from "react";
import { Button, Text, View } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { listenOnDevicesList } from "../../api/methods";
import { DeviceItem } from "../../api/types";

import { ScreenProps } from "./DevicesScreen.types";
import { HomeStackScreenName } from "../../../types";

const DevicesScreen: FunctionComponent = () => {
  const navigation = useNavigation<ScreenProps["navigation"]>();
  const [devices, setDevices] = useState<DeviceItem[]>([]);

  useEffect(() => {
    const unsubscribe = listenOnDevicesList((value) => {
      setDevices(value);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>Devices list</Text>
      <View>
        {devices.map(({ key, name }) => (
          <Button
            key={key}
            onPress={() =>
              navigation.navigate(HomeStackScreenName.Device, {
                deviceId: name,
              })
            }
          >
            {name}
          </Button>
        ))}
      </View>
    </View>
  );
};

export default DevicesScreen;
