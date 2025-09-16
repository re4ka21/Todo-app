import React from "react";
import {
  Animated,
  FlatList,
  FlatListProps,
  View,
  StyleSheet,
} from "react-native";
import { JSX } from "react";
type Item = any;

type Props = FlatListProps<Item> & {
  stickyHeader?: () => JSX.Element; // функція замість ReactNode
};

export default function CustomFlatList({ stickyHeader, ...props }: Props) {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        {...props}
        contentContainerStyle={props.contentContainerStyle}
        stickyHeaderIndices={stickyHeader ? [0] : []} // sticky тільки перший елемент
        ListHeaderComponent={stickyHeader ? stickyHeader : undefined} // функція повертає JSX
        onScroll={onScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
