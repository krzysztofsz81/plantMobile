import { FunctionComponent } from 'react';
import WaterPump from '../../components/peripherals/WaterPump';
import DhtHumidity from '../../components/peripherals/DhtHumidity';
import SoilMoisture from '../../components/peripherals/SoilMoisture';
import DhtTemperature from '../../components/peripherals/DhtTemperature';
import SoilTemperature from '../../components/peripherals/SoilTemperature';
import { VisiblePeripheral } from '../../api/types';
import { PeripheralProps } from '../../../types';

export const peripheralComponentMap: Record<VisiblePeripheral, FunctionComponent<PeripheralProps>> = {
  water_pump: WaterPump,
  dht_humidity: DhtHumidity,
  soil_moisture: SoilMoisture,
  dht_temperature: DhtTemperature,
  soil_temperature: SoilTemperature
};
