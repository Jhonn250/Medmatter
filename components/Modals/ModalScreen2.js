import { View, Text, Modal, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'

import Layout from '../Layout.js'
import { Button, HStack, Box } from 'native-base'
import DismissKeyboard from '../DismissKeyboard.js'

const ModalScreen2 = ({ isModalOpen, setisModalOpen,description, children }) => {

  return (
    <>
      <SafeAreaView>
        <Modal visible={isModalOpen} animationType='slide' transparent={true}>
          <View style={styles.modalContainerStyle}>
            <DismissKeyboard>
              <View style={styles.modalStyle}>
                <HStack justifyContent={'flex-end'} >
                  <Box justifyContent={'center'}>
                    <Text style={{fontFamily:'RBlack', fontSize:15}}>{description}</Text>
                  </Box>
                  <TouchableOpacity style={styles.close} onPress={() => setisModalOpen(!isModalOpen)}>
                    <Icon name="close" size={35} />
                  </TouchableOpacity>
                </HStack>
                <View style={styles.content}>
                  {children}
                </View>
              </View>
            </DismissKeyboard>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  )
}
export default ModalScreen2

const styles = StyleSheet.create({
  modalContainerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  modalStyle: {
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 20,
    paddingHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
    //width: '100%',
    height: '30%',
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