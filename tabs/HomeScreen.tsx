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
import { useCustomFlatListHook } from "../hooks/useRestaurantListHook";

enum Category {
  AllTickets = "All tickets",
  MyTickets = "My tickets",
  Unassigned = "Unassigned",
  Bug = "Bug",
  Feature = "Feature",
  Improvement = "Improvement",
}

export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const todos = useTodoStore((state) => state.todos);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const clearTodo = useTodoStore((state) => state.clearTodo);
  const search = useTodoStore((state) => state.search);
  const setSearch = useTodoStore((state) => state.setSearch);
  const categoryFilter = useTodoStore((state) => state.categoryFilter);
  const setCategoryFilter = useTodoStore((state) => state.setCategoryFilter);

  const categories = Object.values(Category);

  const filteredTodos = useMemo(() => {
    return todos
      .filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) &&
          (categoryFilter === Category.AllTickets ||
            t.category === categoryFilter)
      )
      .map((t, i) => ({ id: `REQ-${String(i + 1).padStart(3, "0")}`, ...t }));
  }, [todos, search, categoryFilter]);
  const handleDelete = useCallback(
    (id: string) => {
      removeTodo(filteredTodos.findIndex((ft) => ft.id === id));
    },
    [filteredTodos, removeTodo]
  );
  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [170, 100],
    extrapolate: "clamp",
  });
  const bgColor = scrollY.interpolate({
    inputRange: [0, 50], // від 0px до 50px скролу
    outputRange: ["transparent", "white"], // плавний перехід
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
            onDelete={() => handleDelete(item.id)}
          />
        )}
        HeaderComponent={<Text style={styles.title}>Tickets</Text>}
        StickyElementComponent={
          <Animated.View
            style={{
              backgroundColor: bgColor, // <-- тут зʼявляється білий фон
            }}
          >
            <Animated.View style={{ height: topSpacerHeight }} />

            <Animated.View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 10,
              }}
            >
              <SearchBar value={search} onChangeText={setSearch} />
            </Animated.View>
          </Animated.View>
        }
        TopListElementComponent={
          <View>
            <CategoryFilter
              options={categories}
              selected={categoryFilter}
              onSelect={setCategoryFilter}
            />
          </View>
        }
      />
      <TouchableOpacity onPress={clearTodo} style={styles.clearButton}>
        <Text style={styles.deleteText}>Delete all tickets</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 110,
    marginBottom: 8,
    paddingHorizontal: 16,
    zIndex: 12,
  },
  clearButton: {
    position: "absolute",
    bottom: 0, // відстань від низу екрану
    left: 16,
    right: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
