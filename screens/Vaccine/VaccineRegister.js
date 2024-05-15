import { KeyboardAvoidingView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'

import ModalScreen from "../../components/Modals/ModalScreen4";
import { editVaccine, postVaccine } from '../../util/api/vaccine';
import DismissKeyboard from '../../components/DismissKeyboard';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Box, Button, Center, Input, TextArea } from 'native-base';
import { getFixedDate } from '../../util/other/GetFormattedDate';
import { checkRegisterVaccines } from '../../util/other/validations';

const VaccineRegister = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar');
    const [date, setDate] = useState(new Date());

    const [vaccine, setVaccine] = useState({
        name: undefined,
        vaccinationDates: [],
        secondaryEffects: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setVaccine({
                    name: list.name,
                    vaccinationDates: list.vaccinationDates,
                    secondaryEffects: list.secondaryEffects,
                })
                setDateText(getFixedDate(list.vaccinationDates[list.vaccinationDates.length - 1]))
                setDate(new Date(list.vaccinationDates[list.vaccinationDates.length - 1]))
            })();
        }
    }, [])


    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange2(data.toLocaleDateString());
        showDatePicker();
    };

    const handleChange = (name, value) => setVaccine({ ...vaccine, [name]: value });

    const handleChange2 = (value) => {
        var newDates = [];
        newDates.push(value);
        var newVaccine = vaccine;
        newVaccine.vaccinationDates = newDates;
        setVaccine(newVaccine);
    }

    const handleSubmit = async () => {
        try {
            if (!editing) {
                if (checkRegisterVaccines(vaccine)) {
                    await postVaccine(vaccine)
                    reload();
                    setisModalOpen(!isModalOpen);
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', },
                    ]);
                }
            }
            else {
                if (checkRegisterVaccines(vaccine)) {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, vaccine);
                    await editVaccine(objectWithID);
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
    }

    return (
        <View style={styles.main}>
            <Text style={styles.modalText}>Nombre de la Vacuna o Proteccion:</Text>
            <Input value={vaccine.name} focusOutlineColor={'black'} backgroundColor={'white'} isHovered={false} keyboardType='default' size={'md'} onChangeText={e => handleChange('name', e)} />

            <Text style={styles.modalText} on>Efectos Secundarios:</Text>
            <TextArea placeholder='Opcional' value={vaccine.secondaryEffects} minHeight={'20%'} focusOutlineColor={'black'} backgroundColor={'white'} isHovered={false} keyboardType='default' size={'md'} onChangeText={e => handleChange('secondaryEffects', e)} />

            <Text style={styles.modalText}>Fecha:</Text>
            <Box>
                <Button colorScheme={'black'} minHeight={'5%'} variant={'outline'} _text={{ color: 'black', fontFamily: 'RR', fontSize: 17 }} onPress={showDatePicker}>{dateText}</Button>
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

            <Box justifyContent={'flex-end'} alignSelf={'center'} width={'100%'} height={'30%'}>
                <Box width={'50%'} justifyContent={'flex-end'} alignSelf={'center'}>
            {editing ?
                (<Button onPress={() => handleSubmit()} style={{ borderRadius: 20 }}  colorScheme={'light'}>Editar</Button>) :
                (<Button _text={{fontFamily:'RR',alignSelf:'center'}} onPress={() => handleSubmit()} style={{ borderRadius: 20 }} colorScheme={'light'}>Guardar</Button>)
            }
                </Box>
            </Box>
        </View>
    )
}

export default VaccineRegister

const styles = StyleSheet.create({
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
        height:'100%',
    }
});
