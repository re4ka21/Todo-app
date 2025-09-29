import { useWindowDimensions } from "react-native";

export function useAppWindowDimensions() {
  const window = useWindowDimensions();
  return window;
}
