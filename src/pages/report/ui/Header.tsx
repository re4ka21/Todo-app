import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/shared/Button";
export default function Header() {
  return (
    <View style={styles.header}>
      <Button
        label="Cancel"
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <Text style={styles.headerTitle}>New</Text>
      <Button
        label="Create"
        style={styles.button}
        textStyle={styles.buttonText}
      />
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
  button: {
    backgroundColor: "transparent",
  },
  buttonText: { color: "teal", fontSize: 16 },
});
