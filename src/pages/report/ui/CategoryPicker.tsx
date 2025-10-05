import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";
import { TicketCategory } from "@/shared/constants/TicketCategory";
import { OptionList } from "@/shared/OptionList";

type Props = {
  category: TicketCategory;
  setCategory: (value: TicketCategory) => void;
};

export default function CategoryPicker({ category, setCategory }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = Object.values(TicketCategory);

  const handleSelectCategory = (item: TicketCategory) => {
    setCategory(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Placeholder"
          value={category}
          editable={false}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.selectBtn}>Select</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <OptionList
              options={categories}
              selected={category}
              onSelect={handleSelectCategory}
            />
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6 },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#047857",
    borderRadius: 8,
    padding: 10,
    flex: 1,
    fontSize: 14,
  },
  selectBtn: { color: "teal", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalItemText: { fontSize: 16, color: "#333" },
  modalCloseBtn: {
    marginTop: 12,
    alignSelf: "center",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "#DFF4F0",
    borderRadius: 8,
  },
  modalCloseText: { color: "teal", fontWeight: "600" },
});
