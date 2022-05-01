import { View, Text, Pressable } from 'react-native';
import { useState, useEffect } from "react";

import { Base, Typography, HomeStyles } from '../../styles';
import OrderDropDown from "../OrderDropDown";
import orderModel from "../../models/orders";
import Order from "../../interfaces/order";



export default function ShipList({ navigation}) {
    const [order, setOrder] = useState<Partial<Order>>({});

    

    async function processSelectedOrder(order_id) {
        const selectedOrder = await orderModel.getOrder(order_id);
        setOrder(selectedOrder);
    }

    function ordersFilter(status_id) {
        return status_id === 200;
    }

    return (
        <View style={[Base.container, HomeStyles.base]}>
            <Text style={Typography.header3}>Orders to ship</Text>
            <OrderDropDown
                processSelectedOrder={processSelectedOrder}
                selectedOrder={order}
                ordersFilter={ordersFilter}
            />
            <Pressable style={Base.button} onPress={() => {
                navigation.navigate('Shipping order', {
                    order: order
                });
                }}>
                <Text style={Typography.buttonText}>View</Text>
            </Pressable>  
        </View>
    );
};
