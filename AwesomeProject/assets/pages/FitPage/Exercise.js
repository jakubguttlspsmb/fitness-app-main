import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Pressable,
  Button,
  ScrollView,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { userIpAddress } from "../LoginPage/LoginPage";

import { name } from "./ByCategoryPage";
import { category } from "./Exercises";

export default function Exercise() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercise, setExercise] = useState([]);

  useEffect(() => {
    getExercise();
  }, []);

  const getExercise = async () => {
    const response = await fetch(
      `http://${userIpAddress}:3000/exercises/${category}/${name}`
    );
    const json = await response.json();
    console.log(json.payload);
    setExercise(json.payload);
  };

  const back = async () => {
    navigation.navigate("ByCategoryPage");
  };

  const styles = StyleSheet.create({
    icons: {
      alignItems: "center",
      position: "absolute",
    },
    bigText: {
      fontSize: (width / 100) * 4 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    boxes: {
      width: (width / 100) * 42,
      height: (height / 100) * 10,
      backgroundColor: "grey",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      margin: (width / 100) * 1.5 + (height / 100) * 1,
    },
    mediumText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
    },
    container: {
      alignItems: "center",
    },
  });

  return (
    <>
      <Text style={styles.bigText}>{name}</Text>
      <View style={styles.icons}>
        <Pressable onPress={back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <Text>Estimated burned calories per minute: {exercise.met}</Text>
      <Text>Exercises: {exercise.category}</Text>
      <Text>Description: {exercise.description}</Text>
    </>
  );
}
