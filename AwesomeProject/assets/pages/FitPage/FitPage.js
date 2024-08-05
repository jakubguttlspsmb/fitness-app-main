import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function FitPage() {
  const lastTap = useRef(null);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");

  const toFood = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Food");
    } else {
      lastTap.current = now;
    }
  };
  const toProfil = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Profile");
    } else {
      lastTap.current = now;
    }
  };

  const toExercises = () => {
    navigation.navigate("Exercises");
  };
  const toUserFitnessData = () => {
    navigation.navigate("FitnessData");
  };

  const styles = StyleSheet.create({
    view2: {
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
      justifyContent: "center",
      alignItems:"center",
    },
    invisibleButton2: {
      height: height,
      width: (width / 100) * 10,
      position: "absolute",
      right: 0,
      justifyContent: "center",
      alignItems:"center",
    },
  });
  return (
    <>
      <View style={styles.view2}>
        <Text style={styles.head}>Fit </Text>
        <TouchableOpacity onPress={toFood} style={styles.invisibleButton1}>
          <AntDesign name="caretleft" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={toProfil} style={styles.invisibleButton2}>
          <AntDesign name="caretright" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.container}>
          <Pressable style={styles.buttons} onPress={toExercises}>
            <ImageBackground
              style={styles.backgroudImages}
              source={require("./victor-freitas-_YO7f0XmUt4-unsplash.png")}
            >
              <Text style={styles.textB}>Exercises</Text>
            </ImageBackground>
          </Pressable>
          <Pressable style={styles.buttons} onPress={toUserFitnessData}>
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
