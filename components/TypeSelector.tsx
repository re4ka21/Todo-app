import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import TypeButton from "./Buttons/TypeButton";
type Props = {
  type: string;
  setType: (value: string) => void;
};
export default function TypeSelector({ type, setType }: Props) {
  return (
    <View style={styles.container}>
      <TypeButton
        label="Report incident"
        emoji="⚠"
        active={type === "incident"}
        onPress={() => setType("incident")}
      />
      <TypeButton
        label="Create request"
        emoji="➕"
        active={type === "request"}
        onPress={() => setType("request")}
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
});
