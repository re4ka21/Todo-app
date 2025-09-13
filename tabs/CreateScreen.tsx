import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTodos, Todo } from "../context/TodoContext";
import TextInputField from "../components/TextInputField";
import SelectButton from "../components/SelectButton";
import SelectModal from "../components/SelectModal";
import { SafeAreaView } from "react-native-safe-area-context";

const categories = [
  "My tickets",
  "Unassigned",
  "Bug",
  "Feature",
  "Improvement",
  "Task",
  "Documentation",
] as const;

const statuses = ["open", "in progress"] as const;

export default function Create() {
  const { addTodo } = useTodos();

  const [text, setText] = useState("");
  const [category, setCategory] =
    useState<(typeof categories)[number]>("My tickets");
  const [status, setStatus] = useState<"open" | "in progress">("open");

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const handleAdd = () => {
    if (!text.trim()) return;

    addTodo({
      title: text.trim(),
      category,
      status,
      createdAt: new Date(),
    });
    setText("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create Todo</Text>

      <TextInputField
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
        options={Array.from(categories)}
        selected={category}
        onSelect={setCategory}
        onClose={() => setCategoryModalVisible(false)}
      />

      <SelectModal
        visible={statusModalVisible}
        options={Array.from(statuses)}
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
  container: { padding: 16 },
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
  addButtonText: { color: "white", fontWeight: "700" },
});
