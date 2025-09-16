import React, { useMemo, useState, useRef } from "react";
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

  // Висота простору над SearchBar при скролі
  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 40], // від 0 до 40px при скролі
    extrapolate: "clamp",
  });

  // Масив JSX-компонентів для FlatList
  const listComponents = useMemo(() => {
    return [
      <Text key="title" style={styles.title}>
        Tickets
      </Text>,

      <Animated.View key="search">
        {/* Білий простір над SearchBar */}
        <Animated.View
          style={{ height: topSpacerHeight, backgroundColor: "#F3F4F6" }}
        />

        {/* Сам SearchBar */}
        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 16,
            paddingBottom: 10,
          }}
        >
          <SearchBar value={search} onChangeText={setSearch} />
        </View>
      </Animated.View>,

      <CategoryFilter
        key="category"
        options={categories}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />,

      ...filteredTodos.map((t) => (
        <TodoCard
          key={t.id}
          todo={t}
          onDelete={() =>
            removeTodo(filteredTodos.findIndex((ft) => ft.id === t.id))
          }
        />
      )),
    ];
  }, [filteredTodos, search, categoryFilter, topSpacerHeight]);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={listComponents}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
        stickyHeaderIndices={[1]} // тільки SearchBar sticky
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
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 34,
    marginBottom: 8,
    paddingHorizontal: 16,
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
