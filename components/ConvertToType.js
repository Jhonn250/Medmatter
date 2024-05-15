import { Text, Image } from "react-native";
import React from "react";
import styles from '../screens/Medicine/MedicineScreenStyle.js'

export const GetSex = ({ value }) => {
    var type;

    if (value === 0) {
        type = 'Masculino';

    }
    if (value === 1) {
        type = 'Femenino';

    }
    if (value === 2) {
        type = 'Otro';

    }
    return (
        <Text>{type}</Text>
    )
}

export const GetRace = ({ value }) => {
    var type;

    if (value === 0) {
        type = 'Caucásica';

    }
    if (value === 1) {
        type = 'Africana';

    }
    if (value === 2) {
        type = 'Mongólica';

    }
    if (value === 3) {
        type = 'Amerindia';

    }
    if (value === 4) {
        type = 'Prefiero no decir';

    }
    if (value === 5) {
        type = 'Otro';
    }

    return (
        <Text>{type}</Text>
    )
}

export const GetTypeofBlood = ({ value }) => {
    var type;

    if (value === 0) {
        type = 'A+';

    }
    if (value === 1) {
        type = 'A-';

    }
    if (value === 2) {
        type = 'B+';

    }
    if (value === 3) {
        type = 'B-';

    }
    if (value === 4) {
        type = 'AB+';

    }
    if (value === 5) {
        type = 'AB-';

    }
    if (value === 6) {
        type = 'O+';

    }
    if (value === 7) {
        type = 'O-';

    }
    return (
        <Text>{type}</Text>
    )
}

export const GetHypertension = ({value}) => {
    var type;

    if(value === true){
        type = 'Si'
    }
    if(value ===  false){
        type = 'No'
    }
    return (
        <Text>{type}</Text>
    )
}

export const GetSmoker = ({value}) => {
    var type;

    if(value === true){
        type = 'Si'
    }
    if(value ===  false){
        type = 'No'
    }
    return (
        <Text>{type}</Text>
    )
}

export const GetLimitation = ({value}) => {
    var type;
    if (value.type === 0) {
        type = 'Física';

    }
    if (value.type === 1) {
        type = 'Intelectual';

    }
    if (value.type === 2) {
        type = 'Mental';

    }
    if (value.type === 3) {
        type = 'Psicosocial';

    }
    if (value.type === 4) {
        type = 'Múltiple';

    }
    if (value.type === 5) {
        type = 'Sensorial';

    }
    if (value.type === 6) {
        type = 'Auditiva';

    }
    if (value.type === 7) {
        type = 'Visual';

    }
    if (value.type === 8) {
        type = value.description;
    }
    return (
        <Text>{type}</Text>
    )
}

export const GetImage = ({ type }) => {
    if (type === null) {
      return (
        <Image style={styles.tinyLogo} source={require("../assets/pills/default.png")} />
      )
    }
    if (type === 0) {
      return (
        <Image style={styles.tinyLogo} source={require("../assets/pills/default.png")} />
      )
    }
    if (type === 1) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill1.png')} />
      )
    }
    if (type === 2) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill2.png')} />
      )
    }
    if (type === 3) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill3.png')} />
      )
    }
    if (type === 4) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill4.png')} />
      )
    }
    if (type === 5) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill5.png')} />
      )
    }
    if (type === 6) {
      return (
        <Image style={styles.tinyLogo} source={require('../assets/pills/pill6.png')} />
      )
    }

  }

