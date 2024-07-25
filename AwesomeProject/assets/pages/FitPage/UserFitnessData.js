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
  import { Entypo } from "@expo/vector-icons";
  import { useNavigation } from "@react-navigation/native";
import { symbol } from "prop-types";
  
  export default function UserFitnessData() {
    const navigation = useNavigation();
    const { width, height } = Dimensions.get("window");
  
    const logOff = async () => {
        navigation.navigate("Fit");
    };
  
    const styles = StyleSheet.create({
      icons: {
        alignItems: "center",
        paddingTop: (height / 100) * 75,
      },
      bigText: {
        fontSize: (width / 100) * 4 + (height / 100) * 2,
        textAlign: "center",
        fontWeight: "bold",
        color: "#405D72",
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

      </>
    );
  }
  