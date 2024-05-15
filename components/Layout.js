import { View, StyleSheet, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useCallback } from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import DismissKeyboard from "./DismissKeyboard";

const Layout = ({ children }) => {

  ///////////////////////////////////////////////////////CUSTOM FONTS

  const [fontsLoaded] = useFonts({
    RR: require("../assets/fonts/R-R.ttf"),
    RBold: require("../assets/fonts/R-Bold.ttf"),
    RBlack: require("../assets/fonts/R-Black.ttf"),
    RT: require("../assets/fonts/R-T.ttf"),
    REL: require("../assets/fonts/R-EL.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;
  /////////////////////////////////////////////////////////////
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container} onLayout={onLayout}>
        <DismissKeyboard>
          <NativeBaseProvider>
              {children}
          </NativeBaseProvider>
        </DismissKeyboard>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    flex: 1,
  },
});

export default Layout;
