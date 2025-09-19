import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  height?: any;
};

export default function SearchBar({ value, onChangeText, height }: Props) {
  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={18} color="#6B7280" style={styles.icon} />
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
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
  },
  icon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    backgroundColor: "transparent",
  },
});
