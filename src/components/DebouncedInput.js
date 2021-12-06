import React, { useState } from "react";
import { TextInput } from "react-native";
import { useDebounce } from "react-use";

export default function DebouncedInput({
  initialValue,
  onChange,
  keyboardType = "numeric",
}) {
  const [value, setValue] = useState(initialValue);
  useDebounce(() => onChange(value), 250, [value]);

  return (
    <TextInput
      onChangeText={setValue}
      value={value}
      placeholder="useless placeholder"
      keyboardType={keyboardType}
    />
  );
}
