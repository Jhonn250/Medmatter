
import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import DismissKeyboard from '../../components/DismissKeyboard.js';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

import Layout from '../../components/Layout.js'
import GoBack from '../../components/GoBack.js';
import ModalScreen from '../../components/Modals/ModalScreen4.js';
import VaccineItem from './VaccineItem.js';

import { deleteVaccine, getVaccines, postVaccine } from '../../util/api/vaccine.js';
import { HStack, Input, Box, Center, Button, TextArea } from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { isEmpty } from '../../util/other/validations.js';
import { getFixedDate } from '../../util/other/GetFormattedDate.js';
import VaccineRegister from './VaccineRegister.js';

const VaccineScreen = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [vaccineList, setVaccineList] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateText, setDateText] = useState('Seleccionar');
  const [date, setDate] = useState(new Date());
  const [vaccine, setVaccine] = useState({
    name: undefined,
    vaccinationDates: [],
    secondaryEffects: undefined,
  })


  const handleDelete = (id) => {
    Alert.alert('¿Desea eliminar?', '', [
      { text: 'Si', onPress: () => deleteConfirmation(id) },
      { text: 'No' }
    ]);
  };

  const deleteConfirmation = async (id) => {
    const res = await deleteVaccine(id)

    if (res === true) {
      Alert.alert('Eliminado con éxito', '', [
        { text: 'Ok' }
      ]);
      await loadVaccines();
    }
    if (res === false || res === null) {
      Alert.alert('No se pudo eliminar', '', [
        { text: 'Ok' }
      ]);
    }
  }

  const loadVaccines = async () => {
    getVaccines()
      .then((res) => res.json())
      .then((data) => setVaccineList(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadVaccines();
  }, []);

  const reload = () => {
    loadVaccines();
  }
  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };
  const handleConfirm = (data) => {
    setDate(data);
    setDateText(getFixedDate(data.toLocaleDateString()))
    handleChange2(data.toLocaleDateString());
    showDatePicker();
  };


  const renderItem = ({ item }) => {
    return <VaccineItem vaccineList={item} handleDelete={handleDelete} reload={reload} />;
  };
  return (
    <Layout>
      <HStack space={"86%"} justifyContent="center">
        <GoBack />
        <TouchableOpacity onPress={() => setisModalOpen(!isModalOpen)}>
          <Icon name="plus" size={40} />
        </TouchableOpacity>
      </HStack>
      <HStack>
        <Icon name='needle' size={30} />
        <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Vacunas y Protecciones</Text>
      </HStack>
      {
        isEmpty(vaccineList) ? (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado vacunas o protecciones!</Text>) :
          (<FlatList
            style={{ width: "100%" }}
            data={vaccineList}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />)
      }

      <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Nueva vacuna o protección'}>
        <VaccineRegister isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload}/>
      </ModalScreen>
    </Layout>
  )
}

export default VaccineScreen

const styles = StyleSheet.create({
  modalText: {
    fontFamily: "RBold",
    color: '#000000',
    marginTop: '1%'
  },
  main: {
    paddingLeft: '10%',
    paddingRight: "10%",
  }
});