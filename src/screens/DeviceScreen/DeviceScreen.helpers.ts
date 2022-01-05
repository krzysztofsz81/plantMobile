import { Peripherals } from "../../api/types";
import {
  SimpleOutput,
  SoilMoisture,
  WaterPump,
  WaterPumpTime,
} from "../../components/peripherals";

export const peripheralComponentMap = {
  [Peripherals.dht_humidity]: SimpleOutput,
  [Peripherals.dht_temperature]: SimpleOutput,
  [Peripherals.soil_temperature]: SimpleOutput,
  [Peripherals.soil_moisture]: SoilMoisture,
  [Peripherals.water_pump]: WaterPump,
  [Peripherals.water_pump_time]: WaterPumpTime,
};
