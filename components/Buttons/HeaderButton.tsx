import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type HeaderButtonProps = {
  label: string;
};

export default function HeaderButton({ label }: HeaderButtonProps) {
  return (
    <TouchableOpacity>
      <Text style={styles.actionText}>{label}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  actionText: { color: "teal", fontSize: 16 },
});
