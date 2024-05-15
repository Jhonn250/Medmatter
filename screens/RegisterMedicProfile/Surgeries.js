import { Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './RegisterMedicProfileStyle.js';
import { editSurgeries, postSurgeries } from '../../util/api/medical';
import { Input, Box, Button } from "native-base";
import { checkSurgerieFields } from '../../util/other/validations.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFixedDate } from '../../util/other/GetFormattedDate.js';


const Surgeries = ({ isModalOpen, setisModalOpen, list, editing, reload }) => {
    const [date, setDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar')
    const [surgery, setSurgery] = useState({
        name: undefined,
        date: undefined,
        place: undefined,
        doctor: undefined,
    })
    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('date', data.toLocaleDateString());
        showDatePicker();
    };

    useEffect(() => {
        if (editing) {
            (async () => {
                setSurgery({ name: list.name, date: list.date, place: list.place, doctor: list.doctor })
                setDateText(getFixedDate(list.date))
                setDate(new Date(list.date))
            })();
        }
    }, [])

    const handleChange = (name, value) => setSurgery({ ...surgery, [name]: value });

    const handleSubmit = async () => {
        try {
            if (checkSurgerieFields(surgery)) {
                if (!editing) {
                    await postSurgeries(surgery);
                    reload();
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                    ]);
                } else {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, surgery);
                    await editSurgeries(objectWithID);
                    reload();
                    Alert.alert('Editado con éxito', '', [
                        { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                    ]);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                    <View>
                        <Text style={styles.allTexts}>Tipo de cirugía:</Text>
                        <Input backgroundColor={'white'} focusOutlineColor={'black'} value={surgery.name} size={"lg"} variant="outline" onChangeText={e => handleChange('name', e)} />

                        <Text style={styles.allTexts}>Lugar:</Text>
                        <Input backgroundColor={'white'} focusOutlineColor={'black'} value={surgery.place} size={"lg"} variant="outline" onChangeText={e => handleChange('place', e)} />

                        <Text style={styles.allTexts}>Doctor:</Text>
                        <Input placeholder='Opcional' backgroundColor={'white'} focusOutlineColor={'black'} value={surgery.doctor} size={"lg"} variant="outline" onChangeText={e => handleChange('doctor', e)} />

                        <Box>
                            <Text style={styles.allTexts}>Fecha:</Text>
                            <Box style={{ width: '40%' }}>
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
                        </Box>

                        <Button onPress={() => handleSubmit()} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Surgeries
