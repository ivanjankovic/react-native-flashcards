import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import NewDeckView from "./NewDeck"
import DeckListView from "./DeckList"

export default function Tabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator tabBarOptions={{
      inactiveBackgroundColor: 'lightgray',
      labelStyle: { padding: 15 , fontSize: 13, fontWeight: 'bold' },
      activeTintColor: 'green',
      inactiveTintColor: 'blue',
      }}>
      <Tab.Screen
        name="DeckList"
        component={DeckListView}
        options={{ tabBarLabel: "DECK LIST" }}
      />
      <Tab.Screen
        name="NewDeck"
        component={NewDeckView}
        options={{ tabBarLabel: "ADD DECK" }}
      />
    </Tab.Navigator>
  )
}
