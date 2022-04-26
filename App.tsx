import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Base, Typography } from "../lager/styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Invoices from "./components/Invoices";
import Auth from "./components/auth/Auth";
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();

const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Ny inleverans": "car",
  "Faktura": "card",
  "Logga in": "log-in",
};

export default function App() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Lager">
            {(props) => <Home {...props} products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {(props) => <Pick {...props} products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Ny inleverans" component={Deliveries} />
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
            {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
          </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
