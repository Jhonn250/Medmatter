import { View, Text } from 'react-native'
import React from 'react'
import { Box, VStack } from "native-base";
import * as ConvertToType from "../../components/ConvertToType.js"
import { getFixedDate } from '../../util/other/GetFormattedDate.js';

const BasicInfoItem = ({list}) => {
    return (
        <View>
            <VStack marginTop={'2%'}>
                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Fecha de nacimiento:</Text>
                    <Text>{getFixedDate(list.birthDate)}</Text>
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Sexo:</Text>
                    <ConvertToType.GetSex value={list.sex} />
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Raza:</Text>
                    <ConvertToType.GetRace value={list.race} />
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Tipo de Sangre:</Text>
                    <ConvertToType.GetTypeofBlood value={list.bloodType} />
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Estatura:</Text>
                    <Text>{list.height} m</Text>
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Hipertensión Arterial:</Text>
                    <ConvertToType.GetHypertension value={list.hasHypertension} />
                </Box>

                <Box marginBottom={2}>
                    <Text style={{ fontFamily: 'RBold' }}>Fumador:</Text>
                    <ConvertToType.GetSmoker value={list.isSmoker} />
                </Box>
            </VStack>
        </View>
    )
}

export default BasicInfoItem
