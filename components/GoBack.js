import { TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

const GoBack = ({ children }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={{
                justifyContent: "center",
                width: "10%",
            }}
            onPress={() => navigation.goBack()}
        >
            <Icon name="chevron-left" size={40} />
        </TouchableOpacity>
    )
}

export default GoBack