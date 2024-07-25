import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userName } from "../LoginPage/LoginPage";
import { AntDesign } from "@expo/vector-icons";



export default function ProfilePage() {
  const lastTap = useRef(null);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");


  const toFit = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Fit");
    } else {
      lastTap.current = now;
    }
  };
  const toFood = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Food");
    } else {
      lastTap.current = now;
    }
  };
  const logOff = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      navigation.navigate("Login");
    } catch (e) {
      console.error(e);
    }
  };

  const styles = StyleSheet.create({
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
    },
    bigText: {
        fontSize: (width / 100) * 4 + (height / 100) * 2,
        textAlign: "center",
        fontWeight: "bold",
        color: "#405D72",
      },
      icons: {
        alignItems: "center",
        paddingTop: (height / 100) * 75,
      },
      mediumText: {
        fontSize: (width / 100) * 3 + (height / 100) * 2,
        paddingTop: "5%",
        color: "#405D72",
        textAlign:"center"
      },
  });
  return (
    <>
      <Text style={styles.bigText}>Profile</Text>
      <Text style={styles.mediumText}>Name: {userName}</Text>
      <View style={styles.icons}>
            <Pressable onPress={logOff}>
              <AntDesign name="logout" size={height/100*6} color="#405D72" />
            </Pressable>
          </View>
      <TouchableOpacity
            onPress={toFit}
            style={styles.invisibleButton1}
          ></TouchableOpacity>
          <TouchableOpacity
            onPress={toFood}
            style={styles.invisibleButton2}
          ></TouchableOpacity>
    </>
  );
}
