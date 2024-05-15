import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert, TouchableOpacity, LogBox } from 'react-native'
import React, { useState, useEffect } from 'react'
import {
    Switch,
    Input,
    VStack,
    Box,
    Button,
    HStack,
    TextArea,
    Center,
} from "native-base";
import styles from './RegisterMedicineStyle.js'
import RNPickerSelect from 'react-native-picker-select';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import Dropdown from '../../components/Dropdown.tsx';
import info from '../../util/info/info.js'
import { editDrug, postDrugs } from '../../util/api/drugs.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getFixedDate } from '../../util/other/GetFormattedDate.js';
import { checkRegisterMedicine } from '../../util/other/validations.js';

const RegisterMedicineScreen = ({ isModalOpen, setisModalOpen, reload, editing, list }) => {
    LogBox.ignoreAllLogs();
    let [haveAnEnd, sethaveAnEnd] = useState(false);
    const [date, setDate] = useState(new Date());
    const [date2, setDate2] = useState(new Date());
    const [dateText, setDateText] = useState('Seleccionar')
    const [dateTextTwo, setDateTextTwo] = useState('Seleccionar')
    const [medicine, setMedicine] = useState({
        name: undefined,
        dose: undefined,
        type: undefined,
        purpose: undefined,
        startedTaking: undefined,
        stoppedTaking: undefined,
        timesDay: undefined,
        timesWeek: undefined,
        remainingUnits: undefined,
        notes: undefined,
        isTaking: false,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setMedicine({
                    name: list.name,
                    dose: list.dose.toString(),
                    type: list.type,
                    purpose: list.purpose,
                    startedTaking: list.startedTaking,
                    stoppedTaking: list.stoppedTaking,
                    timesDay: list.timesDay,
                    timesWeek: list.timesWeek,
                    remainingUnits: list.remainingUnits.toString(),
                    notes: list.notes,
                    isTaking: list.isTaking,
                })
                setDateText(getFixedDate(list.startedTaking))
                setDate(new Date(list.startedTaking));
                if (list.stoppedTaking === null || list.stoppedTaking === undefined) {
                    sethaveAnEnd(true);
                }
                else{
                    setDate2(new Date(list.stoppedTaking));
                    setDateTextTwo(getFixedDate(list.stoppedTaking))    
                }
            })();
        }

    }, [])


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisibleTwo, setDatePickerVisibilityTwo] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const showDatePickerTwo = () => {
        setDatePickerVisibilityTwo(!isDatePickerVisibleTwo);
    };

    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('startedTaking', data.toLocaleDateString());
        showDatePicker();
    };

    const handleConfirmTwo = (data) => {
        setDate2(data);
        setDateTextTwo(getFixedDate(data.toLocaleDateString()))
        handleChange('stoppedTaking', data.toLocaleDateString());
        showDatePickerTwo();
    };

    const handleChange = (name, value) => setMedicine({ ...medicine, [name]: value });

    const handleSubmit = async () => {
        try {
            if (checkRegisterMedicine(medicine)) {
                if (!editing) {
                    await postDrugs(medicine);
                    reload();
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                    ]);

                } else {
                    if(haveAnEnd){
                        medicine.stoppedTaking = undefined;                    
                    }
                    const medicineWithID = ({ id: list.id });
                    Object.assign(medicineWithID, medicine);
                    await editDrug(medicineWithID);
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
                    <VStack>
                        <Box>

                            <Text style={styles.allTexts}>Nombre del medicamento:</Text>
                            <Input
                                onChangeText={(value) => handleChange('name', value)}
                                size={'md'}
                                variant="outline"
                                bgColor={'white'}
                                focusOutlineColor={'black'}
                                value={medicine.name}
                            />
                        </Box>
                        <HStack space={2} alignItems={'center'} alignSelf={'center'}>

                            <Box width={'49%'}>
                                <Text style={styles.allTexts}>Dosis:</Text>
                                <Input
                                    keyboardType='numeric'
                                    size={'md'}
                                    variant="outline"
                                    bgColor={'white'}
                                    focusOutlineColor={'black'}
                                    value={medicine.dose}
                                    onChangeText={(value) => handleChange('dose', value)}
                                />
                            </Box>

                            <Box width={'49%'}>
                                <Text style={styles.allTexts}>Tipo de tableta:</Text>
                                <Dropdown
                                    label={medicine.type}
                                    data={info.pills}
                                    onSelect={(value) => handleChange('type', value.value)} />
                            </Box>

                        </HStack>
                        <HStack space={1} alignItems={'center'} alignSelf={'center'}>
                            <Box width={'32%'}>
                                <Text style={styles.allTexts}>¿Cuantas veces por dia?</Text>

                                <RNPickerSelect
                                    placeholder={info.placeholder}
                                    value={medicine.timesDay}
                                    Icon={() => {
                                        return <Icon name="chevron-down" size={30} />;
                                    }}
                                    style={{
                                        ...styles,
                                    }}
                                    onValueChange={(value) => handleChange('timesDay', value)}
                                    items={info.timesDay}
                                />

                            </Box>
                            <Box width={'32%'}>
                                <Text style={styles.allTexts}>¿Por cuantas semanas?</Text>

                                <RNPickerSelect
                                    placeholder={info.placeholder}
                                    value={medicine.timesWeek}
                                    Icon={() => {
                                        return <Icon name="chevron-down" size={30} />;
                                    }}
                                    style={{
                                        ...styles,
                                    }}
                                    onValueChange={(value) => handleChange('timesWeek', value)}
                                    items={info.timesWeek}
                                />
                            </Box>
                            <Box width={'32%'}>
                                <Text style={styles.allTexts}>Unidades restantes:</Text>
                                {editing ? (
                                    <>
                                        <HStack>

                                            <Center>
                                                <TouchableOpacity onPress={() => {
                                                    handleChange('remainingUnits', medicine.remainingUnits--)

                                                }}>
                                                    <Icon name="minus" size={30} />
                                                </TouchableOpacity>
                                            </Center>
                                            <Input
                                                height={39}
                                                width={'55%'}
                                                value={medicine.remainingUnits}
                                                keyboardType='numeric'
                                                bgColor={'white'}
                                                focusOutlineColor={'black'}
                                                size={'md'}
                                                variant="outline"
                                                onChangeText={(value) => handleChange('remainingUnits', value)}
                                            />
                                            <Center>
                                                <TouchableOpacity onPress={() => {
                                                    handleChange('remainingUnits', medicine.remainingUnits++)
                                            
                                                }}>
                                                    <Icon name="plus" size={30} />
                                                </TouchableOpacity>
                                            </Center>
                                        </HStack>
                                    </>) : (
                                    <Input
                                        height={39}
                                        value={medicine.remainingUnits}
                                        keyboardType='numeric'
                                        bgColor={'white'}
                                        focusOutlineColor={'black'}
                                        size={'md'}
                                        variant="outline"
                                        onChangeText={(value) => handleChange('remainingUnits', value)}
                                    />)}
                            </Box>
                        </HStack>

                        <Box>
                            <Text style={styles.allTexts}>Propósito del medicamento:</Text>
                            <Input
                                size={'md'}
                                variant="outline"
                                placeholder='Opcional'
                                value={medicine.purpose}
                                bgColor={'white'}
                                focusOutlineColor={'black'}
                                onChangeText={(value) => handleChange('purpose', value)}
                            />
                        </Box>

                        <Box>
                            <Text style={styles.allTexts}>Notas:</Text>
                            <TextArea
                                onChangeText={(value) => handleChange('notes', value)}
                                placeholder='Opcional'
                                value={medicine.notes}
                                size='md'
                                minHeight={'11%'}
                                bgColor={'white'}
                                focusOutlineColor={'black'}
                                variant="outline" />
                        </Box>
                        <Box>
                            <Text style={styles.allTexts}>¿Se toma indefinidamente?</Text>
                            <Switch value={haveAnEnd} onTrackColor={'black'} onValueChange={(aux) => sethaveAnEnd(aux)} size="sm" />
                            {/* ////////////////////////// */}
                            <HStack space={1} alignSelf={'center'}>
                                <VStack style={{ width: '48%' }}>
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
                                    haveAnEnd ? (<></>) : (<VStack style={{ width: '48%' }}>
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

                        <Box>
                            <Text style={styles.allTexts}>Se consume actualmente?</Text>
                            <Switch
                                onTrackColor={'black'}
                                value={medicine.isTaking}
                                onValueChange={(value) => handleChange('isTaking', value)}
                                size="sm"
                            />
                        </Box>
                        <Button onPress={() => handleSubmit()} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
                    </VStack>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    )
}

export default RegisterMedicineScreen

