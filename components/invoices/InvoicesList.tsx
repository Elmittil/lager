import invoiceModel from "../../models/invoices";
import { Base, Typography } from '../../styles';
import { DataTable } from 'react-native-paper';
import storage from "../../models/storage";
import Invoice from "../../interfaces/invoice";
import { useEffect } from "react";
import { Text, Button, ScrollView } from "react-native";


export default function InvoicesList({ route, navigation, setIsLoggedIn }) {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice>([]);

    async function reloadInvoices() {
        setAllInvoices(await invoiceModel.getAllInvoices());
    }

    if (reload) {
        reloadInvoices();
        //set parms to false
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
                    <DataTable.Cell>{invoice.name}</DataTable.Cell>
                    <DataTable.Cell numeric>{invoice.total_price}</DataTable.Cell>
                    <DataTable.Cell>{invoice.due_date}</DataTable.Cell>
                </DataTable.Row>);
    });

    return (
        <ScrollView style={Base.container}>
            <Text style={Typography.header2}>Invoices</Text> 

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Namn</DataTable.Title>
                    <DataTable.Title numeric>Pris</DataTable.Title>
                    <DataTable.Title numeric>Expiry date</DataTable.Title>
                </DataTable.Header>
                {invocesRows}
            </DataTable>

            <Button 
                title="New invoice"
                onPress={() => {
                    navigation.navigate('Invoices Form');
                }}
            />
            <Button 
                title="Log out"
                onPress={async () => {
                    await logOut();
                }}
            />

        </ScrollView>
    );
};
