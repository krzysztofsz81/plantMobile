import { useEffect, useState } from 'react';
import { TimelineOption } from '../../types';
import { getDevicePeripheralChangelogs } from '../api/methods';
import { Peripheral } from '../api/types';

function usePeripheralChangelogs({
  deviceId,
  peripheralId,
  option
}: {
  deviceId: string;
  peripheralId: Peripheral;
  option: TimelineOption;
}): number[] {
  const [value, setValue] = useState<number[]>([]);

  useEffect(() => {
    console.log('WTFFFF usePeripheralChangelogs');
    getDevicePeripheralChangelogs(deviceId, peripheralId, option, setValue);
  }, [deviceId, peripheralId, option]);

  return value;
}

export default usePeripheralChangelogs;
