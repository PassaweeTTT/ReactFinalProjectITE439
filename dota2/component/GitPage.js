import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Linking } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const gitUrl = "https://github.com/PassaweeTT/ReactFinalProjectITE439";

const GitPage = () => {
  const handleButtonPress = () => {
    Linking.openURL(gitUrl);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="ios-logo-github" size={200} color="white" />
        <Text style={styles.title}>Join Our Github!!</Text>
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Text style={styles.buttonText}>Go to Github</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 50,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: "#434343",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default GitPage;
