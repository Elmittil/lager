import { useEffect, useState } from 'react';
import {Platform, ScrollView, Text, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker'

import invoicesModel from "../../models/invoices";
import ordersModel from "../../models/orders";
import DateDropDown from "./DateDropDown";

import Invoice from '../../interfaces/invoice';
import Order from '../../interfaces/order';

function OrderDropDown(props) {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status)
    .map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id} />;
    });

    return (
        <Picker
            selectedValue={props.invoice?.order_id}
            onValueChange={(itemValue) =>{
                props.setInvoice({...props.invoice, order_id:itemValue});
            }}>
                {ordersList}
            </Picker>
    );
}

export default function InvoicesForm({ navigation}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoce() {
        
    }

};
