import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { getDatabase, ref, onValue, get } from "firebase/database";
import DebouncedInput from "./DebouncedInput";

export default function OutputPeripheral({ deviceId, peripheral }) {
  const refPath = `devices/${deviceId}/${peripheral}`;
  const [peripheralFormat, setPeripheralFormat] = useState(null);
  const [peripheralValue, setPeripheralValue] = useState(null);
  const [supportCalibration, setSupportCalibration] = useState(null);
  const [calibrationMin, setCalibrationMin] = useState(null);
  const [calibrationMax, setCalibrationMax] = useState(null);
  //   const [peripheralType, setPeripheralType] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    const removeListeners = [
      onValue(ref(db, `${refPath}/format`), (snapshot) =>
        setPeripheralFormat(snapshot.val())
      ),
      onValue(ref(db, `${refPath}/value`), (snapshot) =>
        setPeripheralValue(snapshot.val())
      ),
      onValue(ref(db, `${refPath}/supportCalibration`), (snapshot) =>
        setSupportCalibration(snapshot.val())
      ),
    ];
    return () => removeListeners.map((removeListener) => removeListener());
  }, []);

  useEffect(() => {
    if (!supportCalibration) return null;
    get(ref(db, `${refPath}/calibration_min`)).then((snapshot) => {
      setCalibrationMin(snapshot.val());
    });
    get(ref(db, `${refPath}/calibration_max`)).then((snapshot) => {
      setCalibrationMax(snapshot.val());
    });
  }, [supportCalibration]);

  return (
    <View>
      <Text>Name: {peripheral}</Text>
      <Text>
        Value: {peripheralValue}
        {peripheralFormat}
      </Text>
      {supportCalibration && (
        <>
          <DebouncedInput
            value={calibrationMin}
            onChange={(value) =>
              set(ref(db, `${refPath}/calibration_min`), value)
            }
          />
          <DebouncedInput
            value={calibrationMax}
            onChange={(value) =>
              set(ref(db, `${refPath}/calibration_max`), value)
            }
          />
        </>
      )}
    </View>
  );
}
