import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { HStack, Divider, Box, VStack } from 'native-base';
import * as ConverToType from "../../components/ConvertToType";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import ModalScreen2 from "../../components/Modals/ModalScreen2";
import ModalScreen from "../../components/Modals/ModalScreen";
import styles from './MedicineScreenStyle.js'
import RegisterMedicineScreen from "../RegisterMedicine/RegisterMedicineScreen";
import { getFixedDate } from "../../util/other/GetFormattedDate";
import info from "../../util/info/info";

const MedicineItem = ({ drugList, handleDelete, reload }) => {
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isModalOpen2, setisModalOpen2] = useState(false);
    const changeModal = () => {
        setisModalOpen2(false);
        setisModalOpen(true);
    }
    return (
        <>
            <TouchableOpacity onPress={() => setisModalOpen2(!isModalOpen2)} style={styles.medicineBox}>
                <HStack>
                    <Box style={styles.logoBox}>
                        <ConverToType.GetImage type={drugList.type} />
                    </Box>
                    <>
                        <VStack>
                            <HStack>
                                <Box width={'80%'}>
                                    <Text style={{ fontFamily: 'RBold', marginTop: '2%', paddingLeft: '4%', fontSize: 15 }}>{drugList.name} ({drugList.dose} mg)</Text>
                                </Box>
                                <Box paddingRight={'1%'}>
                                    {
                                        drugList.isTaking ? (
                                            <Icon name="circle-slice-8" color={'#0d7308'} size={30} />
                                        ) : (
                                            <Icon name="circle-slice-8" color={'#d91414'} size={30} />
                                        )
                                    }
                                </Box>
                            </HStack>
                            <HStack>
                                <Text style={{ paddingLeft: '2%', fontFamily: 'RBold', fontSize: 14 }}>{drugList.timesDay}</Text>
                                <Text style={{ fontFamily: 'RR', fontSize: 14 }}> veces al dia, durante </Text>
                                <Text style={{ fontFamily: 'RBold', fontSize: 14 }}>{drugList.timesWeek}</Text>
                                <Text style={{ fontFamily: 'RR', fontSize: 14 }}> semanas.</Text>
                            </HStack>
                            <HStack>
                                <Text style={{ paddingLeft: '2%', fontFamily: 'RBold', fontSize: 14 }}>{drugList.remainingUnits}</Text>
                                <Text style={{ fontFamily: 'RR', fontSize: 14 }}> pastillas restantes.</Text>
                            </HStack>
                        </VStack>
                    </>
                </HStack>
            </TouchableOpacity>
            <Divider w="100%" />

            <ModalScreen2 isModalOpen={isModalOpen2} setisModalOpen={setisModalOpen2}>
                <HStack alignSelf={'flex-end'} space={'5%'}>
                    <Text style={{ fontFamily: 'RBlack', fontSize: 16 }}>{drugList.name}</Text>
                    <HStack>
                        <TouchableOpacity onPress={() => handleDelete(drugList.id)}>
                            <Icon name="delete" size={30} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => changeModal()}>
                            <Icon name="note-edit-outline" size={30} />
                        </TouchableOpacity>
                    </HStack>
                </HStack>

                <ScrollView style={{ flex: 1 }}>
                    <VStack marginTop={'1%'}>
                        <Box marginBottom={1}>
                            <Text style={styles.moreOptions}>Propósito:</Text>
                            {!drugList.purpose ? (<Text style={styles.moreOptionsDefault}>{info.defaultText}</Text>) : (<Text style={styles.moreOptionsLight}>{drugList.purpose}</Text>)}
                        </Box>

                        <HStack space={'10%'}>
                            <Box marginBottom={1}>
                                <Text style={styles.moreOptions}>Se consume desde:</Text>
                                <Text style={styles.dates}>{getFixedDate(drugList.startedTaking)}</Text>
                            </Box>
                            {!drugList.stoppedTaking ? (<Box marginBottom={1} />
                            ) : (<Box marginBottom={1}>
                                <Text style={styles.moreOptions}>Se consume hasta:</Text>
                                <Text style={styles.dates}>{getFixedDate(drugList.stoppedTaking)}</Text>
                            </Box>
                            )}

                        </HStack>
                        <Box marginBottom={10} paddingRight={2}>
                            <Text style={styles.moreOptions}>Notas:</Text>
                            {!drugList.notes ? (<Text style={styles.moreOptionsDefault}>{info.defaultText}</Text>) : (<Text style={styles.moreOptionsLight}>{drugList.notes}</Text>)}

                        </Box>
                    </VStack>
                </ScrollView>

            </ModalScreen2>
            <Box style={{ marginTop: '5%' }}></Box>

            <ModalScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} description={'Editar medicamento'}>
                <RegisterMedicineScreen isModalOpen={isModalOpen} setisModalOpen={setisModalOpen} newDrug={drugList} reload={reload} editing={true} list={drugList} />
            </ModalScreen>
        </>
    );
};

export default MedicineItem;
