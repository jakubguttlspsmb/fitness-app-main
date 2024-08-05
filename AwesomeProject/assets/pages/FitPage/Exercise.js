import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { userIpAddress } from "../LoginPage/LoginPage";

import { name } from "./ByCategoryPage";
import { category } from "./Exercises";

export let met = "";

export default function Exercise() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercise, setExercise] = useState({});
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    getExercise();
  }, []);

  const getExercise = async () => {
    const response = await fetch(
      `http://${userIpAddress}:3000/exercises/${category}/${name}`
    );
    const json = await response.json();
    console.log(json.payload);
    met = (json.payload.met);
    setExercise(json.payload);

  };

  const back = () => {
    navigation.navigate("ByCategoryPage");
  };

  const Add = () => {
    navigation.navigate("SaveData");
  };

  const changeImage = async () => {
    console.log(counter);
    setCounter(counter + 1);
    if (counter >= exercise.amountOfImages - 1) {
      setCounter(1);
    }
  };

  const styles = StyleSheet.create({
    body: {
      justifyContent: "center",
    },
    icons: {
      alignItems: "center",
      position: "absolute",
    },
    bigText: {
      fontSize: (width / 100) * 3.5 + (height / 100) * 2,
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
    smallText: {
      textAlign: "center",
      width: "80%",
      paddingTop: "3%",
      fontSize: (width / 100) * 1.5 + (height / 100) * 1.4,
    },
    image: {
      marginTop: (height / 100) * 3,
      marginBottom: (height / 100) * 3,
      width: (width / 100) * 100,
      height: (height / 100) * 30,
      resizeMode:"contain"
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
      <View style={styles.container}>
        <Text style={styles.smallText}>
          Estimated burned calories per minute: {exercise.met}
        </Text>
        <Text style={styles.smallText}>Exercises: {exercise.category}</Text>
        <Text style={styles.smallText}>
          Description: {exercise.description}
        </Text>
        <Pressable onPress={changeImage}>
          {exercise.imageUrl && (
            <Image
              source={{
                uri: `http://${userIpAddress}:3000${exercise.imageUrl[counter]}`,
              }}
              style={styles.image}
            />
          )}
        </Pressable>
        <Pressable onPress={Add}>
          <Entypo
            name="add-to-list"
            size={(height / 100) * 9}
            color="black"
            style={styles.icon}
          />
        </Pressable>
      </View>
    </>
  );
}
