import { View, Text, TouchableOpacity, ScrollView, VirtualizedList, FlatList, Alert, LogBox } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/Layout.js";
import GoBack from "../../components/GoBack.js";
import styles from "./MedicProfileStyle.js";
import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from "../RegisterMedicProfile/RegisterMedicProfileScreen.js";
import { HStack, Box, VStack, Divider, Center, Button } from "native-base";
import UserContext from "../../components/contexts/UserContext.js";
import { useIsFocused } from "@react-navigation/native";

import { deleteAllergies, deleteConditions, deleteLimitations, deleteSurgeries, getAllergies, getConditions, getLimitations, getMedicalProfile, getSurgeries } from "../../util/api/medical.js";
import AllergiesItem from "../RegisterMedicProfile/AllergiesItem.js";
import DiseasesItem from "../RegisterMedicProfile/DiseasesItem.js";
import SurgeriesItem from "../RegisterMedicProfile/SurgeriesItem.js";
import ConditionsItem from "../RegisterMedicProfile/ConditionsItem.js";
import BasicInfoItem from "../RegisterMedicProfile/BasicInfoItem.js";
import { isEmpty } from "../../util/other/validations.js";


const MedicProfileScreen = () => {
  LogBox.ignoreAllLogs()
  //LogBox.ignoreLogs(['VirtualizedLists: ...']);
  const navigation = useNavigation();
  const [basicInfoRegistered, setBasicInfoRegistered] = useState(false);
  const [basicInfoToggle, setbasicInfoToggle] = useState(false);
  const [allergyToggle, setallergyToggle] = useState(false);
  const [diseaseToggle, setdiseaseToggle] = useState(false);
  const [surgeryToggle, setsurgeryToggle] = useState(false);
  const [conditionsToggle, setconditionsToggle] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);

  const [medicalList, setMedicalList] = useState(new Object([]));
  const [conditionsList, setConditionsList] = useState(new Object([]));
  const [allergyList, setAllergyList] = useState(new Object([]));
  const [surgeriesList, setSurgeriesList] = useState(new Object([]));
  const [diseaseList, setDiseaseList] = useState(new Object([]));
  const isFocused = useIsFocused();

  const { users, getUsers } = useContext(UserContext);

  /////////////DELETEEEEE

  const handleDelete = (id, type) => {
    Alert.alert('¿Desea eliminar?', '', [
      { text: 'Si', onPress: () => deleteConfirmation(id, type) },
      { text: 'No' }
    ]);
  };

  const deleteConfirmation = async (id, type) => {
    let res;
    if (type === 1) {
      res = await deleteAllergies(id)
    }
    if (type === 2) {
      res = await deleteLimitations(id)
    }
    if (type === 3) {
      res = await deleteSurgeries(id)
    }
    if (type === 4) {
      res = await deleteConditions(id)
    }

    if (res === true) {
      Alert.alert('Eliminado con éxito', '', [
        { text: 'Ok' }
      ]);
      reload();
    }
    if (res === false || res === null) {
      Alert.alert('No se pudo eliminar', '', [
        { text: 'Ok' }
      ]);
    }
  }
  ////////////////////////////
  const loadAll = async () => {
    getMedicalProfile()
      .then((res) => res.json())
      .then((data) => setMedicalList(data))
      .catch((err) => console.log(err));

    getConditions()
      .then((res) => res.json())
      .then((data) => setConditionsList(data))
      .catch((err) => console.log(err));

    getAllergies()
      .then((res) => res.json())
      .then((data) => setAllergyList(data))
      .catch((err) => console.log(err));

    getLimitations()
      .then((res) => res.json())
      .then((data) => setDiseaseList(data))
      .catch((err) => console.log(err));

    getSurgeries()
      .then((res) => res.json())
      .then((data) => setSurgeriesList(data))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    loadAll();
  }, [])

  const reload = () => {
    loadAll();
  }
  const checkifempty = () => {
    if(medicalList.hasHypertension !== null){
      setBasicInfoRegistered(true)
    }
    else{
      setBasicInfoRegistered(false)
    }
    setisModalOpen(!isModalOpen);
  }

  const RenderObjects = ({ object, render }) => {
    if (isEmpty(object )) {
      return (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado datos!</Text>)
    }
    else {
      return (
        <>
          <FlatList
            scrollEnabled={false}
            style={{ width: "100%" }}
            data={object}
            keyExtractor={(item) => item.id}
            renderItem={render}
          />
        </>
      )
    }
  }

  const RenderProfile = ( {object} ) => {
    if (isEmpty( object )) {
      return (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado datos!</Text>)
    }
    else {
      return (
        <BasicInfoItem list={object} />
      )
    }
  }

  const renderAllergiesItem = ({ item }) => {
    return (
      <AllergiesItem list={item} handleDelete={handleDelete} reload={reload} />
    )
  }
  const renderDiseasesItem = ({ item }) => {
    return (
      <DiseasesItem list={item} handleDelete={handleDelete} reload={reload} />
    )
  };
  const renderSurgeriesItem = ({ item }) => {
    return (
      <SurgeriesItem list={item} handleDelete={handleDelete} reload={reload} />
    )
  };

  const renderConditionsItem = ({ item }) => {
    return (
      <ConditionsItem list={item} handleDelete={handleDelete} reload={reload} />
    )
  }

  return (
    <Layout>
      <HStack space={"86%"} justifyContent="center">
        <GoBack />
        <TouchableOpacity onPress={() => checkifempty()}>
          <Icon name="plus" size={40} />
        </TouchableOpacity>
      </HStack>

      <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Perfil Médico'}>
        <RegisterMedicProfileScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} basicInfoRegistered={basicInfoRegistered} />
      </ModalScreen>

      <HStack>
        <Icon name='heart' size={30} />
        <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Perfil Médico</Text>
      </HStack>

      <ScrollView>
        <View style={{ marginTop: "5%" }}>
          <VStack marginTop={"0%"} space={1.5}>
            <Divider w="100%" />

            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <TouchableOpacity onPress={() => setbasicInfoToggle(!basicInfoToggle)}>
              <HStack marginBottom={0} alignItems={"center"}>
                <Icon name="account-heart" size={40} />
                <Text style={styles.text}>Información Básica</Text>
              </HStack>
            </TouchableOpacity>
            <Divider w="100%" />
            {basicInfoToggle ?
              <>
                <Text style={{ textAlign: 'center', fontFamily: 'RBlack', fontSize: 15, marginBottom: '2%', marginTop: '2%' }}>{users.firstName} {users.lastName}</Text>
                <RenderProfile object={medicalList} />
                <Divider w="100%" />
              </> : <></>}
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <TouchableOpacity onPress={() => setallergyToggle(!allergyToggle)}>
              <HStack marginBottom={0} alignItems={"center"}>
                <Icon name="allergy" size={40} />
                <Text style={styles.text}>Alergias</Text>
              </HStack>
            </TouchableOpacity>
            <Divider w="100%" />
            {
              allergyToggle ? (
                <>
                  <RenderObjects object={allergyList} render={renderAllergiesItem} />
                  <Divider w="100%" />
                </>
              ) : <></>}
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <TouchableOpacity onPress={() => setdiseaseToggle(!diseaseToggle)}>
              <HStack marginBottom={0} alignItems={"center"}>
                <Icon name="account-injury" size={40} />
                <Text style={styles.text}>Discapacidades</Text>
              </HStack>
            </TouchableOpacity>
            <Divider w="100%" />
            {
              diseaseToggle ? (
                <>
                  <RenderObjects object={diseaseList} render={renderDiseasesItem} />
                  <Divider w="100%" />
                </>
              ) :
                <>
                </>
            }
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <TouchableOpacity onPress={() => setsurgeryToggle(!surgeryToggle)}>
              <HStack marginBottom={0} alignItems={"center"}>
                <Icon name="box-cutter" size={40} />
                <Text style={styles.text}>Cirugías</Text>
              </HStack>
            </TouchableOpacity>
            <Divider w="100%" />
            {
              surgeryToggle ? (
                <>
                  <RenderObjects object={surgeriesList} render={renderSurgeriesItem} />
                  <Divider w="100%" />
                </>
              ) :
                <>
                </>
            }
            {/* ////////////////////////////////////////////////////////////////////////////////////////// */}
            <TouchableOpacity onPress={() => setconditionsToggle(!conditionsToggle)}>
              <HStack marginBottom={0} alignItems={"center"}>
                <Icon name="clipboard-pulse-outline" size={40} />
                <Text style={styles.text}>Condiciones Médicas</Text>
              </HStack>
            </TouchableOpacity>
            <Divider w="100%" />
            {
              conditionsToggle ? (
                <>
                  <RenderObjects object={conditionsList} render={renderConditionsItem} />
                  <Divider w="100%" />
                </>
              ) :
                <>
                </>
            }
          </VStack>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default MedicProfileScreen;
