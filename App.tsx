import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import Home from "./components/home/Home";
import Pick from "./components/orders/Pick";
import Ship from "./components/shipping/Ship";
import Invoices from "./components/invoices/Invoices";
import Deliveries from "./components/deliveries/Deliveries";
import Auth from "./components/auth/Auth";

import AppLoading from 'expo-app-loading';
import { Base, Typography } from './styles';
import authModel from "./models/auth";
import { useFonts, Lobster_400Regular } from '@expo-google-fonts/lobster';


const Tab = createMaterialBottomTabNavigator();

export default function App() {

    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [products, setProducts] = useState([]);


    useEffect(async () => {
        setIsLoggedIn(await authModel.loggedIn());
    }, []);

    const routeIcons = {
        "Stock": "home",
        "Orders": "profile",
        "Deliveries": "export",
        "Invoices": "isv",
        "Ship": "earth",
        "Log in": "login"
    };
    const [isLoaded] = useFonts({
        'Zurich-Regular': require('./assets/fonts/zurich-reg.ttf'),
        'Zurich-Bold': require('./assets/fonts/zurich-bold.ttf'),
    })
    if (!isLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={Base.container}>
                <NavigationContainer>
                    <Tab.Navigator
                        barStyle={Base.bottomNavBar}
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName = routeIcons[route.name] || "exclamation";
                                return <AntDesign name={iconName} size={22} color={color} />;
                            },
                            tabBarActiveTintColor: 'green',
                            tabBarInactiveTintColor: 'gray',
                            tabBarActiveBackgroundColor: '#006400',
                        })}
                    >
                        <Tab.Screen name="Stock">
                            {() => <Home products={products} setProducts={setProducts}
                            />}
                        </Tab.Screen>

                        <Tab.Screen name="Orders">
                            {() => <Pick setProducts={setProducts} />}
                        </Tab.Screen>

                        <Tab.Screen name="Deliveries">
                            {() => <Deliveries setProducts={setProducts} />}
                        </Tab.Screen>

                        <Tab.Screen name="Ship" component={Ship} />

                        {/* if logged in show invoices, otherwise show log in */}
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
}

