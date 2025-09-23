import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CustomButton from "../components/MovieButton";
import { baseURL } from "./ApiConfig";
type Movie = {
  id: string;
  title: string;
  director: string;
  genre: string;
};

export default function MoviesScreen() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

  const {
    data: movies = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(`${baseURL}/movies`);
      return res.json();
    },
  });

  const addMutation = useMutation({
    mutationFn: async (newMovie: Omit<Movie, "id">) => {
      const res = await fetch(`${baseURL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData<Movie[]>(["movies"], (old = []) => [
        ...old,
        data,
      ]);
      setTitle("");
      setDirector("");
      setGenre("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await fetch(`${baseURL}/movies/${id}`, { method: "DELETE" });
      return id;
    },
    onSuccess: (id) => {
      queryClient.setQueryData<Movie[]>(["movies"], (old = []) =>
        old.filter((m) => m.id !== id)
      );
    },
  });

  const handleAdd = () => {
    if (!title || !director || !genre) return;
    addMutation.mutate({ title, director, genre });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <Text style={{ padding: 16 }}>Loading...</Text>;
  if (isError)
    return <Text style={{ padding: 16 }}>Error fetching movies</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🎬 Movies</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Director"
        value={director}
        onChangeText={setDirector}
      />
      <TextInput
        style={styles.input}
        placeholder="Genre"
        value={genre}
        onChangeText={setGenre}
      />
      <CustomButton onPress={handleAdd} label="Add Movie" />

      <View style={{ marginVertical: 10 }}>
        <CustomButton onPress={refetch} label="Refresh List" />
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <View>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieInfo}>
                {item.director} • {item.genre}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F3F4F6",
    marginTop: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#047857",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  movieCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  movieInfo: {
    fontSize: 14,
    color: "#6B7280",
  },
  deleteText: {
    color: "red",
    fontWeight: "600",
  },
});
