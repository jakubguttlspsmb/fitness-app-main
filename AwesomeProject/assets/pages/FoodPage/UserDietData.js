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
import { useState, useEffect, useCallback } from "react";
import { userIpAddress } from "../LoginPage/LoginPage";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { userName } from "../LoginPage/LoginPage";


export let date = "";

export default function UserDietData() {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [food, setFood] = useState([]);

  const logOff = async () => {
    navigation.navigate("Food");
  };

  const getFood = async () => {
    try {
      const response = await fetch(`http://${userIpAddress}:3000/saveFood/${userName }`);
      if (response.ok) {
        const json = await response.json();
        const groupedData = groupByDate(json.payload);
        setFood(groupedData);

      }
    } catch (error) {
      console.error(error);
    }
  };

  const groupByDate = (data) => {
    const groupedData = data.reduce((acc, current) => {
      const { date, kcal, bil, sach, tuk } = current;
      if (!acc[date]) {
        acc[date] = { date, kcal: 0, bil: 0, sach: 0, tuk: 0 };
      }
      acc[date].kcal += kcal;
      acc[date].bil += bil;
      acc[date].sach += sach;
      acc[date].tuk += tuk;
      return acc;
    }, {});
    return Object.values(groupedData);
  };

  const toDay = (selectedDate) => {
    date = selectedDate;
    console.log(date);
    navigation.navigate("DateData2");
    setFood()
  };

  useFocusEffect(
    useCallback(() => {
      getFood();
    }, [])
  );

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      borderColor:"black",
      borderWidth:1,
      borderStyle:"solid",
      marginTop:height/100*3,
      height:"auto"
    },
    container2: {
      display: "flex",
      flexDirection: "row",
      width: width,
      justifyContent: "space-around",
      borderBottomColor:"black",
      borderWidth:1,
      borderStyle:"solid",
    },
    icons: {
      alignItems: "center",
      position: "absolute",
      zIndex:1,
    },
    bigText: {
      fontSize: (width / 100) * 4 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    list: {
      width: width,
      height: (height / 100) * 25,
    },
    mediumText: {
      fontSize: (width / 100) * 2.5 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
      paddingBottom: (height / 100) * 2,
      
    },
  });
  return (
    <>
      <Text style={styles.bigText}>Your progress</Text>
      <View style={styles.icons}>
        <Pressable onPress={logOff}>
          <Entypo name="back" size={(height / 100) * 6} color="#405D72" />
        </Pressable>
      </View>
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.mediumText}>Kcal</Text>
          <Text style={styles.mediumText}>Bil</Text>
          <Text style={styles.mediumText}>Sach</Text>
          <Text style={styles.mediumText}>Tuk</Text>
          <Text style={styles.mediumText}>Date</Text>
        </View>
        <FlatList
          style={styles.list}
          data={food}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => toDay(item.date)}
              style={styles.container2}
            >
              <Text style={styles.mediumText}>{item.kcal}</Text>
              <Text style={styles.mediumText}>{item.bil}</Text>
              <Text style={styles.mediumText}>{item.sach}</Text>
              <Text style={styles.mediumText}>{item.tuk}</Text>
              <Text style={styles.mediumText}>{item.date}</Text>
            </Pressable>
          )}
          keyExtractor={(item) => item.date}
        />
      </View>
    </>
  );
}
