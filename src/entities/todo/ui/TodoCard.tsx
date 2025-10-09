import React, { memo, useMemo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/shared/Button";

type Props = {
  todo: {
    displayId: string;
    title: string;
    status: "open" | "in progress";
    createdAt: Date;
  };
  onDelete: () => void;
};

function TodoCard({ todo, onDelete }: Props) {
  const statusStyle = useMemo(() => {
    switch (todo.status) {
      case "open":
        return { backgroundColor: "#FEF3C7", color: "#92400E" };
      case "in progress":
        return { backgroundColor: "#DBEAFE", color: "#1D4ED8" };
      default:
        return { backgroundColor: "#E5E7EB", color: "#374151" };
    }
  }, [todo.status]);

  const timeAgo = useCallback((date: string | Date) => {
    const now = new Date();
    const past = new Date(date);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);
    if (diff < 60) return `${diff} sec ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.id}>{todo.displayId}</Text>
        <Text
          style={[
            styles.status,
            {
              backgroundColor: statusStyle.backgroundColor,
              color: statusStyle.color,
            },
          ]}
        >
          {todo.status}
        </Text>
      </View>

      <Text style={styles.title}>{todo.title}</Text>
      <Text style={styles.subtitle}>Subtitle</Text>

      <View style={styles.footer}>
        <View style={styles.timeRow}>
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text style={styles.date}>{timeAgo(todo.createdAt)}</Text>
        </View>

        <Button
          label="Delete"
          onPress={onDelete}
          style={styles.button}
          textStyle={styles.textButton}
        />
      </View>
    </View>
  );
}

export default memo(TodoCard);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    width: "95%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  id: {
    color: "#14766A",
    fontWeight: "600",
    fontSize: 11,
  },
  status: {
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 14,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 6,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  date: {
    color: "#000000",
    fontSize: 14,
    marginLeft: 4,
  },
  textButton: {
    color: "red",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 12,
  },
});
