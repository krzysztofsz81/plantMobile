import React, { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { Subscription } from 'expo-modules-core';
// import { pushNotificationToken } from "../api/methods";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' }
    },
    trigger: { seconds: 2 }
  });
}

type NotificationContextProps = {
  schedulePushNotification: () => void;
};

const NotificationContext = React.createContext<NotificationContextProps>({
  schedulePushNotification
});

const useNotificationContext = () => useContext(NotificationContext);

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }
  return token;
}

const NotificationProvider: FunctionComponent = ({ children }) => {
  const [expoPushToken, setExpoPushToken] = useState<string>();
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
      // if (token) {
      //   pushNotificationToken(token);
      // }
      console.log('registerForPushNotificationsAsync', { token });
    });
    notificationListener.current = Notifications.addNotificationReceivedListener(setNotification);
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    console.log('NotificationProvider', { expoPushToken, notification });
  }, [expoPushToken, notification]);

  return (
    <NotificationContext.Provider
      value={{
        schedulePushNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
export { useNotificationContext };
