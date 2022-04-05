import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text } from 'native-base';
import { PeripheralProps } from '../../../types';
import PeripheralContainer from '../atoms/PeripheralContainer';
import PeripheralValueContainer from '../atoms/PeripheralValueContainer';
import usePeripheralDataListener from '../../hooks/usePeripheralDataListener';
import Chart from '../atoms/Chart';

const peripheralId = 'dht_temperature';
type Info = {
  format: string;
  kind: string;
  type: string;
  valueSuffix: string;
};

const DhtTemperature: FunctionComponent<PeripheralProps> = ({ deviceId, isActive }) => {
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
      <PeripheralContainer color="purple">
        <Text ml="2" fontSize="md">
          Environment temperature
        </Text>
        <PeripheralValueContainer color="purple">{value.toFixed(1)}°C</PeripheralValueContainer>
      </PeripheralContainer>
      {isActive && <Chart deviceId={deviceId} peripheralId={peripheralId} yAxisSuffix={info.valueSuffix} />}
    </>
  );
};

export default DhtTemperature;
