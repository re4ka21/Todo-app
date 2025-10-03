import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppButton } from "@/shared/button";
export default function Header() {
  return (
    <View style={styles.header}>
      <AppButton
        label="Cancel"
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <Text style={styles.headerTitle}>New</Text>
      <AppButton
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
