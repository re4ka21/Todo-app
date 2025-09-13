import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type TodoCardProps = {
  todo: {
    id: string;
    title: string;
    status: string;
    createdAt: Date;
  };
  onDelete: () => void;
  timeAgo: (date: string | Date) => string;
};

export default function TodoCard({ todo, onDelete, timeAgo }: TodoCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "open":
        return { backgroundColor: "#FEF3C7", color: "#92400E" };
      case "in progress":
        return { backgroundColor: "#DBEAFE", color: "#1D4ED8" };
      default:
        return { backgroundColor: "#E5E7EB", color: "#374151" };
    }
  };

  const statusStyle = getStatusStyle(todo.status);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.id}>{todo.id}</Text>
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
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
