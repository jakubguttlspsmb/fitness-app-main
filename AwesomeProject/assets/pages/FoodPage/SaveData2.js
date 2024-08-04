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


export default function SaveData2() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const date = new Date();
  const today = date.getDate();
  const currentMonth = date.getMonth() + 1;

  const handleTimeInputChange = (text) => {
    setTime(text);
  };

  const back = () => {
    navigation.navigate("Exercise");
  };

  const submitValues = async () => {
    fetch(`http://${userIpAddress}:3000/saveFood`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${name}`,
        calories: `${calories}`,
        category: category,
        date: `${today}.${currentMonth}`,
      }),
    });
    navigation.navigate("ByCategoryPage");
  };

  useEffect(() => {
    setCalories(met2 * time);
  }, [time, met2]);

  useEffect(() => {
    setMet2(met);
  }, []);

  useEffect(() => {
    if (intensity === 2) {
      setMet2(met + 2);
    } else if (intensity === 1) {
      setMet2(met);
    }
  }, [intensity]);

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
      <Text style={styles.bigText}>Save exercise</Text>
      <Text style={styles.bigText}>{name}</Text>

      <View style={styles.icons}>
        <Pressable onPress={back}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.body}>
        <Text style={styles.smallText}>Insert length of exercising</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleTimeInputChange}
          placeholder="0"
          keyboardType="decimal-pad"
        />
        <Text style={styles.smallText}>Intensity of your exercising</Text>
        <RNPickerSelect
          onValueChange={(value) => setIntensity(value)}
          items={[
            { label: "High", value: 2 },
            { label: "Low", value: 1 },
          ]}
        />
        <Text style={styles.mediumText}>{calories} calories</Text>
        <TouchableHighlight underlayColor={"grey"} onPress={submitValues}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}
