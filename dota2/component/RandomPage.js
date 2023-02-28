import React, { useState } from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const RandomPage = () => {
  const [hero, setHero] = useState({
    img: '/apps/dota2/images/heroes/unknown_hero_full.png',
    localized_name: '?',
  });

  const getRandomHero = async () => {
    try {
      const response = await axios.get('https://api.opendota.com/api/heroStats');
      const heroes = response.data;
      const randomIndex = Math.floor(Math.random() * heroes.length);
      const randomHero = heroes[randomIndex];
      setHero(randomHero);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ alignItems: 'center' }}>
      <Image source={{ uri: `https://api.opendota.com${hero.img}` }} style={styles.image} />
      <Text style={styles.text}>{hero.localized_name}</Text>
      <Button title="Random Hero" onPress={getRandomHero} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  text: {
    marginTop: 20,
  },
});

export default RandomPage;
