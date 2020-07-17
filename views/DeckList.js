import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getDecks } from "../helpers/api";
import { useFocusEffect } from "@react-navigation/native";
import styles from "../helpers/styles";

export default function DeckListView({ navigation }) {
  const [decks, setDecks] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(() => {
    getDecks()
      .then((data) => {
        setDecks(data);
      })
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  function buttonTitle(deck) {
    return `${deck} \n${decks[deck].questions?.length} cards`;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {Object.keys(decks).map((deck, idx) => (
          <TouchableOpacity
            style={styles.deck}
            key={idx}
            onPress={() => navigation.navigate("DeckView", { title: deck })}
          >
            <Text style={styles.deckTitle}>{deck}</Text>
            <Text style={styles.deckSubTitle}>{decks[deck].questions?.length} {decks[deck].questions.length > 1 ? 'cards' : 'card'}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
