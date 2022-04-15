import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import productModel from "../models/products";
import orderModel from "../models/orders";
import { Base, PickStyles, HomeStyles, Typography } from '../styles';



export default function PickList({ route, navigation, setProducts }) {
    const { order } = route.params;
    const [productList, setProductList] = useState([]);
    let enoughProducts = true;

    useEffect(async() => {
        setProductList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("Order list", { reload: true });
    }

    const orderItemsList = order.order_items.map((item, index) => {
        return <Text
                key={index}
                style={Typography.listFine}
                >
                    {item.name} - {item.amount} shelf: {item.location}
            </Text>;
    });
    let orderView;
    if (orderModel.checkProductsAvailability(order)) {
        orderView = (
            <SafeAreaView style={[Base.container, HomeStyles.base]}>
                <View>
                    <Text style={[Typography.header4, Typography.spaceTop]}>Kund:</Text>
                    <Text style={Typography.listFine}>{order.name}</Text>
                    <Text style={Typography.listFine}>{order.address}</Text>
                    <Text style={Typography.listFine}>{order.zip} {order.city}</Text>
        
                    <Text style={[Typography.header4, Typography.spaceTop]}>Produkter:</Text>
        
                    {orderItemsList}
                    <Pressable style={PickStyles.button} onPress={pick}>
                        <Text style={Typography.buttonText}>Pack the order</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    } else {
        orderView = (
            <SafeAreaView style={[Base.container, HomeStyles.base]}>
                <View>
                    <Text style={[Typography.header4, Typography.spaceTop]}>Kund:</Text>
                    <Text style={Typography.listFine}>{order.name}</Text>
                    <Text style={Typography.listFine}>{order.address}</Text>
                    <Text style={Typography.listFine}>{order.zip} {order.city}</Text>
        
                    <Text style={[Typography.header4, Typography.spaceTop]}>Produkter:</Text>
        
                    {orderItemsList}
                    <Text style={[Typography.header4, Typography.warning]}>Not enough stock</Text>
                </View>
            </SafeAreaView>
        );
    }
    return orderView;
};
