import React, { FC, ReactElement, useRef, useState } from "react";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { Center } from "native-base";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
} from "react-native";

interface Props {
  label: string;
  data: Array<{ label: string; value: string; }>;
  onSelect: (item: { label: string; value: string; }) => void;
}

const Dropdown: FC<Props> = ({ label, data, onSelect }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(undefined);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = (): void => {
    DropdownButton.current.measure(
      (
        _fx: number,
        _fy: number,
        _w: number,
        h: number,
        _px: number,
        py: number
      ) => {
        setDropdownTop(py + h);
      }
    );
    setVisible(true);
  };

  const onItemPress = (item: any): void => {
    setSelected(item);
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }: any): ReactElement<any, any> => (
    <>
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Center>
        {item.value === 0 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/default.png")}
          />
        )}
        {item.value === 1 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill1.png")}
          />
        )}
        {item.value === 2 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill2.png")}
          />
        )}
        {item.value === 3 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill3.png")}
          />
        )}
        {item.value === 4 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill4.png")}
          />
        )}
        {item.value === 5 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill5.png")}
          />
        )}
        {item.value === 6 && (
          <Image
            style={styles.tinyLogo}
            source={require("../assets/pills/pill6.png")}
          />
        )}
        </Center>
      </TouchableOpacity>
    </>
  );

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <TouchableOpacity
      ref={DropdownButton}
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>
        {(!!selected && selected.label) || label}
      </Text>
      <Icon style={styles.icon} name="chevron-down" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    zIndex: 1,
    borderColor: "#d7d7d7",
    borderWidth: 1,
    borderRadius: 4,
  },
  buttonText: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    width: "93.5%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    borderColor: "#d7d7d7",
    borderWidth: 1,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: "#d7d7d7",
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});

export default Dropdown;
