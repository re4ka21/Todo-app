import { Modal, View, StyleSheet } from "react-native";
import { Button } from "@/shared/Button";

type Props<T extends string> = {
  visible: boolean;
  options?: T[];
  selected: T;
  onSelect: (value: T) => void;
  onClose: () => void;
};

export default function SelectModal<T extends string>({
  visible,
  options,
  selected,
  onSelect,
  onClose,
}: Props<T>) {
  if (!options || options.length === 0) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {options.map((option) => (
            <Button
              key={option}
              label={option}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
              active={option === selected}
              style={styles.option}
              textStyle={styles.optionText}
            />
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    minWidth: 200,
  },
  option: {
    marginVertical: 4,
  },
  optionText: {
    fontSize: 16,
  },
});
