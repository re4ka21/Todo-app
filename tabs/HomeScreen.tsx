import React, { useMemo, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { useTodoStore } from "../store/TodoStore";
import SearchBar from "../components/SearchBar";
import TodoCard from "../components/TodoCard";
import CategoryFilter from "../components/CategoryFilter";
import CustomFlatList from "../components/CustomFlatList";
import { Category } from "./TicketTypes";

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const {
    todos,
    removeTodo,
    clearTodo,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
  } = useTodoStore();
  const categories = Object.values(Category);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (categoryFilter === Category.AllTickets ||
            t.category === categoryFilter)
      )
      .map((t, i) => ({
        ...t,
        displayId: `REQ-${String(i + 1).padStart(3, "0")}`,
      }));
  }, [todos, search, categoryFilter]);

  const handleDeleteAll = useCallback(() => clearTodo(), [clearTodo]);

  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [170, 100],
    extrapolate: "clamp",
  });

  const bgColor = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: ["transparent", "white"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <CustomFlatList
        data={filteredTodos}
        scrollY={scrollY}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoCard
            key={item.id}
            todo={item}
            onDelete={() => removeTodo(item.id)}
          />
        )}
        HeaderComponent={<Text style={styles.title}>Tickets</Text>}
        StickyElementComponent={
          <Animated.View style={{ backgroundColor: bgColor }}>
            <Animated.View style={{ height: topSpacerHeight }} />
            <Animated.View style={{ paddingHorizontal: 16, paddingBottom: 10 }}>
              <SearchBar value={search} onChangeText={setSearch} />
            </Animated.View>
          </Animated.View>
        }
        TopListElementComponent={
          <CategoryFilter
            options={categories}
            selected={categoryFilter}
            onSelect={setCategoryFilter}
          />
        }
      />
      <TouchableOpacity onPress={handleDeleteAll} style={styles.clearButton}>
        <Text style={styles.deleteText}>Delete all tickets</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  title: {
    fontSize: 34,
    fontWeight: "700",
    marginTop: 110,
    marginBottom: 8,
    paddingHorizontal: 16,
    zIndex: 12,
  },
  clearButton: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: "#FEE2E2",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
