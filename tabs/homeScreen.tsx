import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../context/TodoContext";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import TodoCard from "../components/TodoCard";
import CategoryFilter from "../components/CategoryFilter";

export default function HomeScreen() {
  const { todos, removeTodo, clearTodo } = useTodos();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    | "All tickets"
    | "My tickets"
    | "Unassigned"
    | "Bug"
    | "Feature"
    | "Improvement"
  >("All tickets");

  const categories = [
    "All tickets",
    "My tickets",
    "Unassigned",
    "Bug",
    "Feature",
    "Improvement",
  ] as const;

  const timeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const todosData = todos
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter === "All tickets" || t.category === categoryFilter)
    )
    .map((t, i) => ({
      id: `REQ-${(i + 1).toString().padStart(3, "0")}`,
      ...t,
    }));

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <Text style={styles.title}>Tickets</Text>

      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.filterWrapper}>
        <CategoryFilter
          options={categories || []}
          selected={categoryFilter}
          onSelect={setCategoryFilter}
        />
      </View>

      <FlatList
        data={todosData}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TodoCard
            todo={item}
            onDelete={() => removeTodo(index)}
            timeAgo={timeAgo}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity onPress={clearTodo} style={styles.clearButton}>
        <Text style={styles.deleteText}>Delete all tickets</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
    marginTop: 46,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    marginBottom: 12,
  },
  filterWrapper: {
    paddingVertical: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
  clearButton: {
    marginTop: 10,
    alignSelf: "center",
  },
});
