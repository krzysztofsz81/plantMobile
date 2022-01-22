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
    <View>
      <Text>Name: {name}</Text>
      <Text>
        Value: {dataValue}
        {dataFormat}
      </Text>
      {isSupportCalibration && (
        <View>
          <Text>Calibration: </Text>
          <Input
            value={dataCalibrationMin}
            placeholder="useless placeholder"
            keyboardType="numeric"
            onChangeText={(value) => {
              updateData("calibration_min", value);
              setDataCalibrationMin(value);
            }}
          />
          <Input
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

export default SoilMoisture;
