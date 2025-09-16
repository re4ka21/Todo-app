import React, { useRef, useState, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTodoStore } from "../store/TodoStore";
import SearchBar from "../components/SearchBar";
import TodoCard from "../components/TodoCard";
import CategoryFilter from "../components/CategoryFilter";

enum Category {
  AllTickets = "All tickets",
  MyTickets = "My tickets",
  Unassigned = "Unassigned",
  Bug = "Bug",
  Feature = "Feature",
  Improvement = "Improvement",
}

export default function HomeScreen() {
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearTodo = useTodoStore((state) => state.clearTodo);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<Category>(
    Category.AllTickets
  );

  const categories = Object.values(Category);
  const scrollY = useRef(new Animated.Value(0)).current;

  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [5, 65],
    extrapolate: "clamp",
  });

  // Фільтруємо туду
  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (categoryFilter === Category.AllTickets ||
            t.category === categoryFilter)
      )
      .map((t, i) => ({
        id: `REQ-${String(i + 1).padStart(3, "0")}`,
        ...t,
      }));
  }, [todos, search, categoryFilter]);

  // Дані для FlatList
  const flatListData = useMemo(() => {
    return [
      { type: "title", key: "title" },
      { type: "sticky", key: "search" },
      { type: "category", key: "category" },
      ...filteredTodos.map((todo) => ({
        type: "todo",
        key: todo.id,
        content: todo,
      })),
    ];
  }, [filteredTodos]);

  const renderItem = ({ item }: { item: any }) => {
    switch (item.type) {
      case "title":
        return <Text style={styles.title}>Tickets</Text>;

      case "sticky":
        return (
          <View style={styles.stickyWrapper}>
            <Animated.View style={{ height: topSpacerHeight }} />
            <SearchBar value={search} onChangeText={setSearch} />
          </View>
        );

      case "category":
        return (
          <CategoryFilter
            options={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        );

      case "todo":
        return (
          <TodoCard
            todo={item.content}
            onDelete={() =>
              removeTodo(
                filteredTodos.findIndex((t) => t.id === item.content.id)
              )
            }
          />
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={flatListData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        stickyHeaderIndices={[1]}
        contentContainerStyle={styles.listContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
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
    marginVertical: 9,
    marginTop: 46,
  },
  stickyWrapper: {
    backgroundColor: "#F3F4F6",
    zIndex: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  clearButton: {
    marginVertical: 12,
    alignSelf: "center",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
