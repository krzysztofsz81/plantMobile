import React, { FunctionComponent, useMemo, useState } from 'react';
import { Text, Box, Link } from 'native-base';
import { mapToRange } from '../../methods';
import { PeripheralProps } from '../../../types';
import CalibrationSoilMoisture from '../atoms/CalibrationSoilMoisture';
import PeripheralContainer from '../atoms/PeripheralContainer';
import PeripheralValueContainer from '../atoms/PeripheralValueContainer';
import usePeripheralDataListener from '../../hooks/usePeripheralDataListener';
import useUpdatePeripheralData from '../../hooks/useUpdatePeripheralData';
import Chart from '../atoms/Chart';

type Info = {
  min: number;
  max: number;
  calibrationMax: number;
  calibrationMin: number;
  valueSuffix: string;
};

const peripheralId = 'soil_moisture';

const SoilMoisture: FunctionComponent<PeripheralProps> = ({ deviceId, isActive }) => {
  const [showCalibration, setShowCalibration] = useState<boolean>(false);
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
  const setCalibrationMin = useUpdatePeripheralData({
    deviceId,
    peripheralId,
    property: 'info/calibrationMin'
  });
  const setCalibrationMax = useUpdatePeripheralData({
    deviceId,
    peripheralId,
    property: 'info/calibrationMax'
  });

  const onCalibrationSubmit = ({ min, max }: Pick<Info, 'min' | 'max'>) => {
    setCalibrationMin(min);
    setCalibrationMax(max);
    setShowCalibration(false);
  };

  const formattedValue = useMemo(() => {
    if (value === undefined || !info) return;
    const result = mapToRange(value, info.calibrationMin ?? info.min, info.calibrationMax ?? info.max, 0, 100);
    if (result > 100) return 100;
    if (result < 0) return 0;
    return result;
  }, [value, info]);

  if (value === undefined || formattedValue === undefined || !info) return null;

  return (
    <>
      <PeripheralContainer color="blue">
        <Box flexDirection="column">
          <Text p="2" fontSize="lg">
            Soil moisture
          </Text>
          <Link
            p="2"
            _text={{
              fontSize: 'xs'
            }}
            onPress={() => setShowCalibration(!showCalibration)}
          >
            {showCalibration ? 'Hide' : 'Show'} calibration
          </Link>
        </Box>
        <PeripheralValueContainer color="blue">{formattedValue.toFixed(1)}%</PeripheralValueContainer>
      </PeripheralContainer>
      {showCalibration && (
        <CalibrationSoilMoisture
          previewValue={value}
          initialCalibrationValues={{
            min: info?.calibrationMin ?? info?.min,
            max: info?.calibrationMax ?? info?.max
          }}
          maxValue={info.max}
          minValue={info.min}
          onSubmit={onCalibrationSubmit}
          onCancel={() => setShowCalibration(false)}
        />
      )}
      {isActive && <Chart deviceId={deviceId} peripheralId={peripheralId} yAxisSuffix={info.valueSuffix} />}
    </>
  );
};

export default SoilMoisture;
