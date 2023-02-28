import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";

import { NavigationContainer} from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import RandomPage from "./component/RandomPage";
import HeroPage from "./component/HeroPage";

function HeroPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <HeroPage/>
    </View>
  );
}

function RandomPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <RandomPage/>
    </View>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator >
      <Tab.Screen name="Home" component={HeroPageScreen} />
      <Tab.Screen name="Random" component={RandomPageScreen} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <MyTabs/>
    </NavigationContainer>
  );
};

export default App;