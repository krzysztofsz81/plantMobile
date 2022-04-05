import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { listenOnPeriphalsList } from '../api/methods';
import { PeripheralItem } from '../api/types';

function usePeriphalsList(deviceId: string): [PeripheralItem[], Dispatch<SetStateAction<PeripheralItem[]>>] {
  const [periphals, setPeriphals] = useState<PeripheralItem[]>([]);
  useEffect(() => listenOnPeriphalsList(deviceId, setPeriphals), [deviceId]);
  return [periphals, setPeriphals];
}

export default usePeriphalsList;
