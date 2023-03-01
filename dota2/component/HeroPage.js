import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
  Button,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";

const HeroPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

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

  const handleSort = (type) => {
    let newData = [...data];

    if (type === "role") {
      newData.sort((a, b) => a.roles[0].localeCompare(b.roles[0]));
    } else if (type === "localized_name") {
      newData.sort((a, b) => a.localized_name.localeCompare(b.localized_name));
    } else if (type === "winrate") {
      newData.sort(
        (a, b) =>
          (b.pro_win * 100) / b.pro_pick - (a.pro_win * 100) / a.pro_pick
      );
    }

    if (type === sortType && sortDirection === "asc") {
      newData.reverse();
      setSortDirection("desc");
    } else {
      setSortDirection("asc");
    }

    setData(newData);
    setSortType(type);
  };

  useEffect(() => {
    getDataDota();
  }, []);

  const winRateCal = (pro_win, pro_pick) => {
    const winRate = ((pro_win * 100) / pro_pick).toFixed(2);
    return winRate;
  };

  const renderArrow = (type) => {
    if (type === sortType) {
      if (sortDirection === "asc") {
        return <Text style={{ marginLeft: 5, color: "white" }}>&#9650;</Text>;
      } else {
        return <Text style={{ marginLeft: 5, color: "white" }}>&#9660;</Text>;
      }
    } else {
      return null;
    }
  };

  const handleHeroClick = (localized_name) => {
    const url = `https://www.dota2protracker.com/hero/${localized_name.replace(
      / /g,
      "%20"
    )}#`;
    console.log(url);
    console.log("Hi");
    Linking.openURL(url);
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 15 }}>Sort By </Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => handleSort("role")}
        >
          <Text style={{ color: sortType === "role" ? "red" : "white" }}>
            Role
          </Text>
          {renderArrow("role")}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => handleSort("localized_name")}
        >
          <Text
            style={{ color: sortType === "localized_name" ? "red" : "white" }}
          >
            Name
          </Text>
          {renderArrow("localized_name")}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSort("winrate")}>
          <Text style={{ color: sortType === "winrate" ? "red" : "white" }}>
            Winrate
          </Text>
          {renderArrow("winrate")}
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => handleHeroClick(item.localized_name)}
              >
                <Image
                  resizeMethod="cover"
                  source={{ uri: item.img }}
                  style={{ width: 60, height: 30 }}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleHeroClick(item.localized_name)}
              >
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text
                    style={{ color: "white", paddingBottom: 5, fontSize: 16 }}
                  >
                    {item.localized_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color:
                        winRateCal(item.pro_win, item.pro_pick) < 50
                          ? "#FF3535"
                          : "#06FC78",
                    }}
                  >
                    Win rate: {winRateCal(item.pro_win, item.pro_pick)}%
                  </Text>
                  <Text style={{ color: "white", fontSize: 12 }}>
                    Role: {item.roles.join(", ")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
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
    alignItems: "flex-end",
  },
  buttonText: {
    color: "#CB3D3D",
    fontSize: 20,
  },
  text2: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    //color: winRate < 50 ? 'red' : 'green',
  },
});

export default HeroPage;
