import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View } from "native-base";
import { PeripheralProps } from "../../../types";

import {
  getDevicePeripheralProperty,
  listenOnDevicePeripheralProperty,
} from "../../api/methods";

const SimpleOutput: FunctionComponent<PeripheralProps> = ({
  deviceId,
  name,
  type,
}) => {
  const [dataFormat, setDataFormat] = useState();
  const [dataValue, setDataValue] = useState<unknown>(null);

  useEffect(() => {
    getDevicePeripheralProperty(deviceId, name, "format", setDataFormat);
  }, [deviceId, name]);

  useEffect(() => {
    const unsubscribe = listenOnDevicePeripheralProperty(
      deviceId,
      name,
      "value",
      setDataValue
    );
    return () => unsubscribe();
  }, [deviceId, name]);

  return (
    <View>
      <Text>Name: {name}</Text>
      <Text>
        Value: {dataValue}
        {dataFormat}
      </Text>
    </View>
  );
};

export default SimpleOutput;
