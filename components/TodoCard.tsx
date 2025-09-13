import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

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
        return { backgroundColor: "#FDE68A", color: "#92400E" };
      case "in progress":
        return { backgroundColor: "#BFDBFE", color: "#1D4ED8" };
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

      <View style={styles.footer}>
        <Text style={styles.date}>{timeAgo(todo.createdAt)}</Text>
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
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  id: {
    color: "#047857",
    fontWeight: "600",
  },
  status: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: "600",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    color: "#6B7280",
    fontSize: 12,
  },
  deleteText: {
    color: "red",
    fontSize: 14,
  },
});
