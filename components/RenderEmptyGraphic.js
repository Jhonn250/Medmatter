import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const RenderEmptyGraphic = () => {
    return (
        < >
            <View style={styles.main}>
                <Text style={{ fontFamily: 'REL', alignSelf: 'center', margin: 20, color:'#FFFFFF' }}>¡No se han registado datos!</Text>
            </View>
        </>

    )
}

export default RenderEmptyGraphic

const styles = StyleSheet.create({
    main: {
        height: 299,
        backgroundColor: "#727272",
        justifyContent :'center'
    }
})
