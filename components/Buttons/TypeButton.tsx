import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  type: string;
  setType: (value: string) => void;
};

type ButtonProps = {
  label: string;
  emoji: string;
  active: boolean;
  onPress: () => void;
};

export default function TypeButton({
  label,
  emoji,
  active,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, active && styles.buttonActive]}
      onPress={onPress}
    >
      <Text style={[styles.text, active && styles.textActive]}>
        {emoji} {label}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
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
