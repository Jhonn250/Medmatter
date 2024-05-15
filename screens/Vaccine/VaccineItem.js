import { View, Text, StyleSheet, TouchableOpacity, FlatList, KeyboardAvoidingView, Alert } from "react-native";
import React, { useState } from "react";
import DismissKeyboard from "../../components/DismissKeyboard";
import { useNavigation } from "@react-navigation/native";
import { HStack, Divider, Input, Box, Center, Button, TextArea, VStack } from 'native-base';
import ModalScreen from "../../components/Modals/ModalScreen4";
import { editVaccine } from "../../util/api/vaccine";
import { getFixedDate } from "../../util/other/GetFormattedDate";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import VaccineRegister from "./VaccineRegister.js";
import info from "../../util/info/info";

const VaccineItem = ({ vaccineList, handleDelete, reload }) => {
    const navigation = useNavigation();
    const [isModalOpen, setisModalOpen] = useState(false);

    ///time

    const [vaccine, setVaccine] = useState({
        id: vaccineList.id,
        name: vaccineList.name,
        vaccinationDates: [],
        secondaryEffects: vaccineList.secondaryEffects,
    })

    const renderItem = ({ item }) => {
        return (
            <>
                <HStack>
                    <Text style={{ fontFamily: 'REL' }}>{item}</Text>
                </HStack>
            </>
        )
    }
    const confirmEdit = () => {
        Alert.alert('¿Desea editar?', '', [
            { text: 'Si', onPress: () => setisModalOpen(!isModalOpen) },
            { text: 'No' }
        ]);
    }

    return (
        <>
            <View style={styles.itemContainer}>
                <TouchableOpacity style={{ width: '80%' }} onPress={() => confirmEdit()}>
                    <HStack>
                        <Text style={styles.itemTitle0}>{vaccineList.name} </Text>
                    </HStack>
                    <HStack>
                        <Text style={styles.itemBold}>Ultima aplicación: </Text>
                        <Text style={styles.itemTitle}>{getFixedDate(vaccineList.vaccinationDates[vaccineList.vaccinationDates.length - 1])}</Text>
                    </HStack>
                    <VStack paddingRight={'2%'}>
                        <Text style={styles.itemBold}>Efectos Secundarios: </Text>
                        {!vaccineList.secondaryEffects ? ( <Text style={styles.moreOptionsDefault}>{info.defaultText}</Text>): ( <Text style={styles.itemTitle}>{vaccineList.secondaryEffects}</Text>)}
                    </VStack>
                    {
                        vaccineList.vaccinationDates.length > 1 &&
                        <>
                            <Text style={{ fontFamily: 'RBold', marginTop: '3%' }}>Más aplicaciones</Text>
                            <FlatList
                                style={{ width: "100%" }}
                                data={vaccineList.vaccinationDates.slice(0, (vaccineList.vaccinationDates.length - 1))}
                                renderItem={renderItem}
                            />
                        </>
                    }
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ backgroundColor: "#212121", padding: 7, borderRadius: 5 }}
                    onPress={() => handleDelete(vaccineList.id)}
                >
                    <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                </TouchableOpacity>
            </View >
            <View><Divider w="100%" /></View>

            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Vacunas y Protecciones'}>
                <VaccineRegister list={vaccineList} editing={true} reload={reload} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen}/>
            </ModalScreen>
        </>
    );
};
export default VaccineItem;

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "#ffffff",
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
        fontFamily: 'REL',
    },
    itemBold: {
        fontFamily: "RR",
        color: "#000000",
    },
    itemTitle0: {
        fontFamily: "RBlack",
        color: "#000000",
        paddingBottom: '2%'
    },
    modalText: {
        fontFamily: "RBold",
        //paddingLeft: '5%',
        color: '#000000',
        marginTop: '1%'
    },
    main: {
        paddingLeft: '10%',
        paddingRight: "10%",
    },
    moreOptionsDefault:{
        fontFamily: 'RT', 
        paddingLeft:'0%',
        fontSize: 14,
    },
    
});

