import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";


export default function HelpPage() {
myProp = open
const [open, setOpen] = useState(false);
  const styles = StyleSheet.create({
    MainContainer: {
      backgroundColor: "red",
    },
  });
  return (
    <>
      <View style={StyleSheet.MainContainer}>
        <Pressable onPress={setOpen(true)}>i understand</Pressable>
      </View>
    </>
  );
}
