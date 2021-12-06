import React, { useEffect, useState } from "react";
import { Text, View, Switch } from "react-native";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import DebouncedInput from "./DebouncedInput";

function BooleanInput({ value, onChange }) {
  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={value ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onChange}
      value={value}
    />
  );
}

export default function InputPeripheral({ deviceId, peripheral }) {
  const refPath = `devices/${deviceId}/${peripheral}`;
  //   const [peripheralFormat, setPeripheralFormat] = useState(null);
  const [peripheralValue, setPeripheralValue] = useState(null);
  const [peripheralType, setPeripheralType] = useState(null);
  const db = getDatabase();

  useEffect(() => {
    const removeTypeListener = onValue(ref(db, `${refPath}/type`), (snapshot) =>
      setPeripheralType(snapshot.val())
    );
    return () => removeTypeListener();
  }, []);

  useEffect(() => {
    if (peripheralType === null) return null;
    if (peripheralType === "Boolean") {
      const removeValueListener = onValue(
        ref(db, `${refPath}/value`),
        (snapshot) => setPeripheralValue(snapshot.val())
      );
      return () => removeValueListener();
    } else {
      get(ref(db, `${refPath}/value`)).then((snapshot) => {
        setPeripheralValue(snapshot.val());
      });
    }
    return null;
  }, [peripheralType]);

  const updateValueInDb = (value) => set(ref(db, `${refPath}/value`), value);

  return (
    <View>
      <Text>Name: {peripheral}</Text>
      {peripheralValue !== null && (
        <View>
          {peripheralType === "Boolean" && (
            <BooleanInput value={peripheralValue} onChange={updateValueInDb} />
          )}
          {peripheralType === "Int" && (
            <DebouncedInput
              initialValue={peripheralValue}
              onChange={updateValueInDb}
            />
          )}
        </View>
      )}
    </View>
  );
}
