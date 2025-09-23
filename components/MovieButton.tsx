// components/CustomButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  onPress: () => void;
  label: string;
};

export default function CustomButton({ onPress, label }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#047857",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
