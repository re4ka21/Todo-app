import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  value?: string;
  emoji?: string;
  active?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function AppButton({
  label,
  onPress,
  value,
  emoji,
  active,
  style,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.base, style, active && styles.active]}
      onPress={onPress}
    >
      <Text style={[styles.baseText, textStyle, active && styles.activeText]}>
        {emoji ? `${emoji} ` : ""}
        {label}
        {value ? `: ${value}` : ""}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  baseText: {
    fontSize: 16,
  },
  active: {
    backgroundColor: "#DFF4F0",
    borderColor: "teal",
    borderWidth: 1,
  },
  activeText: {
    color: "teal",
    fontWeight: "600",
  },
});
