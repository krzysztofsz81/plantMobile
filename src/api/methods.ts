import {
  getDatabase,
  ref,
  onValue,
  Unsubscribe,
  get,
  set,
} from "firebase/database";
import { PeripheralType } from "../../types";
import { DeviceItem, DeviceStatus, PeripheralItem, Peripherals } from "./types";

export const listenOnDeviceStatus = (
  id: string,
  callback: (value: DeviceStatus) => void
): Unsubscribe => {
  const db = getDatabase();
  return onValue(ref(db, `devices/${id}/status`), (snapshot) => {
    const value = snapshot.val() as DeviceStatus;
    callback(value);
  });
};

export const listenOnDevicesList = (
  callback: (value: DeviceItem[]) => void
): Unsubscribe => {
  const db = getDatabase();
  return onValue(ref(db, `devices/_list`), (snapshot) => {
    const value = snapshot.val() as Record<string, string>;

    callback(
      Object.entries(value).map(([key, name]) => ({
        key,
        name,
      }))
    );
  });
};

export const getDevicePeripheralProperty = (
  deviceId: string,
  peripheralId: string,
  property: string,
  callback: (value: any) => void
) => {
  const db = getDatabase();
  get(ref(db, `devices/${deviceId}/${peripheralId}/${property}`)).then(
    (snapshot) => {
      callback(snapshot.val());
    }
  );
};

export const setDevicePeripheralProperty = (
  deviceId: string,
  peripheralId: string,
  property: string,
  value: any
) => {
  const db = getDatabase();
  set(ref(db, `devices/${deviceId}/${peripheralId}/${property}`), value);
};

export const listenOnDevicePeripheralProperty = (
  deviceId: string,
  peripheralId: string,
  property: string,
  callback: (value: any) => void
): Unsubscribe => {
  const db = getDatabase();
  return onValue(
    ref(db, `devices/${deviceId}/${peripheralId}/${property}`),
    (snapshot) => {
      callback(snapshot.val());
    }
  );
};

export const listenOnPeripherals = (
  deviceId: string,
  callback: (value: PeripheralItem[]) => void
): Unsubscribe => {
  const db = getDatabase();
  return onValue(ref(db, `devices/${deviceId}/_peripherals`), (snapshot) => {
    const value = snapshot.val() as {
      input: Record<string, Peripherals>;
      output: Record<string, Peripherals>;
    };
    const inputPeripherals = Object.entries(value.input).map(([key, name]) => ({
      key,
      name,
      type: PeripheralType.INPUT,
    }));
    const outputPeripherals = Object.entries(value.output).map(
      ([key, name]) => ({
        key,
        name,
        type: PeripheralType.OUTPUT,
      })
    );
    callback([...outputPeripherals, ...inputPeripherals]);
  });
};
