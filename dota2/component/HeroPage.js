import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import antimage from "../assets/antimage.png";
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
    <View style={{ flex: 1, padding: 30}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 10,
                }}
              >
                <Image
                  resizeMethod="cover"
                  source={{ uri: item.img }}
                  style={{
                    width: 60,
                    height: 30,
                  }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={{ color: "white", paddingBottom: 15 }}>
                    {item.localized_name} = Played: {item.pro_pick} Win:{" "}
                    {item.pro_win} Win rate:{" "}
                    {((item.pro_win * 100) / item.pro_pick).toFixed(2)}%
                  </Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HeroPage;
