import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { listenOnDevicesList } from '../api/methods';
import { DeviceItem } from '../api/types';

type UseDevicesListResult = [DeviceItem[], Dispatch<SetStateAction<DeviceItem[]>>];

function useDevicesList(): UseDevicesListResult {
  const [devices, setDevices] = useState<DeviceItem[]>([]);
  useEffect(() => listenOnDevicesList(setDevices), []);
  return [devices, setDevices];
}

export default useDevicesList;
