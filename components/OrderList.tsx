import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import config from "./../config/config.json";
import orderModel from "../models/orders";
import { Base, HomeStyles, PickStyles, Typography } from '../styles';
import PickList from './PickList';


export default function OrderList({ route, navigation }) {
    const [allOrders, setAllOrders] = useState([]);
    const { reload } = route.params || false;

    if (reload) {
        reloadOrders();
    }

    useEffect(async () => {
        await reloadOrders();
    }, []);

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders());
    }

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            console.log("rendering list of orders");
            return <Pressable
                
                title={order.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Details', {
                        order: order
                    });
                }}
            >
                <Text style={Typography.list}>{order.name}</Text>
            </Pressable>
        });

    return (
        <SafeAreaView style={[Base.container, HomeStyles.base]}>
            <View>
                <Text style={[Typography.header3, Typography.spaceTop, Typography.center]}>
                    Orders to be collected
                </Text>
                {listOfOrders}
            </View>
        </SafeAreaView>
        
    );
}
