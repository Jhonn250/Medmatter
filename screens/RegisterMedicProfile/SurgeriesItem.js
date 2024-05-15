import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HStack, Box, VStack, Divider, Center } from "native-base";

import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from './RegisterMedicProfileScreen.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import info from '../../util/info/info.js';
import { getFixedDate } from '../../util/other/GetFormattedDate.js';

const SurgeriesItem = ({ list, handleDelete, reload }) => {
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
                            <HStack space={1}>
                                <Box width={'50%'}  marginBottom={.5}>
                                    <Text style={{ fontFamily: 'RBold' }}>Cirugía:</Text>
                                    <Text>{list.name}</Text>
                                </Box>
                                <Box width={'50%'}  marginBottom={.5}>
                                    <Text style={{ fontFamily: 'RBold' }}>Doctor:</Text>
                                    {list.doctor === null? (<Text styles={{ fontFamily: 'RT', paddingLeft: '0%', fontSize: 14 }}>{info.defaultText}</Text>):(<Text>{list.doctor}</Text>)}
                                </Box>
                            </HStack>
                            <HStack space={2}>
                                <Box width={'49%'} marginBottom={0.5}>
                                    <Text style={{ fontFamily: 'RBold' }}>Lugar:</Text>
                                    <Text>{list.place}</Text>
                                </Box>
                                <Box width={'50%'} marginBottom={.5}>
                                    <Text style={{ fontFamily: 'RBold' }}>Fecha:</Text>
                                    <Text>{getFixedDate(list.date)}</Text>
                                </Box>
                            </HStack>
                        </VStack>
                        <Divider w="100%" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDelete(list.id, 3)}>
                        <Icon name="delete" size={30} />
                    </TouchableOpacity>
                </>
            </HStack>
            <Divider w="100%" />
            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Perfil Médico'}>
                <RegisterMedicProfileScreen list={list} index={3} editing={true} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
            </ModalScreen>
        </View>
    )
}

export default SurgeriesItem