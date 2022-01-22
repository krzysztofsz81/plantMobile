/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from "@react-navigation/native";

export type HomeStackParamList = {
  Devices: undefined;
  Device: { deviceId: string };
};

export type AuthTabParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

export type HomeTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Notifications: undefined;
  Profile: undefined;
};

export type TabParamList = HomeTabParamList & AuthTabParamList;

export enum AuthTabScreenName {
  SignIn = "SignIn",
  SignUp = "SignUp",
  ResetPassword = "ResetPassword",
}

export enum HomeTabScreenName {
  Home = "Home",
  Notifications = "Notifications",
  Profile = "Profile",
}

export enum HomeStackScreenName {
  Devices = "Devices",
  Device = "Device",
}

export enum PeripheralType {
  OUTPUT = "OUTPUT",
  INPUT = "INPUT",
}

export type PeripheralProps = {
  deviceId: string;
  name: string;
  type: PeripheralType;
};
