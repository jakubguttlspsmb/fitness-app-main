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
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";

export default function FoodPage() {
  const [data, setData] = useState("");
  const [food, setFood] = useState("");
  const lastTap = useRef(null);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [flexdirection, setFlexdirection] = useState("row");
  const [visible, setVisible] = useState("none");
  const [calories, setCalories] = useState(0);
  const [fats, setFats] = useState(0);
  const [proteins, setProteins] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fibers, setFibers] = useState(0);
  const [values, setValues] = useState([]);
  const [ipAddress, setIpAddress] = useState("192.168.0.100");

  const handleFoodInputChange = (text) => {
    setFood(text);
  };

  function addingData() {
    if (data && data.nutrients) {
      setCalories(calories + data.nutrients.ENERC_KCAL);
      setFats(fats + data.nutrients.FAT);
      setProteins(proteins + data.nutrients.PROCNT);
      setCarbs(carbs + data.nutrients.CHOCDF);
      setFibers(fibers + data.nutrients.FIBTG);
    }
  }
  function removeData() {
    if (data && data.nutrients) {
      if (calories >= data.nutrients.ENERC_KCAL) {
        setCalories(calories - data.nutrients.ENERC_KCAL);
      }
      if (fats >= data.nutrients.FAT) {
        setFats(fats - data.nutrients.FAT);
      }
      if (proteins >= data.nutrients.PROCNT) {
        setProteins(proteins - data.nutrients.PROCNT);
      }
      if (carbs >= data.nutrients.CHOCDF) {
        setCarbs(carbs - data.nutrients.CHOCDF);
      }
      if (fibers >= data.nutrients.FIBTG) {
        setFibers(fibers - data.nutrients.FIBTG);
      }
    }
  }
  const FetchData = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:3000/food/banana`);
      const json = await response.json();
      setCalories(json.payload.kcal);
      console.log(json.msg);
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  {
    /* useEffect(() => {
    storeData();
  }, [values]);*/
  }
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

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      width: width,
      height: height,
      backgroundColor: "yellow",
    },
    ScrollViewStyle: {
      width: "100%",
      marginTop: 5,
      height: height / 4,
    },
    input: {
      marginTop: height * 0.05,
      backgroundColor: "white",
      width: width - 50,
      paddingTop: 8,
      paddingBottom: 8,
      fontWeight: "bold",

      paddingLeft: 15,
    },
    input2: {
      backgroundColor: "green",
    },
    textLook: {
      color: "black",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "white",
      width: width - 50,
      height: 35,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      marginTop: 5,
    },
    fetchedFood: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: flexdirection,
      width: width,
      backgroundColor: "yellow",
      display: visible,
      height: "30%",
      marginTop: "5%",
      fontWeight: "bold",
      borderWidth: 1,
      borderColor: "black",
    },
    Button2: {
      height: "90%",
      width: "30%",
      justifyContent: "center",
      alignItems: "center",
    },
    olderDatastyle: { height: "40%" },
    fetchedText: { color: "black", fontWeight: "bold" },
    scrollContent: { alignItems: "center" },
    head: { marginTop: "10%", fontSize: 25, fontWeight: "bold" },
    todayDataContainer: { marginBottom: "5%", marginTop: "5%" },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "bold",
    },
    data: {
      margin: 20,
      padding: 5,
    },

    dataText: {
      textAlign: "center",
      fontSize: 13,
      fontWeight: "500",
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
    },
  });

  return (
    <>
      <StatusBar hidden></StatusBar>

      <View style={styles.container}>
        {/* <TextInput
          style={styles.input}
          placeholder="Search for food"
          onChangeText={handleFoodInputChange}
  /> */}
        <TouchableHighlight style={styles.button} onPress={FetchData}>
          <FontAwesome name="search" size={35} color="black" />
        </TouchableHighlight>

        <View style={styles.todayDataContainer}>
          <Text style={styles.text}>
            Today's {ipAddress} Data: {calories}
          </Text>
        </View>
        <TouchableHighlight style={styles.button}>
          <Text style={styles.text}>Save today data</Text>
        </TouchableHighlight>
        <View style={styles.ScrollViewStyle}>
          <ScrollView>
            {values.map((note) => (
              <Pressable
                style={styles.data}
                key={`${note.id}`}
                onLongPress={() => removeDayValue(note)}
              >
                <Text style={styles.dataText}>{note.data}</Text>
                <Text style={styles.text}>{note.calories} calories</Text>
                <Text style={styles.text}>{note.proteins} proteins</Text>
                <Text style={styles.text}>{note.carbs} carbs</Text>
                <Text style={styles.text}>{note.fibers} fibers</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        onPress={toProfile}
        style={styles.invisibleButton1}
      ></TouchableOpacity>
      <TouchableOpacity
        onPress={toFit}
        style={styles.invisibleButton2}
      ></TouchableOpacity>
    </>
  );
}
