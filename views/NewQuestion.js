import React, { useState } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { addCardToDeck } from "../helpers/api";
import styles from "../helpers/styles";

export default function NewQuestionView({ route, navigation }) {
  const { title } = route.params;
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState(null);

  function addCard() {
    const card = {
      question: question,
      answer: answer,
    };
    addCardToDeck(title, card)
      .then(() => {
        setAnswer("");
        setQuestion("");
      })
      .then(() => navigation.navigate("DeckView", { title }));
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.deckTitle, {marginTop: 50}]}>New Question</Text>
      <TextInput
        style={styles.input}
        placeholder="question..."
        onChangeText={(text) => setQuestion(text)}
        defaultValue={question}
      />
      <TextInput
        style={styles.input}
        placeholder="answer..."
        onChangeText={(text) => setAnswer(text)}
        defaultValue={answer}
      />

      <TouchableOpacity style={styles.button} onPress={addCard}>
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );
}
