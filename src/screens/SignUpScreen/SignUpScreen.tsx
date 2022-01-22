import React, { FunctionComponent, useState } from "react";
import { Image, Text, Input, View } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { AuthTabParamList, AuthTabScreenName } from "../../../types";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type ScreenProps = BottomTabNavigationProp<AuthTabParamList>;

const SignUpScreen: FunctionComponent = () => {
  const navigation = useNavigation<ScreenProps>();
  // const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onLogInPress = () => {
    navigation.navigate(AuthTabScreenName.SignIn);
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log("signed in", response, {
          id: response.user.uid,
          email,
        });
      })
      .catch((error) => {
        console.error("problem with signin", error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // alert(error);
      });
  };

  return (
    <View>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Image alt="Logo" source={require("../../assets/images/icon.png")} />
        {/* <Input
        placeholder="Full Name"
        onChangeText={(text) => setFullName(text)}
        value={fullName}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      /> */}
        <Input
          placeholder="E-mail"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Input
          secureTextEntry
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <Input
          secureTextEntry
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <View>
          <Text onPress={() => onRegisterPress()}>Create account</Text>
        </View>
        <View>
          <Text>
            Already got an account?
            <Text onPress={onLogInPress}>Log in</Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUpScreen;
