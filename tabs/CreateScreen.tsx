import { useState, useCallback, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTodoStore } from "../store/TodoStore";

import SelectButton from "../components/Buttons/SelectButton";
import SelectModal from "../components/SelectModal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Category, Status } from "../constant";
import InputField from "@/components/InputField";

export default function Create() {
  const { addTodo } = useTodoStore();

  const [text, setText] = useState("");
  const [category, setCategory] = useState<Category>(Category.MyTickets);
  const [status, setStatus] = useState<Status>(Status.Open);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const categoryOptions = useMemo(
    () => Object.values(Category).filter((c) => c !== Category.AllTickets),
    []
  );
  const statusOptions = useMemo(() => Object.values(Status), []);

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;

    addTodo({
      title: text.trim(),
      category,
      status,
      createdAt: new Date(),
    });

    setText("");
  }, [text, category, status, addTodo]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Todo</Text>

      <InputField
        value={text}
        onChangeText={setText}
        placeholder="Enter task"
      />

      <SelectButton
        label="Category"
        value={category}
        onPress={() => setCategoryModalVisible(true)}
      />
      <SelectButton
        label="Status"
        value={status}
        onPress={() => setStatusModalVisible(true)}
      />

      <SelectModal
        visible={categoryModalVisible}
        options={categoryOptions}
        selected={category}
        onSelect={setCategory}
        onClose={() => setCategoryModalVisible(false)}
      />

      <SelectModal
        visible={statusModalVisible}
        options={statusOptions}
        selected={status}
        onSelect={setStatus}
        onClose={() => setStatusModalVisible(false)}
      />

      <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: "#047857",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "700",
  },
});
