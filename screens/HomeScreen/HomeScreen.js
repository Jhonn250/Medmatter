import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import styles from "./HomeScreenStyle.js";
import SectionOption from "../../components/SectionOption";
import { Avatar, Box, Center, VStack } from "native-base";
import Layout from "../../components/Layout.js";
import UserContext from "../../components/contexts/UserContext.js";


const HomeScreen = () => {
  const navigation = useNavigation();
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      <View style={styles.welcome}>
        <TouchableOpacity>
          <Avatar
            bg="white"
            size={"lg"}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/666/666201.png",
            }}
          />
        </TouchableOpacity>

        <Box style={{width: '75%'}}>
          <VStack>
            <Text
              style={{
                fontFamily: "RBlack",
                fontSize: 28,
                width: "60%",
                marginLeft:'5%'
                //paddingLeft: 10,
              }}
            >
              Bienvenido,
            </Text>
            <Text style={{
                fontFamily: "RBlack",
                fontSize: 28,
                width: "60%",
                marginLeft:'5%'
              }}>{users.firstName}!</Text>
          </VStack>
        </Box>

        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginTop: "4%", alignItems: 'flex-end' }}>
          <Center>
          <Icon name="cog-outline" size={35} />
          </Center>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 15 }}>
        <SectionOption
          backgroundColor="light.100"
          text="Perfil Médico"
          icon="heart"
          nextScreen={"MedicProfileScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Medicamentos"
          icon="pill"
          nextScreen={"MedicineScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Tracking"
          icon="chart-line-variant"
          nextScreen={"TrackingScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Vacunas y Protecciones"
          icon="needle"
          nextScreen={"VaccineScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Citas Médicas"
          icon="clock-time-four"
          nextScreen={"AppointmentScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Detección de Medicamentos IA"
          icon="robot"
          nextScreen={"IAScreen"}
        />
        <SectionOption
          backgroundColor="light.100"
          text="Exportar Información"
          icon="download"
          nextScreen={"ExportDataScreen"}
        />
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
