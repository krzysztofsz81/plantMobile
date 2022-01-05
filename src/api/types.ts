import { PeripheralType } from "../../types";

export enum DeviceStatus {
  CONNECTED = "CONNECTED",
  DISCONNECTED = "DISCONNECTED",
}

export enum Peripherals {
  dht_humidity = "dht_humidity",
  dht_temperature = "dht_temperature",
  soil_moisture = "soil_moisture",
  soil_temperature = "soil_temperature",
  water_pump = "water_pump",
  water_pump_time = "water_pump_time",
}

export type PeripheralItem = {
  key: string;
  name: Peripherals;
  type: PeripheralType;
};

export type DeviceItem = {
  key: string;
  name: string;
};
