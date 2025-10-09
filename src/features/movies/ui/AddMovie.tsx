import React, { useState, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/Button";
import InputField from "@/shared/InputField/ui/InputField";
import { baseURL } from "@/shared/api/ApiConfig";

type Movie = {
  id?: string;
  title: string;
  director: string;
  genre: string;
};

export const AddMovie = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");

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

  const handleAdd = useCallback(() => {
    if (!title || !director || !genre) return;
    addMutation.mutate({ title, director, genre });
  }, [title, director, genre]);

  return (
    <View style={styles.container}>
      <InputField
        label="Title"
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <InputField
        label="Director"
        placeholder="Enter director"
        value={director}
        onChangeText={setDirector}
      />
      <InputField
        label="Genre"
        placeholder="Enter genre"
        value={genre}
        onChangeText={setGenre}
      />

      <Button
        label="Add Movie"
        onPress={handleAdd}
        style={styles.button}
        textStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: "#047857",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
