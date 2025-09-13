import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodos } from "../context/TodoContext";
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

  const scrollY = useRef(new Animated.Value(0)).current;

  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 100], // скрол 0–100 px
    outputRange: [5, 50], // висота spacer від 5 до 50
    extrapolate: "clamp",
  });

  const timeAgo = (date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  };

  const filteredTodos = todos
    .filter(
      (t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) &&
        (categoryFilter === "All tickets" || t.category === categoryFilter)
    )
    .map((t, i) => ({
      id: `REQ-${(i + 1).toString().padStart(3, "0")}`,
      ...t,
    }));

  const flatListData: Array<{ type: string; key: string; content?: any }> = [
    { type: "title", key: "title" },
    { type: "sticky", key: "search" },
    { type: "category", key: "category" },
    ...filteredTodos.map((todo) => ({
      type: "todo",
      key: todo.id,
      content: todo,
    })),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={flatListData}
        keyExtractor={(item) => item.key}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        renderItem={({ item }) => {
          if (item.type === "title") {
            return <Text style={styles.title}>Tickets</Text>;
          }
          if (item.type === "sticky") {
            return (
              <View style={styles.stickyWrapper}>
                <Animated.View style={{ height: topSpacerHeight }} />
                <SearchBar value={search} onChangeText={setSearch} />
              </View>
            );
          }
          if (item.type === "category") {
            return (
              <CategoryFilter
                options={categories}
                selected={categoryFilter}
                onSelect={setCategoryFilter}
              />
            );
          }
          return (
            <TodoCard
              todo={item.content}
              onDelete={() =>
                removeTodo(
                  filteredTodos.findIndex((t) => t.id === item.content.id)
                )
              }
              timeAgo={timeAgo}
            />
          );
        }}
        stickyHeaderIndices={[1]}
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
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginVertical: 16,
  },
  stickyWrapper: {
    backgroundColor: "#F3F4F6",
    zIndex: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
  clearButton: {
    marginVertical: 12,
    alignSelf: "center",
  },
});
