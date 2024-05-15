import { View, Text, TouchableOpacity, ScrollView, FlatList, StyleSheet, KeyboardAvoidingView, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import Layout from "../../components/Layout.js";
import GoBack from "../../components/GoBack.js";
import ModalScreen from "../../components/Modals/ModalScreen4.js"
import DismissKeyboard from "../../components/DismissKeyboard.js";
import DateTimePicker from '@react-native-community/datetimepicker';
import AppointmentShow from "./AppointmentShow.js";
import { isEmpty } from "../../util/other/validations.js";

import { HStack, Box, Button, Input, Center, TextArea } from "native-base";
import { getAppointments, postAppointment, deleteAppointment } from "../../util/api/appointments.js";
import AppointmentRegister from "./AppointmentRegister.js";



const AppointmentScreen = () => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [appointmentList, setAppointmentList] = useState([]);

    const loadAppointmets = async () => {
        await getAppointments()
            .then((res) => res.json())
            .then((data) => setAppointmentList(data))
            .catch((err) => console.log(err));
    }
    
    useEffect(() => {
        loadAppointmets();
    }, [])

    const reload = () => {
        loadAppointmets();
    }

    const handleDelete = (id) => {
        Alert.alert('¿Desea eliminar?', '', [
            { text: 'Si', onPress: () => deleteConfirmation(id) },
            { text: 'No' }
        ]);
    };

    const deleteConfirmation = async (id) => {
        const res = await deleteAppointment(id)

        if (res === true) {
            Alert.alert('Eliminado con éxito', '', [
                { text: 'Ok' }
            ]);
            await loadAppointmets();
        }
        if (res === false || res === null) {
            Alert.alert('No se pudo eliminar', '', [
                { text: 'Ok' }
            ]);
        }
    }

    const renderItem = ({ item }) => {
        return <AppointmentShow appointmentList={item} handleDelete={handleDelete} reload={reload} />
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
                <Icon name='clock-time-four' size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Citas Médicas</Text>
            </HStack>

            {
                isEmpty(appointmentList) ? (<Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20 }}>¡No se han registado citas médicas!</Text>) :
                    (<FlatList
                        style={{ width: "100%" }}
                        data={appointmentList}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                    />)
            }

            {/* ///////MODAL////// */}
            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Nueva Cita Médica'}>
                <AppointmentRegister isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} reload={reload}/>
            </ModalScreen>
        </Layout>

    )
}

export default AppointmentScreen;

const styles = StyleSheet.create({
    modalText: {
        fontFamily: "RBold",
        //paddingLeft: '5%',
        color: '#000000',
        marginTop: '1%'
    },
    main: {
        paddingLeft: '10%',
        paddingRight: "10%",
    }
});