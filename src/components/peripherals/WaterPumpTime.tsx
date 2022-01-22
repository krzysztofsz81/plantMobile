import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Text, Input, View } from "native-base";
import { debounceFunction } from "../../methods";
import { PeripheralProps } from "../../../types";

import {
  getDevicePeripheralProperty,
  listenOnDevicePeripheralProperty,
  setDevicePeripheralProperty,
} from "../../api/methods";

const WaterPumpTime: FunctionComponent<PeripheralProps> = ({
  deviceId,
  name,
  type,
}) => {
  const [dataValue, setDataValue] = useState<string | null>(null);
  const [dataType, setDataType] = useState();

  useEffect(() => {
    getDevicePeripheralProperty(deviceId, name, "type", setDataType);
    getDevicePeripheralProperty(deviceId, name, "value", setDataValue);
  }, [deviceId, name]);

  const updateData = (property: string, value: string) =>
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
        <Input
          value={dataValue}
          placeholder="useless placeholder"
          keyboardType="numeric"
          onChangeText={(value) => {
            updateData("value", value);
            setDataValue(value);
          }}
        />
      )}
    </View>
  );
};

export default WaterPumpTime;
