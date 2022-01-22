import 'react-native-gesture-handler';
import './src/firebase/config';

import React, { useEffect, useState } from 'react';
import { NavigationContainer, NavigationState } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { AuthTabScreenName, HomeStackParamList, HomeStackScreenName, HomeTabScreenName, TabParamList } from './types';
import {
  DevicesScreen,
  DeviceScreen,
  NotificationScreen,
  ProfileScreen,
  ResetPasswordScreen,
  SignInScreen,
  SignUpScreen,
} from './src/screens';
import { createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, useTheme } from 'native-base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// import { decode, encode } from "base-64";
// if (!global.btoa) global.btoa = encode;
// if (!global.atob) global.atob = decode;

const Tab = createMaterialBottomTabNavigator<TabParamList>();
const Stack = createStackNavigator<HomeStackParamList>();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName={HomeStackScreenName.Devices}>
      <Stack.Screen name={HomeStackScreenName.Devices} component={DevicesScreen} />
      <Stack.Screen name={HomeStackScreenName.Device} component={DeviceScreen} />
    </Stack.Navigator>
  );
}

function Navigation({ isSignedIn }: { isSignedIn: boolean }) {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor={colors.dark[900]}
        inactiveColor={colors.dark[400]}
        barStyle={{
          backgroundColor: colors.dark[100],
        }}
      >
        {isSignedIn ? (
          <>
            <Tab.Screen
              name={HomeTabScreenName.Home}
              component={HomeStack}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
              }}
              listeners={({ navigation }) => ({
                tabPress: () => {
                  navigation.dispatch((state: NavigationState) =>
                    CommonActions.reset({
                      ...state,
                      index: 0,
                    })
                  );
                },
              })}
            />
            <Tab.Screen
              name={HomeTabScreenName.Notifications}
              component={NotificationScreen}
              options={{
                tabBarLabel: 'Updates',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bell" color={color} size={26} />,
              }}
            />
            <Tab.Screen
              name={HomeTabScreenName.Profile}
              component={ProfileScreen}
              options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name={AuthTabScreenName.SignIn}
              component={SignInScreen}
              options={{
                tabBarLabel: 'Sign in',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
              }}
            />
            <Tab.Screen
              name={AuthTabScreenName.SignUp}
              component={SignUpScreen}
              options={{
                tabBarLabel: 'Sign up',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
              }}
            />
            <Tab.Screen
              name={AuthTabScreenName.ResetPassword}
              component={ResetPasswordScreen}
              options={{
                tabBarLabel: 'Reset password',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      console.log('onAuthStateChanged', { user });
      setIsSignedIn(!!user);
    });
  }, []);

  return (
    <NativeBaseProvider config={{ suppressColorAccessibilityWarning: true }}>
      <Navigation isSignedIn={isSignedIn} />
    </NativeBaseProvider>
  );
}
