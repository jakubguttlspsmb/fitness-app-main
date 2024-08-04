import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Pressable,
  ScrollView,
  TouchableOpacity,
  ImageBackground,

} from "react-native";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function FoodPage() {
  const lastTap = useRef(null);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [ipAddress, setIpAddress] = useState("192.168.0.100");

  const toProfile = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Profile");
    } else {
      lastTap.current = now;
    }
  };
  const toFit = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Fit");
    } else {
      lastTap.current = now;
    }
  };

  const toFindFood = () => {
    navigation.navigate("FindFood");
  };
  const ToUserDietData = () => {
    navigation.navigate("DietData");
  };

  const styles = StyleSheet.create({    view2: {
    alignItems: "center",
  },
  container: {
    display: "flex",
  },
  head: {
    fontSize: (width / 100) * 4 + (height / 100) * 2,
    textAlign: "center",
    fontWeight: "bold",
    color: "#405D72",
  },
  backgroudImages: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    opacity: 0.7,
  },
  buttons: {
    height: (height / 100) * 20,
    width: (height / 100) * 40,
    marginTop: (height / 100) * 5,
    borderWidth: 1,
    borderColor: "black",
  },
  textB: {
    textAlign: "center",
    fontSize: (width / 100) * 4 + (height / 100) * 2,
    fontWeight: "bold",
  },

  invisibleButton1: {
    height: height,
    position: "absolute",
    left: 0,
    width: (width / 100) * 10,
    position: "absolute",
  },
  invisibleButton2: {
    height: height,
    width: (width / 100) * 10,
    position: "absolute",
    right: 0,
  },});

  return (
    <>
      <View style={styles.view2}>
        <Text style={styles.head}>Diet</Text>
        <TouchableOpacity
          onPress={toProfile}
          style={styles.invisibleButton1}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={toFit}
          style={styles.invisibleButton2}
        ></TouchableOpacity>
        <View style={styles.container}>
          <Pressable style={styles.buttons} onPress={toFindFood}>
            <ImageBackground
              style={styles.backgroudImages}
              source={require("./food.jpg")}
            >
              <Text style={styles.textB}>Food</Text>
            </ImageBackground>
          </Pressable>
          <Pressable style={styles.buttons} onPress={ToUserDietData}>
            <ImageBackground
              style={styles.backgroudImages}
              source={require("./graph.png")}
            >
              <Text style={styles.textB}>Your progress</Text>
            </ImageBackground>
          </Pressable>
        </View>
        <StatusBar hidden />
      </View>
    </>
  );
}
