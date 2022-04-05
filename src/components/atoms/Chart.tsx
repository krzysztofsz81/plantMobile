import React, { FunctionComponent, useState } from 'react';
import { View, Button } from 'native-base';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Peripheral } from '../../api/types';
import usePeripheralChangelogs from '../../hooks/usePeripheralChangelogs';
import { TimelineOption } from '../../../types';
import { chartOptionsMap } from '../../api/methods';

const buttonOptions: { text: string; value: TimelineOption }[] = [
  { text: 'Hour', value: '1h' },
  { text: 'Day', value: '1d' },
  { text: 'Week', value: '7d' }
];

const Chart: FunctionComponent<{ deviceId: string; peripheralId: Peripheral; yAxisLabel?: string; yAxisSuffix?: string }> = ({
  deviceId,
  peripheralId,
  yAxisLabel = '',
  yAxisSuffix = ''
}) => {
  const [timelineOption, setTimelineOption] = useState<TimelineOption>('1h');
  const data = usePeripheralChangelogs({ deviceId, peripheralId, option: timelineOption });

  return (
    <View maxWidth="auto" flex="1" p="3" bg="black" justifyContent="center" alignItems="center" display="flex">
      {data.length ? (
        <LineChart
          bezier
          data={{
            labels: chartOptionsMap[timelineOption],
            datasets: [
              {
                data
              }
            ]
          }}
          width={Dimensions.get('window').width - 48}
          height={220}
          yAxisLabel={yAxisLabel}
          yAxisSuffix={yAxisSuffix}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              // borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffa726'
            }
          }}
          style={
            {
              // marginVertical: 8,
              // borderRadius: 16,
            }
          }
        />
      ) : null}
      <Button.Group pt="3">
        {buttonOptions.map(({ value, text }) => (
          <Button flex="1" key={value} colorScheme={value === timelineOption ? 'blue' : 'gray'} onPress={() => setTimelineOption(value)}>
            {text}
          </Button>
        ))}
      </Button.Group>
    </View>
  );
};

export default Chart;
