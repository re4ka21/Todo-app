import { FlatList, StyleSheet } from "react-native";
import { Button } from "@/shared/Button";
type OptionListProps<T extends string> = {
  options: readonly T[];
  selected?: T;
  onSelect: (value: T) => void;
  horizontal?: boolean;
};

export default function OptionList<T extends string>({
  options,
  selected,
  onSelect,
  horizontal = false,
}: OptionListProps<T>) {
  return (
    <FlatList
      data={options}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      renderItem={({ item }) => {
        const isSelected = item === selected;
        return (
          <Button
            label={item}
            onPress={() => onSelect(item)}
            style={[
              styles.option,
              ...(isSelected ? [styles.optionActive] : []),
            ]}
            textStyle={[
              styles.text,
              ...(isSelected ? [styles.textActive] : []),
            ]}
          />
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  option: {
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 10,
    backgroundColor: "#D5ECE8",
    marginVertical: 16,
  },
  optionActive: {
    backgroundColor: "#047857",
  },
  text: {
    color: "#374151",
    fontWeight: "500",
    fontSize: 17,
  },
  textActive: {
    color: "white",
    fontWeight: "700",
  },
});
