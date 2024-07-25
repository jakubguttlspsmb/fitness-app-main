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
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export let userName = "";
export let userIpAddress = "";

export default function LoginPage() {
  const [count, setCount] = useState(false);
  const [count2, setCount2] = useState(false);
  const [ipAddress, setIpAddress] = useState("192.168.0.100");
  const { width, height } = Dimensions.get("window");
  const [name, setName] = useState("insert Username");
  const [password, setPassword] = useState("insert password");
  const [showIpAddress, setShowIpAddress] = useState(false);
  const navigation = useNavigation();
  const [saveData, setSaveData] = useState(false);
  const [backgroundColor1, setBackGroundColor1] = useState("#758694");
  const [backgroundColor2, setBackGroundColor2] = useState("#758694");

  const handleIpInputChange = (text) => {
    setIpAddress(text);
  };
  const handleNameInputChange = (text) => {
    setName(text);
  };
  const handlePasswordInputChange = (text) => {
    setPassword(text);
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("userData");
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);
        setIpAddress(userData.ipAddress);
        setName(userData.name);
        setPassword(userData.password);
        setSaveData(userData.saveData);
        setCount(true);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem("userData");
    } catch (e) {
      console.error(e);
    }
  };

  const userChoiseTrue = () => {
    setSaveData(true);
    setBackGroundColor1("#000000");
    setBackGroundColor2("#758694");
  };

  const userChoiseFalse = () => {
    setSaveData(false);
    setBackGroundColor1("#758694");
    setBackGroundColor2("#000000");
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    Login();
  }, [count]);

  const storeData = async () => {
    try {
      const userData = {
        ipAddress: ipAddress,
        name: name,
        password: password,
        saveData: saveData,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }
  };

  const Login = async () => {
    try {
      const response = await fetch(`http://${ipAddress}:3000/users/${name}`);
      const json = await response.json();
      console.log(json.msg);
      if (name === json.payload.name && password === json.payload.password) {
        console.log("login succesfull");
        if (saveData === true) {
          userName = name;
          userIpAddress = ipAddress;
          setCount2(false)
          storeData();
          navigation.navigate("Fit");

        } else {
          userName = name;
          userIpAddress = ipAddress;
          setCount2(false)
          deleteData();
          navigation.navigate("Fit");
        }
      } else {
        console.log("wrong name or password");
        setCount2(true);
      }
      return json;
    } catch (error) {
      if (showIpAddress === true) {
        setCount2(true);
      }
      setShowIpAddress(true);
    }
  };

  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
    },
    error: {
      color: "red",
      textAlign: "center",
      width: "80%",
      paddingTop: "3%",
    },
    smallText: {
      textAlign: "center",
      width: "80%",
      paddingTop: "3%",
      fontSize: (width / 100) * 1.5 + (height / 100) * 1.2,
    },

    input: {
      width: "30%",
      fontSize: (width / 100) * 1.5 + (height / 100) * 1,
      textAlign: "center",
      borderColor: "black",
      borderWidth: 2,
      borderStyle: "solid",
      borderRadius: 10,
      color: "#758694",
      backgroundColor: "#FFF8F3",
    },
    mediumText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      paddingTop: "5%",
      color: "#405D72",
    },

    bigText: {
      fontSize: (width / 100) * 4 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
    },
    buttonText: {
      fontSize: (width / 100) * 3 + (height / 100) * 2,
      textAlign: "center",
      fontWeight: "bold",
      color: "#405D72",
      padding: "5%",
    },
    buttonContainer: {
      width: "25%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingTop: "2%",
    },
  });
  return (
    <>
      <StatusBar hidden></StatusBar>

      <View style={styles.container}>
        <Text style={styles.bigText}>Login</Text>
        <Text style={styles.mediumText}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handleNameInputChange}
          placeholder={"Enter Name"}
        />
        <Text style={styles.mediumText}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={handlePasswordInputChange}
          placeholder={"Enter Password"}
        />

        {count2 && showIpAddress && (
          <>
            <Text style={styles.mediumText}>IPv4:</Text>
            <TextInput
              style={styles.input}
              onChangeText={handleIpInputChange}
              placeholder="Insert your IPv4"
            />
          </>
        )}

        <Text style={styles.smallText}>Save login data</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={userChoiseTrue}
            title="yes"
            color={backgroundColor1}
          />
          <Button
            onPress={userChoiseFalse}
            title="no"
            color={backgroundColor2}
          />
        </View>
        { count2 && showIpAddress && (
          <>
            <Text style={styles.error}>
              something is wrong check your name, password or ip address of the
              serverhost current: {ipAddress}
            </Text>
          </>
        )}
        <TouchableHighlight underlayColor={"grey"} onPress={Login}>
          <Text style={styles.buttonText}>ENTER</Text>
        </TouchableHighlight>
      </View>
    </>
  );
}
