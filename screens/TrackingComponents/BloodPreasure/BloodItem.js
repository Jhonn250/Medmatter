import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { HStack, Box, VStack, Divider } from "native-base";
import ModalScreen3 from '../../../components/Modals/ModalScreen3.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import info from '../../../util/info/info.js';
import WeightRegister from '../Weights/WeightRegister.js';
import { getFixedDate } from '../../../util/other/GetFormattedDate.js';
import BloodRegister from './BloodRegister.js';

const BloodItem = ({ list, handleDelete, reload }) => {
    const [isModalOpen, setisModalOpen] = useState(false);

    const confirmEdit = () => {
        Alert.alert('¿Desea editar?', '', [
            { text: 'Si', onPress: () => setisModalOpen(!isModalOpen) },
            { text: 'No' }
        ]);
    }
    return (
        <>
            <View style={styles.itemContainer}>
                <Box width={"85%"}>
                    <TouchableOpacity onPress={() => confirmEdit()}>
                        <HStack>
                            <Text style={styles.itemBold}>Presión Sistolica: </Text>
                            <Text style={styles.itemTitle}>{list.value}</Text>
                        </HStack>

                        <HStack>
                            <Text style={styles.itemBold}>Fecha: </Text>
                            <Text style={styles.itemTitle}>{getFixedDate(list.dateTime)}</Text>
                        </HStack>
                    </TouchableOpacity>
                </Box>

                <TouchableOpacity
                    style={{ backgroundColor: "#212121", padding: 7, borderRadius: 5 }}
                    onPress={() => handleDelete(list.id)}
                >
                    <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                </TouchableOpacity>
            </View>
            <View><Divider w="100%" /></View>

            <ModalScreen3 isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Presión Sistolica'}>
                <BloodRegister isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload} editing={true} list={list} />
            </ModalScreen3>
        </>

    )
}

export default BloodItem

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#FFFFFF",
        padding: 15,
        paddingBottom: 0,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemTitle: {
        color: "#000000",
        fontFamily: 'RR',
    },
    itemBold: {
        fontFamily: "RBold",
        color: "#000000",
    }
});
