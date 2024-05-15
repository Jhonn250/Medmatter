import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Layout from "../../components/Layout.js";
import GoBack from "../../components/GoBack.js";
import styles from './MedicineScreenStyle.js';
import ModalScreen from "../../components/Modals/ModalScreen.js";
import ModalScreen2 from "../../components/Modals/ModalScreen2.js";
import { HStack, Box, VStack, Divider, Button } from "native-base";
import RegisterMedicineScreen from "../RegisterMedicine/RegisterMedicineScreen.js";
import { getDrugs, editDrug, deleteDrug } from '../../util/api/drugs.js';
import { useIsFocused } from "@react-navigation/native";
import MedicineItem from "./MedicineItem.js";
import { isEmpty } from "../../util/other/validations.js";


const MedicineScreen = () => {
  const navigation = useNavigation();
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isModalOpen2, setisModalOpen2] = useState(false);
  const [drugList, setDrugList] = useState([]);

  const loadDrugs = async () => {
    getDrugs()
      .then((res) => res.json())
      .then((data) => setDrugList(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDrugs();
  }, []);

  const reload = () => {
    loadDrugs();
  }

  const changeModal = () => {
    setisModalOpen2(false);
    setisModalOpen(true);
  }
  const handleDelete = (id) => {
    Alert.alert('¿Desea eliminar?', '', [
      { text: 'Si', onPress: () => deleteConfirmation(id) },
      { text: 'No' }
    ]);
  };

  const deleteConfirmation = async (id) => {
    const res = await deleteDrug(id)
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

  const renderItem = ({ item }) => {
    return <MedicineItem drugList={item} handleDelete={handleDelete} reload={reload} />;
  };

  return (
    <Layout>
      <HStack space={"86%"} justifyContent="center">
        <GoBack />
        <TouchableOpacity onPress={() => setisModalOpen(!isModalOpen)}>
          <Icon name="plus" size={40} />
        </TouchableOpacity>
      </HStack>

      <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Nuevo medicamento'}>
        <RegisterMedicineScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      </ModalScreen>

      <HStack>
        <Icon name='pill' size={30} />
        <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Medicamentos</Text>
      </HStack>
      {
        isEmpty(drugList) ? (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado medicamentos!</Text>) :
          (<FlatList
            style={{ width: "100%" }}
            data={drugList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />)
      }
    </Layout >

  )
}

export default MedicineScreen