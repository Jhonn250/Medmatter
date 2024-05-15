import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";


import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import styles from "./ResetPasswordStyle.js";
import Layout from '../../components/Layout'
import GoBack from '../../components/GoBack'

const ResetPassword = () => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [iconCross, setIconCross] = useState("delete");
  const [email, setMail] = useState("");
  const [isDisabled, setisDisabled] = useState(true);

  /////////////////////////////////////////////////////////////

  const navigation = useNavigation();

  const onHandleChange = (value) => {
    setisDisabled(false);
    setMail(value);

    if (value === "") {
      setisDisabled(true);
    }
  };

  return (
    <Layout>
      {
        <TouchableOpacity
          style={{
            justifyContent: "center",
            width: "10%",
          }}
          onPress={() => navigation.navigate("LoginAfter")}
        >
          <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
      }
      <ScrollView>
        {/* MAIN */}
        <Text
          style={{ fontSize: 30, fontFamily: "RBlack", marginTop: 15 }}
        >
          Restablecer contraseña
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: "REL",
            marginTop: 15,
            textAlign: "justify",
          }}
        >
          Por favor ingrese su correo para recibir instrucciones de como
          restablecer su contraseña.{" "}
        </Text>

        <View style={styles.buttonContainer}>
          <View style={{ width: "95%" }}>
            <Text style={styles.textField}>Correo</Text>
            <View style={styles.fields}>
              <TextInput
                style={styles.textInput}
                placeholder="Ingresa tu correo"
                placeholderTextColor="#576574"
                onChangeText={(text) => onHandleChange(text)}
              //value={email}
              />
              {!isEmpty ? (
                <TouchableOpacity style={{ justifyContent: "center" }}>
                  <Icon name={iconCross} size={20} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={{ justifyContent: "center" }}>
                  {/* <Icon name={iconCross} size={20} /> */}
                </TouchableOpacity>
              )}
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
            <TouchableOpacity
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
          )}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default ResetPassword;
