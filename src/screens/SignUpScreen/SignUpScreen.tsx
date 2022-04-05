import React, { FunctionComponent, useCallback, useState } from 'react';
import { Image, Center, Input, Box, Heading, Column, FormControl, Button, Spinner, useToast, ScrollView } from 'native-base';
import { useAuthContext } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const TOAST_ID = 'SIGN_UP';
const validationSchema = Yup.object({
  email: Yup.string().email('E-mail is incorrect').required('E-mail is required'),
  password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
});

const SignUpScreen: FunctionComponent = () => {
  const toast = useToast();
  const { signup } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSignUpPress = useCallback(
    ({ email, password }) => {
      if (toast.isActive(TOAST_ID)) toast.close(TOAST_ID);
      setIsLoading(true);
      signup(email, password)
        .then(() => setIsLoading(false))
        .catch(() => {
          setIsLoading(false);
          toast.show({
            id: TOAST_ID,
            status: 'error',
            title: 'Something went wrong.',
            description: "For some reason registration isn't currently possible."
          });
        });
    },
    [signup, toast]
  );

  return (
    <ScrollView>
      <Center px="3" my="20">
        <Image
          w="200"
          h="200"
          marginBottom="5"
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
            Sign up to continue!
          </Heading>
          <Column space={3} mt="4">
            <Formik
              initialValues={{ email: '', password: '', confirmPassword: '' }}
              validationSchema={validationSchema}
              onSubmit={onSignUpPress}
            >
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
                    />
                    <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                      {errors.password}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!touched.confirmPassword && !!errors.confirmPassword}>
                    <FormControl.Label>Confirm password</FormControl.Label>
                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={values.confirmPassword}
                      onBlur={handleBlur('confirmPassword')}
                      onChangeText={handleChange('confirmPassword')}
                    />
                    <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                      {errors.confirmPassword}
                    </FormControl.ErrorMessage>
                  </FormControl>
                  <Button mt="6" colorScheme="indigo" onPress={() => handleSubmit()}>
                    Sign up
                  </Button>
                </>
              )}
            </Formik>
          </Column>
        </Box>
      </Center>
    </ScrollView>
  );
};

export default SignUpScreen;
