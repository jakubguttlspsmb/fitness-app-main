import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
  StatusBar,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { date } from "./UserFitnessData";
import { userIpAddress, userName } from "../LoginPage/LoginPage";

export default function DateData() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercises, setExercises] = useState([]);

  const logOff = () => {
    navigation.navigate("FitnessData");
  };

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    const response = await fetch(`http://${userIpAddress}:3000/saveExercises/${userName}/${date}`);
    const json = await response.json();
    setExercises(json.payload);
  };

  const Delete = async (id) => {
    try {
      const response = await fetch(
        `http://${userIpAddress}:3000/saveExercises/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setExercises((prevExercises) =>
          prevExercises.filter((exercise) => exercise._id !== id)
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
    icons: {
      alignItems: "center",
      position: "absolute",
      zIndex:1,
    },
    bigText: {
      fontSize: (width / 100) * 4 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    container2: {
      display: "flex",
      flexDirection: "row",
      width: width,
      justifyContent: "space-around",
    },
    list: {
      width: width,
      height: (height / 100) * 40,
      marginTop: (width / 100) * 1.5 + (height / 100) * 2,
    },
    mediumText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
      color: "#405D72",
      fontWeight: "bold",
      marginBottom: (height / 100) * 2,
    },
    container: {
      alignItems: "center",
    },
  });

  return (
    <>
      <StatusBar hidden></StatusBar>
      <View style={styles.icons}>
        <Pressable onPress={logOff}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <Text style={styles.bigText}>Date {date}</Text>

      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={exercises}
          renderItem={({ item }) => (
            <View style={styles.container2}>
              <Text style={styles.mediumText}>{item.exerciseName}</Text>
              <Text style={styles.mediumText}>{item.calories}cal</Text>
              <Pressable onPress={() => Delete(item._id)} style={styles.icon}>
                <Ionicons name="trash-bin" size={35} color="#405D72" />
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}
