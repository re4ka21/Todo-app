import React, { useState, useMemo } from "react";
import { Text, View, StyleSheet, Animated } from "react-native";
import CustomFlatList from "./components/CustomFlatList";
import { useCustomFlatListHook } from "./hooks/useRestaurantListHook"; // твій хук
import SearchBar from "./components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import TodoCard from "./components/TodoCard";

export default function App() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const todos = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, i) => ({ id: i.toString(), title: `Todo ${i + 1}` })),
    []
  );

  const filteredTodos = useMemo(() => {
    return todos.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [todos, search]);

  const [scrollY] = useCustomFlatListHook();

  const topSpacerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 40],
    extrapolate: "clamp",
  });

  return (
    <CustomFlatList
      data={filteredTodos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <TodoCard key={item.id} todo={item} />}
      HeaderComponent={
        <Text key="title" style={styles.title}>
          Tickets
        </Text>
      }
      StickyElementComponent={
        <Animated.View key="search">
          <Animated.View
            style={{ height: topSpacerHeight, backgroundColor: "#F3F4F6" }}
          />
          <View
            style={{
              backgroundColor: "#F3F4F6",
              paddingHorizontal: 16,
              paddingBottom: 10,
            }}
          >
            <SearchBar value={search} onChangeText={setSearch} />
          </View>
        </Animated.View>
      }
      TopListElementComponent={
        <CategoryFilter
          key="category"
          options={["all", "work", "home"]}
          selected={categoryFilter}
          onSelect={setCategoryFilter}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
});
