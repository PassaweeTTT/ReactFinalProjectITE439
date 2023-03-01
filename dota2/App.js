import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";


import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import RandomPage from "./component/RandomPage";
import HeroPage from "./component/HeroPage";
import GitPage from "./component/GitPage";
import Contact from "./component/Contact";

function HeroPageScreen() {
  return (
    <View style={{ flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor:"#2F2F2F"}}>
      <HeroPage />
    </View>
  );
}

function RandomPageScreen() {
  return (
    <View style={{ flex: 1, 
      justifyContent: "center", 
      alignItems: "center",
      backgroundColor:"#2F2F2F"}}>
      <RandomPage/>
    </View>
  );
}

function GitPageScreen() {
  return (
    <View style={{ flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor:"#2F2F2F"}}>
      <GitPage/>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTintColor: 'white',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "star-sharp" : "star-outline";
              size = focused ? size + 8 : size + 5;
            } else if (route.name === "Random Hero") {
              iconName = focused ? "ios-cube" : "ios-cube-outline";
              size = focused ? size + 8 : size + 5;
            } else if (route.name === "Github") {
              iconName = focused ? "ios-logo-github" : "ios-logo-github";
              size = focused ? size + 8 : size + 5;
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerStyle: {
            backgroundColor: '#242424',
          },
        })}
        tabBarOptions={{
          activeTintColor: "#CB3D3D",
          inactiveTintColor: "#FFFFFF",
          activeBackgroundColor: "white",
          inactiveBackgroundColor: "#242424",
          style: { height: 80, backgroundColor: "#242424" },
        }}
      >
        <Tab.Screen name="Home" component={HeroPageScreen} />
        <Tab.Screen name="Random Hero" component={RandomPageScreen} />
        <Tab.Screen name="Github" component={GitPageScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
