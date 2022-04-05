import React, { FunctionComponent } from 'react';
import { Box, Text } from 'native-base';

const PeripheralValueContainer: FunctionComponent<{ color: string }> = ({ color, children }) => {
  return (
    <Box p="2" borderRadius="2" bg={`${color}.300`} w="100px" flexDirection="row" alignItems="center" justifyContent="center" height="100%">
      <Text fontSize="md" fontWeight="bold" textAlign="center">
        {children}
      </Text>
    </Box>
  );
};

export default PeripheralValueContainer;
