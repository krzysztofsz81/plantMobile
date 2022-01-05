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
    <View style={styles.container}>
      <Text style={styles.nameText}>Name: {name}</Text>
      {dataValue !== null && (
        <Button
          onPress={() => {
            updateData("value", true);
            setDataValue(true);
          }}
          title="Water plant"
          color="#841584"
          disabled={dataValue}
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

export default WaterPump;
