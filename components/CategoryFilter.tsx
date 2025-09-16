import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

type Props<T extends string> = {
  options?: readonly T[];
  selected: T;
  onSelect: (value: T) => void;
};

export default function CategoryFilter<T extends string>({
  options,
  selected,
  onSelect,
}: Props<T>) {
  if (!options || options.length === 0) return null;

  return (
    <FlatList
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
      data={options}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.button, item === selected && styles.buttonActive]}
          onPress={() => onSelect(item)}
        >
          <Text style={[styles.text, item === selected && styles.textActive]}>
            {item}
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#D5ECE8",
    marginBottom: 16,
    marginTop: 16,
  },
  buttonActive: {
    backgroundColor: "#047857",
  },
  text: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 17,
  },
  textActive: {
    color: "white",
    fontWeight: "700",
  },
});
