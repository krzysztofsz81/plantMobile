import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_APP_ID
} from '@env';
import {
  getAuth,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
  sendPasswordResetEmail,
  signOut,
  signInWithEmailAndPassword,
  Auth,
  initializeAuth
} from 'firebase/auth';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let app: FirebaseApp;
let auth: Auth;

const firebaseConfig = {
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  databaseURL: FIREBASE_DATABASE_URL,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  apiKey: FIREBASE_API_KEY,
  appId: FIREBASE_APP_ID
};

if (getApps().length < 1) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} else {
  app = getApp();
  auth = getAuth();
}

const signup = (email: string, password: string): Promise<UserCredential> => createUserWithEmailAndPassword(auth, email, password);

const signin = (email: string, password: string): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

const signout = (): Promise<void> => signOut(auth);

const passwordReset = (email: string): Promise<void> => sendPasswordResetEmail(auth, email);

type AuthStatus = 'LOADING' | 'LOGGED_IN' | 'NOT_LOGGED_IN';
type CurrentUser = User | null;

type AuthContextProps = {
  currentUser: CurrentUser;
  authStatus: AuthStatus;
  signup: (email: string, password: string) => Promise<UserCredential>;
  signin: (email: string, password: string) => Promise<UserCredential>;
  signout: () => Promise<void>;
  passwordReset: (email: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  authStatus: 'LOADING',
  signup,
  signin,
  signout,
  passwordReset
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider: FunctionComponent = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>('LOADING');

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthStatus(user ? 'LOGGED_IN' : 'NOT_LOGGED_IN');
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        authStatus,
        signup,
        signin,
        signout,
        passwordReset
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export { useAuthContext, app };
