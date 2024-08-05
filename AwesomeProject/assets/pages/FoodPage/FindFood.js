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

export let food = {};

export default function FindFood() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [userSearch, seUserSearch] = useState();

  const Back = () => {
    navigation.navigate("Food");
  };

  const handleInputChange = (text) => {
    seUserSearch(text);
  };

  const Search = async () => {
    try {
      const response = await fetch(
        `http://${userIpAddress}:3000/food/${userSearch}`
      );
      if (!response.ok) {
        throw new Error(`nonexisting food: ${userSearch}`);
      }
      const json = await response.json();
      if (json && json.payload) {
        console.log(json.payload);
        food = json.payload;
        navigation.navigate("FoundFood");
      } else {
        console.error("food not found");
      }
    } catch (e) {
      console.error(e);
    }
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

      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      margin: (width / 100) * 1.5 + (height / 100) * 1,
    },
    mediumText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
      color: "#405D72",
      fontWeight: "bold",
    },
    container: {
      alignItems: "center",
      marginTop: height / 20,
    },
    input: {
      width: "70%",
      fontSize: (width / 100) * 2 + (height / 100) * 3,
      textAlign: "center",
      borderColor: "black",
      borderWidth: 2,
      borderStyle: "solid",
      borderRadius: 10,
      color: "#758694",
      backgroundColor: "#FFF8F3",
    },
    buttonText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
      padding: "5%",
    },
  });

  return (
    <>
      <Text style={styles.bigText}>Find food</Text>
      <View style={styles.icons}>
        <Pressable onPress={Back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          placeholder="Search for food"
        ></TextInput>
      </View>
      <TouchableHighlight underlayColor={"grey"} onPress={Search}>
        <Text style={styles.buttonText}>ENTER</Text>
      </TouchableHighlight>
    </>
  );
}
