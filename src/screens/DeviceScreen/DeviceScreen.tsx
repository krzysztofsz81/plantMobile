import React, { FunctionComponent, useState } from 'react';
import { Text, Badge, Row, Box, Flex, ScrollView, Pressable } from 'native-base';
import { useRoute } from '@react-navigation/native';
import { Peripheral } from '../../api/types';

import { peripheralComponentMap } from './DeviceScreen.helpers';
import { ScreenProps } from './DeviceScreen.types';
import useIsDeviceConnected from '../../hooks/useIsDeviceConnected';
import usePeriphalsList from '../../hooks/usePeriphalsList';

const DeviceScreen: FunctionComponent = () => {
  const {
    params: { deviceId }
  } = useRoute<ScreenProps['route']>();
  const [isConnected] = useIsDeviceConnected(deviceId);
  const [periphalsList] = usePeriphalsList(deviceId);
  const [activePeripheralName, setActivePeripheralName] = useState<Peripheral>();

  return (
    <ScrollView>
      <Flex mx={4}>
        <Row my={4} justifyContent="space-between">
          <Text>{deviceId}</Text>
          {isConnected !== null && (
            <Badge width="100px" colorScheme={isConnected ? 'success' : 'coolGray'}>
              {isConnected ? 'CONNECTED' : 'DISCONNECTED'}
            </Badge>
          )}
        </Row>
        <Flex flexDirection="column" flexWrap="wrap">
          {periphalsList.sort().map(({ key, name }) => {
            const Peripheral = peripheralComponentMap[name];
            if (!Peripheral) return null;
            return (
              <Box key={key} py={2} width="100%">
                <Pressable onPress={() => setActivePeripheralName(name)}>
                  {({ isPressed }) => (
                    <Box
                      style={{
                        transform: [
                          {
                            scale: isPressed ? 0.98 : 1
                          }
                        ]
                      }}
                    >
                      <Peripheral deviceId={deviceId} isActive={activePeripheralName === name} />
                    </Box>
                  )}
                </Pressable>
              </Box>
            );
          })}
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default DeviceScreen;
