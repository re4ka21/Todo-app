import { View, Text, StyleSheet } from "react-native";
import { Button } from "@/shared/Button";
export default function Attachments() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Attachments</Text>
      <Button
        label="+ ADD"
        style={styles.addButton}
        textStyle={styles.addText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6 },
  addButton: {
    alignSelf: "flex-start",
    backgroundColor: "#DFF4F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addText: { color: "teal", fontWeight: "600" },
});
