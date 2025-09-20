import React, { useRef } from "react";
import { Animated, FlatListProps, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX } from "react";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  HeaderComponent: JSX.Element;
  StickyElementComponent: JSX.Element;
  TopListElementComponent: JSX.Element;
  scrollY?: Animated.Value;
  stickyHeight?: number;
};

function CustomFlatList<T>({
  style,
  scrollY,
  stickyHeight = 60,
  ...props
}: CustomFlatListProps<T>) {
  const listRef = useRef<Animated.FlatList<T> | null>(null);
  const internalScrollY = scrollY || useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.container, style]}>
      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        ListHeaderComponent={
          <View>
            {props.HeaderComponent}

            <View style={{ height: stickyHeight }} />

            {props.TopListElementComponent}
          </View>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: internalScrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />

      <View style={[styles.sticky, { height: stickyHeight }]}>
        {props.StickyElementComponent}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sticky: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: "#F3F4F6",
  },
});

export default CustomFlatList;
