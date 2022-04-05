import React, { FunctionComponent, useCallback, useState } from 'react';
import { Image, Center, Input, Box, Heading, Column, FormControl, Button, useToast, Spinner, ScrollView } from 'native-base';
import { useAuthContext } from '../../contexts/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';

const TOAST_ID = 'RESET_PASSWORD';
const validationSchema = Yup.object({
  email: Yup.string().email('E-mail is incorrect').required('E-mail is required')
});

const ResetPasswordScreen: FunctionComponent = () => {
  const toast = useToast();
  const { passwordReset } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onResetPasswordPress = useCallback(
    ({ email }) => {
      if (toast.isActive(TOAST_ID)) toast.close(TOAST_ID);
      setIsLoading(true);
      passwordReset(email)
        .then(() => {
          setIsLoading(false);
          toast.show({
            id: TOAST_ID,
            status: 'success',
            title: 'Everything looks good.',
            description: 'Please check your inbox for futher instructions.'
          });
        })
        .catch(() => {
          setIsLoading(false);
          toast.show({
            id: TOAST_ID,
            status: 'error',
            title: 'Something went wrong.',
            description: "For some reason resetting the password isn't currently possible."
          });
        });
    },
    [passwordReset, toast]
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
            Reset password
          </Heading>
          <Column space={3} mt="4">
            <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={onResetPasswordPress}>
              {({ handleChange, handleBlur, handleSubmit, errors, touched, values }) => (
                <>
                  <FormControl isInvalid={!!touched.email && !!errors.email}>
                    <FormControl.Label>E-mail</FormControl.Label>
                    <Input placeholder="E-mail" value={values.email} onBlur={handleBlur('email')} onChangeText={handleChange('email')} />
                    <FormControl.ErrorMessage mt="0" _text={{ fontSize: 'xs' }}>
                      {errors.email}
                    </FormControl.ErrorMessage>
                  </FormControl>

                  <Button mt="6" colorScheme="indigo" onPress={() => handleSubmit()}>
                    Reset password
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

export default ResetPasswordScreen;
