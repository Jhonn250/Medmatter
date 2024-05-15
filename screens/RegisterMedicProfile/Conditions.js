import { Text, View, ScrollView, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import styles from './RegisterMedicProfileStyle.js';
import { editConditions, postConditions } from '../../util/api/medical';

import {
    Input,
    VStack,
    Box,
    Button,
    HStack,
    Divider,
    TextArea,
    Switch
} from "native-base";
import { checkConditionFields } from '../../util/other/validations';
import { getFixedDate } from '../../util/other/GetFormattedDate.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Conditions = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleTwo, setDatePickerVisibilityTwo] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar');
    const [dateTextTwo, setDateTextTwo] = useState('Seleccionar');
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    let [haveAnEnd, sethaveAnEnd] = useState(false);
    const [conditions, setConditions] = useState({
        name: undefined,
        description: undefined,
        startDate: undefined,
        endDate: undefined,
        majorComplications: undefined,
        minorComplications: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setConditions({
                    name: list.name,
                    description: list.description,
                    startDate: list.startDate,
                    endDate: list.endDate,
                    majorComplications: list.majorComplications,
                    minorComplications: list.minorComplications,
                })

                setDateText(getFixedDate(list.startDate))
                setDate(new Date(list.startDate))

                setDateTextTwo(getFixedDate(list.endDate))
                setDate2(new Date(list.endDate))

                if (list.endDate !== null) {
                    sethaveAnEnd(true);
                }
            })();
        }
    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const showDatePickerTwo = () => {
        setDatePickerVisibilityTwo(!isDatePickerVisibleTwo);
    };

    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('startDate', data.toLocaleDateString());
        showDatePicker();
    };

    const handleConfirmTwo = (data) => {
        setDate2(data);
        setDateTextTwo(getFixedDate(data.toLocaleDateString()))
        handleChange('endDate', data.toLocaleDateString());
        showDatePickerTwo();
    };

    const handleChange = (name, value) => setConditions({ ...conditions, [name]: value });
    const handleSubmit = async () => {
        try {
            if (!editing) {
                if (checkConditionFields(conditions, haveAnEnd)) {
                    await postConditions(conditions);
                    reload();
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                    ]);
                }

            } else {
                if (checkConditionFields(conditions, haveAnEnd)) {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, conditions);
                    await editConditions(objectWithID);
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
                    <View style={{ marginTop: '5%' }}>
                        <Box>
                            <Text style={styles.allTexts1}>Nombre de la Condición:</Text>
                            <Input backgroundColor={'white'} focusOutlineColor={'black'} value={conditions.name} size={"lg"} variant="outline" onChangeText={e => handleChange('name', e)} />

                            <Text style={styles.allTexts}>Descripción:</Text>
                            <TextArea maxHeight={'12%'} backgroundColor={'white'} focusOutlineColor={'black'} value={conditions.description} size={"lg"} variant="outline" onChangeText={e => handleChange('description', e)} />

                            <HStack space={2}>
                                <Box width={'49%'}>
                                    <Text style={styles.allTexts}>Complicaciones Mayores:</Text>
                                    <TextArea placeholder='Opcional' maxHeight={'70%'} backgroundColor={'white'} focusOutlineColor={'black'} value={conditions.majorComplications} size={"lg"} variant="outline" onChangeText={e => handleChange('majorComplications', e)} />
                                </Box>

                                <Box width={'49%'}>
                                    <Text style={styles.allTexts}>Complicaciones Menores:</Text>
                                    <TextArea placeholder='Opcional' maxHeight={'70%'} backgroundColor={'white'} focusOutlineColor={'black'} value={conditions.minorComplications} size={"lg"} variant="outline" onChangeText={e => handleChange('minorComplications', e)} />
                                </Box>

                            </HStack>

                            <Text style={styles.allTexts}>¿Ha concluido su condición?</Text>
                            <Switch value={haveAnEnd} onTrackColor={'black'} onValueChange={(aux) => sethaveAnEnd(aux)} size="sm" />

                            <HStack space={10} alignSelf={'center'}>
                                <VStack width={'40%'}>
                                    <Text style={styles.allTexts}>Fecha Inicio:</Text>
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
                                </VStack>
                                {
                                    !haveAnEnd ? (<></>) : (
                                        <VStack width={'40%'}>
                                            <Text style={styles.allTexts}>Fecha Fin:</Text>
                                            <Box>
                                                <Button colorScheme={'black'} minHeight={'5%'} variant={'outline'} _text={{ color: 'black', fontFamily: 'RR', fontSize: 17 }} onPress={showDatePickerTwo}>{dateTextTwo}</Button>
                                                <DateTimePickerModal
                                                    isVisible={isDatePickerVisibleTwo}
                                                    mode='date'
                                                    date={date2}
                                                    themeVariant='light'
                                                    isDarkModeEnabled={false}
                                                    onConfirm={handleConfirmTwo}
                                                    onCancel={showDatePickerTwo}
                                                />
                                            </Box>
                                        </VStack>)
                                }
                            </HStack>
                        </Box>
                        <Button onPress={() => handleSubmit()} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default Conditions