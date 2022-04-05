import React, { FunctionComponent } from 'react';
import { Box, Text, Pressable, Center, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ScreenProps } from './DevicesScreen.types';
import { HomeStackScreenName } from '../../../types';
import useDevicesList from '../../hooks/useDevicesList';

const DevicesScreen: FunctionComponent = () => {
  const navigation = useNavigation<ScreenProps['navigation']>();
  const [devices] = useDevicesList();

  return (
    <ScrollView>
      <Center>
        {devices.map(({ key, name }) => (
          <Box key={key} p={4} width="100%">
            <Pressable
              onPress={() =>
                navigation.navigate(HomeStackScreenName.Device, {
                  deviceId: name
                })
              }
            >
              <Box borderWidth="1" borderColor="coolGray.300" shadow="3" bg="green.500" p="5" rounded="8" alignItems="center">
                <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
                  {name}
                </Text>
              </Box>
            </Pressable>
          </Box>
        ))}
      </Center>
    </ScrollView>
  );
};

export default DevicesScreen;
