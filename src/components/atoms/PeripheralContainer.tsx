import React, { FunctionComponent } from 'react';
import { Box } from 'native-base';

const PeripheralContainer: FunctionComponent<{ color: string }> = ({ color, children }) => {
  return (
    <Box borderRadius="2" bg={`${color}.200`} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
      {children}
    </Box>
  );
};

export default PeripheralContainer;
