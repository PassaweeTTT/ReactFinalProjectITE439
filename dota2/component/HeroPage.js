import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
const HeroPage = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [sortBy, setSortBy] = useState("role");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const sortData = () => {
    const sortedData = [...data];
    if (sortBy === "localized_name") {
      sortedData.sort((a, b) =>
        sortOrder === "asc"
          ? a.localized_name.localeCompare(b.localized_name)
          : b.localized_name.localeCompare(a.localized_name)
      );
    } else if (sortBy === "winrate") {
      sortedData.sort((a, b) => {
        const winrateA = (a.pro_win * 100) / a.pro_pick;
        const winrateB = (b.pro_win * 100) / b.pro_pick;
        return sortOrder === "asc" ? winrateA - winrateB : winrateB - winrateA;
      });
    } else {
      sortedData.sort((a, b) =>
        sortOrder === "asc"
          ? a[sortBy].localeCompare(b[sortBy])
          : b[sortBy].localeCompare(a[sortBy])
      );
    }
    setData(sortedData);
  };

  useEffect(() => {
    getDataDota();
  }, []);

  useEffect(() => {
    sortData();
  }, [sortBy, sortOrder]);

  const handleSortByChange = (value) => {
    if (value !== sortBy) {
      setSortBy(value);
      setSortOrder("desc");
    } else {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    }
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <Text style={{ marginRight: 10 }}>Sort By:</Text>
        <Dropdown
          options={[
            { label: "Role", value: "role" },
            { label: "Name", value: "localized_name" },
            { label: "Win Rate", value: "winrate" },
          ]}
          value={sortBy}
          onChange={(value) => handleSortByChange(value)}
        />
        <FontAwesome5
          name={
            sortOrder === "asc" ? "sort-amount-down-alt" : "sort-amount-up-alt"
          }
          size={20}
          color="black"
          style={{ marginLeft: 10 }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <Image
                resizeMethod="cover"
                source={{ uri: item.img }}
                style={{ width: 60, height: 30, marginRight: 10 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white" }}>{item.localized_name}</Text>
                <Text style={{ color: "white" }}>
                  Win rate: {((item.pro_win * 100) / item.pro_pick).toFixed(2)}%
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HeroPage;
