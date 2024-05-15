// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import React, { useState, useEffect } from "react";

// import Layout from "../components/Layout";
// import { saveTask, getTask, updateTask } from "../Api";

// const TasksFormScreen = ({ navigation, route }) => {
//   const [task, setTask] = useState({
//     name: "",
//     address: "",
//   });

//   const [editing, setEditing] = useState(false);

//   const handleChange = (name, value) => setTask({ ...task, [name]: value });

//   const handleSubmit = async () => {
//     try {
//       if (!editing) {
//         await saveTask(task);
//       } else {
//         await updateTask(route.params.id, task);
//       }
//       navigation.navigate("Home");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (route.params && route.params.id) {
//       navigation.setOptions({ headerTitle: "Updating a task" });
//       setEditing(true);

//       (async () => {
//         const task = await getTask(route.params.id);
//         setTask({ name: task.name, address: task.address });
//       })();
//     }
//   }, []);

//   return (
//     <Layout>
//       <TextInput
//         style={styles.input}
//         placeholder="Write a Title"
//         placeholderTextColor="#576574"
//         onChangeText={(text) => handleChange("name", text)}
//         value={task.name}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Write a Description"
//         placeholderTextColor="#576574"
//         onChangeText={(text) => handleChange("address", text)}
//         value={task.address}
//       />
//       {!editing ? (
//         <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Save Task</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
//           <Text style={styles.buttonText}>Update Task</Text>
//         </TouchableOpacity>
//       )}
//     </Layout>
//   );
// };

// const styles = StyleSheet.create({
//   input: {
//     width: "90%",
//     marginBottom: 7,
//     fontSize: 15,
//     borderWidth: 1,
//     borderColor: "#10ac84",
//     height: 35,
//     color: "#ffffff",
//     padding: 4,
//     textAlign: "center",
//     borderRadius: 5,
//   },
//   buttonSave: {
//     paddingTop: 10,
//     paddingBottom: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     backgroundColor: "#10ac83",
//     width: "90%",
//   },
//   buttonText: {
//     color: "#ffffff",
//     textAlign: "center",
//   },
//   buttonUpdate: {
//     padding: 10,
//     paddingBottom: 10,
//     borderRadius: 5,
//     marginBottom: 10,
//     backgroundColor: "#e58e26",
//     width: "90%",
//   },
// });

// export default TasksFormScreen;
