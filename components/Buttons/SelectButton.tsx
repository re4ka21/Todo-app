import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  label: string;
  value: string;
  onPress: () => void;
};

export default function SelectButton({ label, value, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>
        {label}: {value}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },
  text: {
    color: "#047857",
    fontWeight: "700",
  },
});
