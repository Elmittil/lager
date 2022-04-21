import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Invoices from "./components/Invoices";
import Deliveries from "./components/Deliveries";
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Base, Typography } from './styles';
import Auth from "./components/auth/Auth";
import authModel from "./models/auth";

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [products, setProducts] = useState([]);

  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);

  console.log("logged in: " + isLoggedIn);

  const routeIcons = {
    "Stock": "home",
    "Orders": "profile",
    "Deliveries": "export",
  };
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "exclamation";

              return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Stock">
            {() => <Home products={products} setProducts={setProducts}
            />}
          </Tab.Screen>
          {/* <Tab.Screen name="Stock" component={Home} /> */}
          <Tab.Screen name="Orders">
            {() => <Pick setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Deliveries">
            {() => <Deliveries setProducts={setProducts} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Invoices">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen> :

            <Tab.Screen name="Log in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

