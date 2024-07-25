import FoodPage from "./assets/pages/FoodPage/FoodPage";
import FitPage from "./assets/pages/FitPage/FitPage";
import HelpPage from "./assets/pages/HelpPage/HelpPage";
import LoginPage from "./assets/pages/LoginPage/LoginPage";
import ProfilePage from "./assets/pages/ProfilePage/ProfilePage";
import Exercices from "./assets/pages/FitPage/Exercises";
import UserFitnessData from "./assets/pages/FitPage/UserFitnessData";
import ByCategoryPage from "./assets/pages/FitPage/ByCategoryPage";
import Exercise from "./assets/pages/FitPage/Exercise";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/*
npm i
npm i expo
npm i react-native
npm i @react-native-async-storage/async-storage
npx expo login 
npm start
naskenuj qr kod na mobilu
*/
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Fit" component={FitPage} />
          <Stack.Screen name="Food" component={FoodPage} />
          <Stack.Screen name="Help" component={HelpPage} />
          <Stack.Screen name="Profile" component={ProfilePage} />
          <Stack.Screen name="Exercises" component={Exercices} />
          <Stack.Screen name="FitnessData" component={UserFitnessData} />
          <Stack.Screen name="ByCategoryPage" component={ByCategoryPage} />
          <Stack.Screen name="Exercise" component={Exercise} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
