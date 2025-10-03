// OptionList.tsx
import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";

type OptionListProps<T extends string> = {
  options: readonly T[];
  selected?: T;
  onSelect: (value: T) => void;
  horizontal?: boolean;
};

export default function OptionList<T extends string>({
  options,
  selected,
  onSelect,
  horizontal = false,
}: OptionListProps<T>) {
  return (
    <FlatList
      data={options}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.option, item === selected && styles.optionActive]}
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
  option: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 10,
    backgroundColor: "#D5ECE8",
    marginVertical: 16,
  },
  optionActive: {
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
