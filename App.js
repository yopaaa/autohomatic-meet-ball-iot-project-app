import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import vars from "./pages/components/Vars";
import Navigation from "./pages/Navigation";
import Timer from "./pages/Timer";
import Count from "./pages/Count";
import Setting from "./pages/Setting";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Timer"
          component={Timer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Count"
          component={Count}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>

      <View style={{ backgroundColor: vars.color.four }}>
        <Navigation />
      </View>
    </NavigationContainer>
  );
}
