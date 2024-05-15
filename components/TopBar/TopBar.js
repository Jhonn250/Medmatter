import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

import styles from "./TopBarStyle.js";
import { Avatar } from "native-base";

const TopBar = () => {
    const [user, setUser] = useState({
      email: "user@email.com",
      firstName: "Usuario",
      lastName: "Test",
      sessionKey: "ASJDt9X872KOusz"
    });
    var userImageUri = "https://cdn.landesa.org/wp-content/uploads/default-user-image.png";

    return(
        <View style={styles.topBar}>
          <View style={styles.topBarUserContext}>
          <TouchableOpacity>
            <Avatar
              bg="green.500"
              size={"lg"}
              source={{ uri: userImageUri }}
            />
          </TouchableOpacity>
          <Text style={{
              fontFamily: "RBlack",
              fontSize: 28,
              paddingLeft: 10,
            }}>{"Bienvenido, " + user.firstName + "!"}</Text>
          </View>
          <View>
            <TouchableOpacity style={styles.topBarSettings}>
              <Icon name="cog-outline" size={38} />
            </TouchableOpacity>
          </View>
      </View>
    );
}

export default TopBar;