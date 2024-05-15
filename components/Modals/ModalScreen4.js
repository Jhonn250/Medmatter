import { View, Text, Modal, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

import { HStack, Box } from 'native-base'
import DismissKeyboard from '../DismissKeyboard.js'

const ModalScreen4 = ({ isModalOpen, setisModalOpen, description, children }) => {

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
                    <Icon name="close" size={35} />
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
export default ModalScreen4;

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalStyle: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    // width: '80%',
    height: '65%',
  },
  close: {
    alignSelf: 'flex-end',
    marginVertical: 11,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

})