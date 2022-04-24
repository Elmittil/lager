import invoiceModel from "../../models/invoices";
import { DataTable } from 'react-native-paper';
import storage from "../../models/storage";
import { useState } from 'react';
import Invoice from "../../interfaces/invoice";
import { useEffect } from "react";
import { Text, Button, Pressable, ScrollView } from "react-native";
import {Typography, FormStyles, HomeStyles, Base } from '../../styles';



export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice>([]);

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getInvoices());
    }

    if (reload) {
        reloadInvoices();
        route.params = false;
    }

    useEffect(() => {
        reloadInvoices();
    }, []);

    async function logOut() {
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invocesRows = allInvoices.map((invoice, index) => {
        return (<DataTable.Row key={index}>
                    <DataTable.Cell textStyle={ Typography.tableName }>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell numeric textStyle={ Typography.tablePrice }>{invoice.total_price}</DataTable.Cell>
                    <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>);
    });

    return (
        <ScrollView style={[Base.container, HomeStyles.base]}>
            <Text style={Typography.header2}>Invoices</Text> 

            <DataTable style={{ padding: 0 }}>
                <DataTable.Header >
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title numeric textStyle={ Typography.tablePrice }>Price</DataTable.Title>
                    <DataTable.Title numeric>Expiry date</DataTable.Title>
                </DataTable.Header>
                {invocesRows}
            </DataTable>

            <Pressable style={Base.button} onPress={() => {
                    navigation.navigate('Invoices Form');
                }}>
                <Text style={Typography.buttonText}>New invoice</Text>
            </Pressable> 

            <Pressable style={Base.button} onPress={async () => {
                    await logOut();
                }}>
                <Text style={Typography.buttonText}>Log out</Text>
            </Pressable> 

        </ScrollView>
    );
};
