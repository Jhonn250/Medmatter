import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { Box, HStack, Input} from 'native-base'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native";

const AddElement = () => {
    const [allergies, setAllergies] = useState(undefined)
    const route = useRoute();
    const navigation = useNavigation();

    const sendAllergiesList = (value) => {
        setAllergies(value);
        navigation.navigate('hola', {
            allergiesArray
        });
    }

    
    return (
            <HStack>
                <Box width={'8%'} alignSelf={"center"} marginTop={5}>
                <TouchableOpacity style={{marginTop:10}}>
                    <Icon name="minus" size={20} />
                </TouchableOpacity>
            </Box>
            <Box width={'92%'} alignSelf={"center"}>
                <Text style={styles.secondTexts}>Nombre de la alergia</Text>
                <Input size={"lg"} variant="outline" placeholder="..." onChangeText={(value) => { sendAllergiesList(value) }} />
            </Box>
            </HStack>
    )
}

export default AddElement;

const styles = StyleSheet.create({
    secondTexts: {
        fontFamily: 'RR',
        fontSize: 14,
        marginTop: '2%',
        //paddingLeft: '4%',

    },

})