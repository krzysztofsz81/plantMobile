import React, { FunctionComponent, useCallback, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AuthTabParamList, AuthTabScreenName } from '../../../types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Image, Button, Center, Input, Text, Box, Column, Row, Heading, FormControl, Link } from 'native-base';

type ScreenProps = BottomTabNavigationProp<AuthTabParamList>;
type FormProps = { email: string; password: string };

const SignInScreen: FunctionComponent = () => {
  const navigation = useNavigation<ScreenProps>();

  const [formData, setFormData] = useState<FormProps>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormProps>({ email: '', password: '' });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSignUpPress = useCallback(() => {
    navigation.navigate(AuthTabScreenName.SignUp);
  }, [navigation]);

  const isFormValid = useCallback(() => {
    setFormErrors((values) => ({ ...values, email: !formData.email ? 'E-mail is required.' : '' }));
    setFormErrors((values) => ({ ...values, password: !formData.password ? 'Password is required.' : '' }));
    return formData.email && formData.password;
  }, [formData.email, formData.password]);

  const onSignInPress = useCallback(() => {
    if (!isFormValid()) return;
    setIsLoading(true);
    signInWithEmailAndPassword(getAuth(), formData.email, formData.password)
      .then((response) => {
        setIsLoading(false);
        console.log('jazda', {
          user: {
            id: response.user.uid,
            email: formData.email,
          },
        });
      })
      .catch((error) => {
        setIsLoading(false);
        console.error('problem with signin', error);
      });
  }, [formData.email, formData.password, isFormValid]);

  return (
    <Center flex="1" px="3">
      <Image w="200" h="200" marginBottom="5" alt="Logo" source={require('../../assets/images/plant.png')} />
      <Box safeArea p="2" py="4" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
        >
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <Column space={3} mt="4">
          <form>
            <FormControl isRequired isInvalid={'email' in formErrors}>
              <FormControl.Label>E-mail</FormControl.Label>
              <Input
                borderColor="dark.50"
                backgroundColor="white"
                borderStyle="solid"
                placeholder="E-mail"
                onChangeText={(email) => setFormData((values) => ({ ...values, email }))}
              />
              <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                {formErrors.email}
              </FormControl.ErrorMessage>
            </FormControl>
            <FormControl mt={2} isRequired isInvalid={'password' in formErrors}>
              <FormControl.Label>Password</FormControl.Label>
              <Input
                secureTextEntry={!showPassword}
                borderColor="dark.50"
                borderStyle="solid"
                backgroundColor="white"
                InputRightElement={
                  <Button
                    borderStyle="none"
                    borderRadius={0}
                    background="dark.50"
                    _text={{
                      color: 'dark.800',
                      fontSize: 'xs',
                    }}
                    variant="unstyled"
                    w="1/6"
                    h="100%"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                }
                placeholder="Password"
                onChangeText={(password) => setFormData((values) => ({ ...values, password }))}
              />
              <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                {formErrors.password}
              </FormControl.ErrorMessage>
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="2"
              >
                Forget Password?
              </Link>
            </FormControl>
            <Button mt="2" colorScheme="indigo" onPress={onSignInPress}>
              Sign in
            </Button>
          </form>
          <Row mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
            >
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              I'm a new user.{' '}
            </Text>
            <Link
              _text={{
                color: 'indigo.500',
                fontWeight: 'medium',
                fontSize: 'sm',
              }}
              href="#"
              onPress={onSignUpPress}
            >
              Sign Up
            </Link>
          </Row>
        </Column>
      </Box>
    </Center>
  );
};

export default SignInScreen;
