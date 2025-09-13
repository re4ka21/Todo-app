import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Attachments() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Attachments</Text>
      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addText}>+ ADD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6 },
  addBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#DFF4F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addText: { color: "teal", fontWeight: "600" },
});
