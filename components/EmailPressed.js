import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DismissKeyboard from "../components/DismissKeyboard";
import { logIn } from "../Api.js";
import { isValidEmail, isValidText } from "../util/other/validations";
import { isElementAccessExpression } from "typescript";
import { storeData } from "../util/other/SaveObject.js";
import Layout from "./Layout.js";

const EmailPressed = () => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconEye, seticonEye] = useState("eye");
  const [iconCross, setIconCross] = useState("delete");
  const [isEmpty, setIsEmpty] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authUser, setAuthUser] = useState(undefined);
  const [isDisabled, setisDisabled] = useState(true);
  const navigation = useNavigation()

  const loginUser = () => {
    let user = {
      "email": email,
      "password": password
    }

    if (isValidEmail(email) && isValidText(password)) {
      logIn(user)
        .then((res) => res.json())
        .then((data) => setAuthUser(data))
        .catch((err) => console.log(err))
    }
    else {
      Alert.alert('Error', 'Favor de revisar los datos', [
        { text: 'OK', },
      ]);
    }
  }

  useEffect(() => {
    if (authUser !== undefined) {
      if (authUser.userSessionStatus !== 'SUCCESS') {

        Alert.alert('Error', 'Favor de revisar los datos', [
          { text: 'OK', onPress: () => console.log('Datos incorrectos') },
        ]);
      }
      else {
        storeData(authUser);
        navigation.navigate('HomeApp');
      }
    }
  }, [authUser])

  const onIconPress = () => {
    let iconEye = secureTextEntry ? "eye-off" : "eye";

    setSecureTextEntry(!secureTextEntry);
    seticonEye(iconEye);
  };

  const onHandleChange = (value) => {
    setisDisabled(false);
    setEmail(value);

    if (value === "") {
      setisDisabled(true);
    }
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <View style={{ width: "100%" }}>
          <Text style={styles.textField}>Correo electronico</Text>
          <View style={styles.fields}>
            <TextInput
              style={styles.textInput}
              enum='email'
              placeholder="Ingresa tu correo"
              placeholderTextColor="#576574"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(text) => { onHandleChange(text) }}
            />
          </View>
          <Text style={styles.textField}>Contraseña</Text>
          <View style={styles.fields}>
            <TextInput
              style={styles.textInput}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#576574"
              secureTextEntry={secureTextEntry}
              onChangeText={(text) => { setPassword(text) }}
            />
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={onIconPress}
            >
              <Icon name={iconEye} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ marginTop: "20%" }}>
        {isDisabled ? (
          <TouchableOpacity
            style={styles.buttonNotCompleted}
            disabled={isDisabled}
          >
            <Text
              style={{
                color: "#cecfd3",
                textAlign: "center",
                fontFamily: "RR",
              }}
            >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={loginUser}
            style={styles.buttonCompleted}
            disabled={isDisabled}
          >
            <Text
              style={{
                color: "#FFFFFF",
                textAlign: "center",
                fontFamily: "RR",
              }}
            >
              Iniciar Sesión
            </Text>
          </TouchableOpacity>
        )
        }
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPassword")}
        >
          <Text
            style={{
              color: "#44A1FE",
              textAlign: "center",
              fontFamily: "RR",
              marginTop: 10,
            }}
          >
            Olvidé mi contraseña
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default EmailPressed;

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  textField: {
    paddingBottom: 5,
    paddingTop: 10,
    fontFamily: "RBlack",
    fontSize: 16,
  },
  textInput: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    width: "92%",
    paddingRight: 5,
    fontFamily: "RR",
  },
  fields: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderColor: "#000000",
    borderWidth: 1,
    borderRadius: 50,
    height: 50,
  },
  buttonNotCompleted: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    borderColor: "#CECFD3",
    borderWidth: 1,
    //width: '95%'
  },
  buttonCompleted: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 50,
    marginBottom: 10,
    backgroundColor: "#44A1FE",
    borderColor: "#44A1FE",
    borderWidth: 1,
    //width: '95%'
  },
});
