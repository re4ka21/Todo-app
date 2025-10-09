import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import InputField from "@/shared/InputField/ui/InputField";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  height?: number;
};

export default function SearchBar({ value, onChangeText, height }: Props) {
  return (
    <View style={[styles.searchContainer, height ? { height } : {}]}>
      <Ionicons name="search" size={18} color="#6B7280" style={styles.icon} />
      <InputField
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        style={styles.searchInput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: "#7676801F",
    width: 380,
    height: 45,
  },
  icon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingVertical: 0,
    marginTop: 10,
    height: "100%",
    justifyContent: "center",
  },
});
