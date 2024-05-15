import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react'
import DismissKeyboard from '../../components/DismissKeyboard';
import { useNavigation } from "@react-navigation/native";

import { HStack, Divider, Input, Box, Center, Button, VStack, TextArea } from 'native-base';
import ModalScreen from '../../components/Modals/ModalScreen4';
import DateTimePicker from '@react-native-community/datetimepicker';
import { deleteAppointment, editAppointment } from '../../util/api/appointments';
import AppointmentRegister from './AppointmentRegister';
import { getFixedDate } from '../../util/other/GetFormattedDate';
import info from '../../util/info/info';

const AppointmentShow = ({ appointmentList, handleDelete, reload }) => {
    const navigation = useNavigation();
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
                <TouchableOpacity style={{ width: '80%' }} onPress={() => confirmEdit()}>
                    <HStack width={'100%'}>
                        <Text style={styles.itemBold}>Lugar: </Text>
                        <Text style={styles.itemTitle0}>{appointmentList.place}</Text>
                    </HStack>
                    <HStack width={'100%'}>
                        <Text style={styles.itemBold}>Fecha: </Text>
                        <Text style={styles.itemTitle}>{getFixedDate(appointmentList.date)} </Text>
                    </HStack>
                    <HStack width={'100%'}>
                        <Text style={styles.itemBold}>Doctor: </Text>
                        {!appointmentList.doctor ? (<Text style={styles.moreOptionsDefault}>{info.defaultText}</Text>) : (<Text style={styles.itemTitle}>{appointmentList.doctor}</Text>)}
                    </HStack>

                    {appointmentList.extraDetails && (<>
                        <Text style={styles.itemBold}>Detalles extras: </Text>
                        <Box paddingRight={'10%'}>
                           <Text style={styles.itemTitle}>{appointmentList.extraDetails}</Text>
                        </Box>
                    </>)}
                </TouchableOpacity>

                <VStack space={2}>
                    <TouchableOpacity
                        style={{ backgroundColor: "#212121", padding: 7, borderRadius: 5 }}
                        onPress={() => handleDelete(appointmentList.id)}
                    >
                        <Text style={{ color: '#FFFFFF' }}>Navegar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ backgroundColor: "#212121", padding: 7, borderRadius: 5 }}
                        onPress={() => handleDelete(appointmentList.id)}
                    >
                        <Text style={{ color: '#FFFFFF' }}>Eliminar</Text>
                    </TouchableOpacity>
                </VStack>
            </View>

            <View><Divider w="100%" /></View>

            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Cita Médica'}>
                <AppointmentRegister list={appointmentList} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} editing={true} reload={reload} />
            </ModalScreen>
        </>
    );
}

export default AppointmentShow

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
        fontFamily: 'REL',
    },
    itemBold: {
        fontFamily: "RR",
        color: "#000000",
    },
    itemTitle0: {
        fontFamily: "RBlack",
        paddingBottom: '2%',
        color: 'FFFFFF',
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
    datePicker: {
        backgroundColor: 'white',
        borderRadius: 5,
        width: '41%'
    },
    datePickerr: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
    },
    moreOptionsDefault:{
        fontFamily: 'RT', 
        paddingLeft:'2%',
        fontSize: 14,
    },
});

