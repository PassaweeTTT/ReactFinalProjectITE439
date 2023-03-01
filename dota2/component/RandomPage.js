import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import axios from "axios";

const RandomPage = () => {
  const [hero, setHero] = useState(null);
  const [animating, setAnimating] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;

  const getRandomHero = async () => {
    try {
      setAnimating(true);
      const response = await axios.get(
        "https://api.opendota.com/api/heroStats"
      );
      const heroes = response.data;
      const randomIndex = Math.floor(Math.random() * heroes.length);
      const randomHero = heroes[randomIndex];
      setHero(randomHero);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (animating) {
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setAnimating(false);
        spinValue.setValue(0);
      });
    }
  }, [animating]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: `https://api.opendota.com${hero ? hero.img : ""}`,
        }}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
      />
      <Text style={styles.text}>
        {hero ? hero.localized_name : "Random Hero"}
      </Text>
      <TouchableOpacity style={styles.button} onPress={getRandomHero}>
        <Text style={styles.buttonText}>Roll for a Hero</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: "#f5f5f5",
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 30,
    alignSelf: "center",
  },
  buttonText: {
    color: "#CB3D3D",
    fontSize: 20,
  },
});

export default RandomPage;
