import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export function useWindowDimensions() {
  const [window, setWindow] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = ({ window }: { window: ScaledSize }) => {
      setWindow(window);
    };

    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return window;
}
