import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
  ImageBackground
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
    name = boban;
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
      width: (width / 100) * 40,
      height: (height / 100) * 15,
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
      color:"white"
    },
    container: {
      alignItems: "center",
    },
    backgroudImages: {
      height: "100%",
      width: "100%",
      justifyContent: "center",
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
            <Pressable
              onPress={() => ToExersise(item.name)}
              style={styles.boxes}
            >
              <ImageBackground
              style={styles.backgroudImages}
                source={{
                  uri: `http://${userIpAddress}:3000${item.imageUrl[0]}`,
                }}
              >
                <Text style={styles.mediumText}>{item.name}</Text>
              </ImageBackground>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}
