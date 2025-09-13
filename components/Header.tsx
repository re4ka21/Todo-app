import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Text style={styles.cancelText}>cancel</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>New</Text>
      <TouchableOpacity>
        <Text style={styles.createText}>Create</Text>
      </TouchableOpacity>
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
  cancelText: { color: "teal", fontSize: 16 },
  createText: { color: "teal", fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600" },
});
