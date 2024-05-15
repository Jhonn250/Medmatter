import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, VStack, Divider } from "native-base";

const TaskItem = ({ task, handleDelete, type }) => {
  const navigation = useNavigation();

  return (
    <>
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("Tasks", { id: task.id })}>
        <HStack>
        <Text style={styles.itemTitle}>{task.value}</Text>
        </HStack>
        <HStack>
        <Text style={styles.itemBold}>Fecha: </Text>
        <Text style={styles.itemTitle}>{task.date}</Text>
        </HStack>
      </TouchableOpacity>

      <TouchableOpacity
        style={{ backgroundColor: "#212121", padding: 7, borderRadius: 5 }}
        onPress={() => handleDelete(task.id)}
      >
        <Text style={{color:'#FFFFFF'}}>Eliminar</Text>
      </TouchableOpacity>
    </View>
    <View><Divider w="100%" /></View>
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    paddingBottom: 0,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    color: "#000000",
    fontFamily:'RR',
  },
  itemBold: {
    fontFamily:"RBold",
    color: "#000000",
  }
});

export default TaskItem;
