import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Button, Center, Input, Box } from 'native-base'
import { getFixedDate } from '../../../util/other/GetFormattedDate'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { editTemperature, postTemperature } from '../../../util/api/tracking'


const TemperatureRegister = ({ isModalOpen, setisModalOpen, reload, editing, list }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dateText, setDateText] = useState('Seleccionar');
    const [date, setDate] = useState(new Date());

    const [weight, setWeight] = useState({
        value: undefined,
        dateTime: undefined,
    })

    useEffect(() => {
        if (editing) {
            (async () => {
                setWeight({
                    value: list.value.toString(),
                    dateTime: list.dateTime
                });
                setDateText(getFixedDate(list.dateTime))
                setDate(new Date(list.dateTime))
            })();
        }
    }, [])

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };
    const handleConfirm = (data) => {
        setDate(data);
        setDateText(getFixedDate(data.toLocaleDateString()))
        handleChange('dateTime', data.toLocaleDateString());
        showDatePicker();
    };

    const handleChange = (name, value) => setWeight({ ...weight, [name]: value });

    const handleSubmit = async () => {
        try {
            if (!editing) {
                await postTemperature(weight);
                reload();
                Alert.alert('Guardado con éxito', '', [
                    { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                ]);

            } else {
                const objectWithID = ({ id: list.id });
                Object.assign(objectWithID, weight);
                await editTemperature(objectWithID);
                reload();
                Alert.alert('Editado con éxito', '', [
                    { text: 'OK', onPress: () => setisModalOpen(!isModalOpen) },
                ]);
            }
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <View style={styles.main}>
            <Text style={styles.modalText}>Temperatura:</Text>
            <Input
                textAlign={'center'}
                value={weight.value}
                focusOutlineColor={'black'}
                bgColor={'white'}
                _text={{ color: 'black', fontFamily: 'RR', fontSize: 30 }}
                marginBottom={'2%'}
                keyboardType='numeric'
                size={'md'}
                onChangeText={e => handleChange('value', e)} />

            <Text style={styles.modalText}>Fecha/Hora:</Text>
            <Box>
                <Button
                    colorScheme={'black'}
                    minHeight={'5%'}
                    variant={'outline'}
                    _text={{ color: 'black', fontFamily: 'RR', fontSize: 17 }}
                    onPress={showDatePicker}>
                    {dateText}
                </Button>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode='date'
                    date={date}
                    themeVariant='light'
                    isDarkModeEnabled={false}
                    onConfirm={handleConfirm}
                    onCancel={showDatePicker}
                />
                <Center marginTop={'10%'}>
                    <Button onPress={() => handleSubmit()} style={{ borderRadius: 15 }} width={'50%'} colorScheme={'light'}>Guardar</Button>
                </Center>
                </Box>
        </View>
  )
}

export default TemperatureRegister

const styles = StyleSheet.create({
    modalText: {
        fontFamily: "RBold",
        color: '#000000'
    },
    main: {
        paddingLeft: '10%',
        paddingRight: "10%",
    },
})