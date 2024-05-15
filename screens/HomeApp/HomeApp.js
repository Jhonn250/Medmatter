import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import HomeScreen from "../../screens/HomeScreen/HomeScreen.js";
import MedicProfileScreen from "../MedicProfile/MedicProfileScreen.js";
import MedicineScreen from "../Medicine/MedicineScreen.js";
import TrackingScreen from '../Tracking/TrackingScreen.js';
import VaccineScreen from '../Vaccine/VaccineScreen.js';
import AppointmentScreen from '../Appointments/AppointmentScreen.js';
import IAScreen from '../IA/IAScreen.js';
import ExportDataScreen from '../ExportData/ExportData.js';
import RegisterMedicProfileScreen from "../RegisterMedicProfile/RegisterMedicProfileScreen.js";
import WeightScreen from "../TrackingComponents/Weights/WeightScreen.js";
import BloodPreasureScreen from "../TrackingComponents/BloodPreasure/BloodPreasureScreen.js";
import SugarScreen from "../TrackingComponents/Sugar/SugarScreen.js";
import CholesterolScreen from "../TrackingComponents/Cholesterol/CholesterolScreen.js";
import TemperatureScreen from "../TrackingComponents/Temperature/TemperatureScreen.js";
import UserState from "../../components/contexts/UserState.js";
import SettingsScreen from "../Settings/SettingsScreen.js";
import ProfileScreen from "../Profile/ProfileScreen.js";
import MadeBy from "../MadeBy/MadeBy.js";

const Stack = createNativeStackNavigator();

const HomeApp = () => {
    return (
            <UserState>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="MedicProfileScreen"
                        component={MedicProfileScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="MedicineScreen"
                        component={MedicineScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="TrackingScreen"
                        component={TrackingScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="VaccineScreen"
                        component={VaccineScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="AppointmentScreen"
                        component={AppointmentScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="IAScreen"
                        component={IAScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="ExportDataScreen"
                        component={ExportDataScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="RegisterProfile"
                        component={RegisterMedicProfileScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="WeightScreen"
                        component={WeightScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="BloodPreasure"
                        component={BloodPreasureScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="SugarScreen"
                        component={SugarScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="CholesterolScreen"
                        component={CholesterolScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="TemperatureScreen"
                        component={TemperatureScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Settings"
                        component={SettingsScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Profile"
                        component={ProfileScreen}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="MadeBy"
                        component={MadeBy}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </UserState>
    );
};

export default HomeApp;
