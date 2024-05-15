import { Text, ScrollView, Alert } from 'react-native';
import React,{useState} from 'react';
import GoBack from '../../components/GoBack.js';
import Layout from '../../components/Layout.js';
import SettingsOption from '../../components/SettingsOption.js';
import { useNavigation } from "@react-navigation/native";

import { HStack } from 'native-base';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { deleteData, getData } from '../../util/other/SaveObject.js';

const SettingsScreen = () => {
    const navigation = useNavigation();

    const goToPersonalInformationSection = () => {
        navigation.navigate('Profile')
    }
    const goToAppInformationSection = () => {
        navigation.navigate('MadeBy')
    }
    const logOut = () => {
        Alert.alert('Esta apunto de cerrar sesión', '¿Desea continuar?', [
            { text: 'Si', onPress:() => confirm()},
            { text: 'No' }
          ]);

    }
    const confirm = async() => {
        await deleteData();
        navigation.navigate('Login');
        Alert.alert('Sesión Cerrada', '', [
            { text: 'OK'},
          ]);


    }
    const goToDeleteAccountSection = () => {
        console.log("Delete account section")
    }

    return (
        <Layout>
            <GoBack />
            <HStack>
                <Icon name='cog-outline' size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Ajustes</Text>
            </HStack>
            <ScrollView style={{ marginTop: 15 }}>
                <SettingsOption
                    backgroundColor="light.100"
                    text="Información personal"
                    icon="account"
                    nextScreen={goToPersonalInformationSection}
                />
                <SettingsOption
                    backgroundColor="light.100"
                    text="Información de la aplicación"
                    icon="information"
                    nextScreen={goToAppInformationSection}
                />
                <SettingsOption
                    backgroundColor="light.100"
                    text="Cerrar sesión"
                    icon="logout"
                    nextScreen={logOut}
                />
                <SettingsOption
                    backgroundColor="light.100"
                    text="Eliminar mi cuenta"
                    icon="account-remove"
                    nextScreen={goToDeleteAccountSection}
                />
            </ScrollView>
        </Layout>
    )
}

export default SettingsScreen;