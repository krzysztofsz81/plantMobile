export type DeviceStatus = 'CONNECTED' | 'DISCONNECTED';

export type VisiblePeripheral = 'dht_humidity' | 'dht_temperature' | 'soil_moisture' | 'soil_temperature' | 'water_pump';

export type Peripheral = 'dht_humidity' | 'dht_temperature' | 'soil_moisture' | 'soil_temperature' | 'water_pump' | 'water_pump_time';

export type PeripheralItem = {
  key: string;
  name: Peripheral;
};

export type DeviceItem = {
  key: string;
  name: string;
};
