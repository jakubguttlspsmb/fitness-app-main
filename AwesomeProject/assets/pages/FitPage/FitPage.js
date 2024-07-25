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
import { useNavigation } from "@react-navigation/native";

export default function FitPage() {
  const lastTap = useRef(null);
  const navigation = useNavigation();
  const { width, height } = Dimensions.get("window");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [time, settime] = useState("");
  const [MET, setMET] = useState("");
  const [getValue, setValue] = useState("0");
  const [values, setValues] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const jsonValues = await AsyncStorage.getItem("dayValue");
      const jsonValues2 = JSON.parse(jsonValues);
      if (jsonValues2 !== null) {
        setValues(jsonValues2);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  const storeData = async () => {
    if (!loading) {
      try {
        const jsonValues = await AsyncStorage.setItem(
          "dayValue",
          JSON.stringify(values)
        );
        return jsonValues;
      } catch (e) {
        alert(e);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    storeData();
  }, [values]);

  useEffect(() => {
    if (MET !== "" && weight !== "" && time !== "") {
      calculateCalories();
    }
  }, [MET, weight, time]);

  const saveValues = () => {
    const newNote = {
      id: Date.now(),
      getValue,
      data: Date().toLocaleString(),
    };
    setValues([...values, newNote]);
    setCalories("");
    closeDataInput();
  };

  const submitValues = () => {
    calculateCalories();
    setValue(parseFloat(getValue) + parseFloat(calories));
    setCalories("");
  };

  const showDataInput = () => {
    setOpen(true);
  };

  const closeDataInput = () => {
    setOpen(false);
    setCalories("");
    setValue(0);
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
  const toProfil = () => {
    const now = Date.now();
    const delay = 300;
    if (lastTap.current && now - lastTap.current < delay) {
      navigation.navigate("Profile");
    } else {
      lastTap.current = now;
    }
  };

  const toExercises = () =>{
    navigation.navigate("Exercises")
  }
  const toUserFitnessData = () =>{
    navigation.navigate("FitnessData")
  }

  const removeDayValue = (note) => {
    const updateRemoveNote = values.filter((item) => item.id !== note.id);
    console.log(updateRemoveNote);
    setValues(updateRemoveNote);
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
      opacity:0.7
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
      fontWeight:"bold"
      
    },
    headContainer: {
      paddingTop: 30,
      width: "100%",
    },
    ScrollViewStyle: {
      width: "100%",
      marginTop: 5,
    },
    data: {
      margin: 20,
      padding: 5,
    },
    finalText: {
      margin: 10,
      textAlign: "center",
      fontSize: 25,
      fontWeight: "500",
      color: "white",
    },
    dataText: {
      textAlign: "center",
      fontSize: 13,
      fontWeight: "500",
    },
    text: {
      textAlign: "center",
      fontSize: 18,
      fontWeight: "500",
    },

    inputText: {
      fontSize: 29,
      padding: 5,
      borderWidth: 2,
      borderColor: "black",
      borderRadius: 3,
    },

    finalView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "black",
      borderRadius: 10,
      margin: 4,
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
      <View style={styles.view2}>
        <Text style={styles.head}>Fit </Text>
        <TouchableOpacity
          onPress={toFood}
          style={styles.invisibleButton1}
        ></TouchableOpacity>
        <TouchableOpacity
          onPress={toProfil}
          style={styles.invisibleButton2}
        ></TouchableOpacity>
        <View style={styles.container}>
          <Pressable style={styles.buttons} onPress={toExercises}>
            <ImageBackground
              style={styles.backgroudImages}
              source={require("./victor-freitas-_YO7f0XmUt4-unsplash.png")}
            >
              <Text style={styles.textB} >Exercises</Text>
            </ImageBackground>
          </Pressable>
          <Pressable style={styles.buttons} onPress={toUserFitnessData}>
            <ImageBackground
              style={styles.backgroudImages}
              source={require("./how-to-draw-a-scientific-graph.png")}
            >
              <Text style={styles.textB}>Your progress</Text>
            </ImageBackground>
          </Pressable>
          <ScrollView style={styles.ScrollViewStyle}>
            {values.map((note) => (
              <Pressable
                style={styles.data}
                key={`${note.id}`}
                onLongPress={() => removeDayValue(note)}
              >
                <View style={styles.finalView}>
                  <Text style={styles.finalText}>Your calories</Text>
                </View>
                <Text style={styles.dataText}>{note.data}</Text>
                <Text style={styles.text}>
                  {Math.round(note.getValue + 1900)}calories
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <StatusBar hidden />
      </View>
    </>
  );
}
