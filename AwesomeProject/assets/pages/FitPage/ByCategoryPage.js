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

import { category } from "./Exercises";
export let name = "";


export default function ByCategoryPage() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    getExercises();
  }, []);

  const back = async () => {
    navigation.navigate("Exercises");
  };

  const ToExersise = (boban) => {
    name = boban
    navigation.navigate("Exercise");
  };

  const getExercises = async () => {
    const response = await fetch(
      `http://${userIpAddress}:3000/exercises/${category}`
    );
    const json = await response.json();
    setExercises(json.payload);
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
  <Text style={styles.bigText}>Exercises</Text>
      <View style={styles.icons}>
        <Pressable onPress={back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          columnWrapperStyle
          numColumns={2}
          data={exercises}
          renderItem={({ item }) => (
            <Pressable onPress={() => ToExersise(item.name)} style={styles.boxes}>
              <Text style={styles.mediumText}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}
