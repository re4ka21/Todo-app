import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/Button";
import { baseURL } from "../../../shared/api/ApiConfig";

type Movie = {
  id?: string;
  title: string;
  director: string;
  genre: string;
  releaseYear?: string | number;
  rating?: string | number;
};

export default function MoviesScreen() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

  const {
    data: moviesRaw = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Movie[] | string[]>({
    queryKey: ["movies"],
    queryFn: async () => {
      const res = await fetch(`${baseURL}/movies`);
      if (!res.ok) throw new Error("Failed to fetch movies");
      return res.json();
    },
  });

  const movies: Movie[] = (moviesRaw as any[])
    .map((item) => {
      if (typeof item === "string") {
        try {
          return JSON.parse(item);
        } catch {
          return null;
        }
      }
      return item;
    })
    .filter((item): item is Movie => !!item && typeof item === "object");

  const addMutation = useMutation({
    mutationFn: async (newMovie: Omit<Movie, "id">) => {
      const res = await fetch(`${baseURL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      if (!res.ok) throw new Error("Failed to add movie");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      setTitle("");
      setDirector("");
      setGenre("");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${baseURL}/movies/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete movie");
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
  });

  const handleAdd = useCallback(() => {
    if (!title || !director || !genre) return;
    addMutation.mutate({ title, director, genre });
  }, [title, director, genre]);

  const handleDelete = useCallback((id?: string) => {
    if (id) deleteMutation.mutate(id);
  }, []);

  const handleRefetch = useCallback(() => {
    refetch();
  }, [refetch]);

  if (isLoading || isError) {
    return (
      <Text style={styles.statusText}>
        {isLoading ? "Loading..." : "Error fetching movies"}
      </Text>
    );
  }

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
      <Button
        label="Add Movie"
        onPress={handleAdd}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      <View style={{ marginVertical: 10 }}>
        <Button
          label="Refresh List"
          onPress={handleRefetch}
          style={styles.button}
          textStyle={styles.buttonText}
        />
      </View>

      <FlatList
        data={movies}
        keyExtractor={(item, index) => item.id ?? index.toString()}
        renderItem={({ item }) => (
          <View style={styles.movieCard}>
            <View>
              <Text style={styles.movieTitle}>{item.title ?? "No title"}</Text>
              <Text style={styles.movieInfo}>
                {item.director ?? "Unknown"} • {item.genre ?? "Unknown"}
              </Text>
              {item.releaseYear && (
                <Text style={styles.movieInfo}>Year: {item.releaseYear}</Text>
              )}
              {item.rating !== undefined && (
                <Text style={styles.movieInfo}>Rating: {item.rating}</Text>
              )}
            </View>
            {item.id && (
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            )}
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
  statusText: {
    padding: 16,
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
  button: {
    backgroundColor: "#047857",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
