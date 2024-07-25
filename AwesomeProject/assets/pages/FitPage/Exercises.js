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
import { useNavigation } from "@react-navigation/native";
import { userIpAddress } from "../LoginPage/LoginPage";
import { useState, useEffect, useRef } from "react";

export let category = "";

export default function Exercices() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [exercises, setExercises] = useState([]);
  const [isLoaded, setLoaded] = useState(false);

  const logOff = async () => {
    navigation.navigate("Fit");
  };

  const ToCategory = (selectedCategory) => {
    category = selectedCategory;
    navigation.navigate("ByCategoryPage");
  };

  useEffect(() => {
    getExercises();
  }, []);

  const getExercises = async () => {
    const response = await fetch(`http://${userIpAddress}:3000/exercises`);
    console.log("succes finding data");
    const json = await response.json();
    setExercises(json.payload);
  };

  const getUniqueValues = (data, key) => {
    return [...new Map(data.map((item) => [item[key], item])).values()];
  };

  const uniqueData = getUniqueValues(exercises, "category");

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
      <Text style={styles.bigText}>Categories</Text>
      <View style={styles.icons}>
        <Pressable onPress={logOff}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          columnWrapperStyle
          numColumns={2}
          data={uniqueData}
          renderItem={({ item }) => (
            <Pressable onPress={() => ToCategory(item.category)} style={styles.boxes}>
              <Text style={styles.mediumText}>{item.category}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </>
  );
}
