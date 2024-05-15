import React, { useContext, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Box, VStack } from "native-base";
import Layout from '../../components/Layout.js';
import GoBack from '../../components/GoBack.js';
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { HStack } from 'native-base';
import UserContext from "../../components/contexts/UserContext.js";
import ModalScreen from "../../components/Modals/ModalScreen0.js";
import RegisterMedicProfileScreen from '../RegisterMedicProfile/RegisterMedicProfileScreen.js';
import { getMedicalProfile } from '../../util/api/medical.js';

const ProfileScreen = () => {
  const { users } = useContext(UserContext);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [medicalList, setMedicalList] = useState(new Object([]));

  const getMedicalProfileData = () => {
    setisModalOpen(!isModalOpen);
    getMedicalProfile()
      .then((res) => res.json())
      .then((data) => setMedicalList(data))
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <GoBack />
      <HStack>
        <Icon name='account' size={30} />
        <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Información Personal</Text>
      </HStack>

      <ScrollView style={{ marginTop: 15 }}>
        <HStack>
          <VStack style={{ width: '92%' }}>
            <Box marginBottom={2}>
              <View>
                <Text style={{ fontFamily: 'RBold', fontSize: 18 }}>Nombre:</Text>
                <Text style={{ fontFamily: 'REL', fontSize: 16 }}>{users.firstName}</Text>

              </View>
            </Box>
            <Box marginBottom={2}>
              <View>
                <Text style={{ fontFamily: 'RBold', fontSize: 18 }}>Apellido:</Text>
                <Text style={{ fontFamily: 'REL', fontSize: 16 }}>{users.lastName}</Text>

              </View>
            </Box>
            <Box marginBottom={2}>
              <View>
                <Text style={{ fontFamily: 'RBold', fontSize: 18 }}>Correo:</Text>
                <Text style={{ fontFamily: 'REL', fontSize: 16 }}>{users.email}</Text>
              </View>
            </Box>
            <Box marginBottom={2}>
              <View>
              </View>
            </Box>
          </VStack>
          <TouchableOpacity onPress={() => getMedicalProfileData()}>
            <Icon name="note-edit-outline" size={30} />
          </TouchableOpacity>
        </HStack>
      </ScrollView>

      <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar Perfil Médico'}>
        <RegisterMedicProfileScreen list={medicalList} index={0} editing={true} isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} />
      </ModalScreen>
    </Layout>
  )
}

export default ProfileScreen;