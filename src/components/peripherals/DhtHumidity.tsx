import React, { FunctionComponent } from 'react';
import { Text } from 'native-base';
import { PeripheralProps } from '../../../types';
import PeripheralContainer from '../atoms/PeripheralContainer';
import PeripheralValueContainer from '../atoms/PeripheralValueContainer';
import Chart from '../atoms/Chart';
import usePeripheralDataListener from '../../hooks/usePeripheralDataListener';

const peripheralId = 'dht_humidity';
type Info = {
  format: string;
  kind: string;
  type: string;
  valueSuffix: string;
};

const DhtHumidity: FunctionComponent<PeripheralProps> = ({ deviceId, isActive }) => {
  const [value] = usePeripheralDataListener<number>({
    deviceId,
    peripheralId,
    property: 'value'
  });
  const [info] = usePeripheralDataListener<Info>({
    deviceId,
    peripheralId,
    property: 'info'
  });
  if (!value || !info) return null;

  return (
    <>
      <PeripheralContainer color="red">
        <Text ml="2" fontSize="md">
          Environment humidity
        </Text>
        <PeripheralValueContainer color="red">
          {value}
          {info.valueSuffix}
        </PeripheralValueContainer>
      </PeripheralContainer>
      {isActive && <Chart deviceId={deviceId} peripheralId={peripheralId} yAxisSuffix={info.valueSuffix} />}
    </>
  );
};

export default DhtHumidity;
