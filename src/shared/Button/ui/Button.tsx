import { Pressable } from "react-native";
import {
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

type Props = {
  label: string;
  onPress?: () => void;
  value?: string;
  emoji?: string;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Button({
  label,
  onPress,
  value,
  emoji,
  active,
  style,
  textStyle,
}: Props) {
  return (
    <Pressable
      style={[styles.base, style, active && styles.active]}
      onPress={onPress}
    >
      <Text style={[styles.baseText, textStyle, active && styles.activeText]}>
        {emoji ? `${emoji} ` : ""}
        {label}
        {value ? `: ${value}` : ""}
      </Text>
    </Pressable>
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
