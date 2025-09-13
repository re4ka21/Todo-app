//SelectModal

import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SelectModalProps<T extends string> = {
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
}: SelectModalProps<T>) {
  if (!options || options.length === 0) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              onPress={() => {
                onSelect(option);
                onClose();
              }}
              style={[
                styles.option,
                option === selected && styles.selectedOption,
              ]}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
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
  option: { padding: 12 },
  selectedOption: { backgroundColor: "#e0e0e0" },
});
