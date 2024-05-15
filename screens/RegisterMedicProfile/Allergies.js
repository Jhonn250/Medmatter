import { Text, View, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './RegisterMedicProfileStyle.js';
import { postAllergies, editAllergies } from '../../util/api/medical.js';
import {
    Input,
    Box,
    Button,
    TextArea,
} from "native-base";
import { checkAllergyFields} from '../../util/other/validations.js';

const Allergies = ({ list, editing, isModalOpen, setisModalOpen, reload }) => {
    const [allergy, setAllergy] = useState({
        name: undefined,
        symptoms: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setAllergy({
                    name: list.name,
                    symptoms: list.symptoms
                });
            })();
        }
    }, [])

    const handleChange = (name, value) => setAllergy({ ...allergy, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                if (checkAllergyFields(allergy)) {
                    await postAllergies(allergy);
                    reload();
                    setisModalOpen(!isModalOpen)
                    Alert.alert('Guardado con éxito', '', [
                        { text: 'OK', },
                    ]);
                }

            } else {
                if (checkAllergyFields(allergy)) {
                    const objectWithID = ({ id: list.id });
                    Object.assign(objectWithID, allergy);
                    await editAllergies(objectWithID);
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
        <>
            <ScrollView>
                <View style={{ marginTop: '5%' }}>
                    <Box>
                        <Text style={styles.allTexts1}>Nombre de la alergia:</Text>
                        <Input focusOutlineColor={'black'} backgroundColor={'white'} value={allergy.name} size={"lg"} variant="outline" onChangeText={e => handleChange('name', e)} />
                        <Text style={styles.allTexts}>Sintomas:</Text>
                        <TextArea placeholder='Opcional' focusOutlineColor={'black'} backgroundColor={'white'} minHeight={'20%'} value={allergy.symptoms} size={"lg"} variant="outline" onChangeText={e => handleChange('symptoms', e)} />
                    </Box>
                    <Button onPress={async () => { await handleSubmit(); }} colorScheme={'light'} style={styles.sendButton}>Guardar</Button>
                </View>
            </ScrollView>
        </>

    )

}

export default Allergies