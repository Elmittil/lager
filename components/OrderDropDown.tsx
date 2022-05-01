import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import Order from '../interfaces/order';
import ordersModel from "../models/orders";
import { Text } from 'react-native';
import { Base, Typography, HomeStyles } from '../styles';

export default function OrderDropDown( props ) {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderID, setSelectedOrderID] = useState();

    useEffect(async () => {
        const ordersList = await ordersModel.getOrders();
        const filteredOrderList = ordersList
        .filter(order => props.ordersFilter(order.status_id));
        setOrders(filteredOrderList);
        setDefaultOrderID(filteredOrderList);
    }, []);

    async function setDefaultOrderID(ordersList) {
        if (ordersList.length < 1) {
            return
        }
        // props.setInvoice({...props.invoice, order_id: ordersList[0].id});
        await props.processSelectedOrder(ordersList[0].id);
        setSelectedOrderID(ordersList[0].id);
    }

    const ordersList = orders
    .map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    if (ordersList.length < 1) {
        return (
            <Text style={{ ...Typography.header4 }}>No orders available</Text>
        );
    }
    return (
        <Picker
            selectedValue={selectedOrderID}
            onValueChange={async (itemValue) =>{
                setSelectedOrderID(itemValue);
                await props.processSelectedOrder(itemValue);
            }}>
            {ordersList}
        </Picker>
    );
}
