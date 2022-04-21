
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Base, HomeStyles, Typography } from '../styles';

// export default function Pick(route, products, setProducts) {
export default function Invoices(props) {
    return (
        <SafeAreaView style={Base.container}>
            <Text style={[Typography.header2]}>
                INVOICES</Text>
        </SafeAreaView>
    );
}
