import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { listenIsDeviceConnected } from '../api/methods';

type UseIsDeviceConnectedResult = [boolean | null, Dispatch<SetStateAction<boolean | null>>];

function useIsDeviceConnected(deviceId: string): UseIsDeviceConnectedResult {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  useEffect(() => listenIsDeviceConnected(deviceId, setIsConnected), [deviceId]);
  return [isConnected, setIsConnected];
}

export default useIsDeviceConnected;
