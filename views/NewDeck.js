import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../helpers/styles";
import { addDeck } from "../helpers/api";

export default function NewDeckView({ navigation }) {
  const [deckName, setDeckName] = useState("");

  function addNewDeck() {
    addDeck(deckName)
      .then(() => {
        setDeckName("");
        navigation.navigate("DeckView", { title: deckName });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.deckTitle, { margin: 25 }]}>Create deck</Text>
      <TextInput
        style={styles.input}
        placeholder="deck name"
        onChangeText={(text) => setDeckName(text)}
        defaultValue={deckName}
      />

      <TouchableOpacity style={styles.button} onPress={addNewDeck}>
        <Text>Create Deck</Text>
      </TouchableOpacity>
    </View>
  );
}
