import React, { FunctionComponent, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
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
    <View style={styles.container}>
      <Text style={styles.nameText}>Name: {name}</Text>
      <Text style={styles.valueText}>
        Value: {dataValue}
        {dataFormat}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  input: {
    backgroundColor: "green",
  },
  button: {
    backgroundColor: "yellow",
  },
  nameText: {
    color: "#080808",
    fontSize: 20,
  },
  valueText: {
    color: "#808080",
    fontSize: 16,
  },
  calibrationContainer: {
    marginTop: 10,
  },
  calibrationText: {
    fontSize: 16,
  },
});

export default SimpleOutput;
