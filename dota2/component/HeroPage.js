import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";



const HeroPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
  
    const getDataDota = async () => {
      try {
        const response = await fetch(
          "https://api.npoint.io/3a770a4dcc560f669353"
        );
        const json = await response.json();
        setData(json.Dota);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      getDataDota();
    }, []); //[] เรียกหนึ่งครั้งตอนเปิดเท่านั้น
  
    return (
      <View style={{ flex: 1, padding: 24 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>
                {item.localized_name} = Played: {item.pro_pick} Win:{" "}
                {item.pro_win} Win rate:{" "}
                {((item.pro_win * 100) / item.pro_pick).toFixed(2)}%
              </Text>
            )}
          />
        )}
      </View>
    );
  };

export default HeroPage

