import { View, Text, Modal, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

import { HStack, Box } from 'native-base'
import DismissKeyboard from '../DismissKeyboard.js'

const ModalScreen3 = ({ isModalOpen, setisModalOpen, description, children }) => {

  return (
    <>
      <SafeAreaView>
        <Modal visible={isModalOpen} animationType='slide' transparent={true}>
          <View style={styles.modalContainerStyle}>
            <DismissKeyboard>
              <View style={styles.modalStyle}>
                <HStack justifyContent={'flex-end'} >
                  <Box justifyContent={'center'}>
                    <Text style={{ fontFamily: 'RBlack', fontSize: 15, color: '#000000' }}>{description}</Text>
                  </Box>
                  <TouchableOpacity style={styles.close} onPress={() => setisModalOpen(!isModalOpen)}>
                    <Icon color={'#000000'} name="close" size={35} />
                  </TouchableOpacity>
                </HStack>
                <View style={styles.content}>
                  <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : null}>
                    {children}
                  </KeyboardAvoidingView>
                </View>
              </View>
            </DismissKeyboard>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  )
}
export default ModalScreen3

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalStyle: {
    backgroundColor: '#FFFFFF',
    margin: 8,
    borderRadius: 20,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    //width: '80%',
    height: '45%',
  },
  close: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

})