import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Text, Button, TextInput, View, StyleSheet } from "react-native";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
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
    <View style={styles.container}>
      <Text style={styles.nameText}>Name: {name}</Text>
      {dataValue !== null && (
        <TextInput
          style={styles.input}
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

export default WaterPumpTime;
