import { useCallback } from 'react';
import { setDevicePeripheralProperty } from '../api/methods';
import { Peripheral } from '../api/types';

function useUpdatePeripheralData<T>({
  deviceId,
  peripheralId,
  property
}: {
  deviceId: string;
  peripheralId: Peripheral;
  property: string;
}): (value: T) => Promise<void> {
  const update = useCallback(
    (value) => setDevicePeripheralProperty(deviceId, peripheralId, property, value),
    [deviceId, peripheralId, property]
  );

  return (value: T) => update(value);
}

export default useUpdatePeripheralData;
