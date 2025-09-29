import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useAppWindowDimensions } from "./useWindowDimensions";

type CustomFlatListStyles = {
  header: StyleProp<ViewStyle>;
  stickyElement: StyleProp<ViewStyle>;
  topElement?: StyleProp<ViewStyle>;
};

type UseCustomFlatListHook = [
  Animated.Value,
  CustomFlatListStyles,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void,
  (event: LayoutChangeEvent) => void
];

export const useCustomFlatListHook = (): UseCustomFlatListHook => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [heights, setHeights] = useState({ header: 0, sticky: 0, topList: 0 });
  const window = useAppWindowDimensions();
  const styles: CustomFlatListStyles = {
    header: { marginBottom: heights.sticky + heights.topList },
    stickyElement: {
      marginTop: heights.header,
      position: "absolute",
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [-window.height, heights.header],
            outputRange: [window.height, -heights.header],
            extrapolate: "clamp",
          }),
        },
      ],
      zIndex: 2,
    },
    topElement: {
      marginTop: heights.header + heights.sticky,
      position: "absolute",
      transform: [
        {
          translateY: scrollY.interpolate({
            inputRange: [
              -window.height,
              heights.header + heights.sticky + heights.topList,
            ],
            outputRange: [
              window.height,
              -(heights.header + heights.sticky + heights.topList),
            ],
            extrapolate: "clamp",
          }),
        },
      ],
      zIndex: 1,
    },
  };
  const onLayoutHeaderElement = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent?.layout;
    if (!layout) return;

    requestAnimationFrame(() => {
      setHeights((h) => ({ ...h, header: layout.height }));
    });
  };

  const onLayoutTopListElement = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent?.layout;
    if (!layout) return;
    requestAnimationFrame(() => {
      setHeights((h) => ({ ...h, topList: layout.height }));
    });
  };

  const onLayoutTopStickyElement = (event: LayoutChangeEvent) => {
    const layout = event.nativeEvent?.layout;
    if (!layout) return;
    requestAnimationFrame(() => {
      setHeights((h) => ({ ...h, sticky: layout.height }));
    });
  };

  return [
    scrollY,
    styles,
    onLayoutHeaderElement,
    onLayoutTopListElement,
    onLayoutTopStickyElement,
  ];
};
