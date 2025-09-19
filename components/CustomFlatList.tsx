import React, { useRef } from "react";
import { Animated, FlatListProps, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { JSX } from "react";

type CustomFlatListProps<T> = Omit<FlatListProps<T>, "ListHeaderComponent"> & {
  HeaderComponent: JSX.Element; // заголовок, скролиться
  StickyElementComponent: JSX.Element; // липкий SearchBar
  TopListElementComponent: JSX.Element; // категорії, скроляться
  scrollY?: Animated.Value;
  stickyHeight?: number; // висота SearchBar
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
      {/* FlatList з усіма елементами */}
      <Animated.FlatList<any>
        ref={listRef}
        {...props}
        ListHeaderComponent={
          <View>
            {/* Заголовок */}
            {props.HeaderComponent}

            {/* padding для липкого SearchBar */}
            <View style={{ height: stickyHeight }} />

            {/* Категорії */}
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

      {/* Липкий SearchBar поверх FlatList */}
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
    backgroundColor: "#F3F4F6", // можна змінити на свій
  },
});

export default CustomFlatList;
