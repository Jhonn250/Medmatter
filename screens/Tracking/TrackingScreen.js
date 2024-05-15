import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";

import Layout from '../../components/Layout.js'
import GoBack from '../../components/GoBack.js';
import styles from './TrackingScreenStyle.js';

import { HStack, Divider, VStack } from 'native-base';

const TrackingScreen = () => {
    const navigation = useNavigation();
    return (
        <Layout>
            <HStack>
                <GoBack />
            </HStack>
            <HStack>
                <Icon name='chart-line-variant' size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Tracking</Text>
            </HStack>
            <View style={{ marginTop: "5%" }}>
            <VStack space={1.5}>
                <Divider w="100%" />
                <TouchableOpacity onPress={() => navigation.navigate("WeightScreen")}>
                    <HStack alignItems={"center"}>
                        <Icon name="weight" size={40} />
                        <Text style={styles.text}>Peso</Text>
                    </HStack>
                </TouchableOpacity>
                <Divider w="100%" />

                <TouchableOpacity onPress={() => navigation.navigate('BloodPreasure')}>
                    <HStack alignItems={"center"}>
                        <Icon name="water-check" size={40} />
                        <Text style={styles.text}>Presión Sangrinea</Text>
                    </HStack>
                </TouchableOpacity>
                <Divider w="100%" />

                <TouchableOpacity onPress={() => navigation.navigate('SugarScreen')}>
                    <HStack alignItems={"center"}>
                        <Icon name="spoon-sugar" size={40} />
                        <Text style={styles.text}>Azúcar (glucosa)</Text>
                    </HStack>
                </TouchableOpacity>
                <Divider w="100%" />

                <TouchableOpacity onPress={() => navigation.navigate('CholesterolScreen')}>
                    <HStack alignItems={"center"}>
                        <Icon name="hospital" size={40} />
                        <Text style={styles.text}>Colesterol</Text>
                    </HStack>
                </TouchableOpacity>
                <Divider w="100%" />

                <TouchableOpacity onPress={() => navigation.navigate('TemperatureScreen')}>
                    <HStack alignItems={"center"}>
                        <Icon name="thermometer" size={40} />
                        <Text style={styles.text}>Temperatura</Text>
                    </HStack>
                </TouchableOpacity>
                <Divider w="100%" />
            </VStack>
            </View>

        </Layout>


    )
}

export default TrackingScreen 