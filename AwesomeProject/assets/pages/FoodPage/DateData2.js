import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  FlatList,
  StatusBar,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useRef } from "react";
import { date } from "./UserDietData";
import { userIpAddress } from "../LoginPage/LoginPage";

export default function DateData2() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [food, setFood] = useState([]);

  const logOff = () => {
    navigation.navigate("DietData");
  };

  useEffect(() => {
    getFood();
  }, []);

  const getFood = async () => {
    const response = await fetch(
      `http://${userIpAddress}:3000/saveFood/${date}`
    );
    const json = await response.json();
    setFood(json.payload);
    console.log(json.payload);
  };

  const Delete = async (id) => {
    try {
      const response = await fetch(
        `http://${userIpAddress}:3000/saveFood/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setFood((prevFood) => prevFood.filter((food) => food._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const styles = StyleSheet.create({
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
    container: {
      marginTop: (height / 100) * 3,
      height: "auto",
    },
    container2: {
      display: "flex",
      flexDirection: "row",
      width: width,
      justifyContent: "space-around",
    },
    container3: {
      display: "flex",
      flexDirection: "row",
      width: width/100*85,
      justifyContent: "space-around",
    },
    list: {
      width: width,
      height: (height / 100) * 40,
      marginTop: (width / 100) * 1.5 + (height / 100) * 2,
    },
    mediumText: {
      fontSize: (width / 100) * 2 + (height / 100) * 2,
      textAlign: "center",
      color: "#405D72",
      fontWeight: "bold",
      marginBottom: (height / 100) * 2,
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
        <View style={styles.container3}>
          <Text style={styles.mediumText}>Name</Text>
          <Text style={styles.mediumText}>Kcal</Text>
          <Text style={styles.mediumText}>Bil</Text>
          <Text style={styles.mediumText}>Sach</Text>
          <Text style={styles.mediumText}>Tuk</Text>
        </View>
        <FlatList
          style={styles.list}
          data={food}
          renderItem={({ item }) => (
            <View style={styles.container2}>
              <Text style={styles.mediumText}>{item.foodName}</Text>
              <Text style={styles.mediumText}>{item.kcal}</Text>
              <Text style={styles.mediumText}>{item.bil}g</Text>
              <Text style={styles.mediumText}>{item.sach}g</Text>
              <Text style={styles.mediumText}>{item.tuk}g</Text>
              <Pressable onPress={() => Delete(item._id)}>
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
