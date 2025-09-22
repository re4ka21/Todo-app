import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

type Movie = {
  id: string;
  title: string;
  director: string;
  genre: string;
};

const baseURL = "https://playground.mockoon.com";

export default function MoviesScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

  async function fetchMovies() {
    try {
      const res = await fetch(`${baseURL}/movies`);
      const data = await res.json();
      setMovies(data);
    } catch (err) {
      console.error("Error fetching movies", err);
    }
  }

  async function addMovie() {
    if (!title || !director || !genre) return;

    const newMovie = { title, director, genre };

    try {
      const res = await fetch(`${baseURL}/movies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie),
      });
      const data = await res.json();
      setMovies((prev) => [...prev, data]);
      setTitle("");
      setDirector("");
      setGenre("");
    } catch (err) {
      console.error("Error adding movie", err);
    }
  }

  async function deleteMovie(id: string) {
    try {
      await fetch(`${baseURL}/movies/${id}`, { method: "DELETE" });
      setMovies((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Error deleting movie", err);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

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
      <TouchableOpacity style={styles.button} onPress={addMovie}>
        <Text style={styles.buttonText}>Add Movie</Text>
      </TouchableOpacity>

      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity style={styles.button} onPress={fetchMovies}>
          <Text style={styles.buttonText}>Refresh List</Text>
        </TouchableOpacity>
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
            <TouchableOpacity onPress={() => deleteMovie(item.id)}>
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
