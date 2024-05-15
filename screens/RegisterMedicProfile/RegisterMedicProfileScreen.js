import { View, Text, ScrollView, KeyboardAvoidingView, Alert } from "react-native";
import { useState } from "react";
import React from "react";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from "@react-navigation/native";
import { useRoute } from '@react-navigation/native'

import {
  Radio,
  Switch,
  Input,
  VStack,
  Box,
  Button,
  HStack,
  TextField,
  Divider
} from "native-base";

import RNPickerSelect from 'react-native-picker-select';
import styles from './RegisterMedicProfileStyle.js';
import info from '../../util/info/info.js';
import BasicInfo from "./BasicInfo.js";
import Allergies from "./Allergies.js";
import Diseases from "./Diseases.js";
import Surgeries from "./Surgeries.js";
import Conditions from "./Conditions.js";

const RegisterMedicProfileScreen = ({ list, index, editing, isModalOpen, setisModalOpen, reload, basicInfoRegistered }) => {
  const navigation = useNavigation();

  const [selecion, setSelecion] = useState(null)

  const Option = ({ value }) => {
    if (value === 0) {
      return (
        <BasicInfo list={list} editing={editing} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      )
    }
    if (value === 1) {
      return (
        <Allergies list={list} editing={editing} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      )
    }
    if (value === 2) {
      return (
        <Diseases list={list} editing={editing} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      )
    }
    if (value === 3) {
      return (
        <Surgeries list={list} editing={editing} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      )
    }
    if (value === 4) {
      return (
        <Conditions list={list} editing={editing} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      )
    }
  }
  return (
    <>
      {
        index != null || basicInfoRegistered ? (
          <>
            {
              basicInfoRegistered ? (
                <>
                  <Text style={styles.allTexts1}>Agregar nuevo:</Text>
                  <RNPickerSelect
                    placeholder={info.placeholder}
                    Icon={() => {
                      return <Icon name="chevron-down" size={30} />;
                    }}
                    style={{
                      ...styles,
                    }}
                    onValueChange={(value) => { setSelecion(value) }}
                    items={info.type2}
                    value={index}
                  />
                  <Divider style={{ marginTop: '3%', backgroundColor: 'black' }} w="100%" h={'0.2%'} />
                  <Option value={selecion} />
                </>
              ) : (
                <>
                  <Text style={styles.allTexts1}>Editar:</Text>
                  <RNPickerSelect
                    placeholder={info.placeholder}
                    Icon={() => {
                      return <Icon name="chevron-down" size={30} />;
                    }}
                    style={{
                      ...styles,
                    }}
                    onValueChange={(value) => { setSelecion(value) }}
                    items={info.type}
                    value={index}
                    disabled={true}
                  />
                  <Divider style={{ marginTop: '3%', backgroundColor: 'black' }} w="100%" h={'0.2%'} />
                  <Option value={index} />
                </>
              )
            }
          </>

        ) : (
          <>
            <Text style={styles.allTexts1}>Agregar nuevo:</Text>
            <RNPickerSelect
              placeholder={info.placeholder}
              Icon={() => {
                return <Icon name="chevron-down" size={30} />;
              }}
              style={{
                ...styles,
              }}
              onValueChange={(value) => { setSelecion(value) }}
              items={info.type}
            />
            <Divider style={{ marginTop: '3%', backgroundColor: 'black' }} w="100%" h={'0.2%'} />
            <Option value={selecion} />
          </>

        )
      }

    </>
  )
};

export default RegisterMedicProfileScreen;