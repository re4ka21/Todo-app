import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "../components/Header";
import TypeSelector from "../components/TypeSelector";
import InputField from "../components/InputField";
import CategoryPicker from "../components/CategoryPicker";
import Attachments from "../components/Attachments";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketCategory } from "../constant";
export default function NewRequestScreen() {
  const [type, setType] = useState("request");
  const [category, setCategory] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <TypeSelector type={type} setType={setType} />
        <InputField label="Subject" placeholder="Placeholder" />
        <CategoryPicker
          category={category as TicketCategory}
          setCategory={setCategory}
        />
        <InputField
          label="Description"
          placeholder="Placeholder"
          multiline
          height={100}
        />
        <Attachments />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F6F6" },
  content: { padding: 16 },
});
