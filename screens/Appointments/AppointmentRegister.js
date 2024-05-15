import { KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import ModalScreen from "../../components/Modals/ModalScreen4";
import { editVaccine, postVaccine } from '../../util/api/vaccine';
import DismissKeyboard from '../../components/DismissKeyboard';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Box, Button, Center, Input, TextArea } from 'native-base';
import { getFixedDate } from '../../util/other/GetFormattedDate';
import { editAppointment, postAppointment } from '../../util/api/appointments';
import { checkRegisterAppointment } from '../../util/other/validations';


const AppointmentRegister = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar');
    const [date, setDate] = useState(new Date());
    const [appointment, setAppointment] = useState({
        date: undefined,
        place: undefined,
        doctor: undefined,
        extraDetails: undefined
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setAppointment({
                    date: list.date,
                    place: list.place,
                    doctor: list.doctor,
                    extraDetails: list.extraDetails
                })
                setDateText(getFixedDate(list.date))
                setDate(new Date(list.date))
            })();
        }
    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('date', data.toLocaleDateString());
        showDatePicker();
    };

    const handleChange = (name, value) => setAppointment({ ...appointment, [name]: value });

    const handleSubmit = async () => {
        try {
            if (checkRegisterAppointment(appointment)) {
                if (!editing) {
                    await postAppointment(appointment);
                    reload();
                    setisModalOpen(!isModalOpen)
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', },
                    ]);
                } else {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, appointment);
                    await editAppointment(objectWithID);
                    reload();
                    setisModalOpen(!isModalOpen)
                    Alert.alert('Editado con éxito', '', [
                        { text: 'OK', },
                    ]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView>
            <DismissKeyboard>
                <View style={styles.main}>
                    <Text style={styles.modalText}>Lugar:</Text>
                    <Input
                        value={appointment.place}
                        focusOutlineColor={'black'}
                        bgColor={'white'}
                        keyboardType='default'
                        size={'md'}
                        onChangeText={e => handleChange('place', e)}
                    />
                    <Text style={styles.modalText}>Doctor:</Text>
                    <Input
                        value={appointment.doctor}
                        placeholder='Opcional'
                        focusOutlineColor={'black'}
                        bgColor={'white'}
                        keyboardType='default'
                        size={'md'}
                        onChangeText={e => handleChange('doctor', e)}
                    />
                    <Text style={styles.modalText}>Detalles Extra:</Text>
                    <TextArea
                        value={appointment.extraDetails}
                        placeholder='Opcional'
                        focusOutlineColor={'black'}
                        bgColor={'white'}
                        keyboardType='default'
                        size={'md'}
                        onChangeText={e => handleChange('extraDetails', e)}
                    />
                    <Text style={styles.modalText}>Fecha:</Text>
                    <Box>
                        <Button colorScheme={'black'} variant={'outline'} _text={{ color: 'black', fontFamily: 'RR', fontSize: 17 }} onPress={showDatePicker}>{dateText}</Button>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode='date'
                            date={date}
                            themeVariant='light'
                            isDarkModeEnabled={false}
                            onConfirm={handleConfirm}
                            onCancel={showDatePicker}
                        />

                    </Box>

                    <Center height={'30%'}>
                        <Button
                            onPress={() => handleSubmit()}
                            style={{ borderRadius: 20 }}
                            width={'40%'}
                            height={'50%'}
                            colorScheme={'light'}
                        >
                            Guardar
                        </Button>
                    </Center>

                </View>
            </DismissKeyboard>
        </KeyboardAvoidingView>
    )
}

export default AppointmentRegister


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
});

