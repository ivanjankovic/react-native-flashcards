import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getDeck } from "../helpers/api";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../helpers/styles";
import {
  clearLocalNotification,
  setLocalNotification,
} from "../helpers/reminder";

export default function QuizView({ route, navigation }) {
  const [questions, setQuestions] = useState([]);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let [numCorrect, setNumCorrect] = useState(0);
  let [quizComplete, setQuizComplete] = useState(false);
  const { title } = route.params;

  useFocusEffect(() => {
    getDeck(title)
      .then((data) => {
        setQuestions(data.questions);
      })
      .then(() => setIsLoading(false))
      .catch((err) => Alert.alert(err));
  }, [title]);

  useEffect(() => {
    clearLocalNotification().then(setLocalNotification);
  }, []);

  function displayNextCard() {
    if (questions.length === currentIndex + 1) {
      //out of questions
      setQuizComplete(true);
    } else {
      setCurrentIndex((currentIndex += 1));
    }
    setShowAnswer(false);
  }

  function displayAnswer() {
    setShowAnswer(true);
  }

  function markCorrect() {
    setNumCorrect((numCorrect += 1));
    displayNextCard();
  }
  function markIncorrect() {
    displayNextCard();
  }
  function startOver() {
    setNumCorrect(0);
    setCurrentIndex(0);
    setQuizComplete(false);
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {quizComplete === true ? (
        <View>
          <Text style={[styles.deckTitle, { margin: 25 }]}>
            {" "}
            Quiz Complete!
          </Text>
          <Text style={[styles.deckTitle, { margin: 25 }]}>
            you scored: {numCorrect} of {questions.length}
          </Text>
          <TouchableOpacity onPress={startOver} style={styles.button}>
            <Text style={styles.deckSubTitle}>Restart Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("DeckView", { title })}
            style={styles.button}
          >
            <Text style={styles.deckSubTitle}>Back to Deck</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <View>
            <Text style={[styles.deckTitle, { margin: 25 }]}>
              question {currentIndex + 1} of {questions.length}
            </Text>
          </View>
          {showAnswer === false ? (
            <View style={styles.container}>
              <Text style={[styles.deckTitle,
                { margin: 25, paddingBottom: 25, color: 'blue' , textAlign: 'center'}]}>
                {questions[currentIndex].question}
              </Text>
              <TouchableOpacity
                onPress={displayAnswer}
                style={styles.button}
              >
                <Text style={styles.deckSubTitle}>SHOW ANSWER</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={displayNextCard}
                style={styles.button}
              >
                <Text style={styles.deckSubTitle}>NEXT CARD</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.container}>
              <Text style={[styles.deckTitle,
                { margin: 25, paddingBottom: 25, textAlign: 'center'}]}>
                {questions[currentIndex].answer}
              </Text>
              <TouchableOpacity onPress={markCorrect} style={styles.button}>
                <Text style={[styles.deckSubTitle]}>CORRECT</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={markIncorrect}
                style={styles.button}
              >
                <Text style={styles.deckSubTitle}>INCORRECT</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
