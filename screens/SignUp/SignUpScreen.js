import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
//import { Entypo as Icon } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import DismissKeyboard from "../../components/DismissKeyboard";
import { register } from "../../Api";

import styles from "./SignUpStyle.js";
import { isValidEmail, isValidText } from "../../util/other/validations";
import Layout from "../../components/Layout";
import { storeData } from "../../util/other/SaveObject";

const SignUpScreen = () => {

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconEye, seticonEye] = useState("eye");
  const [isEmpty, setIsEmpty] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerStatusText, setRegisterStatusText] = useState("");
  const [isDisabled, setisDisabled] = useState(true);

  const checkStatus = (data) => {
    if (data !== undefined) {
      if (data.userSessionStatus == 'SUCCESS') {
        storeData(data);
        Alert.alert('Registrado con éxito', '', [
          { text: 'OK', onPress: () => navigation.navigate('HomeApp') },
        ]);
      }
      if (data.userSessionStatus == 'USER_ALREADY_EXISTS') {
        Alert.alert('Usuario ya existente', '', [
          { text: 'OK', onPress: () => console.log('HOLA') },
        ]);
      }
    }

  }

  const registerUser = () => {
    let user = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName
    }
    if (isValidText(firstName) && isValidEmail(email) && isValidText(password)) {
      register(user)
        .then((res) => res.json())
        //.then((data) => console.log(data))
        .then((data) => checkStatus(data))
        .catch(err => console.log(err));
    } else {
      setRegisterStatusText("Check all fields have correct data");
    }
  }

  const onIconPress = () => {
    let iconEye = secureTextEntry ? "eye-off" : "eye";

    setSecureTextEntry(!secureTextEntry);
    seticonEye(iconEye);
  };

  const onHandleChange = (value) => {
    setisDisabled(false);
    setPassword(value);

    if (value === "") {
      setisDisabled(true);
    }
  };



  const navigation = useNavigation();
  return (
    <Layout>
      <KeyboardAvoidingView>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "10%",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
        <ScrollView>
          <Text
            style={{ fontSize: 40, fontFamily: "RBlack", marginTop: 15 }}
          >
            Crea tu cuenta
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "REL",
              marginTop: 15,
              textAlign: "justify",
            }}
          >
            Puedes crear una cuenta usando un correo y contraseña, o con tu
            cuenta de Facebook.
          </Text>

          <View style={styles.buttonContainer}>
            <View style={{ width: "95%" }}>
              <Text style={styles.textField}>Nombre</Text>
              <View style={styles.fields}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Johny"
                  placeholderTextColor="#576574"
                  onChangeText={(text) => setFirstName(text)}
                />
                {isEmpty ? (
                  <TouchableOpacity style={{ justifyContent: "center" }}>
                    {/* <Icon name={iconCross} size={20} /> */}
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.textField}>Apellido</Text>
              <View style={styles.fields}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Ive"
                  placeholderTextColor="#576574"
                  onChangeText={(text) => setLastName(text)}
                />
                {isEmpty ? (
                  <TouchableOpacity style={{ justifyContent: "center" }}>
                    {/* <Icon name={iconCross} size={20} /> */}
                  </TouchableOpacity>
                ) : (
                  <Text></Text>
                )}
              </View>
              <Text style={styles.textField}>Correo</Text>
              <View style={styles.fields}>
                <TextInput
                  style={styles.textInput}
                  placeholder="medmatter@email.com"
                  placeholderTextColor="#576574"
                  autoCapitalize="none"
                  autoCorrect={false}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <Text style={styles.textField}>Contraseña</Text>
              <View style={styles.fields}>
                <TextInput
                  style={styles.textInput}
                  placeholder="*************"
                  placeholderTextColor="#576574"
                  secureTextEntry={secureTextEntry}
                  onChangeText={(text) => onHandleChange(text)}
                />
                <TouchableOpacity
                  style={{ justifyContent: "center" }}
                  onPress={onIconPress}
                >
                  <Icon name={iconEye} size={20} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 12, paddingTop: 10, fontFamily: "RT" }}> La contraseña debe ser de por lo menos 8 caracteres.</Text>
              <Text style={{ fontSize: 12, paddingTop: 10, fontFamily: "RT" }}>{registerStatusText}</Text>
            </View>
          </View>
          <View style={{ marginTop: "15%" }}>

            {isDisabled ?
              (<><TouchableOpacity style={styles.buttonNotCompleted} onPress={registerUser} disabled={true}>
                <View style={{ width: "28%", paddingLeft: 26 }}><Icon color={"#cecfd3"} name="email" size={38}/></View>
                <Text style={{ color: "#cecfd3", textAlign: "center", fontFamily: "RR", paddingLeft: "12%" }}>Registrarme</Text>
              </TouchableOpacity></>)
              :
              (<><TouchableOpacity style={styles.buttonCompleted} onPress={registerUser}>
                <View style={{ width: "28%", paddingLeft: 26 }}><Icon name="email" size={38} /></View>
                <Text style={{ color: "#FFFFFF", textAlign: "center", fontFamily: "RR", paddingLeft: "12%" }}>Registrarme</Text>
              </TouchableOpacity></>)}

            <TouchableOpacity onPress={() => navigation.navigate("LoginAfter")}>
              <Text style={{ color: "#44A1FE", textAlign: "center", fontFamily: "RR", marginTop: 10, marginBottom: 100}}>Ya tienes cuenta? Inicia Sesión</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default SignUpScreen;
