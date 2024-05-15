import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { openBrowserAsync, OpenBrowserAsync } from "expo-web-browser";

import { useNavigation } from "@react-navigation/native";
import EmailPressed from "../../components/EmailPressed";
import styles from "./LoginAfterStyle.js";
import Layout from '../../components/Layout'
import { HStack, VStack } from "native-base";

const SignUpScreen = () => {

  const [isLoginButtonPressed, setisLoginButtonPressed] = useState(false);

  const LoginButtonPressed = () => {
    setisLoginButtonPressed(false);
  };

  const navigation = useNavigation();

  return (
    <Layout>
      {isLoginButtonPressed ? (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "10%",
          }}
          onPress={() => LoginButtonPressed()}
        >
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "10%",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      )}
      <ScrollView>
        {/* MAIN */}
        <Text
          style={{ fontSize: 40, fontFamily: "RBlack", marginTop: 15 }}
        >
          Bienvenido de nuevo
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "REL",
            marginTop: 15,
            textAlign: "justify",
          }}
        >
          Por favor inicie sesión con la opción con la que se inscribió
          originalmente.{" "}
        </Text>

        <View style={{ marginTop: "15%" }}>
          {!isLoginButtonPressed ? (
            <>
              <VStack space={4}>
                <TouchableOpacity style={styles.buttonCompleted} onPress={() => setisLoginButtonPressed(true)}>
                  <View style={{ width: "28%", paddingLeft: 26 }}><Icon color={'white'} name="email" size={38} /></View>
                  <Text style={{ color: "#FFFFFF", textAlign: "center", fontFamily: "RR" }}>Iniciar Sesión con Correo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonGoogle} onPress={() => openBrowserAsync("https://google.com")}>
                  <View style={{ width: "28%", paddingLeft: 26 }}><Icon color={'white'} name="google" size={38} /></View>
                  <Text style={{ color: "#FFFFFF", textAlign: "center", fontFamily: "RR" }}>Iniciar Sesión con Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonPlatform} onPress={() => openBrowserAsync("https://facebook.com")} >
                  <View style={{ width: "28%", paddingLeft: 25 }}><Icon color={'white'} name="facebook" size={40} /></View>
                  <Text style={{ color: "#FFFFFF", textAlign: "center", fontFamily: "RR", }}>Iniciar Sesión con Facebook</Text>
                </TouchableOpacity>
              </VStack>


              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={{
                    color: "#44A1FE",
                    textAlign: "center",
                    fontFamily: "RR",
                    marginTop: 10,
                  }}
                >
                  Crear una nueva cuenta
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View>
              <EmailPressed />
            </View>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default SignUpScreen;
