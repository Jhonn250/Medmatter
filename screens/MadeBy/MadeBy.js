import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import GoBack from '../../components/GoBack'
import Layout from '../../components/Layout'
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import { HStack } from 'native-base'

const MadeBy = () => {
    return (
        <Layout>
            <GoBack />
            <HStack>
                <Icon name='information' size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Información de la aplicación</Text>
            </HStack>
            <View>
                <Text style={{textAlign:'center', fontFamily:'RBlack', fontSize:25}}>MEDMATTER</Text>
                <Text style={{textAlign:'center', fontFamily:'RBold', fontSize:25, marginTop:'10%'}}>Hecho por:</Text>
                <Text style={{textAlign:'center', fontFamily:'REL', fontSize:25}}>Adan Fregoso Luquín</Text>
                <Text style={{textAlign:'center', fontFamily:'REL', fontSize:25}}>Jhonatan Adrian Hernandez Huizar</Text>

            </View>
        </Layout>

    )
}

export default MadeBy

const styles = StyleSheet.create({})