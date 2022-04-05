import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { listenOnDevicePeripheralProperty } from '../api/methods';
import { Peripheral } from '../api/types';

function usePeripheralDataListener<T>({
  deviceId,
  peripheralId,
  property
}: {
  deviceId: string;
  peripheralId: Peripheral;
  property: string;
}): [T | undefined, Dispatch<SetStateAction<T | undefined>>] {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    return listenOnDevicePeripheralProperty(deviceId, peripheralId, property, setValue);
  }, [deviceId, peripheralId, property]);

  return [value, setValue];
}

export default usePeripheralDataListener;
