import { Text, View, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import info from '../../util/info/info';
import styles from './RegisterMedicProfileStyle.js';
import { editLimitations, postLimitations } from '../../util/api/medical.js';

import {
    Radio,
    Input,
    VStack,
    Box,
    Button,
    HStack,
    Divider
} from "native-base";
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen';
import { checkDiseaseFields, checkPickerSelect } from '../../util/other/validations';

const Diseases = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {
    const [option, setOption] = useState(null);
    const [disease, setDisease] = useState({
        type: undefined,
        description: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                if (list.type === 8) {
                    setDisease({
                        type: list.type,
                        description: list.description
                    });
                }
                else {
                    setDisease({
                        type: list.type,
                        description: undefined
                    });
                }
            })();
        }
    }, [])

    const handleChange = (name, value) => setDisease({ ...disease, [name]: value });
    const handleChangeTwo = (name, value) => {
        setDisease({ ...disease, [name]: value });
        setOption(value);
    }

    const handleSubmit = async () => {
        try {
            if (!editing) {
                if (checkDiseaseFields(disease)) {
                    await postLimitations(disease);
                    reload();
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                    ]);
                }

            } else {
                if (checkDiseaseFields(disease)) {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, disease);
                    await editLimitations(objectWithID);
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
            <ScrollView>
                <View style={{ marginTop: '5%' }}>
                    <Text style={styles.allTexts1}>¿Discapacidades?</Text>
                    <RNPickerSelect
                        placeholder={info.placeholder}
                        value={disease.type}
                        Icon={() => {
                            return <Icon name="chevron-down" size={30} />;
                        }}
                        style={{
                            ...styles,
                        }}
                        onValueChange={(value) => handleChangeTwo('type', value)}
                        items={info.diseases}
                    />
                    {
                        option === 8 &&
                        <>
                            <Text style={styles.allTexts}>¿Cuál es su discapacidad?</Text>
                            <Input focusOutlineColor={'black'} backgroundColor={'white'} value={disease.description} size={"lg"} variant="outline" onChangeText={e => handleChange('description', e)} />
                        </>
                    }
                    <Button onPress={() => handleSubmit()} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
                </View>
            </ScrollView>
        </>
    )
}
export default Diseases
