import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { userIpAddress, userName } from "../LoginPage/LoginPage";

import { food } from "./FindFood";

export default function SaveData2() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const date = new Date();
  const today = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const [weight, setWeigth] = useState(0);
  const [food2, setFood2] = useState(0);

  const handleInputChange = (text) => {
    setWeigth(text);
    setFood2({"kcal":Math.round((food.kcal/100)*text),"bil":Math.round((food.bil/100)*text),"sach":Math.round((food.sach/100)*text),"tuk":Math.round((food.tuk/100)*text) });
  };

  const back = () => {
    navigation.navigate("FoundFood");
  };

  const submitValues = async () => {
    fetch(`http://${userIpAddress}:3000/saveFood`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${userName}`,
        foodName: `${food.name}`,
        kcal: `${food2.kcal}`,
        bil: `${food2.bil}`,
        sach: `${food2.sach}`,
        tuk: `${food2.tuk}`,
        date: `${today}.${currentMonth}`,
      }),
    });
    navigation.navigate("DietData");
  };

  useEffect(() => {
    console.log(food);
  }, []);


  const styles = StyleSheet.create({
    body: {
      justifyContent: "center",
      alignItems: "center",
    },
    icons: {
      alignItems: "center",
      position: "absolute",
      zIndex:1,
    },
    bigText: {
      fontSize: (width / 100) * 3.5 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    input: {
      width: (width / 100) * 42,
      height: (height / 100) * 10,
      textAlign: "center",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "black",
      justifyContent: "center",
      margin: (width / 100) * 1.5 + (height / 100) * 1,
      fontSize: (width / 100) * 3 + (height / 100) * 2,
    },
    mediumText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },

    smallText: {
      textAlign: "center",
      width: "80%",
      paddingTop: "3%",
      fontSize: (width / 100) * 1.5 + (height / 100) * 1.4,
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
      <StatusBar hidden></StatusBar>
      <Text style={styles.bigText}>Save food</Text>
      <Text style={styles.bigText}>{food.name}</Text>

      <View style={styles.icons}>
        <Pressable onPress={back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.smallText}>Insert weight of food</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleInputChange}
          placeholder="0"
          keyboardType="decimal-pad"
        />
        <Text style={styles.mediumText}>Values for {weight} grams</Text>
        <Text style={styles.smallText}>Kcal:  {food2.kcal}</Text>
        <Text style={styles.smallText}>Proteins: {food2.bil}</Text>
        <Text style={styles.smallText}>Fats: {food2.tuk}</Text>
        <Text style={styles.smallText}>Carbohydrates: {food2.sach}</Text>
        <TouchableHighlight underlayColor={"grey"} onPress={submitValues}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}
