import React, { useState } from 'react';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons'
import Layout from '../../components/Layout'
import GoBack from '../../components/GoBack'
import styles from './IAStyle.js';
import { Box, HStack, ScrollView } from 'native-base';
import { upload } from '../../Api';
import { APIHost, host } from '../../util/info/info';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AnimatedLoader from "react-native-animated-loader";


const loadingStyle = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100,
    },
  });

const IAScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [imageData, setImageData] = useState(null);

    const renderImageData = () => {
        return (
            <>
                <Text style={styles.title}>{imageData.name}</Text>
                {imageData.concentration != "" ? <Text style={styles.subtitle}>{"Concentración: " + imageData.concentration}</Text> : null}
                {imageData.route_of_administration != "" ? <Text style={styles.subtitle}>{imageData.route_of_administration}</Text> : null}
                <Text style={styles.text}>{imageData.purpose}</Text>
            </>
        )
    }

    const uploadImage = async (uri) => {
        try {
            setIsLoading(true);
            const formData = new FormData();
            formData.append('image', {
                uri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            });

            upload(formData)
                .then((res) => res.json())
                .then((data) => {
                    setImageData(data)
                    setIsLoading(false)
                })
        } catch (error) {
            console.log("Unable to upload image", error)
            setIsLoading(false);
        }
    };

    const choosePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        const result = await ImagePicker.launchCameraAsync();
        if (!result.canceled) {
            let takenImage = result.assets[0].uri;
            uploadImage(takenImage);
            setImage(takenImage);
        }
    };

    return (
        <Layout>
            <GoBack />
            <HStack>
                <Icon name='robot' size={30} />
                <Text style={{ fontFamily: "RBold", fontSize: 20, marginBottom: '10%', marginLeft: '3%' }}>Detección de Medicamentos</Text>
            </HStack>
            {isLoading == true ?
                <>
                    <AnimatedLoader
                        visible={true}
                        source={require("../../assets/loading.json")}
                        overlayColor="rgba(255,255,255,0.25)"
                        speed={1}
                        animationStyle={loadingStyle.lottie}
                    >
                    </AnimatedLoader>
                </>
                :
                <>
                    <View style={styles.container}>
                        <Text style={styles.presentation}>
                            Toma una foto de la caja/bote de tu medicamento en donde se vea
                            el nombre y te brindaremos información importante del mismo.
                        </Text>
                        {image === null ? "" :
                            <Image
                                source={{ uri: image }}
                                style={styles.camera}
                            />
                        }
                        <TouchableOpacity onPress={choosePhoto}>
                            <Text style={styles.button}>
                                {image == null ? "Tomar una foto" : "Tomar una nueva foto"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        {imageData === null ? null : renderImageData()}
                    </ScrollView>
                </>
            }
        </Layout >

    );
}

export default IAScreen