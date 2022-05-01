import { useEffect, useState } from 'react';
import { ScrollView, Text, Pressable } from "react-native";
import { Base, Typography, HomeStyles } from '../../styles';

import invoiceModel from "../../models/invoices";
import DateDropDown from "./DateDropDown";
import OrderDropDown from "../OrderDropDown";
import { Picker } from '@react-native-picker/picker';

import Order from '../../interfaces/order';
import ordersModel from "../../models/orders";

import Invoice from '../../interfaces/invoice';



export default function InvoicesForm({ navigation}) {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    async function createInvoice() {
        try {
            await invoiceModel.createInvoice(invoice);
        } catch (error) {
            console.log(error)
        }

        setInvoice(invoice);
    
        navigation.navigate("Invoices list", { reload: true });
    }

    async function processSelectedOrder(orderId) {
            setInvoice({...invoice, order_id: orderId});
    }

    function ordersFilter(status_id) {
        return status_id < 600;
    }

    return (
        <ScrollView style={{ ...HomeStyles.base, ...Base.container }}>
            <Text style={{ ...Typography.header2 }}>New invoice</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
                processSelectedOrder={processSelectedOrder}
                ordersFilter={ordersFilter}
            />

            <Text style={{ ...Typography.label }}>Invoice date</Text>
            <DateDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />
                
            <Pressable style={Base.button} onPress={createInvoice}>
                <Text style={Typography.buttonText}>Create invoice</Text>
            </Pressable>       
        </ScrollView>
    );
};
