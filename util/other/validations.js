import { Alert } from "react-native";

export const isValidText = (text) => {
  if (text == null || text == '') return false;
  return true;
}

export const isValidEmail = (text) => {
  let pattern = /[a-zA-Z\d*]+@[a-zA-Z]+.[a-zA-Z]{1,3}/g;
  return pattern.test(text);
}

export const isNumeric = (text) => {
  if (text) {
    return !isNaN(text);
  }
  return false
}

export const isSelected = (text) => {
  if (text) {
    return true;
  }
  return false
}

export const isEmpty = (object) => {
  try {
    if (object === []) {
      return true;
    }

    if (object === undefined) {
      return true;
    }

    if (object.bloodType === null) {
      if (object.hasHypertension === null) {
        if (object.height === null) {
          if (object.sex === null) {
            return true;
          }
        }
      }
    }
    else {
      if (Object.entries(object).length === 0) {
        return true;
      }
    }
    return false;

  } catch (error) {
    console.log(error);

  }

}

export const checkAllergyFields = (value) => {
  if (isValidText(value.name)) {
    if (!isNumeric(value.name)) {
      return true;
    }
    else {
      Alert.alert('Error', 'No puede contener números', [
        { text: 'OK', },])
    }
  }
  else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }

  return false;
}

export const checkPickerSelect = (value) => {
  if (value !== undefined || value !== undefined) {
    return true;
  }
  return false
}

export const checkDiseaseFields = (value) => {
  if (checkPickerSelect(value.type)) {
    if (value.type === 8) {
      if (isValidText(value.description)) {
        if (!isNumeric(value.description)) {
          return true;
        } else {
          Alert.alert('Error', 'No puede contener números', [
            { text: 'OK', },])
        }
      } else {
        Alert.alert('Error', 'Campo vacío', [
          { text: 'OK', },])
      }
    } else { return true }
  } else {
    Alert.alert('Error', 'No se ha seleccionado opción', [
      { text: 'OK', },])
  }
}

export const checkSurgerieFields = (value) => {
  if (isValidText(value.name) && isValidText(value.place) && isValidText(value.date)) {
    if (!isNumeric(value.name) && !isNumeric(value.place)) {
      return true;
    } else {
      Alert.alert('Error', 'No puede contener números', [
        { text: 'OK', },])
    }
  } else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }
  return false;
}

export const checkConditionFields = (value, isSecondDateActive) => {
  if (isValidText(value.name) && isValidText(value.description) && isValidText(value.startDate)) {
    if (!isNumeric(value.name) && !isNumeric(value.description)) {
      if (isSecondDateActive) {
        if (isValidText(value.endDate)) {
          return true;
        } else {
          Alert.alert('Error', 'Campo vacío', [
            { text: 'OK', },])
        }
      }
      else { return true }
    } else {
      Alert.alert('Error', 'No puede contener números', [
        { text: 'OK', },])
    }
  } else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }
  return false;
}

export const checkRegisterMedicine = (value) => {
  if (isValidText(value.name) && isValidText(value.dose) && isValidText(value.startedTaking)) {
    if (isNumeric(value.dose) && isNumeric(value.remainingUnits)) {
      if (checkPickerSelect(value.timesDay) && checkPickerSelect(value.timesWeek)) {
        if (value.stoppedTaking) {
          if (isValidText(value.stoppedTaking)) {
            return true;
          } else {
            Alert.alert('Error', 'Campo vacío', [
              { text: 'OK', },])
          }
        } else { return true }

      } else {
        Alert.alert('Error', 'Campo vacío', [
          { text: 'OK', },])
      }
    } else {
      Alert.alert('Error', 'Solo puede contener números', [
        { text: 'OK', },])
    }
  } else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }
}

export const checkRegisterVaccines = (value) => {
  if (isValidText(value.name) && isValidText(value.vaccinationDates[value.vaccinationDates.length - 1])) {
    if (!isNumeric(value.name)) {
      return true;

    }
    else {
      Alert.alert('Error', 'No puede iniciar con números', [
        { text: 'OK', },])
    }
  }
  else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }
}

export const checkRegisterAppointment = (value) => {
  if (isValidText(value.place) && isValidText(value.date)) {
    if (value.doctor) {
      if (isValidText(value.doctor)) {
        if (!isNumeric(value.doctor)) {
          return true;
        } else {
          Alert.alert('Error', 'No puede contener números', [
            { text: 'OK', },])
        }
      } else {
        Alert.alert('Error', 'Campo vacío', [
          { text: 'OK', },])
      }
    } else { return true }
  } else {
    Alert.alert('Error', 'Campo vacío', [
      { text: 'OK', },])
  }
}