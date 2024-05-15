import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";
import React from "react";

const images = [
  "/Users/jhonn250/Documents/GitHub/mm-fe/assets/healthAssets/healthcare.webp",
  // "/Users/jhonn250/Documents/GitHub/mm-fe/assets/healthAssets/healthcare.webp",
  "https://cdn01.alison-static.net/public/html/site/img/email/healthcare-hub-header-img.png",
  "https://img.freepik.com/premium-vector/charactes-people-holding-health-icons-illustration_53876-25976.jpg",
];

const imagenes = [
  "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2425&q=80",
  "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
  "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80",
  "https://images.unsplash.com/photo-1503756234508-e32369269deb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  "https://images.unsplash.com/photo-1504681869696-d977211a5f4c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=652&q=80",
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.9;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) / 3;
const ESPACIO = 10;
const ALTURA_BACKDROP = height * 0.5;

const DisplayImages = (children) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imagenes}
        horizontal={true}
        //showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: "15%" }}
        decelerationRate={0}
        snapToInterval={width * 0.1}
        scrollEventThrottle={16}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.contenedorImagen}>
              {/* <Text>HOLA</Text> */}
              <View style={{ alignItems: "center" }}>
                <Image source={{ uri: item }} style={styles.posterImage} />
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default DisplayImages;

const styles = StyleSheet.create({
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  contenedorImagen: {
    height: height * 0.3,
    width: ANCHO_CONTENEDOR,
  },
});
