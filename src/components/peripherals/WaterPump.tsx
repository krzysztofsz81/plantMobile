import React, { FunctionComponent } from 'react';
import { Box, Button, Text, Flex, FormControl, Slider, Spinner } from 'native-base';
import { debounceFunction } from '../../methods';
import { PeripheralProps } from '../../../types';
import PeripheralContainer from '../atoms/PeripheralContainer';
import usePeripheralDataListener from '../../hooks/usePeripheralDataListener';
import useUpdatePeripheralData from '../../hooks/useUpdatePeripheralData';

type PumpTimeInfo = {
  min: number;
  max: number;
};

const waterPumpId = 'water_pump';
const waterPumpTimeId = 'water_pump_time';

const WaterPump: FunctionComponent<PeripheralProps> = ({ deviceId }) => {
  const [pumpValue] = usePeripheralDataListener<boolean>({
    deviceId,
    peripheralId: waterPumpId,
    property: 'value'
  });
  const [pumpTimeValue, setPumpTimeValue] = usePeripheralDataListener<number>({
    deviceId,
    peripheralId: waterPumpTimeId,
    property: 'value'
  });
  const [pumpTimeInfo] = usePeripheralDataListener<PumpTimeInfo>({
    deviceId,
    peripheralId: waterPumpTimeId,
    property: 'info'
  });
  const setWaterPumpValue = useUpdatePeripheralData<boolean>({
    deviceId,
    peripheralId: waterPumpId,
    property: 'value'
  });
  const setWaterPumpTimeValue = useUpdatePeripheralData<number>({
    deviceId,
    peripheralId: waterPumpTimeId,
    property: 'value'
  });

  if (pumpValue === undefined || pumpTimeValue === undefined || !pumpTimeInfo) return null;

  return (
    <PeripheralContainer color="violet">
      <FormControl width="auto" p="2">
        <FormControl.Label mb="0">Water pump work duration: {(pumpTimeValue / 1000).toFixed(1)}s.</FormControl.Label>
        <Flex m="2" justifyContent="center" width="100%">
          <Slider
            value={pumpTimeValue}
            minValue={pumpTimeInfo.min}
            maxValue={pumpTimeInfo.max}
            step={500}
            size="md"
            colorScheme="green"
            onChange={setPumpTimeValue}
            onChangeEnd={(value) => {
              setPumpTimeValue(value);
              setWaterPumpTimeValue(value);
            }}
          >
            <Slider.Track bg="violet.300">
              <Slider.FilledTrack bg="violet.700" />
            </Slider.Track>
            <Slider.Thumb />
          </Slider>
        </Flex>
      </FormControl>
      <Button
        width="100px"
        size="sm"
        borderTopLeftRadius="0"
        borderBottomLeftRadius="0"
        height="full"
        colorScheme="violet"
        onPress={() => debounceFunction(() => setWaterPumpValue(true))}
        disabled={pumpValue}
      >
        {!pumpValue ? (
          'Enable pump'
        ) : (
          <Box flexDirection="row">
            <Text mr="2" fontSize="sm" fontWeight="500">
              Watering
            </Text>
            <Spinner />
          </Box>
        )}
      </Button>
    </PeripheralContainer>
  );
};

export default WaterPump;
