import { FlatList, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { getTasks, deleteTask } from "../Api.js";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [tasks, setTaks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const isFocused = useIsFocused();

  const loadTask = async () => {
    const data = await getTasks();
    setTaks(data);
  };
  useEffect(() => {
    loadTask();
  }, [isFocused]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTask();
  };

  const renderItem = ({ item }) => {
    //return <Text>{item.name}</Text>
    return <TaskItem task={item} handleDelete={handleDelete} />;
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTask();
    setRefreshing(false);
  });

  return (
    <FlatList
      style={{ width: "100%" }}
      data={tasks}
      keyExtractor={(item) => item.id + ""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={["#ffffff"]}
          tintColor="#ffffff"
          title="Refreshing"
          titleColor="#ffffff"
          onRefresh={onRefresh}
        />
      }
    />
  );
};

export default TaskList;
