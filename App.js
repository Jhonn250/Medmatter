import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TasksFormScreen from "./screens/TasksFormScreen.js";
import LoginScreen from "./screens/Login/LoginScreen.js";
import SignUpScreen from "./screens/SignUp/SignUpScreen.js";
import LoginScreenAfter from "./screens/LoginAfter/LoginScreenAfter.js";
import ResetPassword from "./screens/ResetPassword/ResetPassword.js";
import HomeApp from "./screens/HomeApp/HomeApp.js";
import { StatusBar } from "native-base";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
    <StatusBar backgroundColor={"#ebebeb"}/>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LoginAfter"
          component={LoginScreenAfter}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeApp"
          component={HomeApp}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        {/* <Stack.Screen
          name="Tasks"
          component={TasksFormScreen}
          options={{
            title: "Create a Task",
            headerStyle: { backgroundColor: "#222f3e" },
            headerTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default App;
