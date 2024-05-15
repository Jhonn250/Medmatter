import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import DisplayImages from "../../components/DisplayImages";
import styles from "./LoginStyle.js";

import Layout from '../../components/Layout.js'
import { getData } from "../../util/other/SaveObject";
import { Button } from "native-base";

const LoginScreen = () => {
  const [isLogged, setIsLogged] = useState(false);
  const navigation = useNavigation();
  let token = null;

  const fetchUser = async () => {
    token = await getData();
    if (token !== null) {
      if (token.sessionKey !== null) {
        navigation.navigate('HomeApp');
      }
    }
  }
  useEffect(() => {
    fetchUser();
  }, [])

  const data = async () => {
    const token = await getData();
    console.log(token);

  }
  return (
    <Layout>
      <Image
        style={{ width: '100%', height: '40%', borderRadius: 10, marginTop: '10%' }}
        source={require('../../assets/medmatterlogo.png')}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSignIn}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={{ color: "#FFFFFF", textAlign: "center" }}>
            Crear Cuenta
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLogIn}
          onPress={() => navigation.navigate("LoginAfter")}
        >
          <Text style={{ color: "#3D73DD", textAlign: "center" }}>
            Iniciar Sesión
          </Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

export default LoginScreen;
