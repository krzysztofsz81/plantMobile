import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import { debounceFunction } from "../../methods";
import { PeripheralProps } from "../../../types";

import {
  getDevicePeripheralProperty,
  listenOnDevicePeripheralProperty,
  setDevicePeripheralProperty,
} from "../../api/methods";

const SoilMoisture: FunctionComponent<PeripheralProps> = ({
  deviceId,
  name,
  type,
}) => {
  const [dataFormat, setDataFormat] = useState();
  const [dataValue, setDataValue] = useState<unknown>(null);

  const [isSupportCalibration, setIsSupportCalibration] = useState(false);
  const [dataCalibrationMin, setDataCalibrationMin] = useState("");
  const [dataCalibrationMax, setDataCalibrationMax] = useState("");

  useEffect(() => {
    getDevicePeripheralProperty(deviceId, name, "format", setDataFormat);
    getDevicePeripheralProperty(
      deviceId,
      name,
      "supportCalibration",
      setIsSupportCalibration
    );
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

  const updateData = (property: string, value: any) =>
    useCallback(
      () =>
        debounceFunction(() =>
          setDevicePeripheralProperty(deviceId, name, property, value)
        ),
      [deviceId, name]
    );

  useEffect(() => {
    if (!isSupportCalibration) return;
    getDevicePeripheralProperty(
      deviceId,
      name,
      "calibration_min",
      setDataCalibrationMin
    );
    getDevicePeripheralProperty(
      deviceId,
      name,
      "calibration_max",
      setDataCalibrationMax
    );
  }, [deviceId, name, isSupportCalibration]);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>Name: {name}</Text>
      <Text style={styles.valueText}>
        Value: {dataValue}
        {dataFormat}
      </Text>
      {isSupportCalibration && (
        <View style={styles.calibrationContainer}>
          <Text style={styles.calibrationText}>Calibration: </Text>
          <TextInput
            style={styles.input}
            value={dataCalibrationMin}
            placeholder="useless placeholder"
            keyboardType="numeric"
            onChangeText={(value) => {
              updateData("calibration_min", value);
              setDataCalibrationMin(value);
            }}
          />
          <TextInput
            style={styles.input}
            value={dataCalibrationMax}
            placeholder="useless placeholder"
            keyboardType="numeric"
            onChangeText={(value) => {
              updateData("calibration_max", value);
              setDataCalibrationMax(value);
            }}
          />
        </View>
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

export default SoilMoisture;
