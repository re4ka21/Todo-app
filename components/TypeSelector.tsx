import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  type: string;
  setType: (value: string) => void;
};

export default function TypeSelector({ type, setType }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, type === "incident" && styles.buttonActive]}
        onPress={() => setType("incident")}
      >
        <Text style={[styles.text, type === "incident" && styles.textActive]}>
          ⚠ Report incident
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, type === "request" && styles.buttonActive]}
        onPress={() => setType("request")}
      >
        <Text style={[styles.text, type === "request" && styles.textActive]}>
          ➕ Create request
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: 10, marginVertical: 8 },
  button: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    alignItems: "center",
  },
  buttonActive: {
    backgroundColor: "#DFF4F0",
    borderColor: "teal",
  },
  text: { fontSize: 14, color: "#555" },
  textActive: { color: "teal", fontWeight: "600" },
});
