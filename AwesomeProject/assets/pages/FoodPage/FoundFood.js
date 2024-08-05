import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { userIpAddress } from "../LoginPage/LoginPage";

import { food } from "./FindFood";

export default function FoundFood() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [counter, setCounter] = useState(1);

  const back = () => {
    navigation.navigate("FindFood");
  };

  const Add = () => {
    navigation.navigate("SaveData2");
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
      fontSize: (width / 100) * 2 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    container: {
      alignItems: "center",
    },
    smallText: {
      textAlign: "center",
      width: "80%",
      paddingTop: "3%",
      fontSize: (width / 100) * 1.5 + (height / 100) * 1.4,
      fontWeight: "bold",
      color: "#405D72",
    },
    image: {
      marginTop: (height / 100) * 3,
      marginBottom: (height / 100) * 3,
      width: (width / 100) * 80,
      height: (height / 100) * 30,
      resizeMode: "contain",
    },
  });

  return (
    <>
      <Text style={styles.bigText}>{food.name}</Text>
      <View style={styles.icons}>
        <Pressable onPress={back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.mediumText}>Values for 100g</Text>
        <Text style={styles.smallText}>Kcal: {food.kcal}</Text>
        <Text style={styles.smallText}>Proteins: {food.bil}</Text>
        <Text style={styles.smallText}>Fats: {food.sach}</Text>
        <Text style={styles.smallText}>Carbohydrates: {food.tuk}</Text>

        {food.imageUrl && (
          <Image
            source={{
              uri: `http://${userIpAddress}:3000${food.imageUrl[0]}`,
            }}
            style={styles.image}
          />
        )}

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
