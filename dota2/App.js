import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import RandomPage from "./component/RandomPage";
import HeroPage from "./component/HeroPage";

const App = () => {
  return (
    <View>
      <HeroPage/>
      <RandomPage/>
    </View>
  );
};

export default App;


