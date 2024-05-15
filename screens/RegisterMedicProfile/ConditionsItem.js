import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HStack, Box, VStack, Divider, Center } from "native-base";

import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from './RegisterMedicProfileScreen.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import info from '../../util/info/info.js';
import { getFixedDate } from '../../util/other/GetFormattedDate.js';

const ConditionsItem = ({ list, handleDelete, loadAllergies, reload }) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const confirmEdit = () => {
    Alert.alert('¿Desea editar?', '', [
      { text: 'Si', onPress: () => setisModalOpen(!isModalOpen) },
      { text: 'No' }
    ]);
  }
  return (
    <View>
      <HStack space={'0%'}>
        <>
          <TouchableOpacity style={{ width: '93%' }} onPress={() => confirmEdit()}>
            <VStack marginTop={'2%'}>
              <Box marginBottom={2}>
                <Text style={{ fontFamily: 'RBold' }}>Condición Médica:</Text>
                <Text>{list.name}</Text>
              </Box>

              <Box marginBottom={2} width={'100%'} >
                <Text style={{ fontFamily: 'RBold' }}>Descripción:</Text>
                <Text>{list.description}</Text>
              </Box>

              <HStack space={2}>
                <Box marginBottom={2} width={'49%'} >
                  <Text style={{ fontFamily: 'RBold' }}>Complicaciones Mayores:</Text>
                  {list.majorComplications === null ? (<Text styles={{ fontFamily: 'RT', paddingLeft: '0%', fontSize: 14 }}>{info.defaultText}</Text>) : (<Text>{list.majorComplications}</Text>)}
                </Box>

                <Box marginBottom={2} width={'49%'} >
                  <Text style={{ fontFamily: 'RBold' }}>Complicaciones Menores:</Text>
                  {list.minorComplications === null ? (<Text styles={{ fontFamily: 'RT', paddingLeft: '0%', fontSize: 14 }}>{info.defaultText}</Text>) : (<Text>{list.minorComplications}</Text>)}
                </Box>
              </HStack>
              <HStack space={'23%'}>

                <Box marginBottom={2}>
                  <Text style={{ fontFamily: 'RBold' }}>Fecha de Inicio:</Text>
                  <Text>{getFixedDate(list.startDate)}</Text>
                </Box>
                {
                  !list.endDate ? (<Box marginBottom={2}>
                    <></>
                  </Box>) : (<Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Fecha de Fin:</Text>
                    <Text>{getFixedDate(list.endDate)}</Text>
                  </Box>)
                }

              </HStack>


            </VStack>
            <Divider w="100%" />
          </TouchableOpacity>

          <TouchableOpacity style={{ height: '20%' }} onPress={() => handleDelete(list.id, 4)}>
            <Icon name="delete" size={30} />
          </TouchableOpacity>
        </>
      </HStack>
      <Divider w="100%" />
      <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Perfil Médico'}>
        <RegisterMedicProfileScreen list={list} index={4} editing={true} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
      </ModalScreen>
    </View>
  )
}

export default ConditionsItem