import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Text, Button, Input, View } from "native-base";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { debounceFunction } from "../../methods";
import { PeripheralProps } from "../../../types";

import {
  getDevicePeripheralProperty,
  listenOnDevicePeripheralProperty,
  setDevicePeripheralProperty,
} from "../../api/methods";

const WaterPump: FunctionComponent<PeripheralProps> = ({
  deviceId,
  name,
  type,
}) => {
  const [dataValue, setDataValue] = useState<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = listenOnDevicePeripheralProperty(
      deviceId,
      name,
      "value",
      setDataValue
    );
    return () => unsubscribe();
  }, [deviceId, name]);

  const updateData = (property: string, value: any) =>
    useCallback(
      () =>
        debounceFunction(() =>
          setDevicePeripheralProperty(deviceId, name, property, value)
        ),
      [deviceId, name]
    );

  return (
    <View>
      <Text>Name: {name}</Text>
      {dataValue !== null && (
        <Button
          onPress={() => {
            updateData("value", true);
            setDataValue(true);
          }}
          color="#841584"
          disabled={dataValue}
        >
          Water plant
        </Button>
      )}
    </View>
  );
};

export default WaterPump;
