import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import HeaderButton from "./Buttons/HeaderButton";
export default function Header() {
  return (
    <View style={styles.header}>
      <HeaderButton label="Cancel" />
      <Text style={styles.headerTitle}>New</Text>
      <HeaderButton label="Create" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  headerTitle: { fontSize: 18, fontWeight: "600" },
});
