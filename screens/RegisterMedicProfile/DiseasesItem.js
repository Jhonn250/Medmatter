import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HStack, Box, VStack, Divider, Center } from "native-base";

import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from './RegisterMedicProfileScreen.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import * as ConvertToType from '../../components/ConvertToType.js'

const DiseasesItem = ({ list, handleDelete, reload }) => {
    const [isModalOpen, setisModalOpen] = useState(false);

    const deleteConfirmation = (id, type) => {
        handleDelete(id, type);
    }

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
                                <Text style={{ fontFamily: 'RBold' }}>Tipo de discapacidad:</Text>
                                <Box marginTop={1}>
                                    <ConvertToType.GetLimitation value={list} />
                                </Box>
                            </Box>
                        </VStack>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteConfirmation(list.id, 2)}>
                        <Icon name="delete" size={30} />
                    </TouchableOpacity>
                </>
            </HStack>
            <Divider w="100%" />
            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Perfil Médico'}>
                <RegisterMedicProfileScreen list={list} index={2} editing={true} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
            </ModalScreen>
        </View>
    )
}

export default DiseasesItem