import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppButton } from "@/shared/button";
type Props = {
  type: string;
  setType: (value: string) => void;
};
export default function TypeSelector({ type, setType }: Props) {
  return (
    <View style={styles.container}>
      <AppButton
        label="Report incident"
        emoji="⚠"
        active={type === "incident"}
        onPress={() => setType("incident")}
        style={styles.button}
        textStyle={styles.buttonText}
      />
      <AppButton
        label="Create request"
        emoji="➕"
        active={type === "request"}
        onPress={() => setType("request")}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    marginVertical: 8,
  },
  button: { flex: 1, borderWidth: 1, borderRadius: 8, borderColor: "#047857" },
  buttonText: { fontSize: 14, color: "#555" },
});
