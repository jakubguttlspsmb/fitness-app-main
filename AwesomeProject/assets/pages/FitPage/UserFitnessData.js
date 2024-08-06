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
import { Entypo } from "@expo/vector-icons";
import { useState, useEffect,useCallback } from "react";
import { userIpAddress, userName } from "../LoginPage/LoginPage";
import { useNavigation,useFocusEffect } from "@react-navigation/native";

export let date = "";

export default function UserFitnessData() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercises, setExercises] = useState([]);

  const logOff = async () => {
    navigation.navigate("Fit");
  };

  const getExercises = async () => {
    try {
      const response = await fetch(
        `http://${userIpAddress}:3000/saveExercises/${userName}`
      );
      if (response.ok) {
        const json = await response.json();
        const groupedData = groupByDate(json.payload);
        setExercises(groupedData);
      }
    } catch (error) {}
  };

  const groupByDate = (data) => {
    const groupedData = data.reduce((acc, current) => {
      const { date, calories } = current;
      if (!acc[date]) {
        acc[date] = { date, calories: 0 };
      }
      acc[date].calories += calories;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  const toDay = (selectedDate) => {
    date = selectedDate;
    console.log(date);
    navigation.navigate("DateData");
    setExercises();
  };

  useFocusEffect(
    useCallback(() => {
      getExercises();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    container2: {
      display: "flex",
      flexDirection: "row",
      width: width,
      justifyContent: "space-around",
    },
    icons: {
      alignItems: "center",
      position: "absolute",
      zIndex: 1,
    },
    bigText: {
      fontSize: (width / 100) * 4 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    list: {
      width: width,
      height: (height / 100) * 25,
    },
    mediumText: {
      fontSize: (width / 100) * 2.5 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
      paddingBottom: (height / 100) * 2,
    },
  });

  return (
    <>
      <Text style={styles.bigText}>Your progress</Text>
      <View style={styles.icons}>
        <Pressable onPress={logOff}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.mediumText}>Calories</Text>
          <Text style={styles.mediumText}>Date</Text>
        </View>
        <FlatList
          style={styles.list}
          data={exercises}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toDay(item.date)}
              style={styles.container2}
            >
              <Text style={styles.mediumText}>{item.calories}</Text>
              <Text style={styles.mediumText}>{item.date}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.date}
        />
      </View>
    </>
  );
}
