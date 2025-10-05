import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import Header from "./Header";
import TypeSelector from "./TypeSelector";
import InputField from "@/shared/InputField/ui/InputField";
import CategoryPicker from "./CategoryPicker";
import Attachments from "./Attachments";
import { SafeAreaView } from "react-native-safe-area-context";
import { TicketCategory } from "@/shared/constants/TicketCategory";
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
