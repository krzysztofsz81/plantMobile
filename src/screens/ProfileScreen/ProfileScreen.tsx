import React, { FunctionComponent } from 'react';
import { Link, Center, ScrollView, Heading, Box, Divider } from 'native-base';
import { useAuthContext } from '../../contexts/AuthContext';

const ProfileScreen: FunctionComponent = () => {
  const { currentUser, signout } = useAuthContext();
  if (!currentUser) return null;

  return (
    <ScrollView>
      <Center px="3" my="20">
        <Box safeArea px="2" py="4" w="90%" maxW="290">
          <Heading size="lg">Profile</Heading>
          <Heading size="sm">{currentUser.email}</Heading>
          <Divider />
          <Link onPress={signout}>Sign out</Link>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default ProfileScreen;
