import { Link } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";

export default function NewRequestScreen() {
  const [type, setType] = useState("request");
  const [category, setCategory] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const categories = [
    "IT Support",
    "HR",
    "Finance",
    "Office Supplies",
    "Maintenance",
  ];

  const handleSelectCategory = (item: any) => {
    setCategory(item);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Link href={"/tabs/create"} style={styles.cancelText}>
          cancel
        </Link>
        <Text style={styles.headerTitle}>New</Text>
        <TouchableOpacity>
          <Text style={styles.createText}>Create</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Select Type */}
        <Text style={styles.label}>Select type</Text>
        <View style={styles.typeRow}>
          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "incident" && styles.typeButtonActive,
            ]}
            onPress={() => setType("incident")}
          >
            <Text
              style={[
                styles.typeText,
                type === "incident" && styles.typeTextActive,
              ]}
            >
              ⚠ Report incident
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.typeButton,
              type === "request" && styles.typeButtonActive,
            ]}
            onPress={() => setType("request")}
          >
            <Text
              style={[
                styles.typeText,
                type === "request" && styles.typeTextActive,
              ]}
            >
              ➕ Create request
            </Text>
          </TouchableOpacity>
        </View>

        {/* Subject */}
        <Text style={styles.label}>Subject</Text>
        <TextInput style={styles.input} placeholder="Placeholder" />

        {/* Category */}
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Placeholder"
            value={category}
            editable={false}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.selectBtn}>Select</Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Placeholder"
          multiline
        />

        {/* Attachments */}
        <Text style={styles.label}>Attachments</Text>
        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addText}>+ ADD</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Category Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectCategory(item)}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
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
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  cancelText: { color: "teal", fontSize: 16 },
  createText: { color: "teal", fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: "600" },

  content: { padding: 16 },
  label: { fontWeight: "600", marginVertical: 8 },

  typeRow: { flexDirection: "row", gap: 10 },
  typeButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
    alignItems: "center",
  },
  typeButtonActive: {
    backgroundColor: "#DFF4F0",
    borderColor: "teal",
  },
  typeText: { fontSize: 14, color: "#555" },
  typeTextActive: { color: "teal", fontWeight: "600" },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    marginBottom: 8,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectBtn: { color: "teal", fontWeight: "600" },

  addBtn: {
    alignSelf: "flex-start",
    backgroundColor: "#DFF4F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addText: { color: "teal", fontWeight: "600" },

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
