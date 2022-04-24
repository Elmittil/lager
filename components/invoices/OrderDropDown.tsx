import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import Order from '../../interfaces/order';
import ordersModel from "../../models/orders";
import { Text } from 'react-native';
import { Base, Typography, HomeStyles } from '../../styles';





export default function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        const ordersList = await ordersModel.getOrders();
        const filteredOrderList = ordersList
        .filter(order => order.status_id < 600);
        setOrders(filteredOrderList);
        setDefaultOrderID(filteredOrderList);
    }, []);

    function setDefaultOrderID(ordersList) {
        if (ordersList.length < 1) {
            return
        }
        props.setInvoice({...props.invoice, order_id: ordersList[0].id});
    }

    const ordersList = orders.filter(order => order.status)
    .filter(order => order.status_id < 600)
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
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) =>{
                props.setInvoice({...props.invoice, order_id: itemValue});
                // console.log("change in order drop down")
                // console.log(props.invoice);
                // console.log(itemValue);
            }}>
                {ordersList}
            </Picker>
    );
}
