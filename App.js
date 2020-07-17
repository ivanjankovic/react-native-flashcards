import "react-native-gesture-handler"
import React, { useEffect } from "react"
import { View, StatusBar } from 'react-native'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import DeckView from "./views/Deck"
import NewQuestionView from "./views/NewQuestion"
import QuizView from "./views/Quiz"
import Tabs from "./views/Tabs"

import { reloadDecks } from "./helpers/api"
import {
  setLocalNotification,
  clearLocalNotification,
} from "./helpers/reminder"

export default function App() {
  useEffect(() => {
    setLocalNotification()
  }, [])
  
  const Stack = createStackNavigator()

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor='blue' barStyle='light-content' />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: 'lightblue'},
            headerTitleAlign: 'center'
          }}>
          <Stack.Screen
            name="Home"
            component={Tabs}
            options={{ title: "Flash Cards" }}
          />
          <Stack.Screen
            name="DeckView"
            component={DeckView}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="NewQuestion"
            component={NewQuestionView}
            options={({ route }) => ({ title: route.params.title })}
          />
          <Stack.Screen
            name="QuizView"
            component={QuizView}
            options={({ route }) => ({ title: route.params.title + " Quiz" })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
