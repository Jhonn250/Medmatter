import { View, Text, TouchableOpacity, FlatList, KeyboardAvoidingView, StyleSheet, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { HStack, Box, VStack, Divider, Center } from "native-base";

import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from './RegisterMedicProfileScreen.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import info from '../../util/info/info.js';

const AllergiesItem = ({ list, handleDelete, reload }) => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const closeModal = async () => {
        setisModalOpen(!isModalOpen)
    }
    const deleteConfirmation = (id, type) => {
        handleDelete(id, type);
    }

    const confirmEdit = () => {
        Alert.alert('¿Desea editar?', '', [
            { text: 'Si', onPress: () => closeModal() },
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
                                <Text style={{ fontFamily: 'RBold' }}>Nombre de la alergia:</Text>
                                <Text>{list.name}</Text>
                            </Box>
                            <Box marginBottom={2}>
                                <Text style={{ fontFamily: 'RBold' }}>Sintomas:</Text>
                                {list.symptoms === null ? (<Text style={{fontFamily: 'RT',paddingLeft: '0%',fontSize: 14}}>{info.defaultText}</Text>) : (<Text>{list.symptoms}</Text>)}

                            </Box>
                        </VStack>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => deleteConfirmation(list.id, 1)}>
                        <Icon name="delete" size={30} />
                    </TouchableOpacity>
                </>

            </HStack>
            <Divider w="100%" />
            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Perfil Médico'}>
                <RegisterMedicProfileScreen list={list} index={1} editing={true} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} />
            </ModalScreen>
        </View>
    )
}

export default AllergiesItem
