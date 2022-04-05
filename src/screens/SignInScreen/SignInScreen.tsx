import React, { FunctionComponent, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  Image,
  Button,
  Center,
  Input,
  Text,
  Box,
  Column,
  Row,
  Heading,
  FormControl,
  Link,
  Spinner,
  useToast,
  ScrollView
} from 'native-base';
import { AuthTabParamList, AuthTabScreenName } from '../../../types';
import { useAuthContext } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

type ScreenProps = BottomTabNavigationProp<AuthTabParamList>;
const TOAST_ID = 'SIGN_IN';
const validationSchema = Yup.object({
  email: Yup.string().email('E-mail is incorrect').required('E-mail is required'),
  password: Yup.string().required('Password is required')
});

const SignInScreen: FunctionComponent = () => {
  const toast = useToast();
  const { signin } = useAuthContext();
  const navigation = useNavigation<ScreenProps>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onSignUpPress = useCallback(() => {
    navigation.navigate(AuthTabScreenName.SignUp);
  }, [navigation]);

  const onResetPasswordPress = useCallback(() => {
    navigation.navigate(AuthTabScreenName.ResetPassword);
  }, [navigation]);

  const onSignInPress = useCallback(
    ({ email, password }) => {
      if (toast.isActive(TOAST_ID)) toast.close(TOAST_ID);
      setIsLoading(true);
      signin(email, password)
        .then(() => setIsLoading(false))
        .catch(() => {
          setIsLoading(false);
          toast.show({
            id: TOAST_ID,
            status: 'error',
            title: 'Something went wrong.',
            description: "For some reason logging in isn't currently possible."
          });
        });
    },
    [signin, toast]
  );

  return (
    <ScrollView>
      <Center px="3" my="20">
        <Image
          w="200"
          h="200"
          mb="5"
          alt="Logo"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          source={require('../../assets/images/plant.png')}
          opacity={isLoading ? 0.2 : 1}
        />
        {isLoading && <Spinner size="lg" position="absolute" />}
        <Box safeArea px="2" py="4" w="90%" maxW="290" opacity={isLoading ? 0.2 : 1}>
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50'
            }}
          >
            Welcome
          </Heading>
          <Heading
            mt="1"
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
            _dark={{
              color: 'warmGray.200'
            }}
          >
            Sign in to continue!
          </Heading>

          <Column space={3} mt="4">
            <Formik initialValues={{ email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSignInPress}>
              {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                <>
                  <FormControl isInvalid={!!touched.email && !!errors.email}>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Input placeholder="E-mail" value={values.email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} />
                    <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!touched.password && !!errors.password}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      InputRightElement={
                        <Button
                          borderRadius="0"
                          background="dark.50"
                          _text={{
                            color: 'dark.800',
                            fontSize: 'xs'
                          }}
                          variant="unstyled"
                          h="100%"
                          onPress={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? 'Hide' : 'Show'}
                        </Button>
                      }
                    />
                    <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                      {errors.password}
                    </FormControl.ErrorMessage>
                    <Link
                      mt="1"
                      _text={{
                        fontSize: '2xs',
                        color: 'indigo.500',
                        fontWeight: 'medium'
                      }}
                      href="#"
                      flex="1"
                      justifyContent="flex-end"
                      onPress={onResetPasswordPress}
                    >
                      Reset password
                    </Link>
                  </FormControl>

                  <Button mt="6" colorScheme="indigo" onPress={() => handleSubmit()}>
                    Sign in
                  </Button>
                </>
              )}
            </Formik>
            <Row mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200'
                }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                I'm a new user.{' '}
              </Text>
              <Link
                _text={{
                  fontSize: 'sm',
                  color: 'indigo.500',
                  fontWeight: 'medium'
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
    </ScrollView>
  );
};

export default SignInScreen;
