import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@user_key', jsonValue)
    } catch (e) {
        console.log(e);
    }
}
export const deleteData = async()=>{
    try {
        await AsyncStorage.clear();
    } catch (e) {
        console.log(e);
    }
}

export const getData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_key')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

export const getToken = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@user_key')
        if (jsonValue != null ? JSON.parse(jsonValue) : null){

            return jsonValue.sessionKey;
        }
        return null;

    } catch (e) {
        console.log('error');
        console.log(e);
    }
}




