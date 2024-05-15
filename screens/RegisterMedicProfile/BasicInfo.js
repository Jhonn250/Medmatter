import { Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select';
import info from '../../util/info/info';
import styles from './RegisterMedicProfileStyle.js';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    Input,
    VStack,
    Box,
    Button,
    HStack,
    Switch,
} from "native-base";
import { updateMedicalProfile } from '../../util/api/medical';
import { getFixedDate } from '../../util/other/GetFormattedDate';



const BasicInfo = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar');
    const [date, setDate] = useState(new Date());
    const [profile, setProfile] = useState({
        sex: undefined,
        height: undefined,
        hasHypertension: undefined,
        isSmoker: false,
        race: undefined,
        bloodType: undefined,
        birthDate: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setProfile({
                    sex: list.sex,
                    height: list.height.toString(),
                    hasHypertension: list.hasHypertension,
                    isSmoker: list.isSmoker,
                    race: list.race,
                    bloodType: list.bloodType,
                    birthDate: list.birthDate,
                });
                setDateText(getFixedDate(list.birthDate));
                setDate(new Date(list.birthDate));
            })();
        }

    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('birthDate', data.toLocaleDateString());
        showDatePicker();
    };

    const handleChange = (name, value) => setProfile({ ...profile, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                await updateMedicalProfile(profile);
                reload();
                Alert.alert('Guardado con éxito', '', [
                    { text: 'OK', },
                ]);

            } else {
                await updateMedicalProfile(profile);
                Alert.alert('Editado con éxito', '', [
                    { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ScrollView>
            <View style={{ marginTop: '5%' }}>
                <HStack space={2}>
                    <VStack width={'49%'} style={{ alignSelf: 'flex-start' }}>
                        <Text style={styles.allTexts1}>Fecha de nacimiento</Text>
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
                    <VStack width={'49%'} >
                        <Text style={styles.allTexts1}>Sexo</Text>
                        <RNPickerSelect
                            value={profile.sex}
                            placeholder={info.placeholder}
                            Icon={() => {
                                return <Icon name="chevron-down" size={30} />;
                            }}
                            style={{
                                ...styles,
                            }}
                            onValueChange={(value) => { handleChange("sex", value) }}
                            items={info.sex}
                        />
                    </VStack>
                </HStack>

                {/* ////////////////////////////////////// */}
                <HStack space={2}>
                    <VStack width={'49%'} marginTop={'6%'}>
                        <Text style={styles.allTexts}>Estatura</Text>
                        <Input focusOutlineColor={'black'} backgroundColor={'white'} height={39.9} keyboardType="numeric" size={"lg"} variant="outline" value={profile.height} onChangeText={(aux) => handleChange("height", aux)} />
                    </VStack>

                    {/* ////////////////////////////////////// */}
                    <VStack width={'49%'} >
                        <Text style={styles.allTexts}>¿Hipertensión Arterial?</Text>
                        <RNPickerSelect
                            value={profile.hasHypertension}
                            placeholder={info.placeholder}
                            Icon={() => {
                                return <Icon name="chevron-down" size={30} />;
                            }}
                            style={{
                                ...styles,
                            }}
                            onValueChange={(value) => { handleChange("hasHypertension", value) }}
                            items={info.default}
                        />
                    </VStack>
                </HStack>

                {/* ////////////////////////////////////// */}
                <HStack space={2}>
                    <VStack width={'49%'}>
                        <Text style={styles.allTexts}>Raza</Text>
                        <RNPickerSelect
                            value={profile.race}
                            placeholder={info.placeholder}
                            Icon={() => {
                                return <Icon name="chevron-down" size={30} />;
                            }}
                            style={{
                                ...styles,
                            }}
                            onValueChange={(value) => handleChange("race", value)}
                            items={info.race}
                        />

                    </VStack>

                    {/* ////////////////////////////////////// */}
                    <VStack width={'49%'}>
                        <Text style={styles.allTexts}>Tipo de Sangre</Text>
                        <RNPickerSelect
                            value={profile.bloodType}
                            placeholder={info.placeholder}
                            Icon={() => {
                                return <Icon name="chevron-down" size={30} />;
                            }}
                            style={{
                                ...styles,
                            }}
                            onValueChange={(value) => handleChange("bloodType", value)}
                            items={info.bloodType}
                        />
                    </VStack>
                </HStack>

                {/* ////////////////////////////////////// */}
                <Text style={styles.allTexts}>¿Fumador?</Text>
                <Switch value={profile.isSmoker} onValueChange={(aux) => { handleChange('isSmoker', aux) }} size="sm" />

                <Button onPress={async () => { await handleSubmit(); setisModalOpen(!isModalOpen) }} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
            </View>
        </ScrollView>
    )
}

export default BasicInfo
